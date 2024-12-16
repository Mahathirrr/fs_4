import { withTransaction } from '@/lib/db/utils/transaction';
import { sql } from '@vercel/postgres';

interface PaymentDetails {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  description: string;
}

export class PaymentService {
  private static readonly MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
  private static readonly MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
  private static readonly IS_PRODUCTION = process.env.NODE_ENV === 'production';

  static async createPayment(data: PaymentDetails) {
    const timestamp = Date.now();
    const orderId = `ORDER-${timestamp}`;

    const transaction = {
      transaction_details: {
        order_id: orderId,
        gross_amount: data.amount,
      },
      customer_details: {
        first_name: data.customerName,
        email: data.customerEmail,
      },
      item_details: [{
        id: orderId,
        price: data.amount,
        quantity: 1,
        name: data.description,
      }],
    };

    const response = await fetch(
      `https://api.${this.IS_PRODUCTION ? 'midtrans' : 'sandbox.midtrans'}.com/v2/charge`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(this.MIDTRANS_SERVER_KEY + ':').toString('base64')}`,
        },
        body: JSON.stringify(transaction),
      }
    );

    const result = await response.json();
    return result;
  }

  static async handleCallback(notification: any) {
    return withTransaction(async (client) => {
      const { order_id, transaction_status, fraud_status } = notification;

      const payment = await client.query(`
        UPDATE payments
        SET 
          status = $1,
          payment_details = $2,
          updated_at = NOW()
        WHERE order_id = $3
        RETURNING *
      `, [transaction_status, notification, order_id]);

      if (transaction_status === 'capture' && fraud_status === 'accept') {
        await client.query(`
          UPDATE enrollments
          SET status = 'active'
          WHERE payment_id = $1
        `, [payment.rows[0].id]);
      }

      return payment.rows[0];
    });
  }
}