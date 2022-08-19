import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Calendar from './components/Calendar'
import './App.css'

function App() {


  return (
    <div className="App">
      <h1>Game Night!</h1>
      {/* for demo purposes */}
      <Calendar />
    </div>
  )
}

export default App
