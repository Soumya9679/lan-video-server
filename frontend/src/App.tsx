import { useEffect, useState } from "react";
import {
  Activity,
  Clapperboard,
  HardDrive,
  Home,
  Library,
  Search,
  Settings,
  Wifi,
  WifiOff,
} from "lucide-react";

interface HealthResponse {
  status: string;
  application: string;
  version: string;
}

function App() {
  const [server, setServer] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkServer() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/health");

        if (!response.ok) {
          throw new Error(`Server returned HTTP ${response.status}`);
        }

        const data: HealthResponse = await response.json();

        if (!cancelled) {
          setServer(data);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("Cannot connect to the Python backend.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    checkServer();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-zinc-900/60 p-6 md:block">
          <div className="mb-12 flex items-center gap-3">
            <div className="rounded-xl bg-violet-600 p-2">
              <Clapperboard size={24} />
            </div>

            <div>
              <h1 className="text-lg font-bold">LAN Video</h1>
              <p className="text-xs text-zinc-500">Personal Media Server</p>
            </div>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Workspace
          </p>

          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl bg-violet-600/15 px-4 py-3 text-left text-violet-300">
              <Home size={19} />
              Dashboard
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-400 transition hover:bg-white/5 hover:text-white">
              <Library size={19} />
              My Library
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-400 transition hover:bg-white/5 hover:text-white">
              <Activity size={19} />
              Activity
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-400 transition hover:bg-white/5 hover:text-white">
              <Settings size={19} />
              Settings
            </button>
          </nav>

          <div className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 p-4">
            <div className="mb-2 flex items-center gap-2">
              {server ? (
                <Wifi size={17} className="text-emerald-400" />
              ) : (
                <WifiOff size={17} className="text-red-400" />
              )}

              <span className="text-sm font-medium">Backend status</span>
            </div>

            <p className="text-xs text-zinc-500">
              {loading
                ? "Checking connection..."
                : server
                  ? "Connected to FastAPI"
                  : "Backend unavailable"}
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <header className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-zinc-500">YOUR PERSONAL SPACE</p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Media Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 sm:w-72">
              <Search size={18} className="shrink-0 text-zinc-500" />

              <input
                type="search"
                placeholder="Search your library..."
                aria-label="Search your library"
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
              />
            </div>
          </header>

          <div className="space-y-8 p-5 sm:p-8">
            {/* Welcome banner */}
            <section className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950 via-zinc-900 to-zinc-950 p-6 sm:p-10">
              <div className="relative z-10 max-w-2xl">
                <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-300">
                  PERSONAL MEDIA CENTER
                </span>

                <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Your videos.
                  <br />
                  Your space.
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base">
                  A private media library hosted on your PC, ready to stream
                  across your local network.
                </p>

                <div className="mt-7 flex items-center gap-2 text-sm">
                  {loading ? (
                    <span className="text-amber-300">
                      Connecting to backend...
                    </span>
                  ) : server ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-emerald-300">
                        Server is online
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      <span className="text-red-300">
                        Server connection failed
                      </span>
                    </>
                  )}
                </div>
              </div>

              <Clapperboard
                size={220}
                strokeWidth={0.7}
                className="absolute -bottom-12 -right-10 hidden rotate-12 text-white/[0.04] sm:block"
              />
            </section>

            {/* Status cards */}
            <section>
              <h3 className="mb-4 text-lg font-semibold">System Overview</h3>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm text-zinc-400">
                      Backend Status
                    </span>

                    <Activity className="text-violet-400" size={21} />
                  </div>

                  <p className="text-2xl font-bold">
                    {loading ? "Checking..." : server ? "Online" : "Offline"}
                  </p>

                  <p className="mt-2 text-xs text-zinc-500">
                    {error ?? (server ? server.application : "Waiting for API")}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm text-zinc-400">
                      Video Library
                    </span>

                    <Library className="text-sky-400" size={21} />
                  </div>

                  <p className="text-2xl font-bold">Not configured</p>

                  <p className="mt-2 text-xs text-zinc-500">
                    Library scanning comes in the next stage.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 sm:col-span-2 xl:col-span-1">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm text-zinc-400">
                      Storage
                    </span>

                    <HardDrive className="text-amber-400" size={21} />
                  </div>

                  <p className="text-2xl font-bold">Not measured</p>

                  <p className="mt-2 text-xs text-zinc-500">
                    Storage statistics will be added later.
                  </p>
                </div>
              </div>
            </section>

            {/* Library placeholder */}
            <section className="rounded-2xl border border-dashed border-white/15 bg-zinc-900/30 px-5 py-12 text-center sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                <Clapperboard size={26} className="text-zinc-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Your library starts here
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                We haven't connected your video folder yet. In the next stage,
                we'll build the Python library scanner and display your actual
                videos here.
              </p>
            </section>

            {/* API information */}
            {server && (
              <footer className="border-t border-white/10 pt-5 text-xs text-zinc-500">
                {server.application} · Version {server.version} · API connected
              </footer>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;