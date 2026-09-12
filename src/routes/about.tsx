import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About & Gear — RMN Mixing Engineer" },
    { name: "description", content: "Meet RMN and explore the carefully selected mixing tools behind the records." },
    { property: "og:title", content: "About & Gear — RMN Mixing Engineer" },
    { property: "og:description", content: "RMN's mixing philosophy, experience, studio gear, and software." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: AboutPage,
});

const gear = [
  ["Monitoring", "Focal Trio6 ST6", "Avantone MixCubes", "Beyerdynamic DT 1990 Pro"],
  ["Analog", "SSL Fusion", "Rupert Neve 542", "Empirical Labs Distressor"],
  ["Software / Plug-ins", "Pro Tools Ultimate", "FabFilter", "Soundtoys", "UAD Native", "Valhalla DSP"],
];

function AboutPage() {
  return <SiteShell><div className="mx-auto max-w-[1240px] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
    <header className="border-b border-border pb-8"><p className="font-mono text-[10px] tracking-[0.24em] text-primary">ABOUT / GEAR</p><h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">Every mix should reveal the person inside the recording.</h1></header>
    <div className="grid gap-16 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
      <section><p className="font-display text-2xl leading-relaxed text-foreground">RMN is an independent mixing engineer focused on alternative, indie, and left-of-center pop records.</p><div className="mt-10 space-y-6 text-base leading-8 text-muted-foreground"><p>The work begins with intention: finding the emotional center of a song, preserving its rough edges, and building a mix that feels dimensional without losing intimacy.</p><p>From sparse bedroom recordings to layered full-band productions, every project receives a close, collaborative process shaped around the artist rather than a preset sound.</p></div><div className="mt-14 grid grid-cols-2 border-y border-border py-7"><div><p className="font-display text-4xl font-semibold">10+</p><p className="mt-2 font-mono text-[9px] tracking-[0.18em] text-muted-foreground">YEARS ACTIVE</p></div><div><p className="font-display text-4xl font-semibold">150+</p><p className="mt-2 font-mono text-[9px] tracking-[0.18em] text-muted-foreground">RELEASES MIXED</p></div></div></section>
      <section>{gear.map(([title, ...items]) => <div key={title} className="border-t border-border py-7 first:pt-0 first:border-t-0"><h2 className="font-mono text-[10px] tracking-[0.22em] text-primary">{title.toUpperCase()}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="font-display text-lg text-foreground/85">{item}</li>)}</ul></div>)}</section>
    </div>
  </div></SiteShell>;
}