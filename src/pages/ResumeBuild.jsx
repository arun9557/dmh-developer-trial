import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Download, Share2, Printer, User, FileText,
  Briefcase, GraduationCap, FolderOpen, Wrench, ChevronDown,
  Plus, Trash2, X, ImagePlus, PenLine, Eye, Check
} from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'

const blankResume = {
  _id: '',
  title: 'Untitled Resume',
  template: 'classic',
  accent_color: '#14B8A6',
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

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  'minimal-image': MinimalImageTemplate
}

const templateOptions = [
  { key: 'classic', label: 'Classic' },
  { key: 'modern', label: 'Modern' },
  { key: 'minimal', label: 'Minimal' },
  { key: 'minimal-image', label: 'Minimal+Image' }
]

const presetColors = [
  { hex: '#14B8A6', name: 'Teal' },
  { hex: '#6366F1', name: 'Indigo' },
  { hex: '#F59E0B', name: 'Amber' },
  { hex: '#F43F5E', name: 'Rose' },
  { hex: '#475569', name: 'Slate' },
  { hex: '#10B981', name: 'Emerald' }
]

const sectionConfig = [
  { id: 'personal', label: 'Personal Details', icon: User },
  { id: 'summary', label: 'Professional Summary', icon: FileText },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'skills', label: 'Skills', icon: Wrench }
]

const generateId = () => Math.random().toString(36).substring(2, 15) + Date.now().toString(36)

const ResumeBuild = () => {
  const { resumeId } = useParams()
  const navigate = useNavigate()

  const [resumeData, setResumeData] = useState(null)
  const [activeSection, setActiveSection] = useState('personal')
  const [activeTemplate, setActiveTemplate] = useState('classic')
  const [accentColor, setAccentColor] = useState('#14B8A6')
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isMobilePreview, setIsMobilePreview] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [shareToast, setShareToast] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [expandedExp, setExpandedExp] = useState(null)
  const [expandedEdu, setExpandedEdu] = useState(null)
  const [expandedProj, setExpandedProj] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const titleInputRef = useRef(null)
  const saveTimeoutRef = useRef(null)
  const fileInputRef = useRef(null)

  // Load resume data on mount
  useEffect(() => {
    const storageKey = `resume_${resumeId}`
    const stored = localStorage.getItem(storageKey)

    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setResumeData(parsed)
        setActiveTemplate(parsed.template || 'classic')
        setAccentColor(parsed.accent_color || '#14B8A6')
      } catch {
        loadFallback()
      }
    } else {
      loadFallback()
    }

    function loadFallback() {
      const dummy = dummyResumeData.find((r) => r._id === resumeId)
      if (dummy) {
        const data = JSON.parse(JSON.stringify(dummy))
        setResumeData(data)
        setActiveTemplate(data.template || 'classic')
        setAccentColor(data.accent_color || '#14B8A6')
      } else {
        const newResume = {
          ...JSON.parse(JSON.stringify(blankResume)),
          _id: resumeId || generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setResumeData(newResume)
      }
    }
  }, [resumeId])

  // Auto-save with debounce
  useEffect(() => {
    if (!resumeData) return

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      const toSave = {
        ...resumeData,
        template: activeTemplate,
        accent_color: accentColor,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(`resume_${resumeData._id}`, JSON.stringify(toSave))
    }, 300)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [resumeData, activeTemplate, accentColor])

  // Focus title input on edit
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal_info: { ...prev.personal_info, [field]: value }
    }))
  }, [])

  const updateField = useCallback((field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }))
  }, [])

  // Image handling
  const handleImageFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onloadend = () => {
      updatePersonalInfo('image', reader.result)
    }
    reader.readAsDataURL(file)
  }, [updatePersonalInfo])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleImageFile(file)
  }, [handleImageFile])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Experience CRUD
  const addExperience = useCallback(() => {
    const newExp = {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
      is_current: false,
      _id: generateId()
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...(prev.experience || []), newExp]
    }))
    setExpandedExp(newExp._id)
  }, [])

  const updateExperience = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp._id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }, [])

  const deleteExperience = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp._id !== id)
    }))
  }, [])

  // Education CRUD
  const addEducation = useCallback(() => {
    const newEdu = {
      institution: '',
      degree: '',
      field: '',
      graduation_date: '',
      gpa: '',
      _id: generateId()
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...(prev.education || []), newEdu]
    }))
    setExpandedEdu(newEdu._id)
  }, [])

  const updateEducation = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu._id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }, [])

  const deleteEducation = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu._id !== id)
    }))
  }, [])

  // Project CRUD
  const addProject = useCallback(() => {
    const newProj = {
      name: '',
      type: '',
      description: '',
      _id: generateId()
    }
    setResumeData((prev) => ({
      ...prev,
      project: [...(prev.project || []), newProj]
    }))
    setExpandedProj(newProj._id)
  }, [])

  const updateProject = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      project: prev.project.map((proj) =>
        proj._id === id ? { ...proj, [field]: value } : proj
      )
    }))
  }, [])

  const deleteProject = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      project: prev.project.filter((proj) => proj._id !== id)
    }))
  }, [])

  // Skills
  const addSkill = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setResumeData((prev) => {
      if (prev.skills.includes(trimmed)) return prev
      return { ...prev, skills: [...prev.skills, trimmed] }
    })
    setSkillInput('')
  }, [])

  const removeSkill = useCallback((index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }, [])

  const handleSkillKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill(skillInput)
    }
  }, [skillInput, addSkill])

  // Toolbar actions
  const downloadJSON = useCallback(() => {
    const toSave = {
      ...resumeData,
      template: activeTemplate,
      accent_color: accentColor,
      updatedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(toSave, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData.title || 'resume'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [resumeData, activeTemplate, accentColor])

  const shareLink = useCallback(() => {
    const link = `${window.location.origin}/view/${resumeData._id}`
    navigator.clipboard.writeText(link).then(() => {
      setShareToast(true)
      setTimeout(() => setShareToast(false), 2000)
    })
  }, [resumeData])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const clearAll = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      const cleared = {
        ...JSON.parse(JSON.stringify(blankResume)),
        _id: resumeData._id,
        createdAt: resumeData.createdAt,
        updatedAt: new Date().toISOString()
      }
      setResumeData(cleared)
      setActiveTemplate('classic')
      setAccentColor('#14B8A6')
    }
  }, [resumeData])

  const toggleSection = useCallback((sectionId) => {
    setActiveSection((prev) => (prev === sectionId ? null : sectionId))
  }, [])

  // Input component
  const InputField = ({ label, type = 'text', value, onChange, placeholder, disabled = false }) => (
    <div className="mb-3">
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800
                   focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 focus:outline-none
                   transition-all duration-200 disabled:opacity-50 disabled:bg-slate-50"
      />
    </div>
  )

  if (!resumeData) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-3 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  const TemplateComponent = templates[activeTemplate] || ClassicTemplate

  const previewData = {
    ...resumeData,
    template: activeTemplate,
    accent_color: accentColor
  }

  // Accordion Section renderer
  const renderAccordionSection = (section) => {
    const isOpen = activeSection === section.id
    const Icon = section.icon

    return (
      <div key={section.id} className="border-b border-slate-100 last:border-b-0">
        <button
          onClick={() => toggleSection(section.id)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors duration-200"
        >
          <Icon size={18} className="text-slate-500 flex-shrink-0" />
          <span className="text-sm font-medium text-slate-700 flex-1 text-left">{section.label}</span>
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4">{renderSectionContent(section.id)}</div>
        </div>
      </div>
    )
  }

  // Section content renderer
  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case 'personal':
        return (
          <div>
            <InputField
              label="Full Name"
              value={resumeData.personal_info?.full_name}
              onChange={(v) => updatePersonalInfo('full_name', v)}
              placeholder="John Doe"
            />
            <InputField
              label="Profession"
              value={resumeData.personal_info?.profession}
              onChange={(v) => updatePersonalInfo('profession', v)}
              placeholder="Full Stack Developer"
            />
            <InputField
              label="Email"
              type="email"
              value={resumeData.personal_info?.email}
              onChange={(v) => updatePersonalInfo('email', v)}
              placeholder="john@example.com"
            />
            <InputField
              label="Phone"
              type="tel"
              value={resumeData.personal_info?.phone}
              onChange={(v) => updatePersonalInfo('phone', v)}
              placeholder="+1 234 567 890"
            />
            <InputField
              label="Location"
              value={resumeData.personal_info?.location}
              onChange={(v) => updatePersonalInfo('location', v)}
              placeholder="New York, USA"
            />
            <InputField
              label="LinkedIn URL"
              type="url"
              value={resumeData.personal_info?.linkedin}
              onChange={(v) => updatePersonalInfo('linkedin', v)}
              placeholder="https://linkedin.com/in/johndoe"
            />
            <InputField
              label="Website URL"
              type="url"
              value={resumeData.personal_info?.website}
              onChange={(v) => updatePersonalInfo('website', v)}
              placeholder="https://johndoe.dev"
            />

            {/* Profile Image Upload */}
            <div className="mt-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Profile Image</label>
              {resumeData.personal_info?.image ? (
                <div className="flex items-center gap-3">
                  <img
                    src={resumeData.personal_info.image}
                    alt="Profile"
                    className="w-16 h-16 rounded-lg object-cover border-2 border-slate-200"
                  />
                  <button
                    onClick={() => updatePersonalInfo('image', '')}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs text-red-500 bg-red-50 rounded-lg
                               hover:bg-red-100 transition-colors duration-200 cursor-pointer"
                  >
                    <X size={14} />
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
                    ${isDragging
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  <ImagePlus size={24} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-xs text-slate-500">
                    Drag & drop an image or <span className="text-yellow-600 font-medium">browse</span>
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFile(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 'summary':
        return (
          <div>
            <textarea
              value={resumeData.professional_summary || ''}
              onChange={(e) => updateField('professional_summary', e.target.value.slice(0, 500))}
              rows={5}
              placeholder="Write a brief professional summary..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 resize-none
                         focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 focus:outline-none
                         transition-all duration-200"
            />
            <p className="text-xs text-slate-400 text-right mt-1">
              {(resumeData.professional_summary || '').length}/500
            </p>
          </div>
        )

      case 'experience':
        return (
          <div className="space-y-3">
            {(resumeData.experience || []).map((exp) => {
              const isExpanded = expandedExp === exp._id
              return (
                <div key={exp._id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div
                    className="flex items-center justify-between px-3 py-2.5 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors duration-200"
                    onClick={() => setExpandedExp(isExpanded ? null : exp._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {exp.position || 'New Position'}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{exp.company || 'Company'}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteExperience(exp._id)
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                      <ChevronDown
                        size={14}
                        className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-3 space-y-0">
                      <InputField
                        label="Position"
                        value={exp.position}
                        onChange={(v) => updateExperience(exp._id, 'position', v)}
                        placeholder="Senior Developer"
                      />
                      <InputField
                        label="Company"
                        value={exp.company}
                        onChange={(v) => updateExperience(exp._id, 'company', v)}
                        placeholder="Acme Inc."
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <InputField
                          label="Start Date"
                          type="month"
                          value={exp.start_date}
                          onChange={(v) => updateExperience(exp._id, 'start_date', v)}
                        />
                        <InputField
                          label="End Date"
                          type="month"
                          value={exp.end_date}
                          onChange={(v) => updateExperience(exp._id, 'end_date', v)}
                          disabled={exp.is_current}
                        />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          id={`current-${exp._id}`}
                          checked={exp.is_current || false}
                          onChange={(e) => {
                            updateExperience(exp._id, 'is_current', e.target.checked)
                            if (e.target.checked) {
                              updateExperience(exp._id, 'end_date', 'Present')
                            }
                          }}
                          className="w-4 h-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-500/40 cursor-pointer"
                        />
                        <label htmlFor={`current-${exp._id}`} className="text-xs text-slate-600 cursor-pointer">
                          I currently work here
                        </label>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                        <textarea
                          value={exp.description || ''}
                          onChange={(e) => updateExperience(exp._id, 'description', e.target.value)}
                          rows={3}
                          placeholder="Describe your responsibilities..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 resize-none
                                     focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 focus:outline-none
                                     transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <button
              onClick={addExperience}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-200
                         rounded-lg text-sm text-slate-500 hover:border-yellow-500 hover:text-yellow-600
                         hover:bg-yellow-50/50 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Plus size={16} />
              Add Experience
            </button>
          </div>
        )

      case 'education':
        return (
          <div className="space-y-3">
            {(resumeData.education || []).map((edu) => {
              const isExpanded = expandedEdu === edu._id
              return (
                <div key={edu._id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div
                    className="flex items-center justify-between px-3 py-2.5 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors duration-200"
                    onClick={() => setExpandedEdu(isExpanded ? null : edu._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {edu.degree || 'New Degree'} {edu.field ? `in ${edu.field}` : ''}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{edu.institution || 'Institution'}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteEducation(edu._id)
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                      <ChevronDown
                        size={14}
                        className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-3 space-y-0">
                      <InputField
                        label="Institution"
                        value={edu.institution}
                        onChange={(v) => updateEducation(edu._id, 'institution', v)}
                        placeholder="MIT"
                      />
                      <InputField
                        label="Degree"
                        value={edu.degree}
                        onChange={(v) => updateEducation(edu._id, 'degree', v)}
                        placeholder="B.Tech"
                      />
                      <InputField
                        label="Field of Study"
                        value={edu.field}
                        onChange={(v) => updateEducation(edu._id, 'field', v)}
                        placeholder="Computer Science"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <InputField
                          label="Graduation Date"
                          type="month"
                          value={edu.graduation_date}
                          onChange={(v) => updateEducation(edu._id, 'graduation_date', v)}
                        />
                        <InputField
                          label="GPA"
                          value={edu.gpa}
                          onChange={(v) => updateEducation(edu._id, 'gpa', v)}
                          placeholder="3.8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <button
              onClick={addEducation}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-200
                         rounded-lg text-sm text-slate-500 hover:border-yellow-500 hover:text-yellow-600
                         hover:bg-yellow-50/50 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Plus size={16} />
              Add Education
            </button>
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-3">
            {(resumeData.project || []).map((proj) => {
              const isExpanded = expandedProj === proj._id
              return (
                <div key={proj._id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div
                    className="flex items-center justify-between px-3 py-2.5 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors duration-200"
                    onClick={() => setExpandedProj(isExpanded ? null : proj._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {proj.name || 'New Project'}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{proj.type || 'Project Type'}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteProject(proj._id)
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                      <ChevronDown
                        size={14}
                        className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-3 space-y-0">
                      <InputField
                        label="Project Name"
                        value={proj.name}
                        onChange={(v) => updateProject(proj._id, 'name', v)}
                        placeholder="My Awesome Project"
                      />
                      <InputField
                        label="Project Type"
                        value={proj.type}
                        onChange={(v) => updateProject(proj._id, 'type', v)}
                        placeholder="Web Application"
                      />
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                        <textarea
                          value={proj.description || ''}
                          onChange={(e) => updateProject(proj._id, 'description', e.target.value)}
                          rows={3}
                          placeholder="Describe your project..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 resize-none
                                     focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 focus:outline-none
                                     transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <button
              onClick={addProject}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-200
                         rounded-lg text-sm text-slate-500 hover:border-yellow-500 hover:text-yellow-600
                         hover:bg-yellow-50/50 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        )

      case 'skills':
        return (
          <div>
            <div className="relative mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800
                           focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 focus:outline-none
                           transition-all duration-200"
              />
              {skillInput.trim() && (
                <button
                  onClick={() => addSkill(skillInput)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-yellow-500 hover:text-yellow-600 cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(resumeData.skills || []).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium
                             rounded-full hover:bg-slate-200 transition-colors duration-200 group"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="p-0.5 text-slate-400 hover:text-red-500 transition-colors duration-200 cursor-pointer
                               opacity-70 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {resumeData.skills?.length === 0 && (
                <p className="text-xs text-slate-400 italic">No skills added yet</p>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Editor Sidebar Component
  const editorSidebar = (
    <div className="h-full flex flex-col bg-white">
      {/* Sidebar scrollable content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent'
        }}
      >
        <div className="py-2">
          {sectionConfig.map((section) => renderAccordionSection(section))}
        </div>

        {/* Clear All Button */}
        <div className="px-4 pb-6 pt-2">
          <button
            onClick={clearAll}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-500 text-sm
                       font-medium rounded-lg border border-red-200 hover:bg-red-100 hover:text-red-600
                       transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Trash2 size={16} />
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  )

  // Preview Panel Component
  const previewPanel = (
    <div className="h-full flex flex-col bg-slate-50/80">
      {/* Preview Controls Bar */}
      <div className="flex-shrink-0 bg-white border-b border-slate-200 px-4 py-3">
        {/* Template selector */}
        <div className="mb-3">
          <p className="text-xs font-medium text-slate-500 mb-2">Template</p>
          <div className="grid grid-cols-4 gap-2">
            {templateOptions.map((tmpl) => (
              <button
                key={tmpl.key}
                onClick={() => setActiveTemplate(tmpl.key)}
                className={`px-2 py-2 text-xs font-medium rounded-lg border-2 transition-all duration-200 cursor-pointer active:scale-95
                  ${activeTemplate === tmpl.key
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                {tmpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color picker + Zoom row */}
        <div className="flex items-end gap-4">
          {/* Colors */}
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-500 mb-2">Accent Color</p>
            <div className="flex items-center gap-2">
              {presetColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setAccentColor(color.hex)}
                  title={color.name}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center
                    ${accentColor === color.hex
                      ? 'border-slate-800 scale-110'
                      : 'border-transparent hover:scale-110'
                    }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {accentColor === color.hex && <Check size={12} className="text-white" />}
                </button>
              ))}
              <label className="relative cursor-pointer" title="Custom color">
                <div
                  className={`w-7 h-7 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center
                              hover:border-slate-400 transition-all duration-200 overflow-hidden`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-red-400 via-green-400 to-blue-400 opacity-60" />
                </div>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Zoom */}
          <div className="flex-shrink-0">
            <p className="text-xs font-medium text-slate-500 mb-2">Zoom: {zoomLevel}%</p>
            <input
              type="range"
              min={40}
              max={120}
              value={zoomLevel}
              onChange={(e) => setZoomLevel(Number(e.target.value))}
              className="w-28 h-1.5 accent-yellow-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Preview Canvas */}
      <div
        className="flex-1 overflow-auto p-6"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent'
        }}
      >
        <div className="flex justify-center">
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              width: '794px',
              minHeight: '1123px'
            }}
          >
            <div
              className="bg-white shadow-xl rounded-sm"
              style={{
                width: '794px',
                minHeight: '1123px'
              }}
              id="resume-print-area"
            >
              <TemplateComponent data={previewData} accentColor={accentColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-screen flex flex-col bg-slate-50 print:bg-white">
      {/* ===== TOP TOOLBAR ===== */}
      <div className="flex-shrink-0 bg-white border-b border-slate-200 shadow-sm h-14 flex items-center px-4 gap-4 print:hidden z-20">
        {/* Left: Back button */}
        <button
          onClick={() => navigate('/app/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 cursor-pointer flex-shrink-0"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium hidden sm:inline">Dashboard</span>
        </button>

        {/* Center: Editable title */}
        <div className="flex-1 flex justify-center min-w-0">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              value={resumeData.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingTitle(false)
              }}
              className="text-sm font-semibold text-slate-800 text-center bg-transparent border-b-2 border-yellow-500
                         focus:outline-none px-2 py-1 max-w-xs w-full"
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="text-sm font-semibold text-slate-800 hover:text-yellow-600 transition-colors duration-200
                         cursor-pointer truncate max-w-xs px-2 py-1"
              title="Click to edit title"
            >
              {resumeData.title || 'Untitled Resume'}
            </button>
          )}
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={downloadJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100
                       rounded-lg hover:bg-slate-200 transition-all duration-200 cursor-pointer active:scale-95"
            title="Download JSON"
          >
            <Download size={14} />
            <span className="hidden md:inline">Download JSON</span>
          </button>

          <div className="relative">
            <button
              onClick={shareLink}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100
                         rounded-lg hover:bg-slate-200 transition-all duration-200 cursor-pointer active:scale-95"
              title="Share Link"
            >
              <Share2 size={14} />
              <span className="hidden md:inline">Share Link</span>
            </button>
            {shareToast && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs
                              px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg animate-fade-in z-50">
                <Check size={12} className="inline mr-1" />
                Copied!
              </div>
            )}
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-yellow-500
                       rounded-lg hover:bg-yellow-600 transition-all duration-200 cursor-pointer active:scale-95"
            title="Print / PDF"
          >
            <Printer size={14} />
            <span className="hidden md:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex overflow-hidden print:block">
        {/* Desktop Layout */}
        {/* Left: Editor Sidebar */}
        <div
          className={`w-[420px] border-r border-slate-200 flex-shrink-0 print:hidden
                      hidden md:block ${isMobilePreview ? 'md:block' : 'md:block'}`}
        >
          {editorSidebar}
        </div>

        {/* Right: Preview Panel */}
        <div className="flex-1 hidden md:block print:block">{previewPanel}</div>

        {/* Mobile Layout */}
        <div className="flex-1 md:hidden print:hidden">
          {isMobilePreview ? previewPanel : editorSidebar}
        </div>
      </div>

      {/* ===== MOBILE TOGGLE BUTTON ===== */}
      <div className="md:hidden print:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => setIsMobilePreview((prev) => !prev)}
          className="flex items-center gap-2 px-5 py-3 bg-yellow-500 text-white font-medium text-sm
                     rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-200 cursor-pointer
                     active:scale-95"
        >
          {isMobilePreview ? (
            <>
              <PenLine size={18} />
              Editor
            </>
          ) : (
            <>
              <Eye size={18} />
              Preview
            </>
          )}
        </button>
      </div>

      {/* ===== PRINT STYLES ===== */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-print-area, #resume-print-area * {
            visibility: visible;
          }
          #resume-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            transform: none !important;
            box-shadow: none !important;
          }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ResumeBuild