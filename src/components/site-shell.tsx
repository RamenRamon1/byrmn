import { Link, useRouterState } from "@tanstack/react-router";
import { Headphones, Instagram, Mail, Menu, Music2, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import logoAsset from "@/assets/rmn-logo.png.asset.json";
import { Button } from "@/components/ui/button";

const links = [
  { label: "CREDITS", to: "/" as const },
  { label: "ABOUT/GEAR", to: "/about" as const },
  { label: "BOOKING", to: "/booking" as const },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border bg-background px-5 lg:hidden">
        <Link to="/" aria-label="RMN credits" className="flex min-w-0 items-center gap-3">
          <img src={logoAsset.url} alt="RMN" className="h-11 w-auto shrink-0 object-contain" />
          <span className="truncate font-mono text-[10px] tracking-[0.24em] text-muted-foreground">BYRMN.COM</span>
        </Link>
        <Button variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </Button>
      </header>

      {open && (
        <nav className="fixed inset-x-0 top-20 z-30 border-b border-border bg-background px-6 py-8 lg:hidden">
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-display text-xl font-semibold">
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-background px-9 py-10 lg:flex">
        <Link to="/" aria-label="RMN credits">
          <img src={logoAsset.url} alt="RMN graffiti logo" className="h-auto w-full object-contain" />
          <p className="mt-5 text-center font-mono text-[10px] tracking-[0.3em] text-muted-foreground">BYRMN.COM</p>
        </Link>
        <nav className="mt-20 space-y-7">
          {links.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative block py-1 pl-5 font-display text-sm font-semibold tracking-[0.08em] transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className={`absolute inset-y-0 left-0 w-0.5 transition-colors ${active ? "bg-primary" : "bg-transparent group-hover:bg-primary"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <footer className="mt-auto">
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="https://spotify.com" aria-label="Spotify" className="transition-colors hover:text-primary"><Music2 size={17} /></a>
            <a href="https://music.apple.com" aria-label="Apple Music" className="transition-colors hover:text-primary"><Headphones size={17} /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="transition-colors hover:text-primary"><Instagram size={17} /></a>
            <a href="mailto:hello@byrmn.com" aria-label="Email RMN" className="transition-colors hover:text-primary"><Mail size={17} /></a>
          </div>
          <p className="mt-5 font-mono text-[9px] tracking-[0.18em] text-muted-foreground">© 2026 RMN</p>
        </footer>
      </aside>
      <main className="pt-20 lg:ml-64 lg:pl-16 lg:pr-8 lg:pt-0 xl:pl-24 xl:pr-12">{children}</main>
    </div>
  );
}