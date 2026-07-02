# Task Management App — React + Supabase

Ye guide step-by-step batati hai ke app kaise run karni hai, aur React/Supabase ke
basic concepts kaise kaam karte hain.

---

## 1. Supabase Project Banao

1. https://supabase.com par account banao aur **New Project** create karo.
2. Project bante hi Dashboard mein jao: **Project Settings → API**
   - Yahan se `Project URL` aur `anon public` key copy kar lo — ye baad mein chahiye hongi.

## 2. Database Table Banao

Supabase Dashboard mein **SQL Editor** open karo aur ye query run karo:

```sql
-- Tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  is_complete boolean default false,
  created_at timestamp with time zone default now()
);

-- Row Level Security (RLS) enable karo
-- Iska matlab: har user sirf apna khud ka data dekh/edit kar sakega
alter table tasks enable row level security;

-- Policy: user apne tasks select/insert/update/delete kar sake
create policy "Users can manage their own tasks"
on tasks for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

**Yeh kyun zaroori hai:** Supabase ki har table by default sabke liye open ho sakti
hai agar RLS na lagayi jaye. RLS policy lagane se guarantee hoti hai ke User A,
User B ke tasks kabhi nahi dekh sakta — chahe API request seedhi bhi bheje.

## 3. Environment Variables Set Karo

`.env.example` ko `.env` naam se copy karo aur apni values daal do:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxx
```

## 4. App Install aur Run Karo

```bash
npm install
npm run dev
```

Browser mein `http://localhost:5173` open hoga.

---

## Concepts Samjho (React + Supabase)

### React Side

| Concept | Kahan use hua | Matlab |
|---|---|---|
| `useState` | `Auth.jsx`, `App.jsx` | Component ke andar data (state) store karta hai. State change → UI re-render. |
| `useEffect` | `App.jsx` | Component load hone par ya kisi value ke change hone par side-effect chalata hai (yahan: session check, tasks fetch). |
| Props | `TaskForm`, `TaskList` | Parent component (`App.jsx`) se child components ko data/functions pass karna. |
| Controlled Inputs | `Auth.jsx`, `TaskForm.jsx` | Input field ki value React state se control hoti hai (`value={x}` + `onChange`). |
| Component Architecture | Poori app | Har cheez chhote, reusable components mein todi gayi hai: `Auth`, `TaskForm`, `TaskList`. |

### Supabase Side

| Operation | Function | File |
|---|---|---|
| **Create** | `supabase.from('tasks').insert([...])` | `TaskForm.jsx` |
| **Read** | `supabase.from('tasks').select('*')` | `App.jsx` (`fetchTasks`) |
| **Update** | `supabase.from('tasks').update({...}).eq('id', id)` | `TaskList.jsx` |
| **Delete** | `supabase.from('tasks').delete().eq('id', id)` | `TaskList.jsx` |
| **Auth** | `supabase.auth.signUp()` / `signInWithPassword()` / `signOut()` | `Auth.jsx`, `App.jsx` |

### Data Flow (Kaise sab connect hai)

1. User login/signup karta hai → `Auth.jsx` → Supabase Auth request bhejta hai.
2. `App.jsx` mein `useEffect` session detect karta hai → agar session mile to `fetchTasks()` chalta hai.
3. `fetchTasks()` Supabase se tasks laata hai aur `tasks` state mein daalta hai.
4. `tasks` state `TaskList.jsx` ko prop ke tor par milta hai → list render hoti hai.
5. Naya task add karo → `TaskForm.jsx` Supabase mein insert karta hai → `App.jsx` ki state update hoti hai (bina page reload ke).

---

## FYP/Portfolio ke liye Tip

Jab ye project resume ya interview mein discuss karo, in points par focus karo:
- **CRUD operations** Supabase ke through implement kiye.
- **Authentication** (signup/login/logout) Supabase Auth se secure kiya.
- **Row Level Security** use ki taake har user ka data isolated rahe.
- **React Hooks** (`useState`, `useEffect`) aur **component-based architecture** use ki.
