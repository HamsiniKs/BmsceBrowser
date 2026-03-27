// Club data — all 18 BMSIT clubs
export type Category = "Tech" | "Cultural" | "Social" | "Academic"

export interface Club {
  id: string
  name: string
  category: Category
  shortDescription: string
  description: string
  activities: string[]
  events: string[]
  memberCount: number
  color: string
  bgPattern: string
  image: string // path to club image
}

export const CLUBS: Club[] = [
  {
    id: "coding-club",
    name: "Coding Club",
    category: "Tech",
    shortDescription: "Competitive programming, hackathons, and DSA excellence.",
    description:
      "The Coding Club is the hub for competitive programmers and software enthusiasts. Members participate in national and international coding contests, build real-world projects, and mentor peers on data structures and algorithms.",
    activities: ["LeetCode weekly sprints", "Internal hackathons", "Peer DSA workshops", "Open-source contributions"],
    events: ["BMS Code Relay", "Hackfest 2025", "Inter-college CodeWars"],
    memberCount: 340,
    color: "#0F414A",
    bgPattern: "tech",
    image: "/clubs/coding-club.jpg",
  },
  {
    id: "genai-club",
    name: "GenAI Club",
    category: "Tech",
    shortDescription: "Exploring generative AI, LLMs, and responsible AI development.",
    description:
      "The GenAI Club brings together students fascinated by large language models, image synthesis, and responsible AI. Regular paper-reading sessions, build-alongs, and invited industry talks keep members at the cutting edge.",
    activities: ["Paper reading circles", "Prompt engineering labs", "AI build-alongs", "Ethics in AI panels"],
    events: ["GenAI Showcase", "Prompt Olympiad", "LLM Fine-Tuning Workshop"],
    memberCount: 210,
    color: "#0F414A",
    bgPattern: "tech",
    image: "/clubs/genai-club.jpg",
  },
  {
    id: "ar-vr-hub",
    name: "AR & VR Hub",
    category: "Tech",
    shortDescription: "Building immersive experiences with Unity, Unreal, and WebXR.",
    description:
      "The AR & VR Hub is where imagination meets hardware. Members design and build extended-reality applications ranging from campus virtual tours to medical training simulations using Meta Quest, HoloLens, and browser-based WebXR.",
    activities: ["Unity/Unreal workshops", "XR prototyping sprints", "Hardware demo days", "Guest lectures from XR studios"],
    events: ["ImmerseFest", "XR Game Jam", "Virtual Campus Tour Launch"],
    memberCount: 130,
    color: "#0F414A",
    bgPattern: "tech",
    image: "/clubs/arvr-club.jpg",
  },
  {
    id: "oscode-club",
    name: "OSCode Club",
    category: "Tech",
    shortDescription: "Open-source culture, Git mastery, and community contribution.",
    description:
      "OSCode is the open-source wing of BMSIT. Members contribute to real GitHub repositories, participate in programmes like Google Summer of Code, and run beginner-friendly workshops to onboard freshers to the open-source ecosystem.",
    activities: ["Git & GitHub bootcamps", "GSoC prep sessions", "First-PR drives", "Project maintenance rotations"],
    events: ["Hacktoberfest Drive", "OSCode Summit", "Open Source Day"],
    memberCount: 185,
    color: "#0F414A",
    bgPattern: "tech",
    image: "/clubs/coding-club.jpg",
  },
  {
    id: "drama-club",
    name: "Drama Club",
    category: "Cultural",
    shortDescription: "Stage performances, street plays, and theatrical storytelling.",
    description:
      "The Drama Club is BMSIT's oldest performing arts collective. From Shakespearean adaptations to hard-hitting street plays on social issues, the club nurtures confident performers and backstage wizards alike.",
    activities: ["Script writing workshops", "Improv sessions", "Stage direction training", "Costume & set design"],
    events: ["Annual Play Festival", "Street Play at Fest", "Inter-college Drama Competition"],
    memberCount: 95,
    color: "#7F0303",
    bgPattern: "cultural",
    image: "/clubs/drama-club.jpg",
  },
  {
    id: "photography-club",
    name: "Photography Club",
    category: "Cultural",
    shortDescription: "Visual storytelling through lens, light, and composition.",
    description:
      "From golden-hour campus shots to candid event coverage, the Photography Club hones the eye and technique of aspiring visual artists. Members learn both digital and film photography and contribute to the college's visual archive.",
    activities: ["Photowalks", "Lightroom & Photoshop sessions", "Theme-based contests", "Exhibition curation"],
    events: ["Shutter Stories Exhibition", "365 Project", "Fest Coverage Drive"],
    memberCount: 160,
    color: "#7F0303",
    bgPattern: "cultural",
    image: "/clubs/photography-club.jpg",
  },
  {
    id: "literary-society",
    name: "Literary Society",
    category: "Cultural",
    shortDescription: "Poetry, prose, debates, and the written word in all forms.",
    description:
      "The Literary Society is for those who live between the pages. Members debate ideas, share original poetry, dissect books in reading circles, and publish the college's annual literary magazine, Inkwell.",
    activities: ["Creative writing workshops", "Book club meetings", "Spoken word open mics", "Debate prep sessions"],
    events: ["Inkwell Literary Fest", "Model UN", "Crossword Championship"],
    memberCount: 112,
    color: "#7F0303",
    bgPattern: "cultural",
    image: "/clubs/literary-club.jpg",
  },
  {
    id: "headspace",
    name: "HEADSPACE",
    category: "Cultural",
    shortDescription: "The podcast and conversation club — ideas worth hearing.",
    description:
      "HEADSPACE is a club built around the art of conversation. Members produce original podcasts, host panel discussions on topical issues, and practise the craft of long-form audio storytelling.",
    activities: ["Podcast production workshops", "Live panel recordings", "Storytelling circles", "Audio editing sessions"],
    events: ["BMS Talks Live", "Podcast Showcase", "Conversationalist of the Year"],
    memberCount: 78,
    color: "#7F0303",
    bgPattern: "cultural",
    image: "/clubs/cultural-club.jpg",
  },
  {
    id: "nss",
    name: "NSS",
    category: "Social",
    shortDescription: "National Service Scheme — community outreach and social impact.",
    description:
      "The NSS unit at BMSIT organises large-scale community service campaigns including blood donation drives, village adoption programmes, disaster relief volunteering, and environmental awareness initiatives.",
    activities: ["Blood donation camps", "Village upliftment drives", "Tree plantation", "Literacy campaigns"],
    events: ["Annual Special Camp", "NSS Day Celebration", "Swachh Bharat Drive"],
    memberCount: 420,
    color: "#96C0CE",
    bgPattern: "social",
    image: "/clubs/nss-club.jpg",
  },
  {
    id: "ncc",
    name: "NCC",
    category: "Social",
    shortDescription: "National Cadet Corps — discipline, leadership, and service.",
    description:
      "The NCC wing develops disciplined, patriotic young leaders through drill, adventure activities, and civil service. Cadets compete in national-level camps and earn certificates that carry significant weight in government and defence placements.",
    activities: ["Weekly parade drills", "Trekking and adventure camps", "Shooting practice", "Disaster management training"],
    events: ["Republic Day Camp", "Vayu Sainik Camp", "Annual Training Camp"],
    memberCount: 200,
    color: "#96C0CE",
    bgPattern: "social",
    image: "/clubs/ncc-club.jpg",
  },
  {
    id: "joy-of-giving",
    name: "Joy of Giving Club",
    category: "Social",
    shortDescription: "Channelling empathy into action for underserved communities.",
    description:
      "The Joy of Giving Club connects students with orphanages, old-age homes, and rural schools to volunteer, fundraise, and run skill-development workshops. Every semester culminates in a giving week that mobilises the entire campus.",
    activities: ["Fundraising drives", "Orphanage visits", "Skill workshops for underprivileged", "Waste-free campus campaigns"],
    events: ["Giving Week", "Diwali with Kids", "Teach & Learn Camp"],
    memberCount: 145,
    color: "#96C0CE",
    bgPattern: "social",
    image: "/clubs/nss-club.jpg",
  },
  {
    id: "gender-champion",
    name: "Gender Champion Cell",
    category: "Social",
    shortDescription: "Championing gender equity, inclusion, and safe spaces on campus.",
    description:
      "The Gender Champion Cell drives awareness around gender equity, mental well-being, and safe campus culture. The cell organises sensitisation workshops, support circles, and partners with external NGOs to amplify its reach.",
    activities: ["Sensitisation workshops", "Peer support circles", "Policy advocacy", "Awareness campaigns"],
    events: ["Gender Equity Week", "Mental Health Fair", "She Speaks Panel"],
    memberCount: 90,
    color: "#96C0CE",
    bgPattern: "social",
    image: "/clubs/ncc-club.jpg",
  },
  {
    id: "bmsei",
    name: "BMSEI Club",
    category: "Academic",
    shortDescription: "IEEE student branch for electronics and innovation.",
    description:
      "The BMSEI Club is the IEEE student branch of BMSIT, focused on electronics, embedded systems, and innovation. Members attend IEEE conferences, publish student papers, and collaborate on hardware projects.",
    activities: ["PCB design workshops", "Embedded systems labs", "IEEE paper presentations", "Industry site visits"],
    events: ["Circuit Clash", "IEEE Day Celebration", "Project Expo"],
    memberCount: 175,
    color: "#D8BA98",
    bgPattern: "academic",
    image: "/clubs/academic-club.jpg",
  },
  {
    id: "ice-chapter",
    name: "ICE Student Chapter",
    category: "Academic",
    shortDescription: "Instrumentation, control, and electronics engineering excellence.",
    description:
      "The ICE Student Chapter serves the instrumentation and control engineering community at BMSIT. It bridges classroom theory and industrial practice through guest lectures, plant visits, and project challenges.",
    activities: ["Industrial automation workshops", "PLC and SCADA training", "Research paper reviews", "Technical quiz competitions"],
    events: ["Instruments Expo", "Control Systems Symposium", "Industry Connect Day"],
    memberCount: 110,
    color: "#D8BA98",
    bgPattern: "academic",
    image: "/clubs/academic-club.jpg",
  },
  {
    id: "bis-club",
    name: "BIS Club",
    category: "Academic",
    shortDescription: "Standards, quality, and the Bureau of Indian Standards ecosystem.",
    description:
      "The BIS Club is BMSIT's official Bureau of Indian Standards student chapter. Members learn about quality standards, certification processes, and participate in national BIS quizzes and innovation challenges.",
    activities: ["Standards awareness sessions", "BIS quiz prep", "Quality management workshops", "Certification drives"],
    events: ["National Standards Conclave", "BIS Quiz Championship", "World Standards Day"],
    memberCount: 65,
    color: "#D8BA98",
    bgPattern: "academic",
    image: "/clubs/academic-club.jpg",
  },
  {
    id: "motorheads",
    name: "Motorheads Club",
    category: "Tech",
    shortDescription: "Automotive engineering, EV builds, and motorsport passion.",
    description:
      "Motorheads is for those who speak in torque and RPM. The club designs and builds go-karts, electric vehicles, and participates in national competitions like BAJA SAE and Formula Bharat.",
    activities: ["Vehicle design sprints", "Workshop Saturdays", "EV conversion projects", "Motorsport film screenings"],
    events: ["BMSIT Motor Show", "BAJA SAE Qualifier", "EV Design Challenge"],
    memberCount: 140,
    color: "#0F414A",
    bgPattern: "tech",
    image: "/clubs/robotics-club.jpg",
  },
  {
    id: "quizcraft",
    name: "Quizcraft Club",
    category: "Academic",
    shortDescription: "General knowledge, trivia mastery, and inter-college quiz glory.",
    description:
      "Quizcraft trains and fields BMSIT's best minds in quizzing circuits across Bangalore and beyond. Weekly practice sessions cover science, current affairs, sports, and pop culture, producing consistent prize-winners at city-level quizzes.",
    activities: ["Weekly practice rounds", "Current affairs daily digests", "Theme quizzes", "Mentorship by alumni quizzers"],
    events: ["BMSIT Open Quiz", "Bangalore Quiz Circuit", "National Knowledge Challenge"],
    memberCount: 88,
    color: "#D8BA98",
    bgPattern: "academic",
    image: "/clubs/literary-club.jpg",
  },
  {
    id: "cultural-club",
    name: "Cultural Club",
    category: "Cultural",
    shortDescription: "Music, dance, and the beating heart of BMSIT's fest culture.",
    description:
      "The Cultural Club is the umbrella body for all performing arts at BMSIT. It coordinates the annual cultural festival, manages dance and music ensembles, and ensures every student finds a creative home on campus.",
    activities: ["Choreography workshops", "Jam sessions", "Fest planning committees", "Talent hunt shows"],
    events: ["Utsav — Annual Cultural Fest", "Freshers Night", "Battle of Bands"],
    memberCount: 380,
    color: "#7F0303",
    bgPattern: "cultural",
    image: "/clubs/cultural-club.jpg",
  },
]
