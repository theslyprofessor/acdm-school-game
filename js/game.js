// Main Game Configuration and Setup
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#2d5016',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NO_CENTER
    }
};

const game = new Phaser.Game(config);

// Game state
let player;
let cursors;
let wasd;
let interactKey;
let currentScene = 'overworld'; // 'overworld', 'school', or 'program-room'
let currentProgram = null; // Stores current program when in program room
let buildings;
let npcs = [];
let vendingMachines = [];
let degreeIcons = [];
let interactionPrompt;
let playerDirection = 'down';
let musicManager = null;

function preload() {
    // Generate all sprite assets using SpriteGenerator
    SpriteGenerator.createPlayerSprites(this);
    SpriteGenerator.createGrassTile(this);
    SpriteGenerator.createPathTile(this);
    SpriteGenerator.createBuildingSprite(this);
    SpriteGenerator.createVendingMachine(this);
    
    // Create degree/certificate icons
    SpriteGenerator.createDegreeIcon(this, 'AA');
    SpriteGenerator.createDegreeIcon(this, 'AS');
    SpriteGenerator.createDegreeIcon(this, 'Certificate');
    SpriteGenerator.createChairIcon(this);
    SpriteGenerator.createMidimazeIcon(this);
    
    // Load program-specific background images
    this.load.image('recording-studio-bg', 'assets/backgrounds/recording-studio.jpg');
    
    // Create NPC sprites for each program theme
    const themes = ['architecture', 'art', 'communication', 'cad', 'dance', 'film', 
                    'graphic-design', 'journalism', 'liberal-arts', 'music', 'recording-arts', 'theatre'];
    themes.forEach(theme => {
        SpriteGenerator.createNPCSprite(this, theme);
    });
    
    // Create floor and wall tiles
    const floorGraphics = this.add.graphics();
    floorGraphics.fillStyle(0xcccccc, 1);
    floorGraphics.fillRect(0, 0, 16, 16);
    // Add tile pattern
    floorGraphics.fillStyle(0xb8b8b8, 1);
    floorGraphics.fillRect(0, 0, 8, 8);
    floorGraphics.fillRect(8, 8, 8, 8);
    floorGraphics.generateTexture('floor', 16, 16);
    floorGraphics.destroy();
    
    const wallGraphics = this.add.graphics();
    wallGraphics.fillStyle(0x654321, 1);
    wallGraphics.fillRect(0, 0, 16, 16);
    // Add brick pattern
    wallGraphics.fillStyle(0x8b6914, 1);
    wallGraphics.fillRect(1, 1, 6, 6);
    wallGraphics.fillRect(9, 1, 6, 6);
    wallGraphics.fillRect(1, 9, 6, 6);
    wallGraphics.fillRect(9, 9, 6, 6);
    wallGraphics.generateTexture('wall', 16, 16);
    wallGraphics.destroy();
    
    // Set player portrait in UI
    this.load.once('complete', () => {
        const portraitDiv = document.getElementById('character-portrait');
        if (portraitDiv && this.textures.exists('player-portrait')) {
            const canvas = this.textures.get('player-portrait').getSourceImage();
            portraitDiv.style.backgroundImage = `url(${canvas.toDataURL()})`;
            portraitDiv.style.backgroundSize = 'cover';
        }
    });
}

function create() {
    // Set up input
    cursors = this.input.keyboard.createCursorKeys();
    wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });
    interactKey = this.input.keyboard.addKeys({
        e: Phaser.Input.Keyboard.KeyCodes.E,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        esc: Phaser.Input.Keyboard.KeyCodes.ESC,
        m: Phaser.Input.Keyboard.KeyCodes.M
    });
    
    // Initialize music manager
    musicManager = new MusicManager(this);
    musicManager.init();
    
    // M key to toggle music
    this.input.keyboard.on('keydown-M', () => {
        const enabled = musicManager.toggle();
        console.log(`🎵 Music ${enabled ? 'enabled' : 'disabled'}`);
    });
    
    // No animations needed - just static sprites in 4 directions
    
    // Set portrait in UI
    const portraitDiv = document.getElementById('character-portrait');
    if (portraitDiv && this.textures.exists('player-portrait')) {
        const canvas = this.textures.get('player-portrait').getSourceImage();
        portraitDiv.style.backgroundImage = `url(${canvas.toDataURL()})`;
        portraitDiv.style.backgroundSize = 'cover';
    }
    
    // Start with overworld scene
    createOverworld.call(this);
}

function createOverworld() {
    // Clear existing elements
    this.children.removeAll();
    npcs = [];
    
    // Create grass background
    for (let x = 0; x < config.width; x += 16) {
        for (let y = 0; y < config.height; y += 16) {
            this.add.image(x, y, 'grass-tile').setOrigin(0, 0);
        }
    }
    
    // Create path leading to building
    for (let y = 350; y < config.height; y += 16) {
        for (let x = 360; x < 440; x += 16) {
            this.add.image(x, y, 'path-tile').setOrigin(0, 0);
        }
    }
    
    // Add title text
    this.add.text(400, 30, 'SWC Campus', {
        fontSize: '28px',
        fontFamily: 'Arial',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
    }).setOrigin(0.5);
    
    // Create ACDM School building
    buildings = this.physics.add.staticGroup();
    const acdmBuilding = buildings.create(400, 250, 'building-sprite');
    acdmBuilding.setData('name', 'School of ACDM');
    acdmBuilding.setData('id', 'acdm');
    
    // Add building label
    this.add.text(400, 350, 'School of Arts, Communication,\nDesign & Media', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 3,
        backgroundColor: 'rgba(139,26,26,0.8)',
        padding: { x: 8, y: 4 }
    }).setOrigin(0.5);
    
    // Create player with larger sprite (32x48)
    player = this.physics.add.sprite(400, 500, 'player-down');
    player.setCollideWorldBounds(true);
    player.setSize(24, 16);
    player.setOffset(4, 32);
    
    // Set up collision
    this.physics.add.collider(player, buildings);
    
    // Add interaction prompt (hidden by default)
    interactionPrompt = this.add.text(400, 520, 'Press E or Space to enter', {
        fontSize: '16px',
        fontFamily: 'Arial',
        color: '#ffff00',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setVisible(false);
    
    playerDirection = 'down';
    currentScene = 'overworld';
    
    // Play campus music
    if (musicManager) {
        musicManager.play('campus');
    }
}

function createBuilding87Interior() {
    // Clear existing elements
    this.children.removeAll();
    npcs = [];
    vendingMachines = [];
    
    // Create floor with tiled pattern
    for (let x = 0; x < config.width; x += 16) {
        for (let y = 0; y < config.height; y += 16) {
            this.add.image(x, y, 'floor').setOrigin(0, 0);
        }
    }
    
    // Create walls
    const walls = this.physics.add.staticGroup();
    
    // Top wall (with exit gap in middle)
    for (let x = 0; x < config.width; x += 16) {
        if (x < 360 || x > 440) {
            const wall = walls.create(x, 0, 'wall');
            wall.setOrigin(0, 0);
            wall.body.setSize(16, 16);
        }
    }
    
    // Bottom wall
    for (let x = 0; x < config.width; x += 16) {
        const wall = walls.create(x, config.height - 16, 'wall');
        wall.setOrigin(0, 0);
        wall.body.setSize(16, 16);
    }
    
    // Left wall
    for (let y = 16; y < config.height - 16; y += 16) {
        const wall = walls.create(0, y, 'wall');
        wall.setOrigin(0, 0);
        wall.body.setSize(16, 16);
    }
    
    // Right wall
    for (let y = 16; y < config.height - 16; y += 16) {
        const wall = walls.create(config.width - 16, y, 'wall');
        wall.setOrigin(0, 0);
        wall.body.setSize(16, 16);
    }
    
    // Add school title
    this.add.text(400, 540, 'School of Arts, Communication, Design & Media', {
        fontSize: '18px',
        fontFamily: 'Arial',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
        backgroundColor: 'rgba(139,26,26,0.8)',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    
    // Add staff contacts in a row at top (4 people)
    const contactGroup = this.physics.add.staticGroup();
    
    // Counselor (left)
    const counselorIcon = contactGroup.create(160, 50, 'chair-icon');
    counselorIcon.setData('type', 'counselor-contact');
    counselorIcon.setData('school', SCHOOLS.acdm);
    npcs.push(counselorIcon);
    
    this.add.text(160, 85, 'Counselor\nAdriana Garibay', {
        fontSize: '9px',
        fontFamily: 'Arial',
        color: '#ffff00',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 5, y: 3 }
    }).setOrigin(0.5);
    
    // Success Coach (center-left)
    const coachIcon = contactGroup.create(320, 50, 'chair-icon');
    coachIcon.setData('type', 'coach-contact');
    coachIcon.setData('school', SCHOOLS.acdm);
    npcs.push(coachIcon);
    
    this.add.text(320, 85, 'Success Coach\nOmar Alvarez', {
        fontSize: '9px',
        fontFamily: 'Arial',
        color: '#ffff00',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 5, y: 3 }
    }).setOrigin(0.5);
    
    // Receptionist (center-right)
    const receptionistIcon = contactGroup.create(480, 50, 'chair-icon');
    receptionistIcon.setData('type', 'receptionist-contact');
    receptionistIcon.setData('school', SCHOOLS.acdm);
    npcs.push(receptionistIcon);
    
    this.add.text(480, 85, 'Receptionist\nEwa Zwierski', {
        fontSize: '9px',
        fontFamily: 'Arial',
        color: '#ffff00',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 5, y: 3 }
    }).setOrigin(0.5);
    
    // Dean (right)
    const deanIcon = contactGroup.create(640, 50, 'chair-icon');
    deanIcon.setData('type', 'dean-contact');
    deanIcon.setData('school', SCHOOLS.acdm);
    npcs.push(deanIcon);
    
    this.add.text(640, 85, 'Dean\nDiana Arredondo', {
        fontSize: '9px',
        fontFamily: 'Arial',
        color: '#ffff00',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 5, y: 3 }
    }).setOrigin(0.5);
    
    // Get departments from ACDM school
    const departments = getProgramsByDepartment('acdm');
    const npcGroup = this.physics.add.staticGroup();
    
    // Layout departments in columns (5 departments = 5 columns)
    const columnWidth = 150;
    const startX = 80;
    const startY = 130;
    
    departments.forEach((dept, colIndex) => {
        const columnX = startX + (colIndex * columnWidth);
        
        // Department label at top of column
        this.add.text(columnX, startY, dept.name, {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 3,
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: { x: 5, y: 3 },
            align: 'center',
            wordWrap: { width: 130 }
        }).setOrigin(0.5);
        
        // Department Chair NPC (interactive)
        const chairY = startY + 40;
        const chairNPC = npcGroup.create(columnX, chairY, 'npc-communication');
        chairNPC.setData('type', 'chair');
        chairNPC.setData('department', dept);
        chairNPC.setScale(0.8);
        
        this.add.text(columnX, chairY + 25, 'Chair', {
            fontSize: '9px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: { x: 4, y: 2 }
        }).setOrigin(0.5);
        
        npcs.push(chairNPC);
        
        // Programs in column (starting below chair)
        dept.programs.forEach((program, progIndex) => {
            const progY = startY + 90 + (progIndex * 80);
            
            // Skip if too far down (will need scrolling later)
            if (progY > config.height - 100) return;
            
            const progNPC = npcGroup.create(columnX, progY, 'npc-architecture');
            progNPC.setData('type', 'program');
            progNPC.setData('program', program);
            progNPC.setData('department', dept.name);
            
            // Program name label
            this.add.text(columnX, progY + 25, program.name, {
                fontSize: '9px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: 120 },
                stroke: '#000000',
                strokeThickness: 2,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: { x: 4, y: 2 }
            }).setOrigin(0.5);
            
            // Awards count
            this.add.text(columnX, progY + 45, `${program.awards} awards`, {
                fontSize: '8px',
                fontFamily: 'Arial',
                color: '#aaaaaa',
                stroke: '#000000',
                strokeThickness: 1
            }).setOrigin(0.5);
            
            npcs.push(progNPC);
        });
    });
    
    // Create player at entrance (top center, entering from campus)
    player = this.physics.add.sprite(400, 60, 'player-down');
    player.setCollideWorldBounds(true);
    player.setSize(24, 16);
    player.setOffset(4, 32);
    
    // Set up collision
    this.physics.add.collider(player, walls);
    
    // Add interaction prompt (hidden by default)
    interactionPrompt = this.add.text(400, 520, 'Press E or Space to learn more', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#ffff00',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setVisible(false);
    
    // Add vending machines in corners (organized, empty and sad)
    const vendingGroup = this.physics.add.staticGroup();
    
    // Bottom left corner
    const vending1 = vendingGroup.create(60, config.height - 60, 'vending-machine');
    vending1.setData('type', 'vending');
    vending1.setData('message', 'OUT OF ORDER');
    vendingMachines.push(vending1);
    
    // Bottom right corner
    const vending2 = vendingGroup.create(config.width - 60, config.height - 60, 'vending-machine');
    vending2.setData('type', 'vending');
    vending2.setData('message', 'EMPTY - Restocking Soon™');
    vendingMachines.push(vending2);
    
    // Bottom left (second machine)
    const vending3 = vendingGroup.create(120, config.height - 60, 'vending-machine');
    vending3.setData('type', 'vending');
    vending3.setData('message', 'No Snacks Available');
    vendingMachines.push(vending3);
    
    // Bottom right (second machine)
    const vending4 = vendingGroup.create(config.width - 120, config.height - 60, 'vending-machine');
    vending4.setData('type', 'vending');
    vending4.setData('message', 'Card Reader Broken 😢');
    vendingMachines.push(vending4);
    
    // Add exit prompt at top
    this.add.text(400, 15, '↑ Exit to Campus | E/Space on program to enter room', {
        fontSize: '12px',
        fontFamily: 'Arial',
        color: '#00ff00',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    
    playerDirection = 'down';
    currentScene = 'school';
    
    // Play school music
    if (musicManager) {
        musicManager.play('school');
    }
}

function update() {
    if (!player) return;
    
    // Player movement
    const speed = 120;
    player.setVelocity(0);
    
    let moving = false;
    let newDirection = playerDirection;
    
    if (cursors.left.isDown || wasd.left.isDown) {
        player.setVelocityX(-speed);
        newDirection = 'left';
        moving = true;
    } else if (cursors.right.isDown || wasd.right.isDown) {
        player.setVelocityX(speed);
        newDirection = 'right';
        moving = true;
    }
    
    if (cursors.up.isDown || wasd.up.isDown) {
        player.setVelocityY(-speed);
        newDirection = 'up';
        moving = true;
    } else if (cursors.down.isDown || wasd.down.isDown) {
        player.setVelocityY(speed);
        newDirection = 'down';
        moving = true;
    }
    
    // Normalize diagonal movement
    if (player.body.velocity.x !== 0 && player.body.velocity.y !== 0) {
        player.setVelocity(
            player.body.velocity.x * 0.707,
            player.body.velocity.y * 0.707
        );
    }
    
    // Update sprite direction based on movement
    if (moving && newDirection !== playerDirection) {
        playerDirection = newDirection;
        player.setTexture(`player-${playerDirection}`);
    }
    
    // Handle scene-specific interactions
    if (currentScene === 'overworld') {
        handleOverworldInteraction.call(this);
    } else if (currentScene === 'school') {
        handleBuilding87Interaction.call(this);
    } else if (currentScene === 'program-room') {
        handleProgramRoomInteraction.call(this);
    }
}

function handleOverworldInteraction() {
    // Check if player is near Building 87
    let nearBuilding = false;
    
    buildings.children.entries.forEach(building => {
        const distance = Phaser.Math.Distance.Between(
            player.x, player.y,
            building.x, building.y
        );
        
        // Increased interaction range to 150 pixels (building is 96x96)
        if (distance < 150) {
            nearBuilding = true;
        }
    });
    
    if (nearBuilding) {
        interactionPrompt.setVisible(true);
        
        // Check for interaction key press
        if (Phaser.Input.Keyboard.JustDown(interactKey.e) || 
            Phaser.Input.Keyboard.JustDown(interactKey.space)) {
            createBuilding87Interior.call(this);
        }
    } else {
        interactionPrompt.setVisible(false);
    }
}

function createProgramRoom(program, departmentName) {
    // Clear existing elements
    this.children.removeAll();
    npcs = [];
    vendingMachines = [];
    degreeIcons = [];
    
    currentProgram = program;
    currentScene = 'program-room';
    
    // Check if this program has a custom background
    let hasCustomBackground = false;
    if (program.id === 'recording-arts' && this.textures.exists('recording-studio-bg')) {
        // Add recording studio background image
        const bg = this.add.image(0, 0, 'recording-studio-bg');
        bg.setOrigin(0, 0);
        
        // Scale to fit game width while maintaining aspect ratio
        const scaleX = config.width / bg.width;
        const scaleY = config.height / bg.height;
        const scale = Math.max(scaleX, scaleY);
        bg.setScale(scale);
        
        // Center if needed
        if (bg.displayWidth > config.width) {
            bg.x = -(bg.displayWidth - config.width) / 2;
        }
        if (bg.displayHeight > config.height) {
            bg.y = -(bg.displayHeight - config.height) / 2;
        }
        
        // Add semi-transparent overlay for better visibility of UI elements
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.3);
        overlay.fillRect(0, 0, config.width, config.height);
        
        hasCustomBackground = true;
    }
    
    // Create floor tiles only if no custom background
    if (!hasCustomBackground) {
        for (let x = 0; x < config.width; x += 16) {
            for (let y = 0; y < config.height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0, 0);
            }
        }
    }
    
    // Create walls
    const walls = this.physics.add.staticGroup();
    
    // Top wall
    for (let x = 0; x < config.width; x += 16) {
        const wall = walls.create(x, 0, 'wall');
        wall.setOrigin(0, 0);
        wall.body.setSize(16, 16);
    }
    
    // Bottom wall (with exit gap)
    for (let x = 0; x < config.width; x += 16) {
        if (x < 360 || x > 440) {
            const wall = walls.create(x, config.height - 16, 'wall');
            wall.setOrigin(0, 0);
            wall.body.setSize(16, 16);
        }
    }
    
    // Left wall
    for (let y = 16; y < config.height - 16; y += 16) {
        const wall = walls.create(0, y, 'wall');
        wall.setOrigin(0, 0);
        wall.body.setSize(16, 16);
    }
    
    // Right wall
    for (let y = 16; y < config.height - 16; y += 16) {
        const wall = walls.create(config.width - 16, y, 'wall');
        wall.setOrigin(0, 0);
        wall.body.setSize(16, 16);
    }
    
    // Program title
    this.add.text(400, 30, program.name, {
        fontSize: '22px',
        fontFamily: 'Arial',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
        backgroundColor: 'rgba(139,26,26,0.8)',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    
    // Department name
    this.add.text(400, 55, departmentName + ' Department', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#ffff00',
        stroke: '#000000',
        strokeThickness: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 8, y: 3 }
    }).setOrigin(0.5);
    
    // Program Lead icon and label (top center)
    const leadGroup = this.physics.add.staticGroup();
    const leadIcon = leadGroup.create(400, 100, 'chair-icon');
    leadIcon.setData('type', 'program-lead');
    leadIcon.setData('program', program);
    npcs.push(leadIcon);
    
    this.add.text(400, 135, 'Program Lead\n(Click for contact)', {
        fontSize: '11px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 6, y: 3 }
    }).setOrigin(0.5);
    
    // Degree/Certificate icons in a grid
    const startY = 180;
    const spacing = 80;
    const iconsPerRow = 4;
    
    program.degrees.forEach((degree, index) => {
        const row = Math.floor(index / iconsPerRow);
        const col = index % iconsPerRow;
        const x = 150 + (col * spacing);
        const y = startY + (row * 100);
        
        // Determine icon type
        let iconType = 'certificate';
        if (degree.type === 'Associate') {
            iconType = degree.name.includes('- AA') ? 'aa' : 'as';
        }
        
        const degreeGroup = this.physics.add.staticGroup();
        const icon = degreeGroup.create(x, y, `degree-${iconType}`);
        icon.setData('type', 'degree');
        icon.setData('degree', degree);
        degreeIcons.push(icon);
        
        // Label with degree name
        this.add.text(x, y + 25, degree.name, {
            fontSize: '9px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 70 },
            stroke: '#000000',
            strokeThickness: 2,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: { x: 4, y: 2 }
        }).setOrigin(0.5);
    });
    
    // Program description box
    this.add.text(400, 450, program.description, {
        fontSize: '11px',
        fontFamily: 'Arial',
        color: '#dddddd',
        align: 'center',
        wordWrap: { width: 700 },
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: { x: 10, y: 8 }
    }).setOrigin(0.5);
    
    // Add program-specific resources
    if (program.id === 'recording-arts') {
        // Add midimaze educational resource icon (bottom left)
        const resourceGroup = this.physics.add.staticGroup();
        const midimazeIcon = resourceGroup.create(80, config.height - 80, 'midimaze-icon');
        midimazeIcon.setData('type', 'resource');
        midimazeIcon.setData('url', 'https://midimaze.com');
        midimazeIcon.setData('name', 'midimaze');
        degreeIcons.push(midimazeIcon);
        
        this.add.text(80, config.height - 50, 'midimaze.com\nEducational Resource', {
            fontSize: '10px',
            fontFamily: 'Arial',
            color: '#2ecc71',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 2,
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: { x: 6, y: 3 }
        }).setOrigin(0.5);
    }
    
    // Create player
    player = this.physics.add.sprite(400, config.height - 100, 'player-up');
    player.setCollideWorldBounds(true);
    player.setSize(24, 16);
    player.setOffset(4, 32);
    
    // Set up collision
    this.physics.add.collider(player, walls);
    
    // Add interaction prompt
    interactionPrompt = this.add.text(400, 520, '', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#ffff00',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setVisible(false);
    
    // Exit prompt
    this.add.text(400, config.height - 10, '↓ Back to Department View', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#00ff00',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    
    playerDirection = 'up';
    
    // Play program room music
    if (musicManager) {
        musicManager.play('program');
    }
}

function handleBuilding87Interaction() {
    // ESC key to exit back to campus (only if modal is not open)
    if (Phaser.Input.Keyboard.JustDown(interactKey.esc)) {
        if (!uiController || !uiController.isModalOpen()) {
            createOverworld.call(this);
            return;
        }
    }
    
    // Check if player is near any vending machine first
    let nearVending = null;
    for (let vending of vendingMachines) {
        const distance = Phaser.Math.Distance.Between(
            player.x, player.y,
            vending.x, vending.y
        );
        
        if (distance < 60) {
            nearVending = vending;
            break;
        }
    }
    
    if (nearVending) {
        interactionPrompt.setText('Press E or Space - But why though?');
        interactionPrompt.setVisible(true);
        
        // Check for interaction key press
        if (Phaser.Input.Keyboard.JustDown(interactKey.e) || 
            Phaser.Input.Keyboard.JustDown(interactKey.space)) {
            const message = nearVending.getData('message');
            if (uiController) {
                uiController.showVendingMachineMessage(message);
            }
        }
        return;
    }
    
    // Check if player is near any NPC
    let nearNPC = null;
    
    for (let npc of npcs) {
        const distance = Phaser.Math.Distance.Between(
            player.x, player.y,
            npc.x, npc.y
        );
        
        if (distance < 60) {
            nearNPC = npc;
            break;
        }
    }
    
    if (nearNPC) {
        const type = nearNPC.getData('type');
        
        // Set appropriate prompt based on type
        if (type === 'dean-contact') {
            interactionPrompt.setText('Press E - Contact Dean');
        } else if (type === 'counselor-contact') {
            interactionPrompt.setText('Press E - Contact Counselor');
        } else if (type === 'coach-contact') {
            interactionPrompt.setText('Press E - Contact Success Coach');
        } else if (type === 'receptionist-contact') {
            interactionPrompt.setText('Press E - Contact Receptionist');
        } else {
            interactionPrompt.setText('Press E or Space to learn more');
        }
        interactionPrompt.setVisible(true);
        
        // Check for interaction key press
        if (Phaser.Input.Keyboard.JustDown(interactKey.e) || 
            Phaser.Input.Keyboard.JustDown(interactKey.space)) {
            
            if (type === 'dean-contact') {
                const school = nearNPC.getData('school');
                if (school && uiController) {
                    uiController.showDeanContact(school);
                }
            } else if (type === 'counselor-contact') {
                const school = nearNPC.getData('school');
                if (school && uiController) {
                    uiController.showCounselorContact(school);
                }
            } else if (type === 'coach-contact') {
                const school = nearNPC.getData('school');
                if (school && uiController) {
                    uiController.showSuccessCoachContact(school);
                }
            } else if (type === 'receptionist-contact') {
                const school = nearNPC.getData('school');
                if (school && uiController) {
                    uiController.showReceptionistContact(school);
                }
            } else if (type === 'chair') {
                // Show department chair info modal
                const dept = nearNPC.getData('department');
                if (dept && uiController) {
                    uiController.showDepartmentChairInfo(dept);
                }
            } else if (type === 'program') {
                // Enter the program's room!
                const program = nearNPC.getData('program');
                const dept = nearNPC.getData('department');
                if (program) {
                    createProgramRoom.call(this, program, dept);
                }
            }
        }
    } else {
        interactionPrompt.setVisible(false);
    }
    
    // Check if player is at exit (very top of screen, past the gap in the wall)
    if (player.y < 20) {
        createOverworld.call(this);
    }
}

function handleProgramRoomInteraction() {
    // ESC key to go back to school (only if modal is not open)
    if (Phaser.Input.Keyboard.JustDown(interactKey.esc)) {
        if (!uiController || !uiController.isModalOpen()) {
            createBuilding87Interior.call(this);
            return;
        }
    }
    
    // Check for program lead contact
    let nearLead = false;
    for (let npc of npcs) {
        if (npc.getData('type') === 'program-lead') {
            const distance = Phaser.Math.Distance.Between(
                player.x, player.y,
                npc.x, npc.y
            );
            
            if (distance < 60) {
                nearLead = true;
                interactionPrompt.setText('Press E - Contact Program Lead');
                interactionPrompt.setVisible(true);
                
                if (Phaser.Input.Keyboard.JustDown(interactKey.e) || 
                    Phaser.Input.Keyboard.JustDown(interactKey.space)) {
                    const program = npc.getData('program');
                    if (uiController && program) {
                        uiController.showProgramLeadContact(program);
                    }
                }
                break;
            }
        }
    }
    
    // Check for degree icons
    if (!nearLead) {
        let nearDegree = null;
        for (let icon of degreeIcons) {
            const distance = Phaser.Math.Distance.Between(
                player.x, player.y,
                icon.x, icon.y
            );
            
            if (distance < 50) {
                nearDegree = icon;
                break;
            }
        }
        
        if (nearDegree) {
            const type = nearDegree.getData('type');
            
            if (type === 'resource') {
                // Educational resource (like midimaze)
                const name = nearDegree.getData('name');
                interactionPrompt.setText(`Press E - Visit ${name}`);
                interactionPrompt.setVisible(true);
                
                if (Phaser.Input.Keyboard.JustDown(interactKey.e) || 
                    Phaser.Input.Keyboard.JustDown(interactKey.space)) {
                    const url = nearDegree.getData('url');
                    window.open(url, '_blank');
                }
            } else {
                // Degree/certificate
                const degree = nearDegree.getData('degree');
                interactionPrompt.setText(`Press E - View ${degree.name}`);
                interactionPrompt.setVisible(true);
                
                if (Phaser.Input.Keyboard.JustDown(interactKey.e) || 
                    Phaser.Input.Keyboard.JustDown(interactKey.space)) {
                    // Open the catalog page directly
                    window.open(degree.url, '_blank');
                }
            }
        } else {
            interactionPrompt.setVisible(false);
        }
    }
    
    // Check if player is at exit
    if (player.y > config.height - 20) {
        createBuilding87Interior.call(this);
    }
}
