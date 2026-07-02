import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function TaskForm({ userId, onTaskAdded }) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setErrorMsg('Please enter a task title')
      return
    }

    setLoading(true)
    setErrorMsg('')

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: title.trim(), is_complete: false, user_id: userId }])
      .select()

    if (error) {
      console.error('Error adding task:', error.message)
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    setTitle('')
    onTaskAdded(data[0])
    setLoading(false)
  }

  return (
    <form onSubmit={handleAddTask} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-cyan-400/70"
        >
          {loading ? 'Adding...' : 'Add task'}
        </button>
      </div>
      {errorMsg && <p className="text-sm text-rose-400">{errorMsg}</p>}
    </form>
  )
}
