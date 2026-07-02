// Auth.jsx
// -----------------------------------------------------------------
// Yeh component Login aur Signup dono handle karta hai.
// React concept: "useState" ek hook hai jo component ke andar
// data (state) store karne deta hai. Jab state change hoti hai,
// React automatically UI ko re-render kar deta hai.
// -----------------------------------------------------------------

import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  // State variables: email aur password input fields ki current value
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false) // toggle: login vs signup
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Yeh function form submit hone par chalega
  const handleSubmit = async (e) => {
    e.preventDefault() // page reload rokta hai (default browser behaviour)
    setLoading(true)
    setErrorMsg('')

    // Supabase Authentication calls:
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) setErrorMsg(error.message)
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          // onChange: har keystroke par state update hoti hai (controlled input)
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
        {isSignUp
          ? 'Already have an account? Login'
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  )
}
