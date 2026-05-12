import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import LandingPage from './pages/LandingPage'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import PeoplePage from './pages/PeoplePage'
import BlogsPage from './pages/BlogsPage'
import BlogPostPage from './pages/BlogPostPage'
import CommunitiesPage from './pages/CommunitiesPage'
import ResourcesPage from './pages/ResourcesPage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
      </Route>
    </Routes>
  )
}
