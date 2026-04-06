import { injectMemory } from '../../../../lib/memory-injector'

const projects = [
  { name: 'Resumora', sessions: 28 },
  { name: 'TikTok', sessions: 28 },
  { name: 'AI Video Generator', sessions: 28 },
  { name: 'Elegancystart', sessions: 28 },
  { name: 'Global stock trade', sessions: 28 },
]

export default async function AdminProjectsPage() {
  await injectMemory('BossMind Shared Dashboard')

  return (
    <main className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
          BossMind Admin
        </h1>
        <p className="mt-2 text-2xl text-slate-600">AI Project Control Center</p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <section className="rounded-[28px] bg-white/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur">
            <h2 className="text-4xl font-bold text-slate-800">Projects</h2>

            <div className="mt-8 space-y-4">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between rounded-2xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-100"
                >
                  <span className="text-2xl font-semibold text-slate-700">
                    {project.name}
                  </span>
                  <span className="text-lg text-slate-500">
                    {project.sessions} sessions
                  </span>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-[28px] bg-white/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur">
            <h2 className="text-3xl font-bold text-slate-800">Memory Status</h2>

            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-emerald-500" />
                <span className="text-xl font-semibold text-slate-700">
                  Auto Injection Active
                </span>
              </div>

              <p className="mt-4 text-base leading-7 text-slate-500">
                BossMind shared dashboard memory injection is now triggered on page load.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}