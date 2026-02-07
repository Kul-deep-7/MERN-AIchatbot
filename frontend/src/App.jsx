import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-center font-bold text-4xl'>Chatbot</h1>

      <div className='max-w-[1320px] mx-auto grid grid-cols-[30%_auto] gap-5 border-1'>
        <form action="" className='shadow-2xl p-3'>
          <textarea name="" id="" className='w-[100%] h-[200px] p-3 border-1'></textarea>
          <button className='bg-black text-white w-[100%] py-5 cursor-pointer'>Generate</button>
        </form>
        <div className='border-1 border-gray-200'>
            <div className='h-[300px] overflow-y-scroll'></div>
        </div>
      </div>
    </>
  )
}

export default App
