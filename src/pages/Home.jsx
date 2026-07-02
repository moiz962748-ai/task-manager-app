import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Secure Authentication',
    description: 'Protected sign-in flows with Supabase auth and a smooth account experience.',
  },
  {
    title: 'Live CRUD Workflow',
    description: 'Create, complete, and delete tasks instantly with polished interactions.',
  },
  {
    title: 'RLS Protected Data',
    description: 'Database access stays secure with Supabase Row Level Security policies.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-400">
              TF
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">TaskFlow</p>
              <p className="text-xs text-slate-400">Productivity, simplified</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Get Started
            </Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center py-14 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <section>
              <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
                Modern task management for focused teams
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Bring calm, clarity, and momentum to every workday.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                TaskFlow gives you a polished workspace for planning, tracking, and completing your priorities with secure authentication and real-time task management.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="rounded-2xl bg-cyan-500 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  Login
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Secure Auth</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Live CRUD</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Database RLS Security</span>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                <p className="text-sm font-medium text-cyan-300">Why teams love TaskFlow</p>
                <div className="mt-4 space-y-4">
                  {features.map((feature) => (
                    <div key={feature.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <h2 className="font-semibold text-white">{feature.title}</h2>
                      <p className="mt-1 text-sm text-slate-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
