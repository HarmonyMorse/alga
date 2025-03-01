import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alga</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
              <li><Link to="/login" className="hover:text-blue-300">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-300">Sign Up</Link></li>
              <li><Link to="/editor" className="hover:text-blue-300">Editor</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-slate-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Alga - A Drag and Drop Coding Challenge Platform</p>
        </div>
      </footer>
    </div>
  )
}

export default App
