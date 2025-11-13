// SWC Schools, Departments, and Programs Structure
// Based on https://catalog.swccd.edu/getting-to-know-southwestern-college/schools-centers-departments/

const SCHOOLS = {
    acdm: {
        id: 'acdm',
        name: 'Arts, Communication, Design & Media',
        building: 'ACDM School',
        dean: {
            name: 'Diana Arredondo',
            title: 'Interim Dean',
            email: 'darredondo@swccd.edu',
            phone: '(619) 482-6371',
            office: '87-110',
            contactUrl: 'https://www.swccd.edu/_showcase/directory/person/diana-arredondo/'
        },
        counselor: {
            name: 'Adriana Garibay',
            title: 'Counselor',
            email: 'agaribay@swccd.edu',
            phone: '(619) 421-6700 x5434',
            office: '68-205D',
            contactUrl: 'https://www.swccd.edu/_showcase/directory/person/adriana-garibay/'
        },
        successCoach: {
            name: 'Omar Alvarez Espinosa',
            title: 'Field of Study Success Coach',
            email: 'oalvarez-espinosa@swccd.edu',
            phone: '(619) 421-6700 x5136',
            office: '68-206',
            contactUrl: 'https://www.swccd.edu/_showcase/directory/person/omar-alvarez-espinosa/'
        },
        receptionist: {
            name: 'Eileen Zwiereski',
            title: 'Administrative Secretary II',
            email: 'ezwierski@swccd.edu',
            phone: '(619) 482-6441',
            office: '87-109A',
            department: 'School of Arts, Communication, Design & Media',
            contactUrl: 'https://www.swccd.edu/_showcase/directory/person/ewa-zwierski/'
        },
        departments: {
            visualArts: {
                id: 'visualArts',
                name: 'Visual Arts',
                chair: 'TBD', // To be determined
                programs: [
                    {
                        id: 'architecture',
                        name: 'Architecture',
                        awards: 5,
                        degrees: [
                            { type: 'Associate', name: 'Architecture - AS', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/architecture/architecture-as/' },
                            { type: 'Certificate', name: 'Architectural Design Technology', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/architecture/architectural-design-technology/' },
                            { type: 'Certificate', name: 'Building Information Modeling', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/architecture/building-information-modeling/' },
                            { type: 'Certificate', name: 'Green Architecture', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/architecture/green-architecture/' },
                            { type: 'Certificate', name: 'Sustainable Building Design & Construction', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/architecture/sustainable-building-design-construction/' }
                        ],
                        description: 'Explore architectural design, drafting, and building technology. Learn to create innovative designs that shape our built environment.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/architecture/'
                    },
                    {
                        id: 'art',
                        name: 'Art',
                        awards: 5,
                        degrees: [
                            { type: 'Associate', name: 'Art - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/art/art-aa/' },
                            { type: 'Associate', name: 'Art History - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/art/art-history-aa/' },
                            { type: 'Certificate', name: 'Ceramics', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/art/ceramics/' },
                            { type: 'Certificate', name: 'Drawing & Painting', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/art/drawing-painting/' },
                            { type: 'Certificate', name: 'Sculpture', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/art/sculpture/' }
                        ],
                        description: 'Develop your artistic vision through drawing, painting, sculpture, and digital media. Express yourself through various artistic mediums.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/art/'
                    }
                ]
            },
            communication: {
                id: 'communication',
                name: 'Communication',
                chair: 'TBD',
                programs: [
                    {
                        id: 'communication',
                        name: 'Communication',
                        awards: 2,
                        degrees: [
                            { type: 'Associate', name: 'Communication - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/communication/communication-aa/' }
                        ],
                        description: 'Master the art of effective communication in interpersonal, organizational, and mass media contexts.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/communication/'
                    },
                    {
                        id: 'film',
                        name: 'Film, Television & Media Arts',
                        awards: 3,
                        degrees: [
                            { type: 'Associate', name: 'Film, Television & Media Arts - AS', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/film-television-media-arts/film-television-media-arts-as/' },
                            { type: 'Certificate', name: 'Cinematography', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/film-television-media-arts/cinematography/' },
                            { type: 'Certificate', name: 'Video & Audio Production', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/film-television-media-arts/video-audio-production/' }
                        ],
                        description: 'Learn filmmaking, video production, and media storytelling. Create compelling visual narratives for screen and digital platforms.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/film/'
                    },
                    {
                        id: 'journalism',
                        name: 'Journalism',
                        awards: 2,
                        degrees: [
                            { type: 'Associate', name: 'Journalism - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/journalism/journalism-aa/' }
                        ],
                        description: 'Develop reporting, writing, and multimedia storytelling skills for print and digital journalism.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/journalism/'
                    },
                    {
                        id: 'recording-arts',
                        name: 'Recording Arts & Technology',
                        awards: 2,
                        programLead: {
                            name: 'Nakul Tiruviluamala',
                            title: 'Assistant Professor',
                            email: 'ntiruviluamala@swccd.edu',
                            phone: '(619) 421-6700 x5377',
                            office: '84-110',
                            department: 'School of Arts, Communication, Design & Media',
                            contactUrl: 'https://go.swccd.edu/contact/person/8a27ea911b4a741036c0a685624bcb5a'
                        },
                        degrees: [
                            { type: 'Associate', name: 'Recording Arts & Technology - AS', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/recording-arts-technology/recording-arts-technology-as/' },
                            { type: 'Certificate', name: 'Recording Arts & Technology', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/recording-arts-technology/recording-arts-technology/' }
                        ],
                        description: 'Master audio recording, mixing, production, and sound design in professional studio environments.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/recording-arts/'
                    }
                ]
            },
            performingArts: {
                id: 'performingArts',
                name: 'Performing Arts',
                chair: 'TBD',
                programs: [
                    {
                        id: 'dance',
                        name: 'Dance',
                        awards: 1,
                        degrees: [
                            { type: 'Associate', name: 'Dance - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/dance/dance-aa/' }
                        ],
                        description: 'Explore movement, choreography, and performance through various dance styles and techniques.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/dance/'
                    },
                    {
                        id: 'music',
                        name: 'Music',
                        awards: 6,
                        degrees: [
                            { type: 'Associate', name: 'Music - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/music/music-aa/' },
                            { type: 'Associate', name: 'Music Performance - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/music/music-performance-aa/' },
                            { type: 'Certificate', name: 'Applied Music: Instrumental', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/music/applied-music-instrumental/' },
                            { type: 'Certificate', name: 'Applied Music: Piano', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/music/applied-music-piano/' },
                            { type: 'Certificate', name: 'Applied Music: Voice', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/music/applied-music-voice/' },
                            { type: 'Certificate', name: 'Music Technology', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/music/music-technology/' }
                        ],
                        description: 'Study music theory, performance, composition, and music history. Develop your musical skills and artistic expression.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/music/'
                    },
                    {
                        id: 'theatre',
                        name: 'Theatre Arts',
                        awards: 3,
                        degrees: [
                            { type: 'Associate', name: 'Theatre Arts - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/theatre-arts/theatre-arts-aa/' },
                            { type: 'Certificate', name: 'Acting', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/theatre-arts/acting/' },
                            { type: 'Certificate', name: 'Technical Theatre', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/theatre-arts/technical-theatre/' }
                        ],
                        description: 'Explore acting, directing, stagecraft, and theatrical production. Bring stories to life on stage.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/theatre/'
                    }
                ]
            },
            appliedTechnologies: {
                id: 'appliedTechnologies',
                name: 'Applied Technologies',
                chair: 'TBD',
                programs: [
                    {
                        id: 'cad',
                        name: 'Computer Aided Design & Drafting',
                        awards: 3,
                        degrees: [
                            { type: 'Associate', name: 'Computer Aided Design & Drafting - AS', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/computer-aided-design-drafting/computer-aided-design-drafting-as/' },
                            { type: 'Certificate', name: 'Architectural Drafting', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/computer-aided-design-drafting/architectural-drafting/' },
                            { type: 'Certificate', name: 'Civil Drafting Technology', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/computer-aided-design-drafting/civil-drafting-technology/' }
                        ],
                        description: 'Learn industry-standard CAD software and technical drafting techniques for engineering and design applications.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/cad/'
                    }
                ]
            },
            humanities: {
                id: 'humanities',
                name: 'Humanities',
                chair: 'TBD',
                programs: [
                    {
                        id: 'liberal-arts',
                        name: 'Liberal Arts Areas of Emphasis',
                        awards: 3,
                        degrees: [
                            { type: 'Associate', name: 'Liberal Arts: Arts & Humanities - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/liberal-arts/liberal-arts-arts-humanities-aa/' },
                            { type: 'Associate', name: 'Liberal Arts: General Studies - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/liberal-arts/liberal-arts-general-studies-aa/' },
                            { type: 'Associate', name: 'Liberal Arts: Language & Rationality - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/liberal-arts/liberal-arts-language-rationality-aa/' }
                        ],
                        description: 'Pursue a broad-based education with emphasis areas aligned with your interests and transfer goals.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/liberal-arts/'
                    },
                    {
                        id: 'mexican-american-studies',
                        name: 'Mexican American Studies',
                        awards: 1,
                        degrees: [
                            { type: 'Associate', name: 'Mexican American Studies - AA', url: 'https://catalog.swccd.edu/associate-degree-certificate-programs/mexican-american-studies/mexican-american-studies-aa/' }
                        ],
                        description: 'Study Mexican American history, culture, and contributions to society.',
                        videoUrl: '',
                        learnMoreUrl: 'https://www.swccd.edu/academics/programs/mexican-american-studies/'
                    }
                ]
            }
        }
    }
    // Future schools to add:
    // mathScience: { ... }
    // business: { ... }
    // healthSciences: { ... }
    // etc.
};

// Helper function to get all programs from a school
function getSchoolPrograms(schoolId) {
    const school = SCHOOLS[schoolId];
    if (!school) return [];
    
    const programs = [];
    for (const deptKey in school.departments) {
        const dept = school.departments[deptKey];
        dept.programs.forEach(program => {
            programs.push({
                ...program,
                department: dept.name,
                departmentId: dept.id
            });
        });
    }
    return programs;
}

// Helper function to get programs organized by department
function getProgramsByDepartment(schoolId) {
    const school = SCHOOLS[schoolId];
    if (!school) return [];
    
    const departments = [];
    for (const deptKey in school.departments) {
        const dept = school.departments[deptKey];
        departments.push({
            id: dept.id,
            name: dept.name,
            chair: dept.chair,
            programs: dept.programs
        });
    }
    return departments;
}
