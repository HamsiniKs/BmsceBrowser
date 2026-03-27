"use client"

import { ClientNavbar } from "@/components/client-navbar"
import { Footer } from "@/components/footer"
import { Building2, Users, TrendingUp, Briefcase } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const recruiters = [
  // IT / Software
  { name: "Accenture", category: "IT Services", logo: "https://logo.clearbit.com/accenture.com" },
  { name: "TCS", category: "IT Services", logo: "https://logo.clearbit.com/tcs.com" },
  { name: "Infosys", category: "IT Services", logo: "https://logo.clearbit.com/infosys.com" },
  { name: "Wipro", category: "IT Services", logo: "https://logo.clearbit.com/wipro.com" },
  { name: "HCL", category: "IT Services", logo: "https://logo.clearbit.com/hcltech.com" },
  { name: "IBM", category: "Technology", logo: "https://logo.clearbit.com/ibm.com" },
  { name: "Cognizant", category: "IT Services", logo: "https://logo.clearbit.com/cognizant.com" },
  { name: "Tech Mahindra", category: "IT Services", logo: "https://logo.clearbit.com/techmahindra.com" },
  
  // Product Companies
  { name: "Amazon", category: "Product", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "Microsoft", category: "Product", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Google", category: "Product", logo: "https://logo.clearbit.com/google.com" },
  { name: "Oracle", category: "Product", logo: "https://logo.clearbit.com/oracle.com" },
  { name: "Dell", category: "Product", logo: "https://logo.clearbit.com/dell.com" },
  { name: "HP", category: "Product", logo: "https://logo.clearbit.com/hp.com" },
  { name: "Intel", category: "Product", logo: "https://logo.clearbit.com/intel.com" },
  { name: "Nokia", category: "Product", logo: "https://logo.clearbit.com/nokia.com" },
  
  // Consulting / Finance
  { name: "Deloitte", category: "Consulting", logo: "https://logo.clearbit.com/deloitte.com" },
  { name: "EY", category: "Consulting", logo: "https://logo.clearbit.com/ey.com" },
  { name: "KPMG", category: "Consulting", logo: "https://logo.clearbit.com/kpmg.com" },
  { name: "PwC", category: "Consulting", logo: "https://logo.clearbit.com/pwc.com" },
  
  // Core Engineering
  { name: "Bosch", category: "Engineering", logo: "https://logo.clearbit.com/bosch.com" },
  { name: "Siemens", category: "Engineering", logo: "https://logo.clearbit.com/siemens.com" },
  { name: "Texas Instruments", category: "Engineering", logo: "https://logo.clearbit.com/ti.com" },
  { name: "L&T", category: "Engineering", logo: "https://logo.clearbit.com/larsentoubro.com" },
  
  // Startups / Others
  { name: "Cred", category: "Startup", logo: "https://logo.clearbit.com/cred.club" },
  { name: "Byju's", category: "EdTech", logo: "https://logo.clearbit.com/byjus.com" },
  { name: "Adani", category: "Conglomerate", logo: "https://logo.clearbit.com/adani.com" },
  { name: "Capgemini", category: "IT Services", logo: "https://logo.clearbit.com/capgemini.com" },
  { name: "Mphasis", category: "IT Services", logo: "https://logo.clearbit.com/mphasis.com" },
  { name: "Mindtree", category: "IT Services", logo: "https://logo.clearbit.com/mindtree.com" },
]

const categories = ["All", "IT Services", "Product", "Consulting", "Engineering", "Startup", "EdTech", "Conglomerate"]

function RecruiterLogo({ name, logo }: { name: string; logo: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <span className="font-bold text-midnight text-lg">{name.charAt(0)}</span>
    )
  }

  return (
    <Image
      src={logo}
      alt={name}
      width={48}
      height={48}
      className="object-contain group-hover:scale-110 transition-transform"
      onError={() => setError(true)}
    />
  )
}

const stats = [
  { label: "Recruiting Companies", value: "312+", icon: Building2 },
  { label: "Students Placed (2022)", value: "728", icon: Users },
  { label: "Highest Package", value: "₹44.10 LPA", icon: TrendingUp },
  { label: "Job Offers", value: "1100+", icon: Briefcase },
]

export default function RecruitersPage() {
  return (
    <main className="min-h-screen bg-alabaster">
      <ClientNavbar variant="solid" />
      
      <div className="pt-8 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Our Recruiters</p>
            <h1 className="font-serif font-black text-4xl md:text-5xl text-midnight text-balance">
              Companies That Hire From BMSIT
            </h1>
            <p className="text-midnight/60 mt-4 max-w-2xl">
              Over 300+ organizations regularly visit our campus for recruitment drives. Our alumni work at leading 
              companies across IT, consulting, engineering, and finance sectors worldwide.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-midnight rounded-2xl p-5">
                  <Icon className="w-5 h-5 text-lightblue mb-3" strokeWidth={1.5} />
                  <p className="font-serif font-black text-2xl text-alabaster">{stat.value}</p>
                  <p className="text-tan/70 text-xs mt-0.5">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === "All" 
                    ? "bg-maroon text-alabaster" 
                    : "bg-midnight/10 text-midnight hover:bg-midnight/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Recruiters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recruiters.map((recruiter) => (
              <div
                key={recruiter.name}
                className="bg-white rounded-2xl p-6 border border-tan/20 hover:border-maroon/30 hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-xl bg-midnight/5 flex items-center justify-center overflow-hidden">
                  <RecruiterLogo name={recruiter.name} logo={recruiter.logo} />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-midnight text-sm">{recruiter.name}</p>
                  <p className="text-midnight/50 text-xs mt-0.5">{recruiter.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-midnight rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-alabaster mb-4">
              Want to Recruit From BMSIT?
            </h2>
            <p className="text-tan/70 max-w-xl mx-auto mb-6">
              Partner with us for your campus recruitment needs. Contact our Training & Placement Cell to schedule a visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:placement@bmsit.in"
                className="bg-maroon text-alabaster px-6 py-3 rounded-full font-semibold text-sm hover:bg-maroon-light transition-colors"
              >
                Contact Placement Cell
              </a>
              <a
                href="tel:+919980432684"
                className="bg-white/10 text-alabaster px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                Call: +91 9980432684
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
