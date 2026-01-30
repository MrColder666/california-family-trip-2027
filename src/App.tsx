import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ItineraryPage from './pages/ItineraryPage'
import DestinationsPage from './pages/DestinationsPage'
import LogisticsPage from './pages/LogisticsPage'
import BudgetPage from './pages/BudgetPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="itinerary" element={<ItineraryPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="logistics" element={<LogisticsPage />} />
          <Route path="budget" element={<BudgetPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App