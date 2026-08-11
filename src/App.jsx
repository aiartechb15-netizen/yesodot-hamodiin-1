import { Navigate, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

import HomePage from './pages/HomePage'
import ChapterPage from './pages/ChapterPage'

import { routes } from './data/chapter1'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        דילוג לתוכן הראשי
      </a>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.chapter1} element={<ChapterPage />} />
        <Route path="*" element={<Navigate to={routes.home} replace />} />
      </Routes>
      <Footer />
    </>
  )
}
