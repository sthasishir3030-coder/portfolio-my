/**
 * Frontend Interaction Script
 * Connects UI forms and buttons to JavaScript Server APIs
 */

document.addEventListener('DOMContentLoaded', () => {
    initPhotoUploader();
    initGpaCalculator();
    initContactForm();
});

// Photo presets list
const avatarPresets = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
];

// Profile Photo Switcher & Uploader
function initPhotoUploader() {
    const fileInput = document.getElementById('photoUploader');
    const profileImg = document.getElementById('profileImage');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImg.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

function setAvatarPreset(index) {
    const profileImg = document.getElementById('profileImage');
    profileImg.src = avatarPresets[index];

    document.querySelectorAll('.preset-btn').forEach((btn, idx) => {
        if(idx === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

// API Route Simulator
function triggerApiRoute(method, route) {
    const outputElem = document.getElementById('jsonOutput');
    const statusElem = document.getElementById('statusBadge');
    let response;

    if (route === '/api/v1/academics') {
        response = window.apiServer.getAcademics();
    } else if (route === '/api/v1/projects') {
        response = window.apiServer.getProjects();
    } else if (route === '/api/v1/skills') {
        response = window.apiServer.getSkills();
    } else if (route === '/api/v1/messages') {
        response = window.apiServer.getMessages();
    }

    if (response) {
        statusElem.textContent = response.statusText;
        outputElem.textContent = JSON.stringify(response, null, 2);
    }
}

// Clear DB Action
function clearMessagesDb() {
    const res = window.apiServer.clearMessages();
    document.getElementById('statusBadge').textContent = res.statusText;
    document.getElementById('jsonOutput').textContent = JSON.stringify(res, null, 2);
}

// GPA Calculator Form Handler
function initGpaCalculator() {
    const form = document.getElementById('gpaForm');
    const resultDiv = document.getElementById('gpaResult');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const scores = {
            math: parseFloat(document.getElementById('mathScore').value),
            physics: parseFloat(document.getElementById('physicsScore').value),
            chem: parseFloat(document.getElementById('chemScore').value),
            cs: parseFloat(document.getElementById('csScore').value)
        };

        const response = window.apiServer.calculateGpa(scores);
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `
            <h4><i class="fa-solid fa-square-poll-vertical"></i> Calculation Result (${response.statusText}):</h4>
            <p><strong>Average Score:</strong> ${response.data.averagePercentage}</p>
            <p><strong>Estimated GPA:</strong> ${response.data.calculatedGPA} / 4.0</p>
            <p><strong>Status:</strong> ${response.data.academicStatus}</p>
        `;
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const payload = {
            sender: document.getElementById('senderName').value,
            email: document.getElementById('senderEmail').value,
            message: document.getElementById('senderMsg').value
        };

        const res = window.apiServer.postMessage(payload);
        
        // Scroll to API console and render output
        document.getElementById('api-demo').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('statusBadge').textContent = res.statusText;
        document.getElementById('jsonOutput').textContent = JSON.stringify(res, null, 2);

        alert('Message posted successfully to backend DB!');
        form.reset();
    });
}
