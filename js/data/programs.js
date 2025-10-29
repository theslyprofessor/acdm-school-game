// Program data for ACDM School Explorer
const PROGRAMS_DATA = [
    {
        id: 'architecture',
        name: 'Architecture',
        degrees: ['Associate', 'Certificate'],
        description: 'Explore the art and science of building design. Learn architectural drafting, design principles, building codes, and sustainable design practices. Our program prepares you for a career in architecture, construction management, or further studies in the field.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder - replace with actual video
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/architecture/',
        roomPosition: { x: 100, y: 100 },
        color: 0x4a90e2,
        theme: 'blueprints'
    },
    {
        id: 'art',
        name: 'Art',
        degrees: ['Associate', 'Certificate'],
        description: 'Develop your artistic vision and technical skills in various media including drawing, painting, sculpture, and digital art. Our comprehensive program prepares you for transfer to a four-year institution or direct entry into creative careers.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/art/',
        roomPosition: { x: 300, y: 100 },
        color: 0xe74c3c,
        theme: 'easels'
    },
    {
        id: 'communication',
        name: 'Communication',
        degrees: ['Associate'],
        description: 'Master the art of effective communication across various platforms and contexts. Study interpersonal communication, public speaking, media studies, and organizational communication to prepare for diverse career opportunities.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/communication/',
        roomPosition: { x: 500, y: 100 },
        color: 0x9b59b6,
        theme: 'microphones'
    },
    {
        id: 'cad',
        name: 'Computer Aided Design & Drafting',
        degrees: ['Associate', 'Certificate'],
        description: 'Learn industry-standard CAD software and technical drafting skills. Prepare for careers in engineering, architecture, manufacturing, and construction with hands-on training in 2D and 3D design.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/cad/',
        roomPosition: { x: 700, y: 100 },
        color: 0x3498db,
        theme: 'computers'
    },
    {
        id: 'dance',
        name: 'Dance',
        degrees: ['Associate'],
        description: 'Express yourself through movement and choreography. Study various dance styles including ballet, modern, jazz, and hip-hop. Develop your technique, creativity, and performance skills.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/dance/',
        roomPosition: { x: 100, y: 300 },
        color: 0xff6b9d,
        theme: 'mirrors'
    },
    {
        id: 'film',
        name: 'Film, Television & Media Arts',
        degrees: ['Associate', 'Certificate'],
        description: 'Learn the craft of visual storytelling through film and television production. Gain hands-on experience with cameras, editing software, lighting, sound design, and directing.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/film-tv/',
        roomPosition: { x: 300, y: 300 },
        color: 0x34495e,
        theme: 'cameras'
    },
    {
        id: 'graphic-design',
        name: 'Graphic Design',
        degrees: ['Associate'],
        description: 'Create compelling visual communications for print and digital media. Master industry-standard design software, typography, branding, and user experience design principles.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/graphic-design/',
        roomPosition: { x: 500, y: 300 },
        color: 0xe67e22,
        theme: 'design-posters'
    },
    {
        id: 'journalism',
        name: 'Journalism',
        degrees: ['Associate'],
        description: 'Discover the fundamentals of news gathering, reporting, and storytelling across multiple platforms. Learn ethical journalism practices, interviewing techniques, and multimedia content creation.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/journalism/',
        roomPosition: { x: 700, y: 300 },
        color: 0x95a5a6,
        theme: 'newspapers'
    },
    {
        id: 'liberal-arts',
        name: 'Liberal Arts Emphasis Degrees',
        degrees: ['Associate'],
        description: 'Build a broad foundation in arts and humanities with the flexibility to emphasize your interests in communication, arts, or related fields. Perfect for transfer students seeking a well-rounded education.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/liberal-arts/',
        roomPosition: { x: 100, y: 500 },
        color: 0x16a085,
        theme: 'books'
    },
    {
        id: 'music',
        name: 'Music',
        degrees: ['Associate', 'Certificate'],
        description: 'Develop your musical talents through performance, theory, composition, and music history. Study various genres and instruments in our state-of-the-art facilities with experienced faculty.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/music/',
        roomPosition: { x: 300, y: 500 },
        color: 0x8e44ad,
        theme: 'instruments'
    },
    {
        id: 'recording-arts',
        name: 'Recording Arts Technology',
        degrees: ['Associate', 'Certificate'],
        description: 'Master the technical and creative aspects of audio production. Learn recording techniques, mixing, mastering, live sound reinforcement, and studio management in professional facilities.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/recording-arts/',
        roomPosition: { x: 500, y: 500 },
        color: 0x2c3e50,
        theme: 'mixing-boards'
    },
    {
        id: 'theatre',
        name: 'Theatre Arts',
        degrees: ['Associate', 'Certificate'],
        description: 'Explore all aspects of theatre including acting, directing, stagecraft, costume design, and theatrical production. Gain practical experience through performances and technical crew work.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        learnMoreUrl: 'https://www.swccd.edu/academics/schools/arts-communication-design-media/theatre/',
        roomPosition: { x: 700, y: 500 },
        color: 0xc0392b,
        theme: 'stage'
    }
];

// Helper function to get program by ID
function getProgramById(id) {
    return PROGRAMS_DATA.find(program => program.id === id);
}

// Helper function to show program modal
function showProgramModal(programId) {
    const program = getProgramById(programId);
    if (!program) return;

    const modal = document.getElementById('program-modal');
    const title = document.getElementById('modal-title');
    const badges = document.getElementById('modal-badges');
    const description = document.getElementById('modal-description');
    const video = document.getElementById('modal-video');
    const link = document.getElementById('modal-link');

    title.textContent = program.name;
    description.textContent = program.description;
    link.href = program.learnMoreUrl;

    // Create degree badges
    badges.innerHTML = '';
    program.degrees.forEach(degree => {
        const badge = document.createElement('span');
        badge.className = `badge badge-${degree.toLowerCase()}`;
        badge.textContent = degree;
        badges.appendChild(badge);
    });

    // Add video iframe
    video.innerHTML = `<iframe src="${program.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    modal.style.display = 'block';
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('program-modal');
    const closeBtn = document.querySelector('.close-button');

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
