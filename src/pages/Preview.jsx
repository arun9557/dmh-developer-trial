import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Printer, ArrowLeft } from 'lucide-react'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'

const templateMap = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  'minimal-image': MinimalImageTemplate
}

const templateLabels = {
  classic: 'Classic',
  modern: 'Modern',
  minimal: 'Minimal',
  'minimal-image': 'Minimal Image'
}

const Preview = () => {
  const { resumeId } = useParams()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // Try loading from individual key first
    let data = null
    try {
      const individual = localStorage.getItem(`resume_${resumeId}`)
      if (individual) {
        data = JSON.parse(individual)
      }
    } catch {
      // ignore
    }

    // Fallback: search in all_resumes array
    if (!data) {
      try {
        const allRaw = localStorage.getItem('all_resumes')
        if (allRaw) {
          const all = JSON.parse(allRaw)
          if (Array.isArray(all)) {
            data = all.find((r) => r._id === resumeId) || null
          }
        }
      } catch {
        // ignore
      }
    }

    if (data) {
      setResume(data)
      setNotFound(false)
    } else {
      setNotFound(true)
    }
    setLoading(false)
  }, [resumeId])

  // Set page title to the resume owner's name
  useEffect(() => {
    if (resume?.personal_info?.full_name) {
      document.title = `${resume.personal_info.full_name} — Resume`
    } else if (resume?.title) {
      document.title = `${resume.title} — Resume`
    }
    return () => {
      document.title = 'Resume Builder'
    }
  }, [resume])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-10 h-10 border-3 border-yellow-500 border-t-transparent rounded-full animate-spin' />
          <p className='text-sm text-slate-400'>Loading resume...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <div className='text-center p-10'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center'>
            <span className='text-3xl'>📄</span>
          </div>
          <h1 className='text-2xl font-semibold text-slate-800 mb-2'>Resume not found</h1>
          <p className='text-slate-400 mb-6 max-w-sm mx-auto'>
            The resume you're looking for doesn't exist or may have been deleted.
          </p>
          <Link
            to='/app'
            className='inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-200'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const templateKey = resume.template || 'classic'
  const TemplateComponent = templateMap[templateKey] || ClassicTemplate
  const accentColor = resume.accent_color || '#F59E0B'

  return (
    <div className='min-h-screen bg-slate-100'>
      {/* Floating control bar — hidden during print */}
      <div className='print:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm'>
        <div className='max-w-[794px] mx-auto px-4 py-3 flex items-center justify-between'>
          <Link
            to='/app'
            className='flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition'
          >
            <ArrowLeft className='w-4 h-4' />
            <span className='hidden sm:inline'>Back to Dashboard</span>
          </Link>

          <div className='flex items-center gap-3'>
            <span className='hidden sm:inline-flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full'>
              {templateLabels[templateKey] || 'Classic'} Template
            </span>
            <button
              onClick={handlePrint}
              className='inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer'
            >
              <Printer className='w-4 h-4' />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Resume content — A4 width centered */}
      <div className='flex justify-center py-8 print:py-0'>
        <div className='w-full max-w-[794px] bg-white shadow-xl print:shadow-none'>
          <TemplateComponent data={resume} accentColor={accentColor} />
        </div>
      </div>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Preview