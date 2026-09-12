import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [
    { title: "Book a Mix — RMN" },
    { name: "description", content: "Request a custom mixing quote from RMN for your single, EP, or album." },
    { property: "og:title", content: "Book a Mix — RMN" },
    { property: "og:description", content: "Tell RMN about your record and request a tailored mixing quote." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: BookingPage,
});

const control = "mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-0";

function BookingPage() {
  return <SiteShell><div className="mx-auto max-w-[1240px] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
    <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-2 lg:items-end"><div><p className="font-mono text-[10px] tracking-[0.24em] text-primary">BOOKING / 2026</p><h1 className="mt-4 font-display text-5xl font-semibold sm:text-7xl">Let’s make the record feel inevitable.</h1></div><p className="max-w-md text-base leading-7 text-muted-foreground lg:justify-self-end">Share the shape of your project. You’ll receive a tailored scope, timeline, and quote within two business days.</p></header>
    <form className="py-12" onSubmit={(event) => event.preventDefault()}><div className="grid gap-x-12 gap-y-9 md:grid-cols-2">
      <label className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">NAME<input required className={control} placeholder="Artist or contact name" /></label>
      <label className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">EMAIL<input required type="email" className={control} placeholder="you@email.com" /></label>
      <label className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">PROJECT TYPE<select className={control} defaultValue=""><option value="" disabled>Select one</option><option>Single</option><option>EP</option><option>Album</option></select></label>
      <label className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">NUMBER OF AUDIO STEMS<input type="number" min="1" className={control} placeholder="24" /></label>
      <label className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">TARGET DEADLINE<input type="date" className={control} /></label>
      <div className="hidden md:block" />
      <label className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground md:col-span-2">PROJECT NOTES & SONIC REFERENCE TRACKS<textarea rows={6} className={`${control} resize-none`} placeholder="Tell me about the songs, where they are now, and where you want them to go." /></label>
    </div><Button type="submit" className="mt-12 h-auto rounded-none bg-primary px-7 py-4 font-display text-sm font-semibold text-primary-foreground shadow-none hover:bg-primary/85">Request a Custom Mix Quote <ArrowUpRight /></Button></form>
  </div></SiteShell>;
}