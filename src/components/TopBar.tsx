"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"


const NAV = [
  { href: "/", label: "Hem" },
  { href: "/avancerad-kalkylator", label: "Kalkylator" },
  { href: "/blogg", label: "Blogg" },
  { href: "/om", label: "Om" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "px-3 py-2 rounded-md text-sm font-medium transition",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}



export default function Topbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50",
        "bg-card/90 backdrop-blur supports-backdrop-filter:bg-card/70",
        "border-b border-border",
        scrolled ? "shadow-sm" : "",
        // iOS notch safe-area
        "pt-[env(safe-area-inset-top)]",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-foreground font-semibold">FrilansKalkylator</Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map((i) => <NavLink key={i.href} {...i} />)}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/logga-in" className="px-3 py-2 rounded-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90">
              Logga in
            </Link>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-label="Öppna meny"
            aria-expanded={open}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3">
            <div className="space-y-1 pt-2">
              {NAV.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {i.label}
                </Link>
              ))}
              <Link
                href="/logga-in"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90"
              >
                Logga in
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}