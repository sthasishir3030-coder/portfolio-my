/**
 * Express-like Backend Route Controller
 * Simulates RESTful APIs in JavaScript using localStorage as DB
 */

class MockBackendServer {
    constructor() {
        this.initDatabase();
    }

    initDatabase() {
        if (!localStorage.getItem('messages_db')) {
            const initialMessages = [
                { id: 1, sender: 'Interact Club Admin', email: 'interact@pokharalakeside.org', message: 'Great job leading the IT portal design!', timestamp: new Date().toISOString() }
            ];
            localStorage.setItem('messages_db', JSON.stringify(initialMessages));
        }
    }

    // GET /api/v1/academics
    getAcademics() {
        return {
            status: 200,
            statusText: "200 OK",
            data: {
                student: "Sishir",
                educationLevel: "High School (Class 12 NEB Completed)",
                stream: "Science (STEM)",
                targetDegrees: ["BSc CSIT", "Computer Engineering", "Software Engineering"],
                examTargets: ["IOE Entrance Examination", "Pokhara University Admission"],
                keySubjects: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
                academicProjects: [
                    "School Subdomain Web Portal",
                    "CanSat Atmospheric Telemetry Model",
                    "Digital Trophy Display Gallery"
                ]
            }
        };
    }

    // GET /api/v1/projects
    getProjects() {
        return {
            status: 200,
            statusText: "200 OK",
            data: [
                { id: 1, title: "School Subdomain", tech: ["HTML", "CSS", "JavaScript", "PHP"], category: "Web Development" },
                { id: 2, title: "CanSat Telemetry Prototype", tech: ["C++", "Microcontrollers", "Telemetry Sensors"], category: "Embedded Systems" },
                { id: 3, title: "Digital Trophy Display System", tech: ["JavaScript", "MongoDB Atlas"], category: "Full-Stack Web" },
                { id: 4, title: "Interact Club Brand Platform", tech: ["IT Management", "Graphic Design"], category: "Digital Leadership" }
            ]
        };
    }

    // GET /api/v1/skills
    getSkills() {
        return {
            status: 200,
            statusText: "200 OK",
            data: {
                languages: ["JavaScript (ES6+)", "PHP", "C", "HTML5", "CSS3", "Python"],
                backendAndDb: ["Node.js/Express (Simulated)", "MongoDB Atlas", "MySQL"],
                toolsAndPlatforms: ["Git", "GitHub", "Vercel", "Claude AI", "ChatGPT"]
            }
        };
    }

    // GET /api/v1/messages
    getMessages() {
        const db = JSON.parse(localStorage.getItem('messages_db') || '[]');
        return {
            status: 200,
            statusText: "200 OK",
            count: db.length,
            data: db
        };
    }

    // POST /api/v1/messages
    postMessage(payload) {
        const db = JSON.parse(localStorage.getItem('messages_db') || '[]');
        const newMessage = {
            id: db.length + 1,
            sender: payload.sender,
            email: payload.email,
            message: payload.message,
            timestamp: new Date().toISOString()
        };
        db.push(newMessage);
        localStorage.setItem('messages_db', JSON.stringify(db));

        return {
            status: 201,
            statusText: "201 Created",
            message: "Message successfully saved to Database",
            data: newMessage
        };
    }

    // POST /api/v1/academic/gpa
    calculateGpa(scores) {
        const { math, physics, chem, cs } = scores;
        const avg = (math + physics + chem + cs) / 4;
        let gpa = 0.0;

        if (avg >= 90) gpa = 4.0;
        else if (avg >= 80) gpa = 3.6;
        else if (avg >= 70) gpa = 3.2;
        else if (avg >= 60) gpa = 2.8;
        else gpa = 2.4;

        return {
            status: 200,
            statusText: "200 OK",
            data: {
                averagePercentage: avg.toFixed(2) + "%",
                calculatedGPA: gpa.toFixed(2),
                academicStatus: avg >= 80 ? "Distinction Candidate" : "First Division Candidate"
            }
        };
    }

    // DELETE /api/v1/messages
    clearMessages() {
        localStorage.setItem('messages_db', JSON.stringify([]));
        return {
            status: 200,
            statusText: "200 OK",
            message: "All message records cleared from Database"
        };
    }
}

// Global server instance
window.apiServer = new MockBackendServer();
