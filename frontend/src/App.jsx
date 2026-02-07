import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  
  const API = import.meta.env.VITE_API_URL;

  const handlesubmit = async(e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg]) //functional state update to ensure we always have the latest state of messages when we add a new message. We take the previous state (prev) and spread it into a new array, then add the new user message at the end. This way, we maintain the entire conversation history in the messages state.

    /* 
    In your head, it should look like this:

    messages = [
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Hello!" }
]
      This message was sent by the USER, and this is what they said.(check in map function)
    */
    
    setLoading(true)
    setText('') 

    try {
      let response = await axios.post(`${API}/chat`, 
        { text: text },
        { 
          headers: {
            'Content-Type': 'application/json'
          } 
        }
      )
    
      const aiMsg = { role: 'assistant', content: response.data.reply }
      setMessages(prev => [...prev, aiMsg])
      
    } catch (error) {
      console.log("error", error)
      const errorMsg = { role: 'assistant', content: 'Sorry, something went wrong!' }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-white flex flex-col max-h-[70%] mx-auto ax-w-[70%] md:max-w-[70%] max-w-full mx-auto' style={{fontFamily: 'Styrene B, sans-serif'}} >
      
      <div className='border-b border-black p-4'>
        <h1 className='text-center text-2xl font-bold tracking-wide'>AI Chat</h1>
      </div>

      <div className='flex-1 overflow-y-auto p-4 max-w-3xl w-full mx-auto'>
        {messages.length === 0 ? ( //if there are no messages, show a placeholder
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-400 text-sm'>Start a conversation</p>
          </div>
        ) : ( //Else, show the messages
          <div className='space-y-6'>
            {messages.map((msg, index) => (
              /*
              Think of messages like this in your head:
                        [
                          { role: "user", content: "Hi" },
                          { role: "assistant", content: "Hello!" }
                        ]
              So, we loop through each message and display it. If the role is "user", we show "You" and if it's "assistant", we show "Assistant". The content is displayed as the message text. We also add some styling to differentiate between user and assistant messages.
              */
              <div key={index} className='space-y-2'>
                <p className='text-xs text-gray-500 uppercase tracking-wider'>
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                  {/*If msg.role is 'user', show You otherwise show Assistant” */}
                </p>
                <p className='text-gray-900 leading-relaxed whitespace-pre-wrap h-5'>
                  {msg.content}
                </p>
              </div>
            ))}
            {loading && ( // if loading is true show this.. below thing 
              <div className='space-y-2'>
                <p className='text-xs text-gray-500 uppercase tracking-wider'>Assistant</p>
                <div className='flex gap-1'>
                  <div className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0s'}}/>
                  <div className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.15s'}}/>
                  <div className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.3s'}}/>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className='border-t border-gray-800 p-4 bg-white'>
        <form onSubmit={handlesubmit} className='max-w-3xl mx-auto'>
          <div className='flex gap-3'>
            <input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Message...'
              disabled={loading}   //loading state turns true when we send a message and turns false when we get a response from the server. So, while waiting for the response, the input field is disabled to prevent multiple submissions.
              className='flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 disabled:bg-gray-50 disabled:text-gray-400'
            />
            <button
              type='submit' /* const [loading, setLoading] = useState(false)
                              // User clicks button
                              setLoading(true)           // Button becomes disabled
                              await axios.post(...)      // Waiting for AI response...
                              setLoading(false)          // Button becomes enabled again */

              disabled={loading || !text.trim()} //loadding state turns true when we send a message and turns false when we get a response from the server. So, while waiting for the response, the button is disabled to prevent multiple submissions. Additionally, the button is also disabled if the input field is empty or contains only whitespace.
              //button is disabled when loading is true & text is empty or contains only whitespace. This prevents users from sending multiple messages while waiting for a response and also prevents sending empty messages.
              /* 
              text = "     "
              text.trim() = ""
              !"" = true // empty → disable button

              text = "hello"
              text.trim() = "hello"
              !"hello" = false  // has text → enable button

              */
              className='px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors'
            >
              {loading ? '...' : 'Send'}
            </button>
{ /*

*/}
          </div>
        </form>
      </div>
    </div>
  )
}

export default App