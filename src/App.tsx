import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import { AppProvider } from './store/app'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppProvider>
  )
}
