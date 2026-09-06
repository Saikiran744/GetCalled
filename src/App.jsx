import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Homepage'
import Assessment from './Assessment'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
