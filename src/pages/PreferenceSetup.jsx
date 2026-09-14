import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'

const interestOptions = ['Clothing', 'Electronics', 'Furniture', 'Books', 'Household', 'Kids & Toys', 'Tools', 'Accessories', 'Garden']
const goalOptions = ['Find free items', 'Exchange items', 'Buy second-hand items', 'Donate items', 'Find recyclable items']

export default function PreferenceSetup() {
  const [interests, setInterests] = useState([])
  const [goals, setGoals] = useState([])
  const navigate = useNavigate()

  function toggle(list, setList, value) {
    const withoutAll = list.filter((item) => item !== 'All')
    setList(withoutAll.includes(value) ? withoutAll.filter((item) => item !== value) : [...withoutAll, value])
  }

  function toggleAll(list, setList) {
    setList(list.includes('All') ? [] : ['All'])
  }

  return (
    <AuthShell variant="preferences" title="What are you interested in?" sub="This helps us personalize your Home page.">
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Categories</p>
      <div className="pill-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        <button
          type="button"
          className={'pill-filter' + (interests.includes('All') ? ' active' : '')}
          onClick={() => toggleAll(interests, setInterests)}
        >
          All
        </button>
        {interestOptions.map((i) => (
          <button
            key={i}
            type="button"
            className={'pill-filter' + (interests.includes(i) ? ' active' : '')}
            onClick={() => toggle(interests, setInterests, i)}
          >
            {i}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>What would you like to do on Circlo?</p>
      <div className="pill-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <button
          type="button"
          className={'pill-filter' + (goals.includes('All') ? ' active' : '')}
          onClick={() => toggleAll(goals, setGoals)}
        >
          All
        </button>
        {goalOptions.map((g) => (
          <button
            key={g}
            type="button"
            className={'pill-filter' + (goals.includes(g) ? ' active' : '')}
            onClick={() => toggle(goals, setGoals, g)}
          >
            {g}
          </button>
        ))}
      </div>

      <button className="btn btn-primary btn-block" onClick={() => navigate('/app/home')}>
        Continue to Circlo
      </button>
    </AuthShell>
  )
}
