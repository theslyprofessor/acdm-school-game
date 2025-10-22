# ACDM School Explorer

A Legend of Zelda-style browser game where students explore the Southwestern College School of Arts, Communication, Design & Media (ACDM) campus and learn about different degree programs.

## 🎮 Game Concept

Navigate a pixel art version of the SWC Chula Vista campus, enter buildings, and interact with NPCs to discover information about 12+ academic programs. Features a Mario-style world map for campus navigation and individual "levels" for each building.

## 🎯 Features

- **World Map**: Navigate the SWC campus with a top-down pixel art overworld
- **Interactive Buildings**: Enter Building 87 (ACDM) to explore 12 program areas
- **Billboard NPCs**: Character sprites hold up information about programs
- **Video Integration**: Modal popups with program videos and detailed information
- **Degree Information**: Learn about Associate degrees and Certificates

## 🏛️ ACDM Programs Featured

1. Architecture
2. Art
3. Communication
4. Computer Aided Design & Drafting
5. Dance
6. Film, Television & Media Arts
7. Graphic Design
8. Journalism
9. Liberal Arts Emphasis Degrees
10. Music
11. Recording Arts Technology
12. Theatre Arts

## 🛠️ Tech Stack

- HTML5 Canvas
- JavaScript (Phaser.js game engine)
- CSS3
- Pixel art assets

## 📁 Project Structure

```
acdm-school-game/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── game.js
│   ├── player.js
│   ├── world.js
│   ├── collision.js
│   ├── ui.js
│   └── data/
│       └── programs.js
├── assets/
│   ├── sprites/
│   └── audio/
├── PLANNING.md
└── README.md
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/theslyprofessor/acdm-school-game.git
cd acdm-school-game
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server
```

3. Navigate to `http://localhost:8000`

## 🎮 Controls

- **Arrow Keys / WASD**: Move character
- **E / Space**: Interact with NPCs and objects
- **ESC**: Close modals and return to previous screen

## 📅 Development Roadmap

- [x] Planning document
- [ ] Project setup
- [ ] World map implementation
- [ ] Player movement system
- [ ] Building entry/exit mechanics
- [ ] Billboard NPC system
- [ ] Video modal interface
- [ ] All 12 program rooms
- [ ] Asset creation
- [ ] Deploy to GitHub Pages

## 🤝 Contributing

This is an educational project for Southwestern College. Contributions and suggestions are welcome!

## 📄 License

MIT License

## 🔗 Links

- [Southwestern College](https://www.swccd.edu/)
- [ACDM Programs](https://www.swccd.edu/academics/schools/arts-communication-design-media/)
- [Campus Map](https://www.swccd.edu/about-swc/campus-maps-and-directions/)

---

Built with ❤️ for SWC students
