// ================================
// MOCK DATA - STUDENTS & ODDS
// ================================

const students = [
    { name: "Onur", level: "good" },
    { name: "Hüseyn", level: "good" },
    { name: "Coşqun", level: "good" },
    { name: "Diana", level: "good" },
    { name: "Kaan", level: "good" },
    { name: "Kamran", level: "good" },
    { name: "Zülfiyyə", level: "good" },
    { name: "Təbriz", level: "good" },
    { name: "Ayan", level: "average" },
    { name: "Ayaz", level: "average" },
    { name: "Elnarə", level: "average" },
    { name: "Fəxriyyə", level: "average" },
    { name: "İslam", level: "average" },
    { name: "Prabesh", level: "average" },
    { name: "Səma", level: "average" },
    { name: "Şükufə", level: "average" },
    { name: "Sebuhi", level: "weak" },
    { name: "Seyfi", level: "weak" },
    { name: "Rəhim", level: "weak" },
    { name: "Aslan", level: "weak" },
    { name: "Nihad", level: "weak" },
    { name: "Mütəllib", level: "weak" },
    { name: "Fidan", level: "weak" },
    { name: "İsmayıl", level: "weak" },
    { name: "Abbas Haider", level: "weak" },
    { name: "Razil", level: "weak" },
    { name: "Isa", level: "good", excludeFromExam: 4 } // Isa is excluded from Süni İntellekt (exam id 4)
];

// Exam subjects
const exams = [
    {
        id: 1,
        name: "Statistika və Ehtimal",
        icon: "📊",
        date: "5 Yanvar 2026",
        time: "13:00",
        studentCount: 27
    },
    {
        id: 2,
        name: "Kompüter Təhlükəsizliyi",
        icon: "🔒",
        date: "8 Yanvar 2026",
        time: "13:00",
        studentCount: 27
    },
    {
        id: 3,
        name: "Kompüterdə Modelləşmə",
        icon: "🖥️",
        date: "12 Yanvar 2026",
        time: "13:00",
        studentCount: 27
    },
    {
        id: 4,
        name: "Süni İntellekt",
        icon: "🤖",
        date: "22 Yanvar 2026",
        time: "13:00",
        studentCount: 26
    },
    {
        id: 5,
        name: "Maşın Öyrənmə",
        icon: "🧠",
        date: "16 Yanvar 2026",
        time: "13:00",
        studentCount: 27
    }
];

// Generate random odds
function generateOdds() {
    const min = 1.50;
    const max = 4.00;
    return (Math.random() * (max - min) + min).toFixed(2);
}

// Generate odds for 90+ and 100 bal for each student
function generateStudentOdds(examId = null) {
    let filteredStudents = students;
    
    // Filter out students excluded from specific exams
    if (examId) {
        filteredStudents = students.filter(student => student.excludeFromExam !== examId);
    }
    
    return filteredStudents.map(student => ({
        ...student,
        odds90: generateOdds(),
        odds100: (parseFloat(generateOdds()) * 1.5).toFixed(2)
    }));
}

// Generate betting options with odds
function generateBettingOptions(examId = null) {
    const allStudents = generateStudentOdds(examId);
    
    return {
        passStudents: allStudents.map(student => {
            let min, max;
            // Odds for getting 100 points based on student level
            switch(student.level) {
                case "good":
                    min = 1.01;
                    max = 1.15;
                    break;
                case "average":
                    min = 1.30;
                    max = 1.80;
                    break;
                case "weak":
                    min = 2.00;
                    max = 3.00;
                    break;
                default:
                    min = 1.50;
                    max = 2.50;
            }
            const odds = (Math.random() * (max - min) + min).toFixed(2);
            
            return {
                id: `pass-${student.name}`,
                label: student.name,
                odds: odds
            };
        }),
        failStudents: allStudents.map(student => {
            let min, max;
            // Odds for failing based on student level (inverse of their ability)
            switch(student.level) {
                case "good":
                    min = 15.00;
                    max = 20.00;
                    break;
                case "average":
                    min = 7.00;
                    max = 15.00;
                    break;
                case "weak":
                    min = 2.00;
                    max = 7.00;
                    break;
                default:
                    min = 5.00;
                    max = 12.00;
            }
            const odds = (Math.random() * (max - min) + min).toFixed(2);
            
            return {
                id: `fail-${student.name}`,
                label: student.name,
                odds: odds
            };
        }),
        failCount: [
            { id: "fail1", label: "1 Nəfər", odds: "1.75" },
            { id: "fail2", label: "2 Nəfər", odds: "2.20" },
            { id: "fail3", label: "3 Nəfər", odds: "2.90" },
            { id: "fail4", label: "4 Nəfər", odds: "3.80" },
            { id: "fail5", label: "5 Nəfər", odds: "5.20" },
            { id: "fail6", label: "6+ Nəfər", odds: "8.50" }
        ],
        highestScorer: allStudents.map(student => {
            let min, max;
            // Odds for being the highest scorer
            switch(student.level) {
                case "good":
                    min = 3.00;
                    max = 8.00;
                    break;
                case "average":
                    min = 8.00;
                    max = 15.00;
                    break;
                case "weak":
                    min = 15.00;
                    max = 30.00;
                    break;
                default:
                    min = 10.00;
                    max = 20.00;
            }
            const odds = (Math.random() * (max - min) + min).toFixed(2);
            
            return {
                id: `highest-${student.name}`,
                label: student.name,
                odds: odds
            };
        }),
        lowestScorer: allStudents.map(student => {
            let min, max;
            // Odds for being the lowest scorer (inverse of ability)
            switch(student.level) {
                case "good":
                    min = 20.00;
                    max = 35.00;
                    break;
                case "average":
                    min = 10.00;
                    max = 20.00;
                    break;
                case "weak":
                    min = 3.00;
                    max = 10.00;
                    break;
                default:
                    min = 10.00;
                    max = 20.00;
            }
            const odds = (Math.random() * (max - min) + min).toFixed(2);
            
            return {
                id: `lowest-${student.name}`,
                label: student.name,
                odds: odds
            };
        }),
        score80Plus: allStudents.map(student => {
            let baseOdds;
            switch(student.level) {
                case "good":
                    baseOdds = "-"; // No odds for good students
                    break;
                case "average":
                    baseOdds = (Math.random() * (1.20 - 1.01) + 1.01).toFixed(2);
                    break;
                case "weak":
                    baseOdds = (Math.random() * (1.50 - 1.21) + 1.21).toFixed(2);
                    break;
                default:
                    baseOdds = "1.30";
            }
            return {
                id: `80plus-${student.name}`,
                label: student.name,
                odds: baseOdds
            };
        }),
        score90Plus: allStudents.map(student => {
            let baseOdds;
            switch(student.level) {
                case "good":
                    baseOdds = (Math.random() * (1.10 - 1.01) + 1.01).toFixed(2);
                    break;
                case "average":
                    baseOdds = (Math.random() * (1.30 - 1.11) + 1.11).toFixed(2);
                    break;
                case "weak":
                    baseOdds = (Math.random() * (2.10 - 1.50) + 1.50).toFixed(2);
                    break;
                default:
                    baseOdds = "1.50";
            }
            return {
                id: `90plus-${student.name}`,
                label: student.name,
                odds: baseOdds
            };
        }),
        overUnder: [
            { id: "over1.5", label: "1.5 Üst", odds: "1.45" },
            { id: "under1.5", label: "1.5 Alt", odds: "2.75" },
            { id: "over2.5", label: "2.5 Üst", odds: "2.10" },
            { id: "under2.5", label: "2.5 Alt", odds: "1.72" },
            { id: "over3.5", label: "3.5 Üst", odds: "3.20" },
            { id: "under3.5", label: "3.5 Alt", odds: "1.35" },
            { id: "over4.5", label: "4.5 Üst", odds: "4.80" },
            { id: "under4.5", label: "4.5 Alt", odds: "1.18" },
            { id: "over5.5", label: "5.5 Üst", odds: "7.50" },
            { id: "under5.5", label: "5.5 Alt", odds: "1.08" },
            { id: "over6.5", label: "6.5 Üst", odds: "12.00" },
            { id: "under6.5", label: "6.5 Alt", odds: "1.02" }
        ]
    };
}

// Export data
const EXAM_DATA = {
    exams,
    getStudentsForExam: (examId) => generateStudentOdds(examId),
    getBettingOptions: (examId) => generateBettingOptions(examId),
    students: generateStudentOdds(), // Default all students
    bettingOptions: generateBettingOptions() // Default all students
};
