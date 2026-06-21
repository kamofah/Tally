
import './App.css'
import Home from './pages/Home'
import Game from './pages/Game'
import { Routes, Route } from 'react-router'
import Login from './pages/Login'


function App() {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
