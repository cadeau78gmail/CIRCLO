import { useState } from 'react'
import { myListings, userImpact, receivedRequests, sentRequests } from '../data/mockData'
import { ActionBadge, StatusBadge } from '../components/Badges'

const tabs = ['Active', 'My Requests', 'Requests Received', 'Completed']

export default function MyReloop() {
  const [tab, setTab] = useState('My Requests')
  const [requestDecisions, setRequestDecisions] = useState({})

  const listings = tab === 'Completed' ? myListings.filter((listing) => listing.status === 'Completed') : myListings.filter((listing) => listing.status !== 'Completed')
  const requests = tab === 'My Requests' ? sentRequests : receivedRequests

  function decideRequest(requestId, decision) {
    setRequestDecisions((current) => ({ ...current, [requestId]: decision }))
  }

  return (
    <div className="my-reloop-page">
      <header className="my-reloop-header">
        <h1 className="page-title">My Circlo</h1>
        <p>Manage your listings, requests, and completed Circlo activity.</p>
      </header>

      <div className="my-reloop-summary" aria-label="Circlo activity summary">
        <SummaryMetric value={myListings.length} label="Active Listings" />
        <SummaryMetric value={userImpact.itemsExchanged} label="Items Exchanged" />
        <SummaryMetric value={userImpact.itemsDonated} label="Items Donated" />
      </div>

      <div className="my-reloop-tabs" role="tablist" aria-label="My Circlo views">
        {tabs.map((tabName) => <button key={tabName} type="button" role="tab" aria-selected={tab === tabName} className={tab === tabName ? 'is-active' : ''} onClick={() => setTab(tabName)}>{tabName}</button>)}
      </div>

      <div className="my-reloop-list">
        {tab === 'My Requests' && requests.map((request) => <RequestRow key={request.id} item={request.item} status={request.status} />)}
        {tab === 'Requests Received' && requests.map((request) => {
          const decision = requestDecisions[request.id]
          return <RequestRow key={request.id} item={request.text} status={decision || request.status} received onAccept={() => decideRequest(request.id, 'Accepted')} onDecline={() => decideRequest(request.id, 'Declined')} />
        })}
        {(tab === 'Active' || tab === 'Completed') && listings.map((listing) => <ListingRow key={listing.id} listing={listing} />)}
        {((tab === 'My Requests' || tab === 'Requests Received') ? requests.length : listings.length) === 0 && <EmptyTab tab={tab} />}
      </div>
    </div>
  )
}

function SummaryMetric({ value, label }) {
  return <div className="my-reloop-summary-metric"><strong>{value}</strong><span>{label}</span></div>
}

function RequestRow({ item, status, received, onAccept, onDecline }) {
  const displayStatus = status === 'pending' ? 'Pending' : status
  return (
    <div className="my-reloop-row">
      <div className="my-reloop-row-copy"><strong>{item}</strong><span>{received ? 'Request received for one of your listings' : 'Request sent by you'}</span></div>
      <div className="my-reloop-row-actions">
        {received ? <><button type="button" className="my-reloop-action accept" onClick={onAccept} disabled={status === 'Accepted' || status === 'Declined'}>{status === 'Accepted' ? 'Accepted' : 'Accept'}</button><button type="button" className="my-reloop-action" onClick={onDecline} disabled={status === 'Accepted' || status === 'Declined'}>{status === 'Declined' ? 'Declined' : 'Decline'}</button></> : <StatusBadge status={displayStatus} />}
      </div>
    </div>
  )
}

function ListingRow({ listing }) {
  return <div className="my-reloop-row"><div className="my-reloop-row-copy"><strong>{listing.name}</strong><span><ActionBadge action={listing.action} /> <em>{listing.date}</em></span></div><div className="my-reloop-row-actions"><StatusBadge status={listing.status} /><button type="button" className="my-reloop-view">View details →</button></div></div>
}

function EmptyTab({ tab }) {
  const title = tab === 'Active' ? 'No active listings' : tab === 'Completed' ? 'No completed activity' : 'No requests yet'
  const description = tab === 'Active' ? 'Your active Circlo listings will appear here.' : tab === 'Completed' ? 'Completed Circlo activity will appear here.' : 'Items you request will appear here.'
  return <div className="my-reloop-empty"><strong>{title}</strong><span>{description}</span></div>
}
