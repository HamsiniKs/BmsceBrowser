// Mock data for the university website

export const universityStats = {
  name: "Premier Institute of Technology",
  established: 1998,
  totalPlacements: 4850,
  averagePackage: 12.5,
  highestPackage: 42,
  companies: 450,
};

export const placementStats = [
  { year: 2020, placements: 3200, avgPackage: 8.5 },
  { year: 2021, placements: 3600, avgPackage: 9.8 },
  { year: 2022, placements: 4100, avgPackage: 11.2 },
  { year: 2023, placements: 4500, avgPackage: 12.1 },
  { year: 2024, placements: 4850, avgPackage: 12.5 },
];

export const branchPlacementData = [
  { branch: "Computer Science", placed: 850, total: 860, avgPackage: 14.2 },
  { branch: "Electronics & Comm", placed: 720, total: 750, avgPackage: 11.8 },
  { branch: "Mechanical", placed: 680, total: 700, avgPackage: 10.5 },
  { branch: "Civil", placed: 580, total: 620, avgPackage: 9.2 },
  { branch: "Electrical", placed: 650, total: 680, avgPackage: 11.1 },
];

export const stateWisePlacementData = {
  "Maharashtra": { placements: 1200, avgPackage: 13.5, cities: ["Mumbai", "Pune", "Nagpur"] },
  "Delhi": { placements: 850, avgPackage: 14.2, cities: ["Delhi", "Noida", "Gurgaon"] },
  "Bangalore": { placements: 920, avgPackage: 13.8, cities: ["Bangalore", "Whitefield"] },
  "Hyderabad": { placements: 780, avgPackage: 12.9, cities: ["Hyderabad", "Secunderabad"] },
  "Pune": { placements: 650, avgPackage: 12.1, cities: ["Pune", "Hinjewadi"] },
  "Chennai": { placements: 450, avgPackage: 11.5, cities: ["Chennai", "OMR"] },
};

export const topCompanies = [
  { name: "TCS", packages: [8, 10, 12, 14], count: 320 },
  { name: "Infosys", packages: [9, 11, 13, 15], count: 280 },
  { name: "Wipro", packages: [8, 10, 12, 14], count: 250 },
  { name: "Google", packages: [18, 22, 25, 28], count: 45 },
  { name: "Microsoft", packages: [16, 20, 24, 27], count: 52 },
  { name: "Amazon", packages: [15, 19, 23, 26], count: 48 },
  { name: "Adobe", packages: [14, 18, 22, 25], count: 35 },
  { name: "Goldman Sachs", packages: [20, 24, 28, 32], count: 28 },
];

export const faculty = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    department: "Computer Science",
    specialization: "AI & Machine Learning",
    experience: 15,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Prof. Anjali Singh",
    department: "Electronics",
    specialization: "Signal Processing",
    experience: 12,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Arjun Patel",
    department: "Mechanical",
    specialization: "Robotics & Automation",
    experience: 18,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Prof. Meera Sharma",
    department: "Civil",
    specialization: "Structural Engineering",
    experience: 14,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Dr. Vikram Gupta",
    department: "Electrical",
    specialization: "Power Systems",
    experience: 16,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Prof. Priya Verma",
    department: "Computer Science",
    specialization: "Cloud Computing",
    experience: 10,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
];

export const alumni = [
  {
    id: 1,
    name: "Aditya Sharma",
    batch: 2015,
    currentRole: "Senior Software Engineer",
    company: "Google",
    currentLocation: "Mountain View",
    journey: [
      { year: 2015, role: "Graduate", company: "Campus" },
      { year: 2017, role: "Software Engineer", company: "TCS", location: "Bangalore" },
      { year: 2019, role: "Senior Engineer", company: "Amazon", location: "Seattle" },
      { year: 2022, role: "Senior Software Engineer", company: "Google", location: "Mountain View" },
    ],
  },
  {
    id: 2,
    name: "Neha Desai",
    batch: 2014,
    currentRole: "Product Manager",
    company: "Microsoft",
    currentLocation: "Seattle",
    journey: [
      { year: 2014, role: "Graduate", company: "Campus" },
      { year: 2016, role: "Associate", company: "Flipkart", location: "Bangalore" },
      { year: 2018, role: "Senior Associate", company: "Adobe", location: "Bangalore" },
      { year: 2020, role: "Product Manager", company: "Microsoft", location: "Seattle" },
    ],
  },
  {
    id: 3,
    name: "Rajesh Singh",
    batch: 2016,
    currentRole: "Startup Founder",
    company: "TechVenture",
    currentLocation: "Bangalore",
    journey: [
      { year: 2016, role: "Graduate", company: "Campus" },
      { year: 2017, role: "Software Engineer", company: "Flipkart", location: "Bangalore" },
      { year: 2019, role: "Tech Lead", company: "Flipkart", location: "Bangalore" },
      { year: 2021, role: "Startup Founder", company: "TechVenture", location: "Bangalore" },
    ],
  },
];

export const seatAvailability = {
  library: {
    zones: [
      { id: "A1", occupied: true, occupant: "Student 1" },
      { id: "A2", occupied: false, occupant: null },
      { id: "A3", occupied: true, occupant: "Student 2" },
      { id: "A4", occupied: false, occupant: null },
      { id: "B1", occupied: false, occupant: null },
      { id: "B2", occupied: true, occupant: "Student 3" },
      { id: "B3", occupied: false, occupant: null },
      { id: "B4", occupied: true, occupant: "Student 4" },
      { id: "C1", occupied: true, occupant: "Student 5" },
      { id: "C2", occupied: false, occupant: null },
      { id: "C3", occupied: false, occupant: null },
      { id: "C4", occupied: true, occupant: "Student 6" },
    ],
    amenities: ["WiFi", "Power Outlet", "Air Conditioning"],
  },
  canteen: {
    zones: [
      { id: "T1", occupied: true, occupant: "Group 1" },
      { id: "T2", occupied: false, occupant: null },
      { id: "T3", occupied: false, occupant: null },
      { id: "T4", occupied: true, occupant: "Group 2" },
      { id: "T5", occupied: false, occupant: null },
      { id: "T6", occupied: true, occupant: "Group 3" },
      { id: "T7", occupied: false, occupant: null },
      { id: "T8", occupied: false, occupant: null },
    ],
    amenities: ["Seating", "WiFi", "Charging"],
  },
};
