import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Music2, Play, X } from "lucide-react";
import { useState } from "react";

import blueHour from "@/assets/cover-blue-hour.jpg";
import coast from "@/assets/cover-coast.jpg";
import emptyRooms from "@/assets/cover-empty-rooms.jpg";
import portrait from "@/assets/cover-strange-light.jpg";
import thread from "@/assets/cover-thread.jpg";
import withoutYouAsset from "@/assets/without-you.png.asset.json";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Category = "Official Credits" | "Original Releases" | "Spec Mixes";
type Credit = { title: string; artist: string; year: string; category: Category; image: string; label: string; studio: string; roles: string[] };

const credits: Credit[] = [
  { title: "Without You", artist: "RMN", year: "2026", category: "Original Releases", image: withoutYouAsset.url, label: "Independent", studio: "RMN Studio, Los Angeles", roles: ["Mix", "Production"] },
  { title: "Blue Hour", artist: "Marlowe", year: "2025", category: "Official Credits", image: blueHour, label: "Night Service", studio: "Signal House", roles: ["Mix"] },
  { title: "Strange Light", artist: "Ana Vale", year: "2025", category: "Official Credits", image: portrait, label: "Common Thread", studio: "Soft Focus", roles: ["Stereo Mix"] },
  { title: "Empty Rooms", artist: "Pale Cinema", year: "2024", category: "Spec Mixes", image: emptyRooms, label: "Independent", studio: "RMN Studio", roles: ["Mix"] },
  { title: "Red Thread", artist: "Lina Grey", year: "2025", category: "Official Credits", image: thread, label: "Found Objects", studio: "North Window", roles: ["Mix", "Additional Production"] },
  { title: "Low Tide", artist: "Field Notes", year: "2024", category: "Original Releases", image: coast, label: "Independent", studio: "RMN Studio", roles: ["Mix", "Master"] },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "RMN — Alternative & Indie Mixing Engineer" },
    { name: "description", content: "Selected mixing credits, original releases, and spec mixes by RMN." },
    { property: "og:title", content: "RMN — Alternative & Indie Mixing Engineer" },
    { property: "og:description", content: "A curated archive of records mixed and produced by RMN." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: CreditsPage,
});

function CreditsPage() {
  const [filter, setFilter] = useState<Category>("Official Credits");
  const [selected, setSelected] = useState<Credit | null>(null);
  const visible = credits.filter((credit) => credit.category === filter);
  const tabs: Category[] = ["Official Credits", "Original Releases", "Spec Mixes"];

  return <SiteShell><div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
    <header className="flex items-end justify-between gap-8 border-b border-border pb-8">
      <div><p className="font-mono text-[10px] tracking-[0.24em] text-primary">SELECTED WORK / 2024—2026</p><h1 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">Credits</h1></div>
      <p className="hidden max-w-xs text-right text-sm leading-6 text-muted-foreground sm:block">Mixes made for detail, movement, and emotional clarity.</p>
    </header>
    <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-b border-border sm:gap-x-14">
      {tabs.map((tab) => <Button key={tab} variant="ghost" onClick={() => setFilter(tab)} className={`h-auto min-w-0 rounded-none px-0 py-5 text-[11px] shadow-none hover:bg-transparent sm:text-sm ${filter === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}><span className="relative inline-block">{tab}<span className={`absolute -bottom-5 left-0 h-0.5 w-full ${filter === tab ? "bg-primary" : "bg-transparent"}`} /></span></Button>)}
    </div>
    <section className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
      {visible.map((credit) => <Button key={credit.title} variant="ghost" onClick={() => setSelected(credit)} className="group relative aspect-square h-auto w-full overflow-hidden rounded-none p-0 shadow-none focus-visible:ring-2 focus-visible:ring-primary">
        <img src={credit.image} alt={`${credit.artist} — ${credit.title} cover`} width={1024} height={1024} loading={credit.title === "Blue Hour" ? "eager" : "lazy"} className="h-full w-full object-cover transition-[filter,transform] duration-300 group-hover:scale-[1.015] group-hover:brightness-[0.34]" />
        <span className="absolute inset-0 grid place-items-center bg-background/0 px-5 opacity-0 transition-all duration-300 group-hover:bg-background/35 group-hover:opacity-100 group-focus-visible:bg-background/35 group-focus-visible:opacity-100"><span className="text-center"><strong className="block font-display text-2xl font-semibold text-foreground">{credit.title}</strong><span className="mt-2 block font-mono text-[10px] tracking-[0.2em] text-foreground/75">{credit.artist.toUpperCase()}</span></span></span>
      </Button>)}
    </section>
  </div>
  <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>{selected && <DialogContent className="max-h-[94vh] w-[94vw] max-w-6xl overflow-y-auto border border-border bg-background p-0 shadow-none sm:rounded-none [&>button]:hidden">
    <div className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10"><div><p className="font-mono text-[10px] tracking-[0.22em] text-primary">{selected.artist.toUpperCase()}</p><DialogTitle className="mt-1 font-display text-2xl font-semibold">“{selected.title}”</DialogTitle></div><DialogClose asChild><Button variant="ghost" size="icon" className="rounded-none text-destructive" aria-label="Close record details"><X /></Button></DialogClose></div>
    <DialogDescription className="sr-only">Credit details for {selected.title} by {selected.artist}</DialogDescription>
    <div className="grid gap-10 px-6 py-9 sm:px-10 lg:grid-cols-[minmax(260px,0.75fr)_1.25fr] lg:gap-16 lg:py-12"><div><img src={selected.image} alt={`${selected.title} cover`} width={1024} height={1024} className="aspect-square w-full object-cover" /><div className="mt-5 flex flex-wrap gap-2">{selected.roles.map((role) => <span key={role} className="border border-primary px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] text-primary">{role.toUpperCase()}</span>)}</div></div>
      <div><p className="pl-6 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">SINGLE — {selected.year}</p><dl className="mt-8 border-t border-border">{[["LABEL", selected.label], ["STUDIO", selected.studio], ["ROLES", selected.roles.join(" / ")]].map(([term, value]) => <div key={term} className="grid grid-cols-[118px_1fr] items-baseline gap-4 border-b border-border py-[1.35rem] pl-6"><dt className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">{term}</dt><dd className="text-sm text-foreground/85">{value}</dd></div>)}</dl>
      <h2 className="mt-10 pl-6 font-display text-xl font-semibold">Tracklist</h2><ol className="mt-4 border-t border-border">{[selected.title, "Afterimage", "Half Awake", "Everything Stays"].map((track, index) => <li key={track} className="grid grid-cols-[2rem_minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-border py-[1.18rem] pl-6 text-sm"><span className="font-mono text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><span>{track}</span><span className="font-mono text-[10px] text-muted-foreground">{["3:42", "4:08", "3:19", "5:01"][index]}</span>{index !== 2 ? <span className="grid size-5 place-items-center bg-primary font-mono text-[9px] font-semibold text-primary-foreground">M</span> : <span className="size-5" />}</li>)}</ol>
      <div className="mt-9 flex flex-wrap gap-5 pl-6"><a href="https://music.apple.com" className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"><Music2 size={16}/> Apple Music</a><a href="https://spotify.com" className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"><Play size={16}/> Spotify</a><a href="https://youtube.com" className="inline-flex items-center gap-2 border-b border-destructive pb-1 text-sm text-destructive"><ExternalLink size={16}/> Video</a></div>
      <div className="mt-12 pl-6"><p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">MORE BY {selected.artist.toUpperCase()}</p><div className="mt-4 grid grid-cols-3 gap-4">{credits.filter((item) => item.title !== selected.title).slice(0,3).map((item) => <Button key={item.title} variant="ghost" onClick={() => setSelected(item)} className="aspect-square h-auto rounded-none p-0"><img src={item.image} alt={`${item.title} cover`} className="h-full w-full object-cover" loading="lazy" /></Button>)}</div></div>
      </div></div>
  </DialogContent>}</Dialog>
  </SiteShell>;
}
