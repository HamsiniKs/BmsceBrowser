"use client"

import { Building2, Users, Award, Calendar } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="bg-midnight py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lightblue font-medium text-sm uppercase tracking-widest mb-2">About Us</p>
          <h2 className="font-serif font-black text-4xl md:text-5xl text-white text-balance">
            Our Founders
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Story */}
          <div>
            <div className="bg-midnight-light/50 rounded-2xl p-8 border border-tan/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-maroon flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-tan text-sm font-medium">Established</p>
                  <p className="text-white text-2xl font-bold">2002</p>
                </div>
              </div>
              
              <p className="text-tan/90 leading-relaxed text-sm">
                Established in 2002, BMS Institute of Technology and Management traces its roots to BMSET, the same trust that set up the first private technical institute, BMS College of Engineering.
              </p>
              
              <div className="my-6 border-t border-tan/20" />
              
              <p className="text-tan/90 leading-relaxed text-sm">
                BMSIT&amp;M is governed by BMS Educational Trust founded by <span className="text-white font-semibold">Sri B M Sreenivasaiah</span> and his illustrious son, <span className="text-white font-semibold">Sri B S Narayan</span>.
              </p>
            </div>
          </div>

          {/* Right - Stats & Highlights */}
          <div className="space-y-6">
            {/* Founder Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tan/10 rounded-xl p-5 border border-tan/20">
                <div className="w-10 h-10 rounded-full bg-lightblue/20 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-lightblue" />
                </div>
                <p className="text-white font-bold text-sm">Sri B M Sreenivasaiah</p>
                <p className="text-tan/70 text-xs mt-1">Founder, BMS Educational Trust</p>
              </div>
              <div className="bg-tan/10 rounded-xl p-5 border border-tan/20">
                <div className="w-10 h-10 rounded-full bg-maroon/30 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 text-maroon-light" />
                </div>
                <p className="text-white font-bold text-sm">Sri B S Narayan</p>
                <p className="text-tan/70 text-xs mt-1">Co-founder, BMS Educational Trust</p>
              </div>
            </div>

            {/* Legacy Card */}
            <div className="bg-maroon/20 rounded-xl p-6 border border-maroon/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-maroon flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-2">Legacy of Excellence</p>
                  <p className="text-tan/80 text-xs leading-relaxed">
                    Part of the same trust that established BMS College of Engineering, Karnataka&apos;s first private technical institute. Over two decades of shaping future engineers and technologists.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-midnight-light/30 rounded-xl border border-tan/10">
                <p className="text-white font-black text-2xl">20+</p>
                <p className="text-tan/60 text-xs mt-1">Years</p>
              </div>
              <div className="text-center p-4 bg-midnight-light/30 rounded-xl border border-tan/10">
                <p className="text-white font-black text-2xl">7</p>
                <p className="text-tan/60 text-xs mt-1">Departments</p>
              </div>
              <div className="text-center p-4 bg-midnight-light/30 rounded-xl border border-tan/10">
                <p className="text-white font-black text-2xl">5000+</p>
                <p className="text-tan/60 text-xs mt-1">Alumni</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
