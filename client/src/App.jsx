import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Rating } from '@material-tailwind/react'
import HoverRating from './components/HoverRating'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HoverRating/>
    </>
  )
}

export default App
