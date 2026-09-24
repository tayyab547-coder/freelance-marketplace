import Link from "next/link";
import { Briefcase, Twitter, Github, Linkedin } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  "For Freelancers": [
    { label: "How It Works", href: "#" },
    { label: "Browse Projects", href: "/post-project" },
    { label: "Create a Service", href: "#" },
    { label: "Freelancer Resources", href: "#" },
  ],
  "For Clients": [
    { label: "Post a Project", href: "/post-project" },
    { label: "Browse Services", href: "/services" },
    { label: "How to Hire", href: "#" },
    { label: "Client Resources", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Freelance<span className="text-brand-300">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-brand-200 leading-relaxed max-w-xs">
              Connect with top freelancers and find the perfect project. Quality
              work, secure payments, every time.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Github, label: "GitHub" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-brand-300 hover:text-white transition-colors duration-150"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300 mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-200 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-brand-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-400">
            &copy; {new Date().getFullYear()} FreelanceHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-sm text-brand-400 hover:text-white transition-colors duration-150"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
