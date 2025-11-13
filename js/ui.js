// UI Controller for modals and information display
class UIController {
    constructor() {
        this.modal = document.getElementById('program-modal');
        this.closeBtn = document.querySelector('.close-btn');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Close button click
        this.closeBtn.addEventListener('click', () => this.closeModal());
        
        // Click outside modal to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // ESC key to close modal (and prevent other ESC actions)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            }
        });
    }
    
    isModalOpen() {
        return this.modal.classList.contains('active');
    }
    
    showProgramInfo(program) {
        // Set modal content
        document.getElementById('modal-title').textContent = program.name;
        document.getElementById('modal-description').textContent = program.description;
        
        // Set degree/certificate badges as clickable links
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        if (program.degrees && Array.isArray(program.degrees)) {
            program.degrees.forEach(degree => {
                const badgeLink = document.createElement('a');
                badgeLink.href = degree.url;
                badgeLink.target = '_blank';
                badgeLink.className = 'badge badge-link';
                badgeLink.style.cursor = 'pointer';
                badgeLink.style.textDecoration = 'none';
                
                // Color code by type
                if (degree.type === 'Associate') {
                    badgeLink.style.background = '#2c3e50';
                } else if (degree.type === 'Certificate') {
                    badgeLink.style.background = '#16a085';
                }
                
                badgeLink.textContent = degree.name;
                badgeLink.title = `Click to view ${degree.name} details`;
                badgesContainer.appendChild(badgeLink);
            });
        }
        
        // Awards badge (non-clickable)
        if (program.awards) {
            const awardsBadge = document.createElement('span');
            awardsBadge.className = 'badge';
            awardsBadge.style.background = '#27ae60';
            awardsBadge.textContent = `${program.awards} Awards Available`;
            badgesContainer.appendChild(awardsBadge);
        }
        
        // Set video
        const videoContainer = document.getElementById('modal-video');
        if (program.videoUrl) {
            videoContainer.innerHTML = `<iframe src="${program.videoUrl}" allowfullscreen></iframe>`;
        } else {
            videoContainer.innerHTML = '';
        }
        
        // Set learn more link
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.href = program.learnMoreUrl;
        learnMoreLink.style.display = 'inline-block';
        
        // Show modal
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showDepartmentChairInfo(department) {
        // Set modal content for department chair
        document.getElementById('modal-title').textContent = `${department.name} Department`;
        document.getElementById('modal-description').textContent = 
            `Department Chair: ${department.chair}\n\nThis department oversees ${department.programs.length} program${department.programs.length !== 1 ? 's' : ''} within the School of Arts, Communication, Design & Media.`;
        
        // Set badges - list programs
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        department.programs.forEach(prog => {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.style.background = '#3498db';
            badge.textContent = prog.name;
            badgesContainer.appendChild(badge);
        });
        
        // No video for chair
        document.getElementById('modal-video').innerHTML = '';
        
        // Hide learn more link
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.style.display = 'none';
        
        // Show modal
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showProgramLeadContact(program) {
        const lead = program.programLead;
        
        if (!lead || !lead.contactUrl) {
            // Show generic message if no contact info available
            document.getElementById('modal-title').textContent = `${program.name} Program Lead`;
            document.getElementById('modal-description').textContent = 
                `For questions about the ${program.name} program:\n\n` +
                `Contact information is being updated.\n` +
                `Please check the SWC department directory for current contact details.`;
        } else {
            // Show specific faculty contact
            document.getElementById('modal-title').textContent = lead.name;
            document.getElementById('modal-description').textContent = 
                `${lead.title}\n\n` +
                `Program: ${program.name}\n\n` +
                `Click "Contact Faculty" below to send a message or view full contact details.`;
        }
        
        // Clear badges
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        const roleBadge = document.createElement('span');
        roleBadge.className = 'badge';
        roleBadge.style.background = '#2980b9';
        roleBadge.textContent = '👤 Program Lead';
        badgesContainer.appendChild(roleBadge);
        
        // No video
        document.getElementById('modal-video').innerHTML = '';
        
        // Set contact link
        const learnMoreLink = document.getElementById('modal-link');
        if (lead && lead.contactUrl) {
            learnMoreLink.href = lead.contactUrl;
            learnMoreLink.textContent = 'Contact Faculty';
        } else {
            learnMoreLink.href = 'https://www.swccd.edu/about-swc/get-in-touch/department-directory.aspx';
            learnMoreLink.textContent = 'View Department Directory';
        }
        learnMoreLink.style.display = 'inline-block';
        
        // Show modal
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showChairContact(departmentName, programName) {
        // Set modal content for contacting chair
        document.getElementById('modal-title').textContent = `${departmentName} Department Chair`;
        document.getElementById('modal-description').textContent = 
            `For questions about the ${programName} program or ${departmentName} department:\n\n` +
            `📧 Email: Contact through the SWC directory\n` +
            `📞 Phone: Available via department office\n` +
            `🏢 Office: ACDM School\n\n` +
            `Visit the department directory for current contact information.`;
        
        // Clear badges
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        const infoBadge = document.createElement('span');
        infoBadge.className = 'badge';
        infoBadge.style.background = '#3498db';
        infoBadge.textContent = '📋 More Info Available';
        badgesContainer.appendChild(infoBadge);
        
        // No video
        document.getElementById('modal-video').innerHTML = '';
        
        // Set learn more to directory
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.href = 'https://www.swccd.edu/about-swc/get-in-touch/department-directory.aspx';
        learnMoreLink.textContent = 'View Department Directory';
        learnMoreLink.style.display = 'inline-block';
        
        // Show modal
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showDeanContact(school) {
        const dean = school.dean;
        
        document.getElementById('modal-title').textContent = dean.name;
        document.getElementById('modal-description').textContent = 
            `${dean.title}\n` +
            `${school.name}\n\n` +
            `📧 Email: ${dean.email}\n` +
            `📞 Phone: ${dean.phone}\n` +
            `🏢 Office: ${dean.office}\n\n` +
            `The Dean oversees all academic programs, faculty, and operations within the school.`;
        
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.style.background = '#8e44ad';
        badge.textContent = '🎓 Interim Dean';
        badgesContainer.appendChild(badge);
        
        document.getElementById('modal-video').innerHTML = '';
        
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.href = dean.contactUrl;
        learnMoreLink.textContent = 'Send Email to Diana';
        learnMoreLink.style.display = 'inline-block';
        
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showCounselorContact(school) {
        const counselor = school.counselor;
        
        document.getElementById('modal-title').textContent = counselor.name;
        document.getElementById('modal-description').textContent = 
            `${counselor.title}\n` +
            `School of Counseling & Student Support Programs\n\n` +
            `📧 Email: ${counselor.email}\n` +
            `📞 Phone: ${counselor.phone}\n` +
            `🏢 Office: ${counselor.office}\n\n` +
            `Counselors help with:\n` +
            `• Academic planning and course selection\n` +
            `• Transfer guidance\n` +
            `• Career exploration\n` +
            `• Educational goals and degree planning`;
        
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.style.background = '#27ae60';
        badge.textContent = '🧭 Academic Counselor';
        badgesContainer.appendChild(badge);
        
        document.getElementById('modal-video').innerHTML = '';
        
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.href = counselor.contactUrl;
        learnMoreLink.textContent = 'Send Email to Adriana';
        learnMoreLink.style.display = 'inline-block';
        
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showSuccessCoachContact(school) {
        const coach = school.successCoach;
        
        document.getElementById('modal-title').textContent = coach.name;
        document.getElementById('modal-description').textContent = 
            `${coach.title}\n` +
            `School of Counseling & Student Support Programs\n\n` +
            `📧 Email: ${coach.email}\n` +
            `📞 Phone: ${coach.phone}\n` +
            `🏢 Office: ${coach.office}\n\n` +
            `Success Coaches help students:\n` +
            `• Navigate their field of study\n` +
            `• Connect with resources and support\n` +
            `• Achieve academic success\n` +
            `• Plan their educational pathway`;
        
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.style.background = '#e67e22';
        badge.textContent = '🎯 Success Coach';
        badgesContainer.appendChild(badge);
        
        document.getElementById('modal-video').innerHTML = '';
        
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.href = coach.contactUrl;
        learnMoreLink.textContent = 'Send Email to Omar';
        learnMoreLink.style.display = 'inline-block';
        
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showReceptionistContact(school) {
        const receptionist = school.receptionist;
        
        document.getElementById('modal-title').textContent = receptionist.name;
        document.getElementById('modal-description').textContent = 
            `${receptionist.title}\n` +
            `${receptionist.department}\n\n` +
            `📧 Email: ${receptionist.email}\n` +
            `📞 Phone: ${receptionist.phone}\n` +
            `🏢 Office: ${receptionist.office}\n\n` +
            `The receptionist can help with:\n` +
            `• General information about ACDM programs\n` +
            `• Directions to faculty offices and classrooms\n` +
            `• Scheduling appointments\n` +
            `• Answering questions about the school`;
        
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.style.background = '#3498db';
        badge.textContent = '📞 Front Desk';
        badgesContainer.appendChild(badge);
        
        document.getElementById('modal-video').innerHTML = '';
        
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.href = receptionist.contactUrl;
        learnMoreLink.textContent = 'Send Email to Eileen';
        learnMoreLink.style.display = 'inline-block';
        
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showTutorContact(tutor) {
        document.getElementById('modal-title').textContent = tutor.name;
        document.getElementById('modal-description').textContent = 
            `${tutor.title}\n` +
            `${tutor.program}\n\n` +
            `📧 Email: ${tutor.email}\n` +
            `📍 Tutoring Location: Room ${tutor.room}\n\n` +
            `Get help with:\n` +
            `• Course material and assignments\n` +
            `• Studio techniques and technology\n` +
            `• Project guidance and feedback\n` +
            `• Exam preparation and study strategies\n\n` +
            `Stop by during tutoring hours or email to schedule an appointment!`;
        
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.style.background = '#9b59b6';
        badge.textContent = '📚 Program Tutor';
        badgesContainer.appendChild(badge);
        
        document.getElementById('modal-video').innerHTML = '';
        
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.href = `mailto:${tutor.email}`;
        learnMoreLink.textContent = 'Send Email to Alex';
        learnMoreLink.style.display = 'inline-block';
        
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    showVendingMachineMessage(message) {
        // Set modal content for empty vending machine
        document.getElementById('modal-title').textContent = '🥤 Vending Machine';
        document.getElementById('modal-description').textContent = message;
        
        // Clear badges
        document.getElementById('modal-badges').innerHTML = '';
        
        // Add a sad emoji badge
        const sadBadge = document.createElement('span');
        sadBadge.className = 'badge';
        sadBadge.style.background = '#95a5a6';
        sadBadge.textContent = '😞 No Snacks Today';
        document.getElementById('modal-badges').appendChild(sadBadge);
        
        // No video
        document.getElementById('modal-video').innerHTML = '';
        
        // Hide learn more link
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.style.display = 'none';
        
        // Show modal
        this.modal.classList.remove('hidden');
        this.modal.classList.add('active');
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        this.modal.classList.add('hidden');
        
        // Reset learn more link display
        const learnMoreLink = document.getElementById('modal-link');
        learnMoreLink.style.display = 'inline-block';
    }
}

// Create global UI controller instance
let uiController;
window.addEventListener('DOMContentLoaded', () => {
    uiController = new UIController();
});
