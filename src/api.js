
async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  if (!response.ok) {
    throw new Error('Something went wrong with the server.')
  }

  return response.json()
}

export function getListings() {
  return request('/api/listings')
}

export function createListing(listing) {
  return request('/api/listings', {
    method: 'POST',
    body: JSON.stringify(listing)
  })
}

export function askChatbot(question) {
  return request('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ question })
  })
}

export function getMessages() {
  return request('/api/messages')
}

export function sendMessage(message) {
  return request('/api/messages', {
    method: 'POST',
    body: JSON.stringify(message)
  })
}
