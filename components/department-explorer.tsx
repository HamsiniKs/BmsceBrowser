"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users, BookOpen, Award, FileText, Search, Filter,
  ChevronLeft, ChevronRight, X, Trophy, Briefcase, Lightbulb,
  GraduationCap, FlaskConical, Globe
} from "lucide-react"

// ─────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────
type Department = {
  id: string
  name: string
  shortName: string
  color: string
  students: number
  faculty: number
  placementRate: number
  researchPapers: number
  description: string
  labs: number
  image: string
}

type Faculty = {
  id: string
  name: string
  role: "Professor" | "Associate Professor" | "Assistant Professor"
  photo: string
  specialization: string
  experience: number
  researchAreas: string[]
  department: string
}

type AchievementCategory = "Hackathon" | "Research" | "Internship" | "International"

type Achievement = {
  id: string
  title: string
  students: string[]
  image: string
  category: AchievementCategory
  description: string
  skills: string[]
  outcome: string
  year: number
  isTopAchiever?: boolean
  department: string
}

const DEPARTMENTS: Department[] = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    color: "#0F414A",
    students: 1200,
    faculty: 45,
    placementRate: 96,
    researchPapers: 180,
    description: "The Department of Computer Science & Engineering at BMSIT&M is dedicated to fostering innovation in software development, artificial intelligence, and data science. With state-of-the-art labs and industry partnerships, students gain hands-on experience with cutting-edge technologies.",
    labs: 12,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
  },
  {
    id: "ise",
    name: "Information Science & Engineering",
    shortName: "ISE",
    color: "#7F0303",
    students: 960,
    faculty: 38,
    placementRate: 94,
    researchPapers: 145,
    description: "ISE focuses on the intersection of information technology and business systems. Students learn to design, develop, and manage complex information systems that drive organizational success.",
    labs: 10,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
  },
  {
    id: "ece",
    name: "Electronics & Communication",
    shortName: "ECE",
    color: "#96C0CE",
    students: 840,
    faculty: 35,
    placementRate: 92,
    researchPapers: 165,
    description: "ECE department excels in embedded systems, VLSI design, and communication networks. Our graduates lead innovations in semiconductor and telecommunications industries.",
    labs: 14,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
  },
  {
    id: "aiml",
    name: "AI & Machine Learning",
    shortName: "AIML",
    color: "#D8BA98",
    students: 480,
    faculty: 22,
    placementRate: 98,
    researchPapers: 95,
    description: "The newest addition to BMSIT&M, the AIML department prepares students for careers in artificial intelligence, deep learning, and intelligent automation with a curriculum co-designed with industry leaders.",
    labs: 6,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    shortName: "ME",
    color: "#0F414A",
    students: 720,
    faculty: 32,
    placementRate: 88,
    researchPapers: 120,
    description: "ME department combines traditional mechanical principles with modern manufacturing technologies. Students work on projects ranging from automotive design to renewable energy systems.",
    labs: 16,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
  },
  {
    id: "civil",
    name: "Civil Engineering",
    shortName: "CIVIL",
    color: "#7F0303",
    students: 560,
    faculty: 28,
    placementRate: 85,
    researchPapers: 90,
    description: "Civil Engineering at BMSIT&M focuses on sustainable infrastructure, smart cities, and environmental engineering. Students engage in real-world projects with government and industry partners.",
    labs: 11,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
  },
  {
    id: "eee",
    name: "Electrical & Electronics",
    shortName: "EEE",
    color: "#96C0CE",
    students: 480,
    faculty: 24,
    placementRate: 90,
    researchPapers: 85,
    description: "EEE department specializes in power systems, renewable energy, and smart grid technologies. Our labs feature industry-standard equipment for practical learning.",
    labs: 9,
    image: "https://images.unsplash.com/photo-1509390144018-eeaf65052242?w=800&h=600&fit=crop",
  },
]

const FACULTY_DATA: Faculty[] = [
  { id: "f1", name: "Dr. Priya Sharma", role: "Associate Professor", photo: "/images/faculty/faculty-1.jpeg", specialization: "Data Science & Analytics", experience: 15, researchAreas: ["Big Data", "Analytics", "Data Mining"], department: "cse" },
  { id: "f2", name: "Dr. Meera Nair", role: "Assistant Professor", photo: "/images/faculty/faculty-2.jpeg", specialization: "Cloud Computing", experience: 8, researchAreas: ["AWS", "Distributed Systems", "Serverless"], department: "cse" },
  { id: "f3", name: "Dr. Rajesh Kumar", role: "Professor", photo: "/images/faculty/faculty-3.jpeg", specialization: "Machine Learning & AI", experience: 22, researchAreas: ["Deep Learning", "NLP", "Computer Vision"], department: "cse" },
  { id: "f6", name: "Dr. Ananya Gupta", role: "Associate Professor", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop", specialization: "Database Systems", experience: 12, researchAreas: ["NoSQL", "Data Modeling", "Query Optimization"], department: "ise" },
  { id: "f7", name: "Dr. Vikram Singh", role: "Professor", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop", specialization: "VLSI Design", experience: 18, researchAreas: ["FPGA", "ASIC", "Low Power Design"], department: "ece" },
  { id: "f8", name: "Dr. Kavitha Rao", role: "Assistant Professor", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", specialization: "Neural Networks", experience: 6, researchAreas: ["CNN", "RNN", "Transformers"], department: "aiml" },
]

const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "Smart India Hackathon 2024 Winners", students: ["Rahul Verma", "Priya Singh", "Arjun Mehta"], image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop", category: "Hackathon", description: "Developed an AI-powered traffic management system that reduced congestion by 40% in simulations. The solution used computer vision and edge computing for real-time traffic analysis.", skills: ["Python", "TensorFlow", "IoT", "React"], outcome: "1st Place + ₹1 Lakh Prize", year: 2024, isTopAchiever: true, department: "cse" },
  { id: "a2", title: "IEEE Research Paper Publication", students: ["Dr. Amit Patel", "Sneha Kulkarni"], image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&h=600&fit=crop", category: "Research", description: "Published groundbreaking research on quantum-resistant cryptography algorithms in IEEE Transactions on Information Security.", skills: ["Cryptography", "Quantum Computing", "LaTeX"], outcome: "Published in Q1 Journal", year: 2024, department: "cse" },
  { id: "a3", title: "Google Summer of Code 2024", students: ["Aditya Sharma"], image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop", category: "Internship", description: "Selected for GSoC 2024 to contribute to TensorFlow&apos;s model optimization toolkit. Implemented new quantization techniques for mobile deployment.", skills: ["Python", "TensorFlow", "C++", "Open Source"], outcome: "Successfully Completed", year: 2024, isTopAchiever: true, department: "cse" },
  { id: "a4", title: "International Robotics Championship", students: ["Team Roboforge"], image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&h=600&fit=crop", category: "International", description: "Represented India at the World Robot Olympiad in Germany. Built an autonomous robot for disaster rescue operations.", skills: ["Robotics", "Arduino", "ROS", "3D Printing"], outcome: "Bronze Medal", year: 2024, department: "ece" },
  { id: "a5", title: "HackMIT Finalists", students: ["Neha Reddy", "Kiran Joshi", "Ravi Kumar"], image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&h=600&fit=crop", category: "Hackathon", description: "Reached finals at HackMIT with a blockchain-based credential verification system for academic records.", skills: ["Solidity", "Web3.js", "React", "Node.js"], outcome: "Top 10 Finalist", year: 2024, department: "ise" },
  { id: "a6", title: "Microsoft Engage Mentorship", students: ["Pooja Hegde", "Varun Nair"], image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", category: "Internship", description: "Selected among 5000+ applicants for Microsoft Engage 2024. Developed a Teams plugin for automated meeting summaries using Azure AI.", skills: ["Azure", "TypeScript", "Graph API", "AI"], outcome: "Pre-Placement Offer", year: 2024, department: "cse" },
  { id: "a7", title: "ACM-ICPC Regional Qualifiers", students: ["Team CodeCraft"], image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop", category: "Hackathon", description: "Qualified for ACM-ICPC Asia Regional after ranking in top 50 among 800+ teams in the preliminary round.", skills: ["C++", "Algorithms", "Data Structures"], outcome: "Regional Qualifiers", year: 2024, department: "cse" },
  { id: "a8", title: "Nature Communications Publication", students: ["Dr. Vikram Singh", "Research Team"], image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop", category: "Research", description: "Published research on next-generation semiconductor materials for 2nm chip fabrication in Nature Communications.", skills: ["Material Science", "VLSI", "Simulation"], outcome: "High Impact Publication", year: 2024, isTopAchiever: true, department: "ece" },
]

const ACHIEVEMENT_STATS = [
  { label: "Hackathon Wins", value: 50, icon: Trophy },
  { label: "Research Papers", value: 180, icon: FileText },
  { label: "Internships", value: 320, icon: Briefcase },
]

const CATEGORY_COLORS: Record<AchievementCategory, { bg: string; text: string }> = {
  Hackathon: { bg: "bg-maroon", text: "text-alabaster" },
  Research: { bg: "bg-midnight", text: "text-alabaster" },
  Internship: { bg: "bg-lightblue", text: "text-midnight" },
  International: { bg: "bg-tan", text: "text-midnight" },
}

const CATEGORY_ICONS: Record<AchievementCategory, typeof Trophy> = {
  Hackathon: Trophy,
  Research: FlaskConical,
  Internship: Briefcase,
  International: Globe,
}

// ─────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function DepartmentExplorer() {
  const [activeDept, setActiveDept] = useState<Department>(DEPARTMENTS[0])
  const [facultySearch, setFacultySearch] = useState("")
  const [facultyFilter, setFacultyFilter] = useState<Faculty["role"] | "All">("All")
  const [achievementFilter, setAchievementFilter] = useState<AchievementCategory | "All">("All")
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  // Filter data by department
  const deptFaculty = FACULTY_DATA.filter(f => f.department === activeDept.id)
  const deptAchievements = ACHIEVEMENTS.filter(a => a.department === activeDept.id)

  // Apply filters
  const filteredFaculty = deptFaculty.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.specialization.toLowerCase().includes(facultySearch.toLowerCase())
    const matchesFilter = facultyFilter === "All" || f.role === facultyFilter
    return matchesSearch && matchesFilter
  })

  const filteredAchievements = achievementFilter === "All"
    ? deptAchievements
    : deptAchievements.filter(a => a.category === achievementFilter)

  // Carousel scroll
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 400
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="departments" className="bg-alabaster py-20">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Explore</p>
            <h2 className="font-serif font-black text-4xl md:text-5xl text-midnight text-balance leading-tight">
              Our Departments
            </h2>
          </div>
          <p className="hidden md:block text-midnight/50 text-sm max-w-xs text-right leading-relaxed">
            Discover academic excellence across engineering disciplines.
          </p>
        </div>
      </div>

      {/* Department Tabs */}
      <div className="sticky top-0 z-30 bg-alabaster/95 backdrop-blur-sm border-b border-tan/60">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div
            ref={tabsRef}
            className="flex gap-1 overflow-x-auto scrollbar-hide py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeDept.id === dept.id
                    ? "bg-midnight text-alabaster"
                    : "text-midnight hover:bg-tan/30"
                }`}
              >
                {dept.shortName}
                {activeDept.id === dept.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-midnight rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        <motion.div
          key={activeDept.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard icon={Users} label="Students" value={activeDept.students} />
          <StatCard icon={GraduationCap} label="Faculty" value={activeDept.faculty} />
          <StatCard icon={Award} label="Placement Rate" value={activeDept.placementRate} suffix="%" />
          <StatCard icon={FileText} label="Research Papers" value={activeDept.researchPapers} />
        </motion.div>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        <motion.div
          key={activeDept.id + "-about"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-midnight mb-4">
              {activeDept.name}
            </h3>
            <p className="text-midnight/70 leading-relaxed mb-6">
              {activeDept.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 bg-midnight/10 text-midnight px-4 py-2 rounded-full text-sm font-medium">
                <Users size={14} /> {activeDept.students}+ Students
              </span>
              <span className="inline-flex items-center gap-2 bg-maroon/10 text-maroon px-4 py-2 rounded-full text-sm font-medium">
                <GraduationCap size={14} /> {activeDept.faculty}+ Faculty
              </span>
              <span className="inline-flex items-center gap-2 bg-lightblue/30 text-midnight px-4 py-2 rounded-full text-sm font-medium">
                <FlaskConical size={14} /> {activeDept.labs} Labs
              </span>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
            <Image
              src={activeDept.image}
              alt={activeDept.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Halftone overlay */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-multiply"
              style={{
                backgroundImage: `radial-gradient(${activeDept.color} 1px, transparent 1px)`,
                backgroundSize: "6px 6px",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Faculty Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h3 className="font-serif font-bold text-2xl text-midnight">Faculty Members</h3>
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-midnight/40" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={facultySearch}
                onChange={(e) => setFacultySearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-tan/60 bg-alabaster text-sm text-midnight placeholder:text-midnight/40 focus:outline-none focus:ring-2 focus:ring-lightblue/50 w-full md:w-64"
              />
            </div>
            {/* Filter */}
            <div className="flex gap-2">
              {(["All", "Professor", "Associate Professor", "Assistant Professor"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setFacultyFilter(role)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    facultyFilter === role
                      ? "bg-midnight text-alabaster"
                      : "bg-tan/30 text-midnight hover:bg-tan/50"
                  }`}
                >
                  {role === "All" ? "All" : role.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredFaculty.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
          {filteredFaculty.length === 0 && (
            <p className="col-span-full text-center text-midnight/50 py-8">
              No faculty members found matching your criteria.
            </p>
          )}
        </div>
      </div>

      {/* Student Achievements Section */}
      <div className="bg-midnight py-16 mt-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Stats Strip */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {ACHIEVEMENT_STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-lightblue" />
                    <span className="font-serif font-black text-3xl text-alabaster">
                      <AnimatedCounter value={stat.value} suffix="+" />
                    </span>
                  </div>
                  <p className="text-tan/70 text-sm">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-lightblue font-medium text-sm uppercase tracking-widest mb-2">Celebrate</p>
              <h3 className="font-serif font-bold text-3xl text-alabaster">Student Achievements</h3>
            </div>
            {/* Filter Bar */}
            <div className="flex gap-2 flex-wrap">
              {(["All", "Hackathon", "Research", "Internship", "International"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAchievementFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    achievementFilter === cat
                      ? "bg-maroon text-alabaster"
                      : "bg-midnight-light/50 text-tan hover:bg-midnight-light"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Spotlight Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-alabaster/10 backdrop-blur-sm border border-lightblue/20 flex items-center justify-center text-alabaster hover:bg-alabaster/20 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-alabaster/10 backdrop-blur-sm border border-lightblue/20 flex items-center justify-center text-alabaster hover:bg-alabaster/20 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredAchievements.length > 0 ? (
                filteredAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    onClick={() => setSelectedAchievement(achievement)}
                  />
                ))
              ) : (
                <div className="w-full text-center py-12">
                  <p className="text-tan/50">No achievements found in this category.</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="mt-10 bg-midnight-light/30 border border-lightblue/20 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-lightblue/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-lightblue" />
            </div>
            <div>
              <p className="text-tan text-sm font-medium mb-1">AI Insight</p>
              <p className="text-alabaster/80 text-sm leading-relaxed">
                {activeDept.shortName} students excel in hackathons, with 65% of achievements coming from competitive programming and innovation challenges. Consider joining our coding clubs to boost your profile!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
}: {
  icon: typeof Users
  label: string
  value: number
  suffix?: string
}) {
  return (
    <div className="bg-white/70 border border-tan/60 rounded-2xl p-5 backdrop-blur-sm">
      <Icon className="w-5 h-5 text-lightblue-dark mb-3" strokeWidth={1.5} />
      <p className="font-serif font-black text-2xl text-midnight">
        <AnimatedCounter value={value} suffix={suffix} />
      </p>
      <p className="text-midnight/50 text-xs mt-0.5">{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────
// FACULTY CARD
// ─────────────────────────────────────────────
function FacultyCard({ faculty }: { faculty: Faculty }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative bg-white/70 border border-tan/60 rounded-2xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={faculty.photo}
          alt={faculty.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-midnight/90 p-4 flex flex-col justify-center"
            >
              <p className="text-lightblue text-xs font-semibold mb-2">Specialization</p>
              <p className="text-alabaster text-sm mb-3">{faculty.specialization}</p>
              <p className="text-lightblue text-xs font-semibold mb-2">Experience</p>
              <p className="text-alabaster text-sm mb-3">{faculty.experience} years</p>
              <p className="text-lightblue text-xs font-semibold mb-2">Research Areas</p>
              <div className="flex flex-wrap gap-1">
                {faculty.researchAreas.map((area) => (
                  <span key={area} className="text-xs bg-lightblue/20 text-lightblue px-2 py-0.5 rounded-full">
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Info */}
      <div className="p-4">
        <h4 className="font-serif font-bold text-midnight text-sm">{faculty.name}</h4>
        <p className="text-midnight/50 text-xs">{faculty.role}</p>
      </div>
    </div>
  )
}

// ─────────────────────────���───────────────────
// ACHIEVEMENT CARD
// ─────────────────────────────────────────────
function AchievementCard({
  achievement,
  onClick,
}: {
  achievement: Achievement
  onClick: () => void
}) {
  const catColors = CATEGORY_COLORS[achievement.category]
  const Icon = CATEGORY_ICONS[achievement.category]

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      onClick={onClick}
      className="relative shrink-0 w-80 bg-midnight-light/50 border border-lightblue/20 rounded-2xl overflow-hidden cursor-pointer snap-center"
    >
      {/* Top Achiever Badge */}
      {achievement.isTopAchiever && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-maroon text-alabaster px-3 py-1 rounded-full text-xs font-semibold">
          <Trophy size={12} />
          Top Achiever
        </div>
      )}

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={achievement.image}
          alt={achievement.title}
          fill
          className="object-cover"
          sizes="320px"
        />
        {/* Category Tag */}
        <div className={`absolute bottom-3 right-3 flex items-center gap-1.5 ${catColors.bg} ${catColors.text} px-3 py-1 rounded-full text-xs font-semibold`}>
          <Icon size={12} />
          {achievement.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="font-serif font-bold text-alabaster text-lg leading-tight mb-2 line-clamp-2">
          {achievement.title}
        </h4>
        <p className="text-tan/70 text-sm mb-3">
          {achievement.students.join(", ")}
        </p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-lightblue">{achievement.year}</span>
          <span className="text-tan underline underline-offset-2">View details</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// ACHIEVEMENT MODAL
// ─────────────────────────────────────────────
function AchievementModal({
  achievement,
  onClose,
}: {
  achievement: Achievement
  onClose: () => void
}) {
  const catColors = CATEGORY_COLORS[achievement.category]
  const Icon = CATEGORY_ICONS[achievement.category]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-alabaster rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-midnight/10 flex items-center justify-center text-midnight hover:bg-midnight/20 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          {/* Category Tag */}
          <div className={`absolute bottom-4 left-4 flex items-center gap-1.5 ${catColors.bg} ${catColors.text} px-4 py-1.5 rounded-full text-sm font-semibold`}>
            <Icon size={14} />
            {achievement.category}
          </div>
          {achievement.isTopAchiever && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-maroon text-alabaster px-4 py-1.5 rounded-full text-sm font-semibold">
              <Trophy size={14} />
              Top Achiever
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif font-bold text-2xl text-midnight mb-2">
            {achievement.title}
          </h3>
          <p className="text-midnight/60 text-sm mb-4">
            {achievement.students.join(", ")} • {achievement.year}
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-maroon text-xs font-semibold uppercase tracking-wider mb-1">Description</p>
              <p className="text-midnight/80 text-sm leading-relaxed">{achievement.description}</p>
            </div>

            <div>
              <p className="text-maroon text-xs font-semibold uppercase tracking-wider mb-2">Skills Used</p>
              <div className="flex flex-wrap gap-2">
                {achievement.skills.map((skill) => (
                  <span key={skill} className="text-xs bg-midnight/10 text-midnight px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-tan/60">
              <p className="text-maroon text-xs font-semibold uppercase tracking-wider mb-1">Outcome</p>
              <p className="font-serif font-bold text-lg text-midnight">{achievement.outcome}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
