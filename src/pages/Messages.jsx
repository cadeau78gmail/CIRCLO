import { useMemo, useState } from 'react'
import { conversations, messagesThread } from '../data/mockData'

const initialMessages = messagesThread.map((message, index) => ({
  id: index + 1,
  ...message,
  time: ['10:18 AM', '10:20 AM', '10:22 AM', '10:24 AM'][index] || '10:24 AM',
  seen: message.from === 'me'
}))

export default function Messages() {
  const [active, setActive] = useState(conversations[0])
  const [search, setSearch] = useState('')
  const [messageMap, setMessageMap] = useState({ [conversations[0].id]: initialMessages })
  const [draft, setDraft] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [sendConfirmed, setSendConfirmed] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return conversations
    return conversations.filter((conversation) => `${conversation.name} ${conversation.item}`.toLowerCase().includes(query))
  }, [search])

  const messages = messageMap[active.id] || initialMessages

  function updateMessages(update) {
    setMessageMap((current) => ({ ...current, [active.id]: update(current[active.id] || initialMessages) }))
  }

  function submitMessage(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    if (editingId) {
      updateMessages((current) => current.map((message) => message.id === editingId ? { ...message, text, edited: true } : message))
      setEditingId(null)
    } else {
      updateMessages((current) => [...current, { id: Date.now(), from: 'me', text, time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), seen: false, replyTo: replyTo?.text || null }])
    }
    setDraft('')
    setReplyTo(null)
    setSendConfirmed(true)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Messages</h1>
      </div>

      <div className={'messages-shell' + (showChat ? ' show-chat' : '')}>
        <aside className="messages-sidebar">
          <div className="messages-search">
            <input className="input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search people..." aria-label="Search people" />
          </div>
          {filteredConversations.map((c) => (
            <button
              key={c.id}
              onClick={() => { setActive(c); setShowChat(true) }}
              className={'conversation-row' + (active.id === c.id ? ' active' : '')}
            >
              <span className="conversation-avatar">{c.name.split(' ').map((part) => part[0]).join('')}</span>
              <span className="conversation-content">
                <span className="row-between">
                  <strong>{c.name}</strong>
                  <small>{c.time}</small>
                </span>
                <span className="conversation-item">{c.item}</span>
                <span className="conversation-preview">{c.preview}</span>
              </span>
            </button>
          ))}
          {filteredConversations.length === 0 && <p className="muted messages-empty">No people found.</p>}
        </aside>

        <section className="messages-thread">
          <div className="messages-context">
            <button type="button" className="messages-back" onClick={() => setShowChat(false)}>← Conversations</button>
            <p className="muted" style={{ margin: 0 }}>Item context</p>
            <p className="messages-item-title">{active.item}</p>
          </div>
          <div className="messages-list">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} onReply={() => { setReplyTo(message); setEditingId(null) }} onEdit={() => { setEditingId(message.id); setDraft(message.text); setReplyTo(null) }} onDelete={() => updateMessages((current) => current.filter((item) => item.id !== message.id))} />
            ))}
          </div>
          <form className="message-composer" onSubmit={submitMessage}>
            {replyTo && <div className="reply-preview"><span>Replying to: {replyTo.text}</span><button type="button" onClick={() => setReplyTo(null)} aria-label="Cancel reply">×</button></div>}
            {editingId && <div className="reply-preview"><span>Editing message</span><button type="button" onClick={() => { setEditingId(null); setDraft('') }} aria-label="Cancel editing">×</button></div>}
            <div className="row gap-8">
              <input className="input" value={draft} onChange={(event) => { setDraft(event.target.value); setSendConfirmed(false) }} placeholder="Type a message..." aria-label="Message" />
              <button className="btn btn-primary" type="submit">{editingId ? 'Save' : sendConfirmed ? 'Sent' : 'Send'}</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

function MessageBubble({ message, onReply, onEdit, onDelete }) {
  return (
    <div className={'message-row' + (message.from === 'me' ? ' mine' : '')}>
      <div className={'message-bubble' + (message.from === 'me' ? ' mine' : '')}>
        {message.replyTo && <p className="message-reply-context">Replying to: {message.replyTo}</p>}
        <p style={{ margin: 0 }}>{message.text}</p>
        <div className="message-meta"><span>{message.time}{message.edited ? ' · edited' : ''}</span>{message.from === 'me' && <span>{message.seen ? 'Seen' : 'Sent'}</span>}</div>
      </div>
      <div className="message-actions">
        <button type="button" onClick={onReply}>Reply</button>
        {message.from === 'me' && <button type="button" onClick={onEdit}>Edit</button>}
        {message.from === 'me' && <button type="button" onClick={onDelete}>Delete</button>}
      </div>
    </div>
  )
}
