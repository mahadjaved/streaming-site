import { useMemo, useState } from "react";

type StreamKey = "main" | "backup1" | "backup2";

const streamLabels: Record<StreamKey, string> = {
  main: "Main",
  backup1: "Backup 1",
  backup2: "Backup 2",
};

const streamOrder: StreamKey[] = ["main", "backup1", "backup2"];

export default function App() {
  const [activeStream, setActiveStream] = useState<StreamKey>("main");
  const [streamUrls, setStreamUrls] = useState<Record<StreamKey, string>>({
    main: "https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig",
    backup1: "https://www.youtube.com/embed/5qap5aO4i9A",
    backup2: "https://www.youtube.com/embed/jfKfPfyJRdk",
  });

  const activeUrl = useMemo(() => streamUrls[activeStream], [activeStream, streamUrls]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#11161B] to-[#536878] text-[#E5E4E2]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,228,226,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(83,104,120,0.35),transparent_30%)]" />

      <header className="sticky top-0 z-20 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
        <nav className="animate-fade-in rounded-2xl border border-[#E5E4E2]/25 bg-white/5 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold tracking-tight sm:text-xl">Live Match</p>
            <p className="text-xs text-[#E5E4E2]/70 sm:text-sm">FIFA World Cup Stream Hub</p>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
        <section className="space-y-3 text-center sm:space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">Watch Live. Switch Fast.</h1>
          <p className="mx-auto max-w-2xl text-sm text-[#E5E4E2]/78 sm:text-base">
            Select Main, Backup 1, or Backup 2 instantly. Paste your embed links below and stream directly here.
          </p>
        </section>

        <section className="rounded-2xl border border-[#E5E4E2]/20 bg-white/5 p-3 backdrop-blur-xl sm:p-4">
          <div className="mb-3 grid gap-2 sm:grid-cols-3">
            {streamOrder.map((key) => (
              <button
                key={key}
                onClick={() => setActiveStream(key)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-250 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5E4E2]/70 ${
                  activeStream === key
                    ? "border-[#E5E4E2]/70 bg-white/16 text-[#E5E4E2]"
                    : "border-[#E5E4E2]/25 bg-white/5 text-[#E5E4E2]/80"
                }`}
              >
                {streamLabels[key]}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-[#E5E4E2]/25 bg-black/45">
            <div className="aspect-video w-full animate-fade-in">
              <iframe
                key={activeStream}
                src={activeUrl}
                title={`${streamLabels[activeStream]} Stream`}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E5E4E2]/20 bg-white/5 p-3 backdrop-blur-xl sm:p-4">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-[#E5E4E2]/75">Stream Embed Links</h2>
          <div className="grid gap-3">
            {streamOrder.map((key) => (
              <label key={key} className="block text-xs text-[#E5E4E2]/70 sm:text-sm">
                {streamLabels[key]} URL
                <input
                  type="url"
                  value={streamUrls[key]}
                  onChange={(event) =>
                    setStreamUrls((prev) => ({
                      ...prev,
                      [key]: event.target.value,
                    }))
                  }
                  placeholder="https://example.com/embed/..."
                  className="mt-1 w-full rounded-lg border border-[#E5E4E2]/20 bg-black/25 px-3 py-2 text-xs text-[#E5E4E2] outline-none transition-colors duration-250 placeholder:text-[#E5E4E2]/40 focus:border-[#E5E4E2]/65 focus:bg-black/30 sm:text-sm"
                />
              </label>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
