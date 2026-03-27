"use client"

import { useState } from "react"
import { CheckCircle, Circle, Upload, ChevronRight, FileText, User, BookOpen, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const steps = [
  { id: 0, label: "Apply", icon: User },
  { id: 1, label: "Documents", icon: Upload },
  { id: 2, label: "Review", icon: FileText },
  { id: 3, label: "Submit", icon: Send },
]

const courses = [
  { code: "CSE", name: "Computer Science & Engg.", seats: 120, filled: 87 },
  { code: "ECE", name: "Electronics & Comm. Engg.", seats: 60, filled: 42 },
  { code: "ME", name: "Mechanical Engineering", seats: 60, filled: 38 },
  { code: "CV", name: "Civil Engineering", seats: 60, filled: 29 },
  { code: "ISE", name: "Information Science Engg.", seats: 60, filled: 55 },
  { code: "EEE", name: "Electrical & Electronics", seats: 60, filled: 31 },
]

export function AdmissionsSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [dragging, setDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const progressPct = ((activeStep) / (steps.length - 1)) * 100

  return (
    <section id="admissions" className="bg-midnight py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Admissions 2025–26</p>
          <h2 className="font-serif font-black text-4xl md:text-5xl text-alabaster text-balance">
            Your journey starts here.
          </h2>
        </div>

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, i) => {
              const Icon = step.icon
              const done = i < activeStep
              const active = i === activeStep
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      done
                        ? "bg-lightblue text-midnight"
                        : active
                        ? "bg-maroon text-alabaster ring-4 ring-maroon/30"
                        : "bg-midnight-light text-tan"
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      active ? "text-alabaster" : done ? "text-lightblue" : "text-tan/60"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              )
            })}
          </div>
          <Progress value={progressPct} className="h-1.5 bg-midnight-light [&>div]:bg-maroon" />
        </div>

        {/* Step content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left panel */}
          <div className="bg-midnight-light/30 rounded-2xl p-6 border border-lightblue/10">
            {activeStep === 0 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-2xl text-alabaster mb-4">Personal Details</h3>
                <div>
                  <label className="text-tan text-sm mb-1.5 block">Full Name</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-midnight border-lightblue/20 text-alabaster placeholder:text-tan/40 focus:border-lightblue"
                  />
                </div>
                <div>
                  <label className="text-tan text-sm mb-1.5 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-midnight border-lightblue/20 text-alabaster placeholder:text-tan/40 focus:border-lightblue"
                  />
                </div>
                <div>
                  <label className="text-tan text-sm mb-1.5 block">Phone Number</label>
                  <Input
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-midnight border-lightblue/20 text-alabaster placeholder:text-tan/40 focus:border-lightblue"
                  />
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <h3 className="font-serif font-bold text-2xl text-alabaster mb-4">Upload Documents</h3>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragging ? "border-lightblue bg-lightblue/10" : "border-lightblue/20 bg-midnight/50"
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    const names = Array.from(e.dataTransfer.files).map(f => f.name)
                    setUploadedFiles(prev => [...prev, ...names])
                  }}
                >
                  <Upload className="w-8 h-8 text-lightblue mx-auto mb-3" />
                  <p className="text-alabaster text-sm font-medium">Drag & drop files here</p>
                  <p className="text-tan/60 text-xs mt-1">or click to browse — PDF, JPG up to 5MB</p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-midnight rounded-lg px-3 py-2">
                        <CheckCircle className="w-4 h-4 text-lightblue flex-shrink-0" />
                        <span className="text-alabaster text-sm truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {["10th Certificate", "12th Certificate", "CET Scorecard", "Photo ID"].map(doc => (
                    <div key={doc} className="flex items-center gap-2">
                      <Circle className="w-3.5 h-3.5 text-tan/40" />
                      <span className="text-tan/60 text-xs">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <h3 className="font-serif font-bold text-2xl text-alabaster mb-4">Review Application</h3>
                <div className="space-y-3">
                  {[
                    { label: "Name", value: formData.name || "—" },
                    { label: "Email", value: formData.email || "—" },
                    { label: "Phone", value: formData.phone || "—" },
                    { label: "Course", value: selectedCourse || "—" },
                    { label: "Documents", value: `${uploadedFiles.length} uploaded` },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-lightblue/10">
                      <span className="text-tan text-sm">{item.label}</span>
                      <span className="text-alabaster text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-lightblue/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-lightblue" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-alabaster mb-2">Application Submitted!</h3>
                <p className="text-tan text-sm leading-relaxed">
                  Your application ID is <span className="text-lightblue font-mono font-bold">BMSIT-2025-4821</span>. You will receive a confirmation email shortly.
                </p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button
                variant="ghost"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="text-tan hover:text-alabaster hover:bg-midnight-light/50"
              >
                Back
              </Button>
              <Button
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className="bg-maroon hover:bg-maroon-light text-alabaster group"
              >
                {activeStep === steps.length - 2 ? "Submit" : "Continue"}
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right panel — course cards */}
          <div>
            <h3 className="font-serif font-bold text-xl text-alabaster mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-lightblue" />
              Select a Course
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {courses.map((course) => {
                const pct = Math.round((course.filled / course.seats) * 100)
                const isSelected = selectedCourse === course.code
                return (
                  <button
                    key={course.code}
                    onClick={() => setSelectedCourse(course.code)}
                    className={`w-full text-left rounded-xl p-4 border transition-all duration-200 ${
                      isSelected
                        ? "bg-maroon border-maroon text-alabaster"
                        : "bg-midnight-light/20 border-lightblue/10 text-tan hover:border-lightblue/40 hover:bg-midnight-light/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className={`font-mono font-bold text-xs ${isSelected ? "text-tan" : "text-lightblue"}`}>{course.code}</span>
                        <p className={`font-medium text-sm mt-0.5 ${isSelected ? "text-alabaster" : "text-alabaster/80"}`}>{course.name}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs ${isSelected ? "text-tan" : "text-tan/60"}`}>{course.filled}/{course.seats}</span>
                        <p className={`text-xs font-bold ${pct > 80 ? "text-maroon-light" : "text-lightblue"}`}>{pct}% filled</p>
                      </div>
                    </div>
                    <div className="w-full h-1 rounded-full bg-midnight/40">
                      <div
                        className={`h-full rounded-full transition-all ${pct > 80 ? "bg-maroon" : "bg-lightblue"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Admission Timeline */}
        <div className="mt-16">
          <h3 className="font-serif font-bold text-2xl text-alabaster mb-6">Admission Timeline</h3>
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {[
              { date: "Jan 15", event: "Applications Open", done: true },
              { date: "Mar 31", event: "Last Date to Apply", done: true },
              { date: "Apr 20", event: "Merit List Released", done: false },
              { date: "May 5", event: "Document Verification", done: false },
              { date: "Jun 1", event: "Classes Begin", done: false },
            ].map((item, i, arr) => (
              <div key={i} className="flex items-start flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      item.done ? "bg-lightblue text-midnight" : "bg-midnight-light text-tan border border-tan/30"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="mt-2 text-center w-24">
                    <p className={`text-xs font-bold ${item.done ? "text-lightblue" : "text-tan/60"}`}>{item.date}</p>
                    <p className={`text-xs mt-0.5 leading-tight ${item.done ? "text-alabaster" : "text-tan/50"}`}>{item.event}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className={`h-0.5 w-20 mt-4 flex-shrink-0 ${item.done ? "bg-lightblue" : "bg-midnight-light"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
