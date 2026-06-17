import React from 'react'
// ...existing code...
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Layout from './pages/Layout.jsx'
import Preview from './pages/Preview.jsx'
import ResumeBuild from './pages/ResumeBuild.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />         
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="resume-build" element={<ResumeBuild />} />
        <Route path="resume-build/:resumeId" element={<ResumeBuild />} />
        <Route path="builder" element={<ResumeBuild />} />
        <Route path="builder/:resumeId" element={<ResumeBuild />} />
      </Route>
      <Route path="view/:resumeId" element={<Preview />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<div className="flex items-center justify-center min-h-screen text-slate-600 bg-gray-50 flex-col gap-4 font-sans"><h1 className="text-3xl font-semibold">Page Not Found</h1><p>Sorry, the page you are looking for does not exist.</p><a href="/" className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">Go to Home</a></div>} /> 
    </Routes>
  )
}

export default App