# ACDM School Explorer

**An interactive educational game for Southwestern College's School of Arts, Communication, Design & Media (ACDM)**

![Game Screenshot](screenshot.png)

## 🎮 About

ACDM School Explorer is a Dragon Quest-style top-down exploration game that helps students learn about the 12 academic programs offered by SWC's ACDM school. Players can:

- Navigate a virtual SWC campus
- Explore the ACDM school with 5 departments
- Enter individual program rooms to learn about each program
- View degree and certificate options (clickable links to catalog)
- Contact faculty and program leads
- Discover educational resources like [midimaze.com](https://midimaze.com)

## 🏫 Programs Featured

### Visual Arts Department
- Architecture (5 awards)
- Art (5 awards)

### Communication Department
- Communication (2 awards)
- Film, Television & Media Arts (3 awards)
- Journalism (2 awards)
- Recording Arts & Technology (2 awards)

### Performing Arts Department
- Dance (1 award)
- Music (6 awards)
- Theatre Arts (3 awards)

### Applied Technologies Department
- Computer Aided Design & Drafting (3 awards)

### Humanities Department
- Liberal Arts Areas of Emphasis (3 awards)
- Mexican American Studies (1 award)

## 🎵 Features

- **Individual Program Rooms**: Each program has its own dedicated room
- **Interactive Degree Icons**: Click to open specific catalog pages
- **Faculty Contacts**: Contact program leads, department chairs, dean, and counselors
- **Music System**: Dynamic chiptune music for campus, school, and program rooms
- **Custom Backgrounds**: Recording Arts features a real studio photo
- **Easter Eggs**: Empty vending machines (classic college experience!)

## 🕹️ Controls

- **Arrow Keys / WASD**: Move character
- **E / Space**: Interact with NPCs, enter rooms, view information
- **M**: Toggle music on/off
- **ESC**: Close modals or exit rooms (back to previous scene)

## 🛠️ Technology Stack

- **Phaser 3**: Game engine for sprite rendering and physics
- **Vanilla JavaScript**: Core game logic
- **HTML5 Canvas**: Rendering
- **Web Audio API**: Chiptune music generation
- **CSS3**: UI styling and modals

## 📁 Project Structure

```
acdm-school-game/
├── index.html              # Main HTML entry point
├── css/
│   └── style.css          # Game and UI styling
├── js/
│   ├── game.js            # Main game loop and scene management
│   ├── sprites.js         # Sprite generation (characters, icons, buildings)
│   ├── music.js           # Music manager and chiptune sounds
│   ├── ui.js              # Modal controller for information display
│   └── data/
│       ├── schools.js     # School/department/program data structure
│       └── faculty.json   # Faculty contact information
├── assets/
│   ├── backgrounds/       # Custom room backgrounds
│   ├── sprites/           # (Generated programmatically)
│   └── audio/             # Music files (optional)
└── scripts/
    └── scrape_faculty.py  # Faculty directory scraper
```

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/theslyprofessor/acdm-school-game.git
cd acdm-school-game
```

2. Start a local web server:
```bash
# Python 3
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000

# Or using Bun
bun x http-server -p 8000
```

3. Open in browser:
```
http://localhost:8000
```

### Deployment

The game is a static web application and can be deployed to:
- GitHub Pages
- Hostinger Hosting
- Netlify
- Vercel
- Any static hosting service

## 👥 Faculty Contacts

- **Dean**: Diana Arredondo
- **Program Leads**: Contact information for each program
- **Department Chairs**: Available in department view
- **Counselors**: School counselor contact

## 📝 Development

### Adding New Programs

1. Update `js/data/schools.js` with program information
2. Add program lead contact information
3. Create degree/certificate data with catalog URLs
4. (Optional) Add custom background image to `assets/backgrounds/`

### Adding Custom Backgrounds

1. Save image as `assets/backgrounds/[program-id].jpg`
2. Update `preload()` in `game.js` to load the image
3. Update `createProgramRoom()` to display for that program

See `assets/backgrounds/README.md` for detailed instructions.

## 🎨 Credits

**Created by**: Nakul Tiruviluamala
**For**: Southwestern College ACDM
**Built with**: Phaser 3, JavaScript, lots of coffee ☕

## 📄 License

This project is for educational purposes at Southwestern College.

## 🔗 Links

- [SWC ACDM Programs](https://www.swccd.edu/academics/schools-centers/arts-communication-design-media/)
- [Program Catalog](https://catalog.swccd.edu/)
- [midimaze Educational Resource](https://midimaze.com)
- [Faculty Directory](https://www.swccd.edu/about-swc/get-in-touch/department-directory.aspx)

---

Made with 💙 for SWC Students
