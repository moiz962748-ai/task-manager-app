import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskForm from '../../components/TaskForm'
import TaskList from '../../components/TaskList'
import { supabase } from '../../supabaseClient'

export default function Dashboard({ session, onLogout }) {
  const [tasks, setTasks] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(true)
  const navigate = useNavigate()

  const userEmail = session?.user?.email || 'Member'

  const metrics = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.is_complete).length
    const pending = total - completed

    return { total, completed, pending }
  }, [tasks])

  const fetchTasks = async () => {
    setLoadingTasks(true)
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tasks:', error.message)
      setLoadingTasks(false)
      return
    }

    setTasks(data || [])
    setLoadingTasks(false)
  }

  useEffect(() => {
    if (session) fetchTasks()
  }, [session])

  const handleLogout = async () => {
    await onLogout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-white/10 bg-slate-900/70 p-6 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/20 text-lg font-semibold text-cyan-400">
              TF
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">TaskFlow</p>
              <p className="text-sm text-slate-400">Performance workspace</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="mt-1 truncate font-medium text-white">{userEmail}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-400">Good day</p>
                <h1 className="text-2xl font-semibold text-white">Your action center</h1>
                <p className="mt-1 text-sm text-slate-400">
                  Keep momentum on projects and finish what matters most.
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                <p className="font-medium">{metrics.pending} pending tasks</p>
                <p className="text-xs text-cyan-300/80">A steady pace keeps the week moving</p>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Total tasks</p>
              <p className="mt-2 text-3xl font-semibold text-white">{metrics.total}</p>
            </div>
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <p className="text-sm text-emerald-300">Completed</p>
              <p className="mt-2 text-3xl font-semibold text-white">{metrics.completed}</p>
            </div>
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-5">
              <p className="text-sm text-amber-300">Pending</p>
              <p className="mt-2 text-3xl font-semibold text-white">{metrics.pending}</p>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-xl shadow-cyan-950/20 sm:p-6">
            <TaskForm
              userId={session?.user?.id}
              onTaskAdded={(newTask) => setTasks([newTask, ...tasks])}
            />

            {loadingTasks ? (
              <div className="mt-6 flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 py-8 text-sm text-slate-400">
                Loading tasks...
              </div>
            ) : (
              <TaskList tasks={tasks} setTasks={setTasks} />
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
