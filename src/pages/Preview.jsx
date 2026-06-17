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
    let data = null
    try {
      const individual = localStorage.getItem(`resume_${resumeId}`)
      if (individual) {
        data = JSON.parse(individual)
      }
    } catch {
      // ignore
    }

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
      <div className='min-h-screen flex items-center justify-center liquid-bg'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-10 h-10 border-3 border-[#6fa37a] border-t-transparent rounded-full animate-spin' />
          <p className='text-sm text-[rgba(255,255,255,0.4)] font-mono'>Loading resume...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className='min-h-screen flex items-center justify-center liquid-bg'>
        <div className='text-center p-10 glass-soft rounded-[2rem] border border-[rgba(255,255,255,0.05)] shadow-2xl'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-2xl bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] flex items-center justify-center'>
            <span className='text-3xl opacity-80'>📄</span>
          </div>
          <h1 className='text-2xl font-bold text-white mb-2 font-grotesk tracking-wide'>Resume not found</h1>
          <p className='text-[rgba(255,255,255,0.4)] mb-8 max-w-sm mx-auto font-sans leading-relaxed'>
            The resume you're looking for doesn't exist or may have been deleted.
          </p>
          <Link
            to='/app'
            className='inline-flex items-center gap-2 bg-gradient-to-r from-[#6fa37a] to-[#3f6b54] text-white px-7 py-3.5 rounded-xl font-bold font-grotesk tracking-wide shadow-lg shadow-[#3f6b54]/30 hover:scale-105 transition-all duration-200 border border-[rgba(255,255,255,0.15)]'
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
  const accentColor = resume.accent_color || '#cd8a4b'

  return (
    <div className='min-h-screen liquid-bg'>
      {/* Floating control bar — hidden during print */}
      <div className='print:hidden sticky top-0 z-40 glass border-b border-[rgba(255,255,255,0.1)] shadow-sm'>
        <div className='max-w-[794px] mx-auto px-4 py-4 flex items-center justify-between'>
          <Link
            to='/app'
            className='flex items-center gap-2 text-sm text-[rgba(255,255,255,0.7)] hover:text-white transition font-medium font-sans'
          >
            <ArrowLeft className='w-4 h-4' />
            <span className='hidden sm:inline'>Back to Dashboard</span>
          </Link>

          <div className='flex items-center gap-4'>
            <span className='hidden sm:inline-flex items-center text-[11px] font-bold font-mono text-[#cd8a4b] bg-[rgba(205,138,75,0.1)] border border-[rgba(205,138,75,0.3)] px-3 py-1.5 rounded-full uppercase tracking-wider'>
              {templateLabels[templateKey] || 'Classic'} Template
            </span>
            <button
              onClick={handlePrint}
              className='inline-flex items-center gap-2 bg-gradient-to-r from-[#6fa37a] to-[#3f6b54] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(111,163,122,0.4)] transition-all duration-200 cursor-pointer border border-[rgba(255,255,255,0.2)] font-grotesk tracking-wide active:scale-95'
            >
              <Printer className='w-4 h-4' />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Resume content — A4 width centered. Background MUST be pure white for the resume rendering */}
      <div className='flex justify-center py-10 print:py-0'>
        <div className='w-full max-w-[794px] bg-white text-black shadow-2xl print:shadow-none min-h-[1123px] print-area border border-[rgba(255,255,255,0.1)] print:border-none'>
          <TemplateComponent data={resume} accentColor={accentColor} />
        </div>
      </div>
    </div>
  )
}

export default Preview