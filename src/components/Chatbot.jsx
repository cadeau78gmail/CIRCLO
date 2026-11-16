
import { useState } from 'react'
import { askChatbot } from '../api'
import './Chatbot.css'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hello! Welcome to CIRCLO. How can I help you today?'
    }
  ])
  const [loading, setLoading] = useState(false)

  async function sendQuestion(event) {
    event.preventDefault()

    const text = question.trim()
    if (!text || loading) return

    setMessages(current => [
      ...current,
      { from: 'user', text }
    ])

    setQuestion('')
    setLoading(true)

    try {
      const result = await askChatbot(text)

      setMessages(current => [
        ...current,
        { from: 'bot', text: result.answer }
      ])
    } catch (error) {
      setMessages(current => [
        ...current,
        {
          from: 'bot',
          text: 'Sorry, I cannot connect to the server right now.'
        }
      ])
    }

    setLoading(false)
  }

  return (
    <div className="chatbot">
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close Chat' : 'Chat with CIRCLO'}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <strong>CIRCLO Assistant</strong>
            <span>Here to help you</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={'chat-message ' + message.from}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="chat-message bot">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={sendQuestion}>
            <input
              value={question}
              onChange={event => setQuestion(event.target.value)}
              placeholder="Ask something..."
            />

            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
