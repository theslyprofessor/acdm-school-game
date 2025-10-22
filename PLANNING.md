# ACDM School Explorer - Game Planning Document

## 🎮 Game Overview
A Legend of Zelda-style top-down browser game where students explore the School of Arts, Communication, Design & Media (ACDM) building and learn about different degree programs.

## 🎯 Core Concept
- **Genre**: Top-down exploration/adventure
- **Style**: Pixel art aesthetic
- **Platform**: Browser-based (HTML5 Canvas)
- **Tech Stack**: Vanilla JavaScript (or lightweight engine like Phaser.js)

## 🏛️ Game Structure

### World Map (Mario-Style Overworld)
- **Main Screen**: Top-down pixel art version of SWC Chula Vista Campus
- **Campus Layout**: Simplified map based on actual campus (Building 87 = ACDM focus)
- **Navigation**: Player walks around the campus map to different buildings/schools
- **Building Markers**: Interactive nodes representing different schools:
  - **Building 87**: School of Arts, Communication, Design & Media (PRIMARY FOCUS)
  - Building 24/25: School of Education, Humanities, Social Sciences
  - Building 60: School of Math, Science & Engineering
  - Building 71: School of Wellness, Exercise Science & Athletics
  - Other buildings: Optional future expansion
- **Entry Mechanism**: Walk to a building marker and press E/Space to "enter the level"

### Level Structure (Inside Buildings)
- **Building 87 (ACDM)**: Contains 12 program rooms
- Each program = one room/area within the building level
- **Room Layout**: Large open floor plan with distinct sections for each program
- **Interactive Zones**: Walk to different areas to explore programs

### Information Display System
- **Billboard Characters**: NPC sprites holding up signs/billboards
- **Interaction**: Press E/Space near a billboard character
- **Video Interface**: Modal popup overlay with:
  - Program title and degree types (Associate/Certificate badges)
  - Brief description text
  - Video embed (YouTube/Vimeo) explaining the program
  - "Learn More" button linking to official program page
  - Close button (X or ESC key)
- **Multiple Billboards**: Each room has 2-3 billboard NPCs with different info:
  - Program overview
  - Career opportunities
  - Student resources/facilities

### Program Rooms in Building 87 (12 Total)

1. **Architecture** (Associate + Certificate)
2. **Art** (Associate + Certificate)
3. **Communication** (Associate)
4. **Computer Aided Design & Drafting** (Associate + Certificate)
5. **Dance** (Associate)
6. **Film, Television & Media Arts** (Associate + Certificate)
7. **Graphic Design** (Associate)
8. **Journalism** (Associate)
9. **Liberal Arts Emphasis Degrees** (Associate)
10. **Music** (Associate + Certificate)
11. **Recording Arts Technology** (Associate + Certificate)
12. **Theatre Arts** (Associate + Certificate)

Each program area contains:
- **Themed Environment**: Visual representation with pixel art decorations
- **Billboard NPCs**: 2-3 character sprites holding information signs
- **Interactive Video Displays**: Click to open modal with program videos/info
- **Resource Links**: Connections to program pages, faculty contacts, etc.
- **Visual Indicators**: Degree badges (Associate/Certificate) displayed clearly

## 🎨 Visual Design

### Pixel Art Style
- **Resolution**: 16x16 or 32x32 pixel tiles
- **Color Palette**: School colors (maroon/burgundy and white based on image)
- **Character**: Simple 4-directional sprite (up, down, left, right)
- **Animations**: Walk cycles, idle states

### Room Themes
- **Architecture**: Blueprints, drafting tables, building models
- **Art**: Easels, paintings, sculptures
- **Communication**: Microphones, cameras, presentation screens
- **CAD**: Computers, 3D models, technical drawings
- **Dance**: Mirrors, ballet barres, stage floor
- **Film/TV**: Cameras, director's chair, film reels
- **Graphic Design**: Design posters, computers, color wheels
- **Journalism**: Newspapers, typewriters, interview setup
- **Liberal Arts**: Books, globe, mixed academic symbols
- **Music**: Instruments, sheet music, recording booth
- **Recording Arts**: Mixing boards, studio equipment
- **Theatre**: Stage, curtains, masks

## 🕹️ Game Mechanics

### Player Controls
- **Arrow Keys / WASD**: Movement in 4 directions
- **E / Space**: Interact with objects/signs
- **ESC**: Close dialogs/return to hub

### Core Features
1. **Movement System**: Grid-based or free movement
2. **Collision Detection**: Can't walk through walls/objects
3. **Door Transitions**: Fade in/out when entering rooms
4. **Information Display**: Dialog boxes with program details
5. **Interactive Objects**: Click/press E to read signs

### Optional Features (Phase 2)
- Mini-map
- Quest system (collect info from all programs)
- NPC guides (professors/students)
- Sound effects and background music
- Save progress (localStorage)
- Mobile touch controls

## 🛠️ Technical Implementation

### File Structure
```
acdm-school-game/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── game.js          # Main game loop
│   ├── player.js        # Player character class
│   ├── world.js         # World/room management
│   ├── collision.js     # Collision detection
│   ├── ui.js            # UI and dialog system
│   └── data/
│       └── programs.js  # Program information data
├── assets/
│   ├── sprites/
│   │   ├── player.png
│   │   ├── tiles.png
│   │   └── objects.png
│   └── audio/          # (optional)
└── README.md
```

### Technology Options

**Option 1: Vanilla JavaScript + Canvas**
- Pros: Lightweight, full control, no dependencies
- Cons: More code to write, slower development

**Option 2: Phaser.js**
- Pros: Built-in physics, sprite management, faster development
- Cons: Slightly larger file size, learning curve

**Recommendation**: Start with Phaser.js for faster prototyping

### Game Data Structure

```javascript
const programs = [
  {
    id: 'architecture',
    name: 'Architecture',
    degrees: ['Associate', 'Certificate'],
    description: 'Learn about...',
    roomX: 100,
    roomY: 50,
    theme: 'blueprints'
  },
  // ... more programs
];
```

## 📅 Development Phases

### Phase 1: Core Functionality (MVP)
- [ ] Set up project structure
- [ ] Implement player movement
- [ ] Create main hub layout
- [ ] Add collision detection
- [ ] Implement door system
- [ ] Create 3 sample program rooms
- [ ] Add information display system

### Phase 2: Content
- [ ] Design all 13 program rooms
- [ ] Create pixel art assets
- [ ] Add program information
- [ ] Polish room decorations

### Phase 3: Enhancement
- [ ] Add sound effects
- [ ] Implement mini-map
- [ ] Add NPCs/guides
- [ ] Mobile responsiveness
- [ ] Performance optimization

### Phase 4: Deployment
- [ ] GitHub Pages hosting
- [ ] Testing across browsers
- [ ] Documentation
- [ ] User guide

## 🎨 Asset Creation

### Tools
- **Pixel Art**: Aseprite, Piskel, or Photoshop
- **Tilemap**: Tiled Map Editor
- **Sound**: Bfxr, ChipTone

### Asset List
- Player sprite (4 directions, 2-4 frames each)
- Floor tiles (wood, carpet, stone)
- Wall tiles (various styles)
- Door sprites (closed, open)
- Furniture and decorations (per room theme)
- UI elements (dialog boxes, buttons)

## 🔗 Integration

### Program Information Links
Each room should have:
- Brief program description
- Degree types available
- "Learn More" button linking to official page
- Visual representation of program content

### External Resources
- Link to full program catalog
- Contact information
- Admissions info

## 📱 Responsive Design
- Desktop: Full keyboard controls
- Tablet: Touch controls + virtual joystick
- Mobile: Simplified layout, touch optimized

## 🚀 Deployment
- **Hosting**: GitHub Pages
- **Domain**: Custom subdomain (optional)
- **CDN**: For faster asset loading

## 📈 Future Enhancements
- Multiplayer lobby (see other students)
- Achievement system
- Program quizzes/mini-games
- Virtual campus tour expansion
- VR/AR support

## 📝 Notes
- Keep file sizes small for fast loading
- Ensure accessibility (keyboard navigation)
- Add loading screen for assets
- Include credits for asset creators
- Mobile-first approach for wider reach
