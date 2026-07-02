import { footer, contact, socials } from "@/config/siteConfig";

export default function Footer() {
  const links = [
    { label: "LinkedIn", href: socials.linkedin },
    { label: "Instagram", href: socials.instagram },
    { label: "Email", href: contact.emailHref },
    { label: "WhatsApp", href: contact.whatsappHref },
  ];

  return (
    <footer className="border-t border-line bg-ink px-6 py-14 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-medium text-paper">{footer.name}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            {footer.tagline}
          </p>
          <p className="mt-2 text-sm text-muted">{footer.location}</p>
        </div>

        <nav aria-label="Redes y contacto" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-muted transition-colors duration-200 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted/60">
        © {new Date().getFullYear()} {footer.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
