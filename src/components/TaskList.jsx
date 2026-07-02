import { supabase } from '../supabaseClient'

export default function TaskList({ tasks, setTasks }) {
  const toggleComplete = async (task) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_complete: !task.is_complete })
      .eq('id', task.id)
      .select()

    if (error) {
      console.error('Error updating task:', error.message)
      return
    }

    setTasks(tasks.map((t) => (t.id === task.id ? data[0] : t)))
  }

  const deleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id)

    if (error) {
      console.error('Error deleting task:', error.message)
      return
    }

    setTasks(tasks.filter((t) => t.id !== id))
  }

  if (tasks.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-950/40 py-10 text-center text-sm text-slate-400">
        No tasks yet. Add one above to begin your workflow.
      </div>
    )
  }

  return (
    <ul className="mt-6 space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between rounded-2xl border p-4 transition ${
            task.is_complete
              ? 'border-emerald-500/20 bg-emerald-500/10'
              : 'border-white/10 bg-slate-950/60 hover:border-cyan-400/40 hover:bg-slate-800/70'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleComplete(task)}
              aria-label={task.is_complete ? 'Mark as pending' : 'Mark as complete'}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                task.is_complete
                  ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                  : 'border-white/10 bg-slate-900/60 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-300'
              }`}
            >
              {task.is_complete ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M5 12.5 9.5 17 19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <circle cx="12" cy="12" r="8" />
                </svg>
              )}
            </button>

            <div>
              <p className={`font-medium ${task.is_complete ? 'text-emerald-300 line-through' : 'text-slate-100'}`}>
                {task.title}
              </p>
              <p className="text-xs text-slate-500">{task.is_complete ? 'Completed' : 'Pending'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => deleteTask(task.id)}
            aria-label="Delete task"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-400 transition hover:border-rose-400/40 hover:text-rose-300"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M4 7h16M9 7V4h6v3m-8 0 1 13h10l1-13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}
