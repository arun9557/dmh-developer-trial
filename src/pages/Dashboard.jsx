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
  const colors = ['#FCA5A5', '#BBF7D0', '#BFDBFE', '#FEF3C7', '#E9D5FF', '#FBCFE8']
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

  // Initialize resumes from localStorage or seed with dummy data
  useEffect(() => {
    const stored = loadResumes()
    if (stored && stored.length > 0) {
      setAllResumes(stored)
    } else {
      setAllResumes(dummyResumeData)
      saveResumes(dummyResumeData)
      // Also save each individual resume
      dummyResumeData.forEach((r) => {
        localStorage.setItem(`resume_${r._id}`, JSON.stringify(r))
      })
    }
  }, [])

  // Sync allResumes to localStorage whenever it changes (skip initial empty array)
  useEffect(() => {
    if (allResumes.length > 0) {
      saveResumes(allResumes)
    }
  }, [allResumes])

  const handleCreate = (e) => {
    e.preventDefault()

    if (editResumeId) {
      // Rename existing resume
      setAllResumes((prev) => {
        const updated = prev.map((r) =>
          r._id === editResumeId
            ? { ...r, title: title || r.title, updatedAt: new Date().toISOString() }
            : r
        )
        // Update individual key too
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

    // Save individual resume to localStorage
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
      // Remove individual key
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
      // ignore parsing errors at preview stage
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

      // Save each uploaded resume individually
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
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30'>
      <div className='max-w-7xl mx-auto px-4 py-8'>

        {/* Welcome glassmorphic card */}
        <div className='mb-8 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm'>
          <p className='text-sm text-slate-500'>Welcome back,</p>
          <h1 className='text-2xl font-semibold bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-500 bg-clip-text text-transparent'>
            Arun Pratap Singh
          </h1>
          <p className='text-xs text-slate-400 mt-1'>b24bs2044@iitj.ac.in</p>
        </div>

        {/* Gradient heading */}
        <h2 className='text-xl font-medium mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'>
          My Resumes
        </h2>

        {/* Action buttons */}
        <div className='flex gap-4 mb-6'>
          <button
            onClick={() => setShowCreateResume(true)}
            className='w-full bg-white sm:max-w-40 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg hover:bg-purple-50/30 transition-all duration-300 cursor-pointer'
          >
            <Plus className='w-11 h-11 transition-all duration-300 p-2.5 bg-purple-600 text-white rounded-full group-hover:scale-110' />
            <p className='text-sm font-medium'>Create Resume</p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className='w-full bg-white sm:max-w-40 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-lg hover:bg-green-50/30 transition-all duration-300 cursor-pointer'
          >
            <UploadCloud className='w-11 h-11 transition-all duration-300 p-2.5 bg-green-600 text-white rounded-full group-hover:scale-110' />
            <p className='text-sm font-medium'>Upload Resume</p>
          </button>
        </div>

        <hr className='border-slate-200 my-6' />

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
                className='relative group w-full bg-white h-48 flex flex-col items-start justify-between rounded-xl p-4 text-slate-700 border border-slate-200 hover:shadow-lg hover:border-yellow-400/50 transition-all duration-300 cursor-pointer'
              >
                <div className='flex items-center gap-3 w-full'>
                  <div className='p-2.5 rounded-full shrink-0' style={{ backgroundColor: baseColor }}>
                    <FileText className='w-5 h-5 text-white' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold truncate' style={{ color: baseColor }}>
                      {resume.title}
                    </p>
                    <p className='text-[11px] text-slate-400 mt-1'>
                      Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className='flex gap-2 self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type='button'
                    aria-label='edit'
                    className='p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition'
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
                    className='p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition'
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
          <div className='text-center py-20'>
            <FileText className='w-16 h-16 text-slate-200 mx-auto mb-4' />
            <p className='text-slate-400 text-lg'>No resumes yet</p>
            <p className='text-slate-300 text-sm mt-1'>Create one or upload an existing resume to get started.</p>
          </div>
        )}
      </div>

      {/* Create / Rename Resume Modal */}
      {showCreateResume && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl'>
            <button
              aria-label='close'
              type='button'
              className='absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition'
              onClick={() => {
                setShowCreateResume(false)
                setTitle('')
                setEditResumeId(null)
              }}
            >
              <X className='w-5 h-5' />
            </button>
            <h2 className='text-lg font-semibold mb-1 text-slate-800'>
              {editResumeId ? 'Rename Resume' : 'Create New Resume'}
            </h2>
            <p className='text-sm text-slate-400 mb-5'>
              {editResumeId ? 'Enter a new title for your resume.' : 'Give your resume a title to get started.'}
            </p>
            <form onSubmit={handleCreate}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder='Resume Title'
                autoFocus
                className='w-full px-4 py-2.5 mb-4 border border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition'
              />
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-medium px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer'
              >
                {editResumeId ? 'Rename Resume' : 'Create Resume'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Resume Modal */}
      {showUploadResume && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl'>
            <button
              aria-label='close'
              type='button'
              className='absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition'
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
            <h2 className='text-lg font-semibold mb-1 text-slate-800'>Upload Resume</h2>
            <p className='text-sm text-slate-400 mb-5'>Import a JSON resume file.</p>

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
              className='w-full px-4 py-2.5 mb-4 border border-slate-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition'
            />

            <label
              htmlFor='uploadFileInput'
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`block border-2 rounded-xl p-8 mb-4 cursor-pointer transition-all duration-200 ${
                dragActive
                  ? 'border-green-500 bg-green-50'
                  : 'border-dashed border-slate-300 hover:border-green-400 hover:bg-green-50/30'
              } text-center`}
            >
              <div className='flex flex-col items-center justify-center'>
                <div className='p-4 rounded-full bg-green-50 mb-3'>
                  <UploadCloud className='w-10 h-10 text-green-600' />
                </div>
                <p className='text-sm text-slate-600 font-medium'>
                  {uploadFileName || 'Select resume file'}
                </p>
                <p className='text-xs text-slate-400 mt-2'>
                  Upload a JSON resume file or drag it here
                </p>
              </div>
            </label>

            {uploadError && (
              <p className='text-sm text-red-500 mb-3 bg-red-50 px-3 py-2 rounded-lg'>{uploadError}</p>
            )}

            <div className='flex gap-3'>
              <button
                disabled={!uploadFile}
                onClick={handleUploadSubmit}
                className={`flex-1 font-medium px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  uploadFile
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm hover:shadow-md'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Upload
              </button>
              <button
                type='button'
                onClick={() => {
                  setShowUploadResume(false)
                  setUploadFile(null)
                  setUploadFileName('')
                  setUploadTitle('')
                  setUploadError('')
                }}
                className='flex-1 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer'
              >
                Cancel
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
        className='fixed bottom-6 right-6 z-40 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm font-medium animate-pulse-glow'
      >
        <span>Built for Digital Heroes</span>
        <ExternalLink className='w-4 h-4' />
      </a>

      {/* Pulse glow animation */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px 0 rgba(245, 158, 11, 0.4); }
          50% { box-shadow: 0 0 20px 4px rgba(245, 158, 11, 0.25); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Dashboard