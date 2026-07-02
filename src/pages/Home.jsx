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

const previewTasks = [
  { title: '🎯 Deploy TaskFlow to Vercel', completed: true },
  { title: '💻 Implement Row Level Security', completed: false },
  { title: '📝 Review onboarding copy', completed: false },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-5 sm:py-6 lg:px-8">
        <header className="flex flex-col items-start gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-400">
              TF
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">TaskFlow</p>
              <p className="text-xs text-slate-400">Productivity, simplified</p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <Link
              to="/login"
              className="flex w-full items-center justify-center rounded-full border border-white/10 px-4 py-2 text-center text-sm font-medium text-slate-200 transition hover:bg-white/10 sm:w-auto"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex w-full items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
            >
              Get Started
            </Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center gap-8 py-8 sm:py-12 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
                Modern task management for focused teams
              </div>

              <h1 className="mt-6 text-[2.1rem] font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Bring calm, clarity, and momentum to every workday.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                TaskFlow gives you a polished workspace for planning, tracking, and completing your priorities with secure authentication and real-time task management.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="w-full rounded-2xl bg-cyan-500 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center font-semibold text-slate-200 transition hover:bg-white/10 sm:w-auto"
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

          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-300">Live workspace preview</p>
                <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                  A calm dashboard for focused execution.
                </h2>
              </div>
              <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                Real-time task tracking
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/70 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Today’s board</p>
                  <p className="text-xs text-slate-400">A quick peek at the experience inside the app</p>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  2 completed
                </div>
              </div>

              <div className="space-y-3">
                {previewTasks.map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3 sm:px-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          task.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-cyan-500/10 text-cyan-300'
                        }`}
                      >
                        {task.completed ? '✓' : '•'}
                      </div>
                      <p className={`text-sm ${task.completed ? 'text-slate-300 line-through' : 'text-slate-100'}`}>
                        {task.title}
                      </p>
                    </div>
                    <span className={`text-xs ${task.completed ? 'text-emerald-300' : 'text-slate-400'}`}>
                      {task.completed ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TaskFlow. All rights reserved.</p>
          <p className="text-slate-600">Built with React • Supabase • Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}
