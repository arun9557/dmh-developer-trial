import React, { useState, useEffect } from 'react'
import { FileText, Pencil, Plus, Trash2, UploadCloud, X, ExternalLink } from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'all_resumes'

const loadResumes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

const saveResumes = (resumes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes))
}

const Dashboard = () => {
  const colors = ['#6fa37a', '#cd8a4b', '#3f6b54', '#a86930', '#86b696', '#df9e61']
  const navigate = useNavigate()

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [editResumeId, setEditResumeId] = useState(null)

  // Upload modal state
  const [uploadFile, setUploadFile] = useState(null)
  const [uploadFileName, setUploadFileName] = useState('')
  const [uploadTitle, setUploadTitle] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    const stored = loadResumes()
    if (stored && stored.length > 0) {
      setAllResumes(stored)
    } else {
      setAllResumes(dummyResumeData)
      saveResumes(dummyResumeData)
      dummyResumeData.forEach((r) => {
        localStorage.setItem(`resume_${r._id}`, JSON.stringify(r))
      })
    }
  }, [])

  useEffect(() => {
    if (allResumes.length > 0) {
      saveResumes(allResumes)
    }
  }, [allResumes])

  const handleCreate = (e) => {
    e.preventDefault()

    if (editResumeId) {
      setAllResumes((prev) => {
        const updated = prev.map((r) =>
          r._id === editResumeId
            ? { ...r, title: title || r.title, updatedAt: new Date().toISOString() }
            : r
        )
        const found = updated.find((r) => r._id === editResumeId)
        if (found) {
          localStorage.setItem(`resume_${editResumeId}`, JSON.stringify(found))
        }
        return updated
      })
      setEditResumeId(null)
      setTitle('')
      setShowCreateResume(false)
      return
    }

    const newResume = {
      _id: String(Date.now()),
      title: title || 'Untitled Resume',
      template: 'classic',
      accent_color: colors[Math.floor(Math.random() * colors.length)],
      personal_info: {
        full_name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: '',
        profession: '',
        image: ''
      },
      professional_summary: '',
      skills: [],
      experience: [],
      education: [],
      project: [],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }

    localStorage.setItem(`resume_${newResume._id}`, JSON.stringify(newResume))
    setAllResumes((prev) => [newResume, ...prev])
    setTitle('')
    setShowCreateResume(false)
    navigate(`/app/builder/${newResume._id}`)
  }

  const handleDelete = (resume) => {
    if (confirm(`Delete "${resume.title}"?`)) {
      setAllResumes((prev) => {
        const filtered = prev.filter((r) => r._id !== resume._id)
        saveResumes(filtered)
        return filtered
      })
      localStorage.removeItem(`resume_${resume._id}`)
    }
  }

  const handleFileSelect = async (file) => {
    setUploadError('')
    setUploadFile(file)
    setUploadFileName(file.name)
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        setUploadTitle(parsed.title || parsed.personal_info?.full_name || '')
      }
    } catch {
      // ignore
    }
  }

  const handleFileInputChange = (e) => {
    const f = e.target.files?.[0]
    if (f) handleFileSelect(f)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }
  const handleDragLeave = () => setDragActive(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFileSelect(f)
  }

  const handleUploadSubmit = async () => {
    if (!uploadFile) {
      setUploadError('Please select a file to upload')
      return
    }
    try {
      const text = await uploadFile.text()
      const parsed = JSON.parse(text)
      let newItems = []
      if (Array.isArray(parsed)) {
        newItems = parsed.map((p, i) => ({
          ...p,
          _id: p._id || String(Date.now() + i),
          title: uploadTitle || p.title || p.personal_info?.full_name || 'Untitled'
        }))
      } else if (parsed && typeof parsed === 'object') {
        const item = {
          ...parsed,
          _id: parsed._id || String(Date.now()),
          title: uploadTitle || parsed.title || parsed.personal_info?.full_name || 'Untitled'
        }
        newItems = [item]
      } else {
        setUploadError('Uploaded file did not contain a valid resume object')
        return
      }

      newItems.forEach((item) => {
        localStorage.setItem(`resume_${item._id}`, JSON.stringify(item))
      })

      setAllResumes((prev) => [...newItems, ...prev])
      setShowUploadResume(false)
      setUploadFile(null)
      setUploadFileName('')
      setUploadTitle('')
      navigate(`/app/builder/${newItems[0]._id}`)
    } catch {
      setUploadError('Could not parse JSON file')
    }
  }

  return (
    <div className='min-h-screen liquid-bg relative'>
      <div className='max-w-7xl mx-auto px-4 py-12 relative z-10'>

        {/* Welcome glassmorphic card */}
        <div className='mb-10 p-6 rounded-3xl glass border border-[rgba(205,138,75,0.2)] shadow-2xl relative overflow-hidden'>
          <div className="absolute right-0 top-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(205,138,75,0.15)_0%,transparent_70%)] pointer-events-none"></div>
          <p className='text-sm text-[rgba(255,255,255,0.6)] font-mono tracking-wide'>Welcome back,</p>
          <h1 className='text-3xl font-bold text-mossamber font-grotesk tracking-tight mt-1'>
            Arun Pratap Singh
          </h1>
          <p className='text-[13px] text-[rgba(255,255,255,0.4)] mt-2 font-mono'>b24bs2044@iitj.ac.in</p>
        </div>

        {/* Gradient heading */}
        <h2 className='text-xl font-bold mb-6 text-white font-grotesk tracking-wide'>
          My Resumes
        </h2>

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row gap-5 mb-8'>
          <button
            onClick={() => setShowCreateResume(true)}
            className='w-full sm:max-w-[180px] h-48 flex flex-col items-center justify-center rounded-[1.25rem] gap-4 text-[rgba(255,255,255,0.7)] border border-dashed border-[rgba(111,163,122,0.4)] glass-soft group hover:border-[#6fa37a] hover:bg-[rgba(111,163,122,0.08)] hover:shadow-[0_0_20px_rgba(111,163,122,0.15)] transition-all duration-300 cursor-pointer'
          >
            <div className='p-3 bg-[rgba(111,163,122,0.15)] rounded-full group-hover:bg-[#6fa37a] group-hover:scale-110 transition-all duration-300 border border-[rgba(111,163,122,0.3)]'>
              <Plus className='w-8 h-8 text-[#6fa37a] group-hover:text-white transition-colors' />
            </div>
            <p className='text-[14px] font-bold font-grotesk tracking-wide text-white'>Create Resume</p>
          </button>
          
          <button
            onClick={() => setShowUploadResume(true)}
            className='w-full sm:max-w-[180px] h-48 flex flex-col items-center justify-center rounded-[1.25rem] gap-4 text-[rgba(255,255,255,0.7)] border border-dashed border-[rgba(205,138,75,0.4)] glass-soft group hover:border-[#cd8a4b] hover:bg-[rgba(205,138,75,0.08)] hover:shadow-[0_0_20px_rgba(205,138,75,0.15)] transition-all duration-300 cursor-pointer'
          >
            <div className='p-3 bg-[rgba(205,138,75,0.15)] rounded-full group-hover:bg-[#cd8a4b] group-hover:scale-110 transition-all duration-300 border border-[rgba(205,138,75,0.3)]'>
              <UploadCloud className='w-8 h-8 text-[#cd8a4b] group-hover:text-white transition-colors' />
            </div>
            <p className='text-[14px] font-bold font-grotesk tracking-wide text-white'>Upload JSON</p>
          </button>
        </div>

        <div className='h-px w-full bg-[rgba(255,255,255,0.08)] my-8' />

        {/* Resume grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {allResumes.map((resume, idx) => {
            const baseColor = resume.accent_color || colors[idx % colors.length]
            return (
              <article
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/app/builder/${resume._id}`)
                }}
                className='relative group w-full h-48 flex flex-col items-start justify-between rounded-[1.25rem] p-5 border border-[rgba(255,255,255,0.1)] glass-soft hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-[#6fa37a]/50 hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer overflow-hidden'
              >
                <div className='absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none' style={{ background: baseColor }}></div>
                
                <div className='flex items-center gap-4 w-full z-10'>
                  <div className='p-3 rounded-2xl shrink-0 shadow-inner' style={{ backgroundColor: baseColor }}>
                    <FileText className='w-6 h-6 text-[#0a0a1a]' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-[15px] font-bold truncate font-grotesk tracking-wide text-white'>
                      {resume.title}
                    </p>
                    <p className='text-[11px] text-[rgba(255,255,255,0.4)] mt-1 font-mono tracking-wide'>
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className='flex gap-2 self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10'
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type='button'
                    aria-label='edit'
                    className='p-2 rounded-xl text-[rgba(255,255,255,0.6)] hover:text-white hover:bg-[rgba(111,163,122,0.3)] transition border border-transparent hover:border-[rgba(111,163,122,0.4)]'
                    onClick={() => {
                      setEditResumeId(resume._id)
                      setTitle(resume.title)
                      setShowCreateResume(true)
                    }}
                  >
                    <Pencil className='w-4 h-4' />
                  </button>
                  <button
                    type='button'
                    aria-label='delete'
                    className='p-2 rounded-xl text-[rgba(255,255,255,0.6)] hover:text-[#fb7185] hover:bg-[rgba(244,63,94,0.15)] transition border border-transparent hover:border-[rgba(244,63,94,0.3)]'
                    onClick={() => handleDelete(resume)}
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {allResumes.length === 0 && (
          <div className='text-center py-24 glass-soft rounded-[2rem] border border-[rgba(255,255,255,0.05)] mt-8'>
            <FileText className='w-16 h-16 text-[rgba(255,255,255,0.15)] mx-auto mb-5' />
            <p className='text-[rgba(255,255,255,0.8)] text-xl font-bold font-grotesk tracking-wide'>No resumes yet</p>
            <p className='text-[rgba(255,255,255,0.4)] text-sm mt-2 font-sans'>Create one or upload an existing resume to get started.</p>
          </div>
        )}
      </div>

      {/* Create / Rename Resume Modal */}
      {showCreateResume && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a1a]/80 backdrop-blur-md px-4'>
          <div className='glass rounded-[2rem] p-8 w-full max-w-md relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[rgba(111,163,122,0.3)]'>
            <button
              aria-label='close'
              type='button'
              className='absolute top-5 right-5 text-[rgba(255,255,255,0.4)] hover:text-white transition bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] p-1.5 rounded-full'
              onClick={() => {
                setShowCreateResume(false)
                setTitle('')
                setEditResumeId(null)
              }}
            >
              <X className='w-5 h-5' />
            </button>
            <h2 className='text-2xl font-bold mb-2 text-white font-grotesk tracking-tight'>
              {editResumeId ? 'Rename Resume' : 'New Resume'}
            </h2>
            <p className='text-sm text-[rgba(255,255,255,0.5)] mb-6 font-sans'>
              {editResumeId ? 'Enter a new title for your resume.' : 'Give your resume a professional title.'}
            </p>
            <form onSubmit={handleCreate}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder='e.g., Senior Developer Resume'
                autoFocus
                className='tool-input w-full px-5 py-3.5 mb-6 rounded-xl font-medium'
              />
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-[#6fa37a] to-[#3f6b54] hover:from-[#86b696] hover:to-[#6fa37a] text-white font-bold font-grotesk text-[15px] tracking-wide px-4 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#3f6b54]/30 active:scale-95 border border-[rgba(255,255,255,0.1)]'
              >
                {editResumeId ? 'Save Changes' : 'Create Resume'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Resume Modal */}
      {showUploadResume && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a1a]/80 backdrop-blur-md px-4'>
          <div className='glass rounded-[2rem] p-8 w-full max-w-md relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[rgba(205,138,75,0.3)]'>
            <button
              aria-label='close'
              type='button'
              className='absolute top-5 right-5 text-[rgba(255,255,255,0.4)] hover:text-white transition bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] p-1.5 rounded-full'
              onClick={() => {
                setShowUploadResume(false)
                setUploadFile(null)
                setUploadFileName('')
                setUploadTitle('')
                setUploadError('')
              }}
            >
              <X className='w-5 h-5' />
            </button>
            <h2 className='text-2xl font-bold mb-2 text-white font-grotesk tracking-tight'>Upload JSON</h2>
            <p className='text-sm text-[rgba(255,255,255,0.5)] mb-6 font-sans'>Import a previously exported JSON resume.</p>

            <input
              id='uploadFileInput'
              onChange={handleFileInputChange}
              type='file'
              accept='.json'
              className='hidden'
            />

            <input
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              type='text'
              placeholder='Enter resume title (optional)'
              className='tool-input w-full px-5 py-3.5 mb-5 rounded-xl font-medium'
            />

            <label
              htmlFor='uploadFileInput'
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`block border-2 rounded-[1.5rem] p-8 mb-5 cursor-pointer transition-all duration-300 ${
                dragActive
                  ? 'border-[#cd8a4b] bg-[rgba(205,138,75,0.1)]'
                  : 'border-dashed border-[rgba(255,255,255,0.2)] hover:border-[#cd8a4b] hover:bg-[rgba(205,138,75,0.05)]'
              } text-center`}
            >
              <div className='flex flex-col items-center justify-center'>
                <div className='p-4 rounded-2xl bg-[rgba(205,138,75,0.15)] mb-4 border border-[rgba(205,138,75,0.2)]'>
                  <UploadCloud className='w-8 h-8 text-[#cd8a4b]' />
                </div>
                <p className='text-[15px] text-[rgba(255,255,255,0.9)] font-bold font-grotesk tracking-wide'>
                  {uploadFileName || 'Select resume file'}
                </p>
                <p className='text-xs text-[rgba(255,255,255,0.4)] mt-2 font-mono'>
                  Upload a JSON file or drag it here
                </p>
              </div>
            </label>

            {uploadError && (
              <p className='text-[13px] text-[#fb7185] mb-5 bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] px-4 py-3 rounded-xl font-medium'>{uploadError}</p>
            )}

            <div className='flex gap-3'>
              <button
                disabled={!uploadFile}
                onClick={handleUploadSubmit}
                className={`flex-1 font-bold font-grotesk tracking-wide text-[15px] px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer border ${
                  uploadFile
                    ? 'bg-gradient-to-r from-[#cd8a4b] to-[#a86930] text-white shadow-lg shadow-[#cd8a4b]/20 border-[rgba(255,255,255,0.1)] hover:from-[#df9e61] hover:to-[#cd8a4b]'
                    : 'bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)] border-transparent cursor-not-allowed'
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Built for Digital Heroes floating button */}
      <a
        href='https://digitalheroesco.com'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-8 right-8 z-50 bg-[#0a0a1a] border border-[#6fa37a]/50 text-white rounded-full px-6 py-3 shadow-[0_0_25px_rgba(111,163,122,0.4)] hover:shadow-[0_0_35px_rgba(111,163,122,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 text-sm font-semibold font-grotesk animate-pulse-glow'
      >
        <span className="text-mossamber tracking-wide">Built for Digital Heroes</span>
        <ExternalLink className='w-4 h-4 text-[#6fa37a]' />
      </a>
    </div>
  )
}

export default Dashboard