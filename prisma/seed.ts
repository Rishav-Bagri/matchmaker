import { PrismaClient, Gender, MaritalStatus, FoodPreference, HabitFrequency, PersonalityType, ManglikStatus, PreferenceChoice, KidsCountPreference, MatchStatus, DateStatus, JourneyStatus } from "../src/generated/prisma"

const prisma = new PrismaClient()

const femaleFirstNames = [
  "Riya", "Divya", "Ananya", "Priya", "Sneha", "Aditi", "Pooja", "Shruti", "Neha", "Kriti",
  "Aishwarya", "Deepika", "Nisha", "Shreya", "Meera", "Kavya", "Ridhi", "Aaradhya", "Sanya", "Tanya",
  "Ishita", "Simran", "Sonali", "Preeti", "Ritu", "Payal", "Sakshi", "Kiran", "Jyoti", "Geeta",
  "Swati", "Priyanka", "Shweta", "Pallavi", "Megha", "Anjali", "Nidhi", "Prachi", "Garima", "Tanvi",
  "Suhana", "Disha", "Alia", "Kiara", "Tara", "Janhvi", "Khushi", "Muskan", "Anchal", "Mehak",
  "Zoya", "Sara", "Fatima", "Amina", "Mariam", "Aisha", "Jaspreet", "Gurpreet", "Harpreet", "Amrit",
  "Esther", "Rachel", "Sarah", "Grace", "Merlyn", "Sonia", "Komal", "Poonam", "Rashmi", "Nandini",
  "Vasudha", "Aditi", "Bhavana", "Chitra", "Damini", "Esha", "Gauri", "Himani", "Indu", "Juhi",
  "Kalyani", "Lata", "Madhu", "Nutan", "Ojasvi", "Pritha", "Roopa", "Sarita", "Urmila", "Vandana",
  "Yamini", "Kajal", "Sheetal", "Bhumika", "Rupali", "Manisha", "Seema", "Alka", "Aruna", "Kusum"
]

const maleFirstNames = [
  "Rahul", "Amit", "Kabir", "Rohan", "Arjun", "Aditya", "Aarav", "Vihaan", "Siddharth", "Vikram",
  "Anish", "Mayank", "Karan", "Varun", "Dev", "Kunwar", "Abhishek", "Manish", "Sanjay", "Vijay",
  "Rajesh", "Sandeep", "Ankit", "Gaurav", "Rishabh", "Sumit", "Nikhil", "Pranav", "Vivek", "Akash",
  "Harsh", "Piyush", "Karthik", "Hari", "Venkat", "Raghav", "Madhav", "Keshav", "Sameer", "Abhay",
  "Dhruv", "Ishaan", "Kunal", "Ayush", "Shreyas", "Yash", "Kartikey", "Rupam", "Ujjwal", "Swapnil",
  "Zayd", "Ali", "Mustafa", "Ibrahim", "Farhan", "Yusuf", "Gurmeet", "Manpreet", "Rajveer", "Dilpreet",
  "John", "David", "Thomas", "Mathew", "Luke", "Ashwin", "Balaji", "Chaitanya", "Deepak", "Eshwar",
  "Ganesh", "Himanshu", "Indrajeet", "Jatin", "Kiran", "Lalit", "Mahesh", "Naveen", "Ojas", "Pankaj",
  "Raman", "Satish", "Tarun", "Uday", "Vineet", "Yuvraj", "Abhimanyu", "Bhuvan", "Chinmay", "Dinesh",
  "Girish", "Hemant", "Jaideep", "Ketan", "Manoj", "Nitesh", "Parth", "Rajiv", "Suresh", "Tushar"
]

const lastNames = [
  "Sharma", "Mehta", "Patel", "Malhotra", "Sen", "Gupta", "Joshi", "Iyer", "Nair", "Reddy",
  "Choudhury", "Singh", "Verma", "Mishra", "Trivedi", "Shah", "Kaur", "Deshmukh", "Kulkarni", "Bose",
  "Chatterjee", "Mukherjee", "Das", "Roy", "Prasad", "Rao", "Pillai", "Menon", "Jain", "Bansal",
  "Goel", "Agarwal", "Kapoor", "Khanna", "Sari", "Grover", "Bajaj", "Rathore", "Shekhawat", "Chawla",
  "Sodhi", "Gill", "Dhillon", "Bhat", "Pandey", "Dubey", "Dwivedi", "Tripathi", "Saxena", "Srivastava",
  "Khan", "Sheikh", "Syed", "Alvi", "Hashmi", "Lobo", "D'Souza", "Fernandes", "Pinto", "Gomes",
  "Bhattacharya", "Chakraborty", "Ganguly", "Goswami", "Sarkar", "Banerjee", "Patil", "Shinde", "Jadhav", "Gaekwad",
  "Chavan", "Pawar", "Kadam", "Bhosle", "More", "Tambe", "Naidu", "Chowdary", "Shetty", "Hegde",
  "Shenoy", "Pai", "Prabhu", "Kamat", "Acharya", "Bhatia", "Sood", "Wadhwa", "Malik", "Sehgal"
]

const cities = [
  "Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata", "Gurgaon", "Noida", "Ahmedabad",
  "Jaipur", "Lucknow", "Chandigarh", "Indore", "Bhopal", "Kochi", "Coimbatore", "Dehradun", "Goa", "Mysore",
  "Surat", "Nagpur", "Bhubaneswar", "Visakhapatnam", "Guwahati", "Patna", "Ranchi", "Thiruvananthapuram", "Vadodara", "Amritsar"
]

const religions = ["Hindu", "Hindu", "Hindu", "Sikh", "Jain", "Christian", "Muslim", "Buddhist", "Parsi"]

const colleges = [
  "IIT Bombay", "BITS Pilani", "Delhi University", "IIM Ahmedabad", "St. Xavier's College",
  "VIT University", "Manipal Institute of Technology", "SRM University", "NIFT Delhi",
  "National Institute of Design (NID)", "Lady Shri Ram College", "St. Stephen's College",
  "RV College of Engineering", "AIIMS Delhi", "National Law School (NLSIU)",
  "Armed Forces Medical College (AFMC)", "National Institute of Technology (NIT)",
  "Institute of Hotel Management (IHM)", "Symbiosis Institute", "Welcomgroup Graduate School",
  "Christian Medical College (CMC)", "Government College of Fine Arts", "Film and Television Institute of India (FTII)",
  "Indira Gandhi National Forest Academy", "National Defence Academy (NDA)"
]

const hobbiesList = [
  "Reading", "Traveling", "Badminton", "Hiking", "Photography", "Chess",
  "Running", "Cooking", "Painting", "Guitar", "Yoga", "Gardening",
  "Trekking", "Swimming", "Writing", "Cycling", "Baking", "Dancing",
  "Singing", "Movies", "Gaming", "Stargazing", "Tennis", "Golf"
]

function getMotherTongue(city: string, religion: string): string {
  if (religion === "Sikh") return "Punjabi"
  if (religion === "Parsi") return "Gujarati"
  switch (city) {
    case "Chennai": return "Tamil"
    case "Hyderabad": return "Telugu"
    case "Bangalore": return "Kannada"
    case "Mumbai": return "Marathi"
    case "Kolkata": return "Bengali"
    case "Ahmedabad": case "Surat": case "Vadodara": return "Gujarati"
    case "Kochi": case "Thiruvananthapuram": return "Malayalam"
    case "Visakhapatnam": return "Telugu"
    case "Bhubaneswar": return "Odia"
    case "Guwahati": return "Assamese"
    case "Amritsar": return "Punjabi"
    case "Goa": return "Konkani"
    default: return "Hindi"
  }
}

function getCaste(religion: string, lastName: string, index: number): string | null {
  if (religion === "Sikh") {
    const sikhCastes = ["Jat", "Khatri", "Sodhi", "Gill", "Dhillon", "Grewal", "Sandhu"]
    return sikhCastes[index % sikhCastes.length]
  }
  if (religion === "Jain") {
    const jainCastes = ["Oswal", "Banya", "Shah", "Porwal", "Open"]
    return jainCastes[index % jainCastes.length]
  }
  if (religion === "Muslim") {
    const muslimSects = ["Sunni - Sheikh", "Sunni - Khan", "Shia - Syed", "Sunni - Pathan", "Sunni - Syed"]
    if (["Khan", "Sheikh", "Syed", "Alvi", "Hashmi"].includes(lastName)) return lastName
    return muslimSects[index % muslimSects.length]
  }
  if (religion === "Christian") {
    const christianDenoms = ["Roman Catholic", "Protestant", "Syrian Christian", "Orthodox"]
    if (["Lobo", "D'Souza", "Fernandes", "Pinto", "Gomes"].includes(lastName)) return "Roman Catholic"
    return christianDenoms[index % christianDenoms.length]
  }
  if (religion === "Parsi") {
    return "Zoroastrian"
  }
  if (religion === "Buddhist") {
    return "Mahayana/Neo-Buddhist"
  }
  if (religion === "Hindu") {
    const hinduCastes = ["Brahmin", "Kshatriya", "Vaishya", "Kayastha", "Khatri", "Patel", "Shah", "Nair", "Iyer", "Reddy", "Maratha", "Bania", "Saraswat Brahmin", "Vellalar"]
    if (["Sharma", "Joshi", "Trivedi", "Bhat", "Pandey", "Dubey", "Dwivedi", "Tripathi", "Acharya"].includes(lastName)) return "Brahmin"
    if (["Bhattacharya", "Chakraborty", "Ganguly", "Goswami", "Banerjee", "Chatterjee", "Mukherjee"].includes(lastName)) return "Brahmin (Bengali)"
    if (["Iyer", "Rao", "Pillai", "Iyengar"].includes(lastName)) return "Iyer"
    if (["Reddy", "Chowdary", "Naidu"].includes(lastName)) return "Reddy/Kamma"
    if (["Nair", "Menon"].includes(lastName)) return "Nair"
    if (["Patel"].includes(lastName)) return "Patel"
    if (["Shah", "Mehta", "Bajaj", "Jain", "Bansal", "Goel", "Agarwal"].includes(lastName)) return "Bania/Vaishya"
    if (["Malhotra", "Kapoor", "Khanna", "Chawla", "Grover", "Bhatia", "Sood", "Wadhwa", "Malik", "Sehgal"].includes(lastName)) return "Khatri"
    if (["Sen", "Bose", "Das", "Roy", "Sarkar"].includes(lastName)) return "Kayastha"
    if (["Patil", "Shinde", "Jadhav", "Gaekwad", "Chavan", "Pawar", "Kadam", "Bhosle", "More", "Tambe"].includes(lastName)) return "Maratha"
    if (["Shetty", "Hegde", "Shenoy", "Pai", "Prabhu", "Kamat"].includes(lastName)) return "Bunt/Saraswat"
    return hinduCastes[index % hinduCastes.length]
  }
  return null
}

interface CareerEdu {
  college: string
  degree: string
  highestQualification: string
  company: string
  designation: string
  annualIncome: number
}

function generateCareerAndEducation(index: number): CareerEdu {
  const college = colleges[index % colleges.length]
  let degree = ""
  let highestQualification = "Bachelor's Degree"
  let company = ""
  let designation = ""
  let annualIncome = 800000

  const category = index % 6 // 6 distinct professional categories
  
  if (category === 0) {
    // Category 0: Tech & AI
    degree = ["B.Tech Computer Science", "M.Tech Software Engineering", "M.S. Data Science", "PhD in Artificial Intelligence"][index % 4]
    highestQualification = degree.startsWith("B.Tech") ? "Bachelor's Degree" : degree.startsWith("PhD") ? "Doctorate" : "Master's Degree"
    company = ["Google", "Microsoft", "Amazon", "Meta", "Adobe", "Salesforce", "Cred", "Zomato"][index % 8]
    designation = ["Software Engineer", "Senior Software Engineer", "Systems Architect", "Data Scientist", "AI Researcher"][index % 5]
    annualIncome = 1500000 + (index % 10) * 350000
  } 
  else if (category === 1) {
    // Category 1: Corporate, Finance & Business
    degree = ["MBA Finance", "MBA Marketing", "B.Com Honors", "B.A. Economics", "M.Sc Financial Engineering"][index % 5]
    highestQualification = degree.startsWith("MBA") || degree.startsWith("M.Sc") ? "Master's Degree" : "Bachelor's Degree"
    company = ["McKinsey & Co", "Goldman Sachs", "Boston Consulting Group (BCG)", "HDFC Bank", "Unilever", "PwC", "Sequoia Capital"][index % 7]
    designation = ["Management Consultant", "Investment Banker", "Venture Capital Analyst", "HR Business Partner", "Marketing Director", "Operations Manager"][index % 6]
    annualIncome = 1200000 + (index % 10) * 450000
  }
  else if (category === 2) {
    // Category 2: Healthcare & Medical Sciences
    degree = ["M.B.B.S.", "M.D. Pediatrics", "M.S. General Surgery", "M.D. Cardiology", "M.Phil Clinical Psychology"][index % 5]
    highestQualification = degree.includes("M.D.") || degree.includes("M.S.") || degree.includes("M.Phil") ? "Master's Degree" : "Bachelor's Degree"
    company = ["Apollo Hospitals", "Max Healthcare", "Fortis Healthcare", "AIIMS Delhi", "CMC Vellore", "Private Practice"][index % 6]
    designation = ["Pediatrician", "General Surgeon", "Cardiologist", "Resident Doctor", "Clinical Psychologist"][index % 5]
    annualIncome = 1000000 + (index % 10) * 400000
  }
  else if (category === 3) {
    // Category 3: Design, Arts & Creative Industries
    degree = ["B.Des Communication Design", "B.Arch Architecture", "NIFT Fashion Design", "M.A. Fine Arts", "Diploma in Filmmaking"][index % 5]
    highestQualification = degree.startsWith("M.A.") ? "Master's Degree" : "Bachelor's Degree"
    company = ["Flipkart Design", "Architects Collective", "House of Anita Dongre", "Independent Studio", "Red Chillies Entertainment", "National Gallery of Modern Art"][index % 6]
    designation = ["UI/UX Designer", "Senior Architect", "Fashion Designer", "Filmmaker", "Art Curator", "Acoustic Guitarist"][index % 6]
    annualIncome = 700000 + (index % 10) * 200000
  }
  else if (category === 4) {
    // Category 4: Government, Law & Defense Services
    degree = ["B.A. LL.B. (Hons)", "M.A. Public Administration", "B.Sc Forestry", "B.A. Military Studies"][index % 4]
    highestQualification = degree.includes("M.A.") ? "Master's Degree" : "Bachelor's Degree"
    company = ["Government of India (IAS)", "Indian Army", "Indian Navy", "Supreme Court of India", "State Judicial Services"][index % 5]
    designation = ["IAS Officer / Assistant Commissioner", "Indian Army Captain", "Navy Lieutenant", "Corporate Lawyer", "Public Prosecutor"][index % 5]
    annualIncome = 900000 + (index % 10) * 150000
  }
  else {
    // Category 5: Education, Hospitality, Journalism & Aviation
    degree = ["B.Sc Hospitality Management", "B.A. Journalism", "M.A. Education", "Commercial Pilot License (CPL)"][index % 4]
    highestQualification = degree.startsWith("M.A.") ? "Master's Degree" : "Bachelor's Degree"
    company = ["Indigo Airlines", "Taj Hotels", "The Times of India", "Ashoka University", "Teach For India (NGO)", "Cult.fit"][index % 6]
    designation = ["Commercial Pilot / First Officer", "Executive Sous Chef", "Investigative Journalist", "Assistant Professor", "NGO Director", "Fitness Coach / Head Trainer"][index % 6]
    annualIncome = 800000 + (index % 10) * 250000
  }

  return { college, degree, highestQualification, company, designation, annualIncome }
}

function getHobbies(index: number): string[] {
  const h1 = hobbiesList[index % hobbiesList.length]
  const h2 = hobbiesList[(index + 5) % hobbiesList.length]
  const h3 = hobbiesList[(index + 11) % hobbiesList.length]
  return Array.from(new Set([h1, h2, h3]))
}

function generateAboutMe(firstName: string, designation: string, company: string, city: string, personalityType: string, hobbies: string[]): string {
  let careerSnippet = `I work as a ${designation} at ${company} in ${city}.`
  
  if (designation.includes("Pilot")) {
    careerSnippet = `I am a commercial pilot flying with ${company}, currently stationed in ${city}. I love the skies and the discipline that comes with aviation.`
  } else if (designation.includes("Army") || designation.includes("Navy")) {
    careerSnippet = `I serve as an officer in the ${company} (${designation}), currently posted at a military base. My career has taught me duty, honor, and discipline, which I carry into my personal life.`
  } else if (designation.includes("Chef")) {
    careerSnippet = `I am an Executive Chef working with the ${company} group in ${city}. Food is my passion and my art, and I love creating culinary experiences.`
  } else if (designation.includes("Filmmaker") || designation.includes("Designer")) {
    careerSnippet = `I work in the creative field as a ${designation} with ${company} in ${city}. I find immense joy in design, storytelling, and visual expression.`
  } else if (designation.includes("IAS Officer")) {
    careerSnippet = `I serve as an IAS Officer working with the ${company}, currently based in ${city}. It's a challenging and rewarding career dedicated to public administration and social development.`
  }

  const intro = [
    `Hi, I'm ${firstName}. ${careerSnippet}`,
    `Hello there! I'm ${firstName}. ${careerSnippet}`,
    `Greetings! My name is ${firstName}. ${careerSnippet}`,
    `Nice to meet you, I am ${firstName}. ${careerSnippet}`,
    `Hi! I'm ${firstName}, and ${careerSnippet}`,
    `I'm ${firstName}. ${careerSnippet}`,
    `Hello, this is ${firstName}. ${careerSnippet}`,
    `Hi there! My name is ${firstName}. ${careerSnippet}`,
    `Greetings, I am ${firstName}. ${careerSnippet}`,
    `Hi, I go by ${firstName}. ${careerSnippet}`
  ]

  const trait = [
    `I would describe myself as an ${personalityType.toLowerCase()} who values honesty, kindness, and personal growth.`,
    `Being an ${personalityType.toLowerCase()}, I cherish deep conversations, intellectual growth, and quality time with family.`,
    `I am an ${personalityType.toLowerCase()} individual, balancing my career aspirations with a love for simple joys and strong moral values.`,
    `I am a down-to-earth, ${personalityType.toLowerCase()} person who believes in living life with a positive and grateful attitude.`,
    `As an ${personalityType.toLowerCase()}, I love meeting new people, sharing stories, and keeping an open mind about everything.`,
    `I'm a balanced, ${personalityType.toLowerCase()} individual who appreciates quiet reflection as much as active social gatherings.`,
    `I'm an ${personalityType.toLowerCase()} who loves staying active, learning new skills, and maintaining a healthy work-life balance.`,
    `I would say I am a mature, ${personalityType.toLowerCase()} person who values direct communication and emotional maturity.`,
    `I describe myself as a creative, ${personalityType.toLowerCase()} soul who loves looking at the brighter side of things.`,
    `I am a passionate, ${personalityType.toLowerCase()} person who puts 100% effort into my relationships, family, and profession.`
  ]

  const leisure = [
    `In my free time, I enjoy ${hobbies.join(", ").toLowerCase()} and exploring new places.`,
    `My weekends are usually spent ${hobbies.slice(0, 2).join(" and ").toLowerCase()} or catching up on some light reading.`,
    `Outside of work, I find myself drawn to ${hobbies.join(", ").toLowerCase()}, which helps me relax and stay creative.`,
    `I love dedicating my off-hours to ${hobbies.join(", ").toLowerCase()}, which keeps me energized.`,
    `You will often find me ${hobbies.slice(0, 2).join(" or ").toLowerCase()} when I am not busy with my career.`,
    `I enjoy spending my leisure time ${hobbies.join(", ").toLowerCase()} as a way to unwind.`,
    `My interests range from ${hobbies.slice(0, 2).join(" and ").toLowerCase()} to volunteering and learning new languages.`,
    `I keep myself occupied with ${hobbies.join(", ").toLowerCase()} and occasionally cooking for friends.`,
    `I'm passionate about fitness, and I also love spending time ${hobbies.slice(0, 2).join(" and ").toLowerCase()}.`,
    `I enjoy a mix of outdoor activities and quiet indoor pastimes like ${hobbies.join(", ").toLowerCase()}.`
  ]

  const outro = [
    `I am looking for someone who shares similar values and wants to build a meaningful future together.`,
    `I hope to find a partner who is progressive, understanding, and supportive of my career and life goals.`,
    `Seeking a warm, companionate partner with whom I can share life's beautiful journey.`,
    `Looking to connect with a kind-hearted soul who values mutual respect and growth.`,
    `Hoping to meet a life partner who is also a great friend and travel companion.`,
    `Seeking a mature partner who is ready to build a loving, balanced family life.`,
    `Looking forward to meeting someone who enjoys deep conversations and simple life moments.`,
    `I hope to find a companion who appreciates individuality and is supportive of joint dreams.`,
    `Seeking a partner who is independent yet family-oriented, to walk this life path together.`,
    `Hoping to find an honest, loving partner who is ready to build a home filled with warmth and laughter.`
  ]

  const seed = firstName.length + designation.length
  return `${intro[seed % 10]} ${trait[(seed + 1) % 10]} ${leisure[(seed + 2) % 10]} ${outro[(seed + 3) % 10]}`
}

function generateLifestyle(foodPref: string, smoking: string, drinking: string, hobbies: string[], designation: string): string {
  const habits = `I follow a ${foodPref.toLowerCase()} diet. I am a ${smoking === "NO" ? "non-smoker" : smoking === "OCCASIONALLY" ? "occasional smoker" : "smoker"}, and I drink ${drinking === "NO" ? "rarely/never" : drinking === "OCCASIONALLY" ? "socially" : "regularly"}.`
  
  let lifestyleType = "balanced"
  if (designation.includes("Pilot") || designation.includes("Army") || designation.includes("Navy")) {
    lifestyleType = "disciplined and active"
  } else if (designation.includes("Chef") || designation.includes("Filmmaker")) {
    lifestyleType = "highly creative and dynamic"
  } else if (designation.includes("Software") || designation.includes("Consultant")) {
    lifestyleType = "fast-paced corporate"
  }

  const activities = [
    `I love maintaining a ${lifestyleType} lifestyle. I practice yoga regularly and try to eat healthy, home-cooked meals whenever possible.`,
    `My lifestyle is ${lifestyleType}. I like to focus on physical fitness, outdoor activities like ${hobbies[0].toLowerCase()}, and spending peaceful time at home.`,
    `I have a ${lifestyleType} routine, but I offset it by pursuing hobbies like ${hobbies.slice(0, 2).join(" and ").toLowerCase()} during the weekends.`,
    `I balance my time between demanding work and restorative practices like meditation, gym sessions, and cooking healthy meals.`,
    `My daily routine is built around wellness. I enjoy hiking on weekends and eating a clean diet.`,
    `I live a quite dynamic life. I am always open to exploring new cafes, running half-marathons, or cycling in the mornings.`,
    `My lifestyle represents a good mix of career focus and simple hobbies like gardening and keeping a clean, organized home.`,
    `I enjoy a minimalist lifestyle, spending my non-working hours with a close circle of friends, visiting art exhibits, or doing yoga.`,
    `I lead an active, goal-oriented lifestyle. I read non-fiction, play badminton, and focus heavily on professional and personal self-improvement.`,
    `I maintain a flexible and cheerful lifestyle, believing in spontaneous road trips, learning musical instruments, and keeping active.`
  ]

  const seed = foodPref.length + smoking.length + drinking.length
  return `${habits} ${activities[seed % 10]}`
}

function generateFamilyValues(index: number): string {
  const valType = ["nuclear, progressive", "nuclear, moderate", "joint, traditional", "close-knit, modern", "liberal, nuclear", "moderate, joint"][index % 6]
  const fatherJob = ["retired government officer", "businessman running a manufacturing company", "bank manager", "software consultant", "college professor", "medical doctor", "architect", "retired defense personnel"][index % 8]
  const motherJob = ["homemaker", "school teacher", "retired banker", "boutique owner", "homemaker", "doctor", "lecturer", "interior designer"][index % 8]
  
  return `We are a ${valType} family originally from Delhi/North India, now settled in our current city. My father is a ${fatherJob} and my mother is a ${motherJob}. We believe in maintaining a strong balance between traditional values and a modern outlook towards life.`
}

function generateCareerGoals(designation: string, company: string, index: number): string {
  const goals = [
    `I am very passionate about my work as a ${designation}. Over the next few years, I aim to transition into a leadership role where I can mentor others and drive strategy.`,
    `Currently, I am focusing on sharpening my skills in my role at ${company}. Long-term, I hope to start my own venture or take up an executive position in the tech/business space.`,
    `My goal is to build a fulfilling career as a ${designation} while maintaining a healthy work-life balance. I appreciate continuous learning and hope to work on projects that have a positive social impact.`,
    `I aspire to lead international projects in the field of my expertise and gain significant global exposure over the next decade.`,
    `I plan to pursue advanced certifications and eventually move into design and consultation roles within ${company} or a similar organization.`,
    `I am aiming to build a strong reputation in my industry and hope to establish my own consultancy or creative studio in the near future.`,
    `My career focus is to solve complex problems and contribute to technical/operational innovation in my company, eventually taking on a Director-level role.`,
    `I aim to balance my professional role at ${company} with research and writing, contributing articles and insights to the wider community.`,
    `I seek to take on roles of higher responsibility that allow me to make key strategic decisions and drive organizational growth.`,
    `I hope to combine my professional skills with social entrepreneurship, working closely with initiatives that focus on sustainable development.`
  ]
  return goals[index % 10]
}

function generateRelationshipValues(index: number): string {
  const vals = [
    `I believe a successful relationship is built on mutual respect, transparent communication, and friendship. Both partners should support each other's career and personal ambitions.`,
    `For me, trust, emotional intimacy, and a shared sense of humor are the cornerstones of a marriage. It is about growing together, sharing responsibilities, and facing life's ups and downs as a team.`,
    `I value honesty, compatibility, and a cooperative mindset in a partnership. A good relationship is one where both individuals have the space to grow while keeping the family bound together.`,
    `I place a high emphasis on emotional support, active listening, and being best friends first. A relationship thrives when there is transparency and shared laughter.`,
    `A healthy marriage is a true partnership of equals, where decisions are made together and both partners encourage each other to achieve their dreams.`,
    `I believe in mutual understanding, respect for each other's individuality, and cultivating a peaceful, positive home environment.`,
    `For me, a strong relationship involves spending quality time together, traveling, exploring new things, and maintaining open, judgment-free communication.`,
    `I value commitment, shared family values, and the ability to find compromise and harmony in all aspects of life together.`,
    `I believe that a lasting relationship is built on a foundation of trust, shared spiritual or moral values, and mutual encouragement.`,
    `To me, love is about patience, support in tough times, and celebrating each other's small and big victories every day.`
  ]
  return vals[index % 10]
}

function generateFuturePlans(city: string, index: number): string {
  const plans = [
    `I plan to settle down in ${city} or any other major metropolitan area depending on career growth. I also want to travel and explore new cultures in the coming years.`,
    `I intend to establish a comfortable home in ${city} and focus on family life. I also look forward to regular weekend getaways, outdoor adventures, and keeping up with fitness goals.`,
    `I am open to relocating within India or internationally if good career opportunities arise. Ultimately, I want to build a stable, happy household with my partner.`,
    `I hope to build a sustainable, eco-friendly home in the future, travel extensively across offbeat destinations, and cultivate a quiet, creative lifestyle.`,
    `My future plans include settling down in a tier-1 city, continuing to advance my career, and dedicating time to community service and mentoring.`,
    `I plan to stay in ${city} and establish a balance where we can raise a family, keep pets, and enjoy a vibrant social and cultural life.`,
    `I look forward to investing in personal real estate, setting up a warm household, and taking annual international trips to explore historic cities.`,
    `I plan to eventually transition to an independent consulting role to have more flexible hours for family and personal hobbies.`,
    `I hope to create a home that is always open to friends and family, filled with books, music, and warmth, while continuing to grow professionally.`,
    `I plan to explore a mix of city living and quiet countryside retreats, ensuring a healthy, close-to-nature upbringing for our family.`
  ]
  return plans[index % 10]
}

function generateLookingFor(gender: string, index: number): string {
  const prefGender = gender === "MALE" ? "partner/girl" : "partner/boy"
  const looking = [
    `I am looking for an educated, independent, and kind-hearted ${prefGender} who is down-to-earth and shares similar family values.`,
    `Seeking a career-oriented yet family-minded ${prefGender} who is understanding, communicative, and has a positive outlook on life.`,
    `I hope to find a warm, supportive, and mature ${prefGender} who respects my independence and is willing to embark on a beautiful life journey together.`,
    `Looking for an ambitious, intellectually compatible ${prefGender} who enjoys meaningful conversations and active weekend exploration.`,
    `I'm searching for a compassionate and loyal ${prefGender} who values trust, equality in household responsibilities, and emotional growth.`,
    `Seeking a simple, humble, and well-educated ${prefGender} who is grounded in culture but has a progressive mindset.`,
    `Hoping to find a cheerful, creative, and open-minded ${prefGender} who appreciates arts, culture, and life's simple pleasures.`,
    `Looking for a supportive companion and best friend in the form of a ${prefGender} who stands by me through all of life's ups and downs.`,
    `Seeking a professional ${prefGender} with a great sense of humor, who lives life to the fullest and values deep personal connections.`,
    `Hoping to match with an adventurous, fitness-conscious ${prefGender} who loves to travel and possesses a kind, empathetic soul.`
  ]
  return looking[index % 10]
}

function generatePartnerExpectations(gender: string, city: string, index: number): string {
  const expectations = [
    `The candidate should ideally be a working professional (B.Tech, MBA, MBBS or equivalent) based in ${city} or open to relocating. Age should be between ${gender === "MALE" ? "23 and 30" : "26 and 33"}.`,
    `Looking for someone with a strong academic background, who values career progress but also holds family in high regard. Preference for someone working in tech, finance, or design.`,
    `Should be a non-smoker, mature, and communicative individual who is open to pets and enjoys a healthy lifestyle.`,
    `Preference for an independent professional who is self-made, enjoys traveling, and has a calm and balanced temperament.`,
    `Looking for a partner who is based in a major metropolitan city, preferably working in a creative or analytical field, with a progressive outlook.`,
    `The ideal partner should be someone who values fitness, appreciates music or arts, and enjoys spending quality time with family.`,
    `Looking for an open-minded individual who is supportive of a partner's career ambitions and believes in equal sharing of life's responsibilities.`,
    `Preferably someone with a postgraduate degree (MBA, MS, M.Tech, MD) who is career-focused, kind-hearted, and loves weekend getaways.`,
    `Seeking a partner who has a good balance between work and personal life, enjoys outdoor activities, and is respectful of elders.`,
    `Looking for someone who is communicative, respects personal space, and is ready to build a warm, collaborative household together.`
  ]
  return expectations[index % 10]
}

function getDeterministicEmbedding(text: string): number[] {
  const embedding = new Array(384).fill(0)
  const words = text.toLowerCase().split(/\s+/)
  
  for (const word of words) {
    if (!word) continue
    
    let hash = 0
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i)
      hash |= 0
    }
    
    let seed = Math.abs(hash)
    for (let d = 0; d < 5; d++) {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      const dim = seed % 384
      const val = (seed % 2000 - 1000) / 1000
      embedding[dim] += val
    }
  }
  
  let norm = 0
  for (let i = 0; i < 384; i++) {
    norm += embedding[i] * embedding[i]
  }
  norm = Math.sqrt(norm)
  
  if (norm > 0) {
    for (let i = 0; i < 384; i++) {
      embedding[i] /= norm
    }
  } else {
    for (let i = 0; i < 384; i++) {
      embedding[i] = (i % 2 === 0 ? 1 : -1) / Math.sqrt(384)
    }
  }
  
  return embedding
}

async function main() {
  console.log("Cleaning existing database records...")
  
  await prisma.dateRecord.deleteMany({})
  await prisma.match.deleteMany({})
  await prisma.partnerPreference.deleteMany({})
  await prisma.customerJourney.deleteMany({})
  await prisma.profile.deleteMany({})

  console.log("Generating 100 high-variety, detailed profiles (50 Female, 50 Male)...")

  const createdProfiles: any[] = []
  const profilesData: any[] = []

  for (let i = 0; i < 100; i++) {
    const isFemale = i < 50
    const gender = isFemale ? Gender.FEMALE : Gender.MALE
    
    // Choose unique names from the 100 lists
    const firstName = isFemale ? femaleFirstNames[i] : maleFirstNames[i - 50]
    const lastName = lastNames[i % lastNames.length]
    
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${i}@example.com`
    const phoneNumber = `9876543${String(i).padStart(3, "0")}`
    
    const age = 24 + (i % 12)
    const dateOfBirth = new Date(2026 - age, i % 12, (i % 28) + 1)
    
    const city = cities[i % cities.length]
    const religion = religions[i % religions.length]
    const caste = getCaste(religion, lastName, i)
    const motherTongue = getMotherTongue(city, religion)
    
    const heightCm = isFemale ? 150 + (i % 18) : 166 + (i % 22)
    const weightKg = isFemale ? 44 + (i % 18) : 62 + (i % 26)
    
    const careerEdu = generateCareerAndEducation(i)
    const hobbies = getHobbies(i)
    
    const maritalStatus = i % 15 === 0 ? MaritalStatus.DIVORCED : i % 25 === 0 ? MaritalStatus.WIDOWED : MaritalStatus.NEVER_MARRIED
    const haveChildren = maritalStatus !== MaritalStatus.NEVER_MARRIED && i % 2 === 0
    
    // Culturally coherent food preferences
    let foodPreference = [FoodPreference.VEG, FoodPreference.EGGETARIAN, FoodPreference.NON_VEG, FoodPreference.JAIN][i % 4]
    if (religion === "Jain") {
      foodPreference = i % 3 === 0 ? FoodPreference.JAIN : FoodPreference.VEG
    } else if (religion === "Muslim") {
      foodPreference = FoodPreference.NON_VEG
    }

    const smoking = i % 12 === 0 ? HabitFrequency.OCCASIONALLY : i % 30 === 0 ? HabitFrequency.YES : HabitFrequency.NO
    const drinking = i % 3 === 0 ? HabitFrequency.OCCASIONALLY : i % 10 === 0 ? HabitFrequency.YES : HabitFrequency.NO
    
    const personalityType = [PersonalityType.INTROVERT, PersonalityType.AMBIVERT, PersonalityType.EXTROVERT][i % 3]
    const manglikStatus = religion === "Hindu" && i % 7 === 0 ? ManglikStatus.YES : religion === "Hindu" && i % 11 === 0 ? ManglikStatus.UNKNOWN : ManglikStatus.NO
    
    const wantKids = i % 15 === 0 ? PreferenceChoice.NO : i % 6 === 0 ? PreferenceChoice.MAYBE : PreferenceChoice.YES
    const kidsCountPreference = wantKids === PreferenceChoice.NO ? null : [KidsCountPreference.ONE, KidsCountPreference.TWO_TO_THREE, KidsCountPreference.OPEN][i % 3]
    
    const openToRelocate = i % 3 === 0 ? PreferenceChoice.YES : i % 4 === 0 ? PreferenceChoice.MAYBE : PreferenceChoice.NO
    const openToPets = i % 3 === 0 ? PreferenceChoice.YES : i % 5 === 0 ? PreferenceChoice.MAYBE : PreferenceChoice.NO
    const wantToWorkAfterMarriage = isFemale ? (i % 10 === 0 ? PreferenceChoice.MAYBE : PreferenceChoice.YES) : PreferenceChoice.YES
    
    const languagesKnown = Array.from(new Set(["English", motherTongue, religion === "Sikh" || religion === "Hindu" || religion === "Jain" ? "Hindi" : "English"]))
    
    const aboutMe = generateAboutMe(firstName, careerEdu.designation, careerEdu.company, city, personalityType, hobbies)
    const lifestyle = generateLifestyle(foodPreference, smoking, drinking, hobbies, careerEdu.designation)
    const familyValues = generateFamilyValues(i)
    const careerGoals = generateCareerGoals(careerEdu.designation, careerEdu.company, i)
    const relationshipValues = generateRelationshipValues(i)
    const futurePlans = generateFuturePlans(city, i)
    const lookingFor = generateLookingFor(gender, i)
    const partnerExpectations = generatePartnerExpectations(gender, city, i)
    const profileText = `
      About Me: ${aboutMe}
      Lifestyle: ${lifestyle}
      Family Values: ${familyValues}
      Career Goals: ${careerGoals}
      Relationship Values: ${relationshipValues}
      Future Plans: ${futurePlans}
      Hobbies: ${hobbies.join(", ")}
      Personality: ${personalityType}
    `.trim()

    profilesData.push({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      email,
      phoneNumber,
      nationality: "Indian",
      country: "India",
      city,
      motherTongue,
      religion,
      caste,
      heightCm,
      weightKg,
      collegeName: careerEdu.college,
      degree: careerEdu.degree,
      highestQualification: careerEdu.highestQualification,
      currentCompany: careerEdu.company,
      designation: careerEdu.designation,
      annualIncome: careerEdu.annualIncome,
      brothers: i % 3,
      sisters: (i + 1) % 3,
      maritalStatus,
      haveChildren,
      foodPreference,
      smoking,
      drinking,
      lifestyle,
      hobbies,
      personalityType,
      manglikStatus,
      horoscopeAvailable: i % 2 === 0,
      disabilityStatus: i % 40 === 0 ? "Minor visual impairment (corrected with glasses)" : "None",
      wantKids,
      kidsCountPreference,
      openToRelocate,
      openToPets,
      wantToWorkAfterMarriage,
      languagesKnown,
      aboutMe,
      familyValues,
      careerGoals,
      relationshipValues,
      futurePlans,
      lookingFor,
      partnerExpectations,
      isVerified: true,
      profilePictures: [],
      embedding: getDeterministicEmbedding(profileText)
    })
  }

  // Insert Profiles in concurrent batches of 10 to speed up execution
  const batchSize = 10
  for (let i = 0; i < 100; i += batchSize) {
    const batch = profilesData.slice(i, i + batchSize)
    const results = await Promise.all(
      batch.map(data => prisma.profile.create({ data }))
    )
    createdProfiles.push(...results)
    console.log(`[Profiles] Created ${i + results.length}/100...`)
  }

  console.log("Profiles created. Preparing customer journeys and partner preferences...")

  const journeysData: any[] = []
  const preferencesData: any[] = []

  for (let i = 0; i < 100; i++) {
    const profile = createdProfiles[i]
    const age = 24 + (i % 12)
    const gender = profile.gender
    const heightCm = profile.heightCm
    const religion = profile.religion
    const caste = profile.caste
    const foodPreference = profile.foodPreference
    const city = profile.city
    const careerEdu = generateCareerAndEducation(i)
    const maritalStatus = profile.maritalStatus
    const wantKids = profile.wantKids
    const openToRelocate = profile.openToRelocate
    const openToPets = profile.openToPets

    // Customer Journey Status Cycle
    const statusCycle = [
      JourneyStatus.NEW,
      JourneyStatus.PROFILE_REVIEW,
      JourneyStatus.MATCHING,
      JourneyStatus.MATCH_SENT,
      JourneyStatus.MEETING_SCHEDULED,
      JourneyStatus.IN_DISCUSSION
    ]
    const journeyStatus = statusCycle[i % statusCycle.length]
    const assignedTo = ["Admin Rishav", "Matchmaker Sneha", "Matchmaker Rahul"][i % 3]

    journeysData.push({
      userId: profile.id,
      status: journeyStatus,
      assignedTo,
      lastContactAt: new Date(Date.now() - (i % 15) * 24 * 60 * 60 * 1000)
    })

    // Partner Preference filters
    const prefMinAge = Math.max(21, age - 4)
    const prefMaxAge = age + 4
    const prefMinHeight = gender === Gender.MALE ? heightCm - 20 : heightCm
    const prefMaxHeight = gender === Gender.MALE ? heightCm : heightCm + 20

    preferencesData.push({
      profileId: profile.id,
      minAge: prefMinAge,
      maxAge: prefMaxAge,
      minHeightCm: prefMinHeight,
      maxHeightCm: prefMaxHeight,
      religion: i % 3 === 0 ? religion : null,
      caste: i % 5 === 0 ? caste : null,
      smoking: i % 4 === 0 ? HabitFrequency.NO : null,
      drinking: i % 4 === 0 ? HabitFrequency.OCCASIONALLY : null,
      maritalStatus: maritalStatus === MaritalStatus.NEVER_MARRIED ? MaritalStatus.NEVER_MARRIED : null,
      foodPreference: i % 2 === 0 ? foodPreference : null,
      city: i % 2 === 0 ? city : null,
      degree: careerEdu.degree.split(" ")[0],
      minIncome: Math.max(500000, Math.round(careerEdu.annualIncome * 0.7)),
      wantKids,
      openToRelocate,
      openToPets,
      partnerDescription: `An understanding, educated, and well-settled ${gender === Gender.MALE ? "female" : "male"} companion who values family bonds.`
    })
  }

  // Insert Journeys and Preferences in concurrent batches of 10
  for (let i = 0; i < 100; i += batchSize) {
    const journeyBatch = journeysData.slice(i, i + batchSize)
    const prefBatch = preferencesData.slice(i, i + batchSize)

    await Promise.all([
      ...journeyBatch.map(data => prisma.customerJourney.create({ data })),
      ...prefBatch.map(data => prisma.partnerPreference.create({ data }))
    ])
    console.log(`[Journeys & Prefs] Created ${i + journeyBatch.length}/100...`)
  }

  console.log("Customer journeys and partner preferences created. Seeding matches and date records...")

  const females = createdProfiles.filter(p => p.gender === Gender.FEMALE)
  const males = createdProfiles.filter(p => p.gender === Gender.MALE)

  // We have exactly 50 females and 50 males.
  // We'll create 100 matches by pairing female i with male i (offset 0) and male (i+1)%50 (offset 1).
  let matchCount = 0
  const matchStatuses = [
    { status: MatchStatus.PROPOSED, count: 40 },
    { status: MatchStatus.INTEREST_EXPRESSED, count: 20 },
    { status: MatchStatus.ACCEPTED, count: 15 },
    { status: MatchStatus.DECLINED, count: 15 },
    { status: MatchStatus.ON_HOLD, count: 5 },
    { status: MatchStatus.DISCONNECTED, count: 5 }
  ]

  const statusList: MatchStatus[] = []
  for (const group of matchStatuses) {
    for (let c = 0; c < group.count; c++) {
      statusList.push(group.status)
    }
  }

  const matchesData: any[] = []
  const matchMetadata: any[] = []

  for (let offset = 0; offset < 2; offset++) {
    for (let i = 0; i < 50; i++) {
      const female = females[i]
      const male = males[(i + offset) % 50]
      const status = statusList[matchCount]

      matchesData.push({
        profileId: female.id,
        matchedProfileId: male.id,
        status
      })
      
      matchMetadata.push({
        index: i,
        status,
        femaleHobbies: female.hobbies,
        maleHobbies: male.hobbies
      })

      matchCount++
    }
  }

  // Insert matches in concurrent batches of 10
  const createdMatches: any[] = []
  for (let i = 0; i < matchesData.length; i += batchSize) {
    const batch = matchesData.slice(i, i + batchSize)
    const results = await Promise.all(
      batch.map(data => prisma.match.create({ data }))
    )
    createdMatches.push(...results)
    console.log(`[Matches] Created ${i + results.length}/100...`)
  }

  // Generate date records based on created matches
  const dateRecordsData: any[] = []

  for (let i = 0; i < createdMatches.length; i++) {
    const match = createdMatches[i]
    const meta = matchMetadata[i]

    if (meta.status === MatchStatus.ACCEPTED) {
      if (meta.index % 2 === 0) {
        // Completed date in the past
        dateRecordsData.push({
          matchId: match.id,
          dateScheduledAt: new Date(Date.now() - (meta.index % 10 + 1) * 24 * 60 * 60 * 1000),
          status: DateStatus.COMPLETED,
          notes: `Met for coffee. Found each other easy to talk to and shared interesting perspectives on their hobbies: ${meta.femaleHobbies[0]} and ${meta.maleHobbies[0]}.`
        })
        
        // Future scheduled date
        dateRecordsData.push({
          matchId: match.id,
          dateScheduledAt: new Date(Date.now() + (meta.index % 5 + 2) * 24 * 60 * 60 * 1000),
          status: DateStatus.SCHEDULED,
          notes: `Second date planned for a dinner to discuss professional alignments and expectations.`
        })
      } else {
        // Future scheduled date only
        dateRecordsData.push({
          matchId: match.id,
          dateScheduledAt: new Date(Date.now() + (meta.index % 5 + 1) * 24 * 60 * 60 * 1000),
          status: DateStatus.SCHEDULED,
          notes: `Introductory virtual call scheduled to get to know each other before meeting in person.`
        })
      }
    } else if (meta.status === MatchStatus.DECLINED) {
      if (meta.index % 3 === 0) {
        // Declined matches with a completed date in the past that led to the decline
        dateRecordsData.push({
          matchId: match.id,
          dateScheduledAt: new Date(Date.now() - (meta.index % 5 + 5) * 24 * 60 * 60 * 1000),
          status: DateStatus.COMPLETED,
          notes: `Met briefly at a coffee shop. Decided that their future relocation plans did not align.`
        })
      }
    }
  }

  // Insert date records in concurrent batches of 10
  for (let i = 0; i < dateRecordsData.length; i += batchSize) {
    const batch = dateRecordsData.slice(i, i + batchSize)
    await Promise.all(
      batch.map(data => prisma.dateRecord.create({ data }))
    )
    console.log(`[Date Records] Created ${i + batch.length}/${dateRecordsData.length}...`)
  }

  console.log(`Database successfully seeded with 100 highly-diverse profiles and completely populated tables!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
