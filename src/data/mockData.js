export const currentUser = {
  name: 'Isabelle K.',
  initials: 'IK'
}

export const actionMeta = {
  exchange: { label: 'Exchange', badge: 'badge-exchange' },
  donate: { label: 'Donate', badge: 'badge-donate' },
  sell: { label: 'Sell', badge: 'badge-sell' },
  recycle: { label: 'Recycle', badge: 'badge-recycle' }
}

export const categories = [
  { name: 'Clothing', count: 128 },
  { name: 'Furniture', count: 74 },
  { name: 'Electronics', count: 96 },
  { name: 'Books', count: 63 },
  { name: 'Household', count: 81 },
  { name: 'Kids & Toys', count: 42 },
  { name: 'Tools', count: 29 },
  { name: 'Garden', count: 18 },
  { name: 'Accessories', count: 35 },
  { name: 'Other', count: 21 }
]

export const items = [
  { id: 2, name: 'Black Jacket', category: 'Clothing', location: 'Huye', condition: 'Like New', action: 'exchange', posted: '5 hours ago', desc: 'Size M winter jacket, worn twice. Looking to exchange for a rain jacket or boots.' },
  { id: 3, name: 'School Books (P5 set)', category: 'Books', location: 'Musanze', condition: 'Good', action: 'donate', posted: '1 day ago', desc: 'Full set of primary 5 textbooks, would love these to go to a family who needs them.' },
  { id: 4, name: 'Laptop Stand', category: 'Household', location: 'Gasabo', condition: 'Good', action: 'sell', price: '15,000 RWF', posted: '3 days ago', desc: 'Adjustable aluminum laptop stand, works great, selling as I switched to a desk mount.' },
  { id: 5, name: 'Old Smartphone', category: 'Electronics', location: 'Kicukiro', condition: 'Needs Repair', action: 'recycle', price: '2,000 RWF', posted: '6 days ago', desc: 'Screen is cracked and it no longer holds charge well — better for parts or e-waste recycling.' },
  { id: 6, name: "Kids' Bicycle", category: 'Kids & Toys', location: 'Nyarugenge', condition: 'Good', action: 'exchange', posted: '4 days ago', desc: 'Outgrown bicycle, still rides well. Would exchange for a slightly bigger size.' },
  { id: 8, name: 'Garden Tool Set', category: 'Tools', location: 'Muhanga', condition: 'Good', action: 'sell', price: '8,000 RWF', posted: '2 days ago', desc: 'Hand trowel, shears, and gloves — barely used, great starter set.' }
]

export const impactStats = {
  itemsKeptInUse: 12540,
  itemsExchanged: 3820,
  itemsDonated: 2430,
  itemsRecycled: 1860,
  peopleParticipating: 5210
}

export const userImpact = {
  itemsExchanged: 3,
  itemsDonated: 2,
  itemsReused: 11
}

export const myListings = [
  { id: 102, name: 'Blender', action: 'exchange', status: 'Exchange Requested', date: 'Sep 2, 2026' },
  { id: 103, name: 'Winter Coats (3)', action: 'donate', status: 'Reserved', date: 'Aug 28, 2026' },
  { id: 104, name: 'Bookshelf', action: 'sell', status: 'Completed', date: 'Aug 20, 2026' }
]

export const receivedRequests = [
  { id: 1, text: 'Someone wants to exchange their headphones for your controller.', status: 'pending' },
  { id: 2, text: 'Someone requested to donate-adopt your Winter Coats.', status: 'pending' }
]

export const sentRequests = [
  { id: 1, item: 'Kids Bicycle', status: 'Accepted' },
  { id: 2, item: 'Laptop Stand', status: 'Pending' },
  { id: 3, item: 'Garden Tool Set', status: 'Declined' }
]

export const conversations = [
  { id: 1, name: 'Eric N.', item: 'Wooden Chair', preview: 'Is this still available?', time: '10:24 AM', unread: true },
  { id: 2, name: 'Aline U.', item: 'Black Jacket', preview: 'Can we arrange a pickup?', time: 'Yesterday', unread: false },
  { id: 3, name: 'Kevin M.', item: 'Laptop Stand', preview: 'Great, thank you!', time: 'Mon', unread: false }
]

export const messagesThread = [
  { from: 'them', text: 'Hi! Is this still available?' },
  { from: 'me', text: 'Yes it is! Still in good condition.' },
  { from: 'them', text: 'Can we arrange a pickup this weekend?' },
  { from: 'me', text: 'Sure, Saturday afternoon works for me.' }
]

export const notifications = [
  { id: 1, text: 'Someone saved your item "Wooden Chair".', time: '2h ago' },
  { id: 2, text: 'Someone requested your item "Winter Coats".', time: '5h ago' },
  { id: 3, text: 'Your exchange request for "Kids Bicycle" was accepted.', time: '1d ago' },
  { id: 4, text: 'Your item "Bookshelf" was marked as completed.', time: '2d ago' },
  { id: 5, text: 'New recommended item available in Furniture.', time: '3d ago' }
]

export const recyclingCategories = [
  { name: 'Electronics', note: 'Phones, laptops, chargers — use an authorized e-waste collection point.' },
  { name: 'Batteries', note: 'Never dispose of with regular waste — drop off at designated battery bins.' },
  { name: 'Small appliances', note: 'Kettles, irons, fans — check for local repair or e-waste programs first.' },
  { name: 'Large appliances', note: 'Fridges, washing machines — arrange collection through certified handlers.' },
  { name: 'Other materials', note: 'Metal, glass, and plastics can often be sold to local recyclers.' }
]

export const faqs = [
  { q: 'How do I post an item?', a: 'Tap "Post an Item" from the sidebar or Home page and follow the 6-step form: details, photos, condition, action, location, and any extra info.' },
  { q: 'How do exchanges work?', a: 'Propose what you would like in exchange, and the owner can accept or decline your request from their Exchange page.' },
  { q: 'How do I request an item?', a: 'Open any item and tap the action button — Request Item, Propose Exchange, Request Donation, or Contact Seller.' },
  { q: 'How do I report a listing?', a: 'On the item details page, use the Report button below the main actions.' },
  { q: 'How do I mark an item as completed?', a: 'From My Circlo, open the listing and mark it completed once the handover is done.' },
  { q: 'What should I do with electronics?', a: 'Check the Recycling page for guidance on responsible e-waste handling near you.' }
]

export const adminStats = {
  totalUsers: 4820,
  activeListings: 612,
  completedExchanges: 1904,
  donations: 2430,
  reports: 7
}

export const adminRecentListings = [
  { id: 2, name: 'Black Jacket', user: 'Aline U.', action: 'exchange', status: 'Pending' },
  { id: 3, name: 'Old Smartphone', user: 'Eric N.', action: 'recycle', status: 'Active' }
]

export const adminRecentUsers = [
  { id: 1, name: 'Isabelle K.', location: 'Kigali', joined: 'Sep 6, 2026' },
  { id: 2, name: 'Aline U.', location: 'Huye', joined: 'Sep 4, 2026' },
  { id: 3, name: 'Kevin M.', location: 'Musanze', joined: 'Sep 1, 2026' }
]

export const adminReports = [
  { id: 1, listing: 'Used Mattress', reason: 'Inappropriate photo', status: 'Open' },
  { id: 2, listing: 'Free Puppies', reason: 'Not a Circlo item', status: 'Open' }
]
