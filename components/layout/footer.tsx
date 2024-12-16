import { GraduationCap } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  courses: [
    { label: "Web Development", href: "/courses/web-development" },
    { label: "Machine Learning", href: "/courses/machine-learning" },
    { label: "Data Science", href: "/courses/data-science" },
    { label: "Mobile Development", href: "/courses/mobile-development" },
  ],
  company: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Karir", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Kontak", href: "/contact" },
  ],
  help: [
    { label: "FAQ", href: "/faq" },
    { label: "Syarat dan Ketentuan", href: "/terms" },
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Bantuan", href: "/help" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6" />
              <span className="text-xl font-bold">Skillopa</span>
            </div>
            <p className="text-gray-400">
              Platform pembelajaran online terbaik di Indonesia
            </p>
          </div>
          
          <FooterSection title="Kursus" links={footerLinks.courses} />
          <FooterSection title="Perusahaan" links={footerLinks.company} />
          <FooterSection title="Bantuan" links={footerLinks.help} />
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Skillopa. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-bold mb-4">{title}</h4>
      <ul className="space-y-2 text-gray-400">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}