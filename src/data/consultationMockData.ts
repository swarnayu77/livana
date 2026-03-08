export type Nutritionist = {
  id: string;
  name: string;
  photo: string;
  qualification: string;
  certifications: string[];
  yearsExperience: number;
  specializations: string[];
  languages: string[];
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  bio: string;
  availability: { day: string; slots: string[] }[];
  verified: boolean;
};

export type Appointment = {
  id: string;
  nutritionistId: string;
  nutritionist: string;
  nutritionistPhoto: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  meetingLink?: string;
  specialization: string;
  dietPlan?: { name: string; url: string };
};

export type Review = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
};

export const specializations = [
  "Weight Loss",
  "Sports Nutrition",
  "Diabetic Diet",
  "Gut Health",
  "Vegetarian Diet",
  "PCOS/PCOD",
  "Prenatal Nutrition",
  "Heart Health",
  "Keto/Low Carb",
  "Clinical Nutrition",
];

export const languages = ["English", "Hindi", "Spanish", "French", "Arabic", "Mandarin"];

export const nutritionists: Nutritionist[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    qualification: "PhD in Clinical Nutrition",
    certifications: ["Certified Nutrition Specialist", "Board Certified in Holistic Nutrition"],
    yearsExperience: 12,
    specializations: ["Weight Loss", "Gut Health", "Clinical Nutrition"],
    languages: ["English", "Spanish"],
    price: 75,
    currency: "USD",
    rating: 4.9,
    reviewCount: 234,
    bio: "Passionate about helping people transform their health through evidence-based nutrition strategies. Specializing in sustainable weight management and gut health optimization.",
    availability: [
      { day: "Monday", slots: ["09:00", "10:00", "14:00", "15:00"] },
      { day: "Wednesday", slots: ["09:00", "11:00", "14:00", "16:00"] },
      { day: "Friday", slots: ["10:00", "11:00", "13:00", "15:00"] },
    ],
    verified: true,
  },
  {
    id: "2",
    name: "Dr. Arjun Patel",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    qualification: "MSc Sports Nutrition",
    certifications: ["ISSN Certified", "Precision Nutrition Level 2"],
    yearsExperience: 8,
    specializations: ["Sports Nutrition", "Keto/Low Carb", "Weight Loss"],
    languages: ["English", "Hindi"],
    price: 60,
    currency: "USD",
    rating: 4.8,
    reviewCount: 187,
    bio: "Former athlete turned nutritionist. I help athletes and fitness enthusiasts fuel their performance with science-backed nutrition protocols.",
    availability: [
      { day: "Tuesday", slots: ["08:00", "10:00", "14:00", "16:00"] },
      { day: "Thursday", slots: ["09:00", "11:00", "15:00", "17:00"] },
      { day: "Saturday", slots: ["09:00", "10:00", "11:00"] },
    ],
    verified: true,
  },
  {
    id: "3",
    name: "Dr. Emily Chen",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964d31e?w=300&h=300&fit=crop&crop=face",
    qualification: "MD, Registered Dietitian",
    certifications: ["Academy of Nutrition and Dietetics", "Certified Diabetes Educator"],
    yearsExperience: 15,
    specializations: ["Diabetic Diet", "Heart Health", "Clinical Nutrition"],
    languages: ["English", "Mandarin"],
    price: 90,
    currency: "USD",
    rating: 4.95,
    reviewCount: 312,
    bio: "Board-certified physician and registered dietitian with 15 years of experience managing chronic conditions through therapeutic nutrition interventions.",
    availability: [
      { day: "Monday", slots: ["10:00", "11:00", "14:00"] },
      { day: "Wednesday", slots: ["09:00", "10:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["09:00", "11:00", "14:00"] },
    ],
    verified: true,
  },
  {
    id: "4",
    name: "Priya Sharma",
    photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=face",
    qualification: "MSc Nutrition & Dietetics",
    certifications: ["Indian Dietetic Association", "Certified in PCOS Nutrition"],
    yearsExperience: 6,
    specializations: ["PCOS/PCOD", "Vegetarian Diet", "Gut Health"],
    languages: ["English", "Hindi"],
    price: 45,
    currency: "USD",
    rating: 4.7,
    reviewCount: 145,
    bio: "Specialized in managing hormonal health through plant-based nutrition. Helping women with PCOS achieve hormonal balance naturally.",
    availability: [
      { day: "Monday", slots: ["09:00", "11:00", "15:00", "17:00"] },
      { day: "Tuesday", slots: ["10:00", "14:00", "16:00"] },
      { day: "Thursday", slots: ["09:00", "11:00", "14:00", "16:00"] },
      { day: "Saturday", slots: ["10:00", "11:00"] },
    ],
    verified: true,
  },
  {
    id: "5",
    name: "Dr. Marie Dubois",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    qualification: "PhD Nutritional Science",
    certifications: ["European Federation of Dietetic Associations", "Prenatal Nutrition Specialist"],
    yearsExperience: 10,
    specializations: ["Prenatal Nutrition", "Weight Loss", "Heart Health"],
    languages: ["English", "French"],
    price: 80,
    currency: "USD",
    rating: 4.85,
    reviewCount: 198,
    bio: "Dedicated to supporting mothers-to-be with optimal prenatal nutrition. Also passionate about cardiovascular health through dietary interventions.",
    availability: [
      { day: "Tuesday", slots: ["09:00", "10:00", "14:00", "15:00"] },
      { day: "Thursday", slots: ["10:00", "11:00", "15:00"] },
      { day: "Friday", slots: ["09:00", "10:00", "14:00", "16:00"] },
    ],
    verified: true,
  },
  {
    id: "6",
    name: "James Wilson",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    qualification: "BSc Nutrition, Certified Health Coach",
    certifications: ["NASM Nutrition Certification", "Integrative Health Coach"],
    yearsExperience: 5,
    specializations: ["Keto/Low Carb", "Sports Nutrition", "Weight Loss"],
    languages: ["English"],
    price: 50,
    currency: "USD",
    rating: 4.6,
    reviewCount: 98,
    bio: "Practical, no-nonsense approach to nutrition. I make healthy eating simple, sustainable, and enjoyable for busy professionals.",
    availability: [
      { day: "Monday", slots: ["08:00", "10:00", "14:00", "16:00", "18:00"] },
      { day: "Wednesday", slots: ["08:00", "10:00", "14:00", "16:00", "18:00"] },
      { day: "Friday", slots: ["08:00", "10:00", "14:00"] },
    ],
    verified: false,
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "apt-1",
    nutritionistId: "1",
    nutritionist: "Dr. Sarah Mitchell",
    nutritionistPhoto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    date: "2026-03-15",
    time: "10:00 AM",
    status: "upcoming",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    specialization: "Weight Loss",
  },
  {
    id: "apt-2",
    nutritionistId: "3",
    nutritionist: "Dr. Emily Chen",
    nutritionistPhoto: "https://images.unsplash.com/photo-1594824476967-48c8b964d31e?w=300&h=300&fit=crop&crop=face",
    date: "2026-03-20",
    time: "02:00 PM",
    status: "upcoming",
    meetingLink: "https://meet.google.com/klm-nopq-rst",
    specialization: "Diabetic Diet",
  },
  {
    id: "apt-3",
    nutritionistId: "2",
    nutritionist: "Dr. Arjun Patel",
    nutritionistPhoto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    date: "2026-03-01",
    time: "09:00 AM",
    status: "completed",
    specialization: "Sports Nutrition",
    dietPlan: { name: "Performance Nutrition Plan", url: "#" },
  },
  {
    id: "apt-4",
    nutritionistId: "4",
    nutritionist: "Priya Sharma",
    nutritionistPhoto: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=face",
    date: "2026-02-20",
    time: "11:00 AM",
    status: "completed",
    specialization: "PCOS/PCOD",
    dietPlan: { name: "PCOS Wellness Diet", url: "#" },
  },
];

export const mockReviews: Review[] = [
  { id: "r1", user: "Ananya K.", avatar: "AK", rating: 5, comment: "Dr. Sarah completely transformed my relationship with food. Lost 12kg in 4 months!", date: "2026-02-15" },
  { id: "r2", user: "Michael R.", avatar: "MR", rating: 5, comment: "Incredibly knowledgeable and patient. The meal plans are easy to follow.", date: "2026-02-10" },
  { id: "r3", user: "Fatima H.", avatar: "FH", rating: 4, comment: "Great advice on gut health. Noticed improvements within weeks.", date: "2026-01-28" },
  { id: "r4", user: "David L.", avatar: "DL", rating: 5, comment: "Best investment in my health. The personalized approach makes all the difference.", date: "2026-01-20" },
];
