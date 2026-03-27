"use client"

import { Building2, Users, Award, GraduationCap, Wifi, Leaf, BookOpen, FlaskConical } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="bg-midnight py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lightblue font-medium text-sm uppercase tracking-widest mb-2">About Us</p>
          <h2 className="font-serif font-black text-4xl md:text-5xl text-white text-balance">
            Institute Profile
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - About Story */}
          <div className="space-y-6">
            <div className="bg-midnight-light/50 rounded-2xl p-8 border border-tan/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-maroon flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-tan text-sm font-medium">Educating Since</p>
                  <p className="text-white text-2xl font-bold">1946</p>
                </div>
              </div>
              
              <p className="text-tan/90 leading-relaxed text-sm mb-4">
                BMSIT&amp;M, an institution with a class of its own, is one of the most sought after institutes for high quality engineering education in the state. It is a well established private engineering college in Bangalore recognized by the AICTE, Government of India and is affiliated to the Visvesvaraya Technological University (VTU), Belagavi.
              </p>
              
              <p className="text-tan/90 leading-relaxed text-sm">
                With its modern infrastructure, highly qualified and committed faculty, and active industry engagement, the institute has been recognised as an &quot;Emerging Technical Institute in the state of Karnataka&quot; by the VTU.
              </p>
              
              <div className="my-6 border-t border-tan/20" />
              
              <div className="bg-maroon/20 rounded-xl p-4 border border-maroon/30">
                <p className="text-white text-sm font-medium text-center italic">
                  &quot;AICTE has given a zero deficiency report for the institute&quot;
                </p>
              </div>
            </div>

            {/* Institute Ambience */}
            <div className="bg-tan/10 rounded-xl p-6 border border-tan/20">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-lightblue" />
                Institute Ambience
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-lightblue/20 flex items-center justify-center">
                    <Wifi className="w-4 h-4 text-lightblue" />
                  </div>
                  <p className="text-tan/80 text-xs">Green, plastic-free and wi-fi enabled campus</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-lightblue/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-lightblue" />
                  </div>
                  <p className="text-tan/80 text-xs">Multi-cultural learning environment with focus on promoting student communities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Programs & Research */}
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

            {/* Academic Programs */}
            <div className="bg-midnight-light/50 rounded-xl p-6 border border-tan/20">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-lightblue" />
                Academic Programs
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-maroon/30 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-maroon-light" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs">Undergraduate Programs</p>
                    <p className="text-tan/70 text-xs mt-1">Seven undergraduate courses with VTU affiliation laying the foundation for great careers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-lightblue/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-lightblue" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs">Postgraduate Programs</p>
                    <p className="text-tan/70 text-xs mt-1">Three master&apos;s degree programs to transform existing careers into something brilliant.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research */}
            <div className="bg-maroon/20 rounded-xl p-6 border border-maroon/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-maroon flex items-center justify-center shrink-0">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-2">Research Excellence</p>
                  <p className="text-tan/80 text-xs leading-relaxed">
                    Most departments are recognised as research centres by VTU since 2005, making BMSIT&amp;M one of the most promising research houses in the country.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-midnight-light/30 rounded-xl border border-tan/10">
                <p className="text-white font-black text-2xl">7</p>
                <p className="text-tan/60 text-xs mt-1">UG Programs</p>
              </div>
              <div className="text-center p-4 bg-midnight-light/30 rounded-xl border border-tan/10">
                <p className="text-white font-black text-2xl">3</p>
                <p className="text-tan/60 text-xs mt-1">PG Programs</p>
              </div>
              <div className="text-center p-4 bg-midnight-light/30 rounded-xl border border-tan/10">
                <p className="text-white font-black text-2xl">A</p>
                <p className="text-tan/60 text-xs mt-1">NAAC Grade</p>
              </div>
            </div>

            {/* Accreditations */}
            <div className="bg-tan/5 rounded-xl p-4 border border-tan/10">
              <p className="text-tan/60 text-xs text-center leading-relaxed">
                NAAC &apos;A&apos; Grade Accredited | 7 UG &amp; 2 PG Programs NBA Accredited | UGC Recognized under Section 12B | Permanent VTU Affiliation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
