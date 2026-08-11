import { Navigate, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

import HomePage from './pages/HomePage'
import ChapterPage from './pages/ChapterPage'
import Chapter2Page from './pages/Chapter2Page'
import Chapter3Page from './pages/Chapter3Page'

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
        <Route path={routes.chapter2} element={<Chapter2Page />} />
        <Route path={routes.chapter3} element={<Chapter3Page />} />
        <Route path="*" element={<Navigate to={routes.home} replace />} />
      </Routes>
      <Footer />
    </>
  )
}
