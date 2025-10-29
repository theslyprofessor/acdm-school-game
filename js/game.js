// ACDM School Explorer - Main Game File
// Using Phaser 3 game engine

// ============================================================================
// GAME CONFIGURATION
// ============================================================================

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: 'game',
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, WorldMapScene, BuildingScene]
};

const game = new Phaser.Game(config);

// ============================================================================
// BOOT SCENE - Loads assets and initializes game
// ============================================================================

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Loading text
        const loadingText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Loading ACDM Explorer...',
            { fontSize: '24px', fill: '#fff' }
        );
        loadingText.setOrigin(0.5);

        // Load placeholder graphics (we'll create actual sprites later)
        // For now, we'll use Phaser's built-in graphics
    }

    create() {
        // Start the world map scene
        this.scene.start('WorldMapScene');
    }
}

// ============================================================================
// WORLD MAP SCENE - Campus overview with buildings
// ============================================================================

class WorldMapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldMapScene' });
    }

    create() {
        // Add background
        this.cameras.main.setBackgroundColor('#4a7c4a');

        // Title text
        this.add.text(20, 20, 'SWC Campus Map', {
            fontSize: '28px',
            fill: '#fff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 4
        });

        // Instructions
        this.add.text(20, 60, 'Walk to Building 87 and press SPACE to enter', {
            fontSize: '16px',
            fill: '#fff',
            backgroundColor: '#000000aa',
            padding: { x: 10, y: 5 }
        });

        // Create player
        this.player = this.add.circle(480, 320, 16, 0xffffff);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        // Create Building 87 (ACDM)
        this.building87 = this.add.rectangle(650, 300, 120, 100, 0x8b1538);
        this.physics.add.existing(this.building87, true);

        const buildingLabel = this.add.text(650, 300, 'Building 87\nACDM', {
            fontSize: '16px',
            fill: '#fff',
            align: 'center',
            fontStyle: 'bold'
        });
        buildingLabel.setOrigin(0.5);

        // Add other campus buildings (decorative)
        this.createCampusBuildings();

        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey('W'),
            down: this.input.keyboard.addKey('S'),
            left: this.input.keyboard.addKey('A'),
            right: this.input.keyboard.addKey('D')
        };
        this.interactKey = this.input.keyboard.addKey('SPACE');
        this.interactKeyE = this.input.keyboard.addKey('E');

        // Player movement speed
        this.playerSpeed = 200;

        // Interaction hint
        this.interactionHint = this.add.text(480, 250, 'Press SPACE to enter', {
            fontSize: '14px',
            fill: '#ffff00',
            backgroundColor: '#000000cc',
            padding: { x: 8, y: 4 }
        });
        this.interactionHint.setOrigin(0.5);
        this.interactionHint.setVisible(false);
    }

    createCampusBuildings() {
        // Add some decorative buildings
        const buildings = [
            { x: 250, y: 200, width: 100, height: 80, color: 0x666666, label: 'Building 24/25\nEducation' },
            { x: 250, y: 400, width: 100, height: 80, color: 0x666666, label: 'Building 60\nMath & Science' },
            { x: 750, y: 450, width: 90, height: 70, color: 0x666666, label: 'Building 71\nWellness' }
        ];

        buildings.forEach(b => {
            const building = this.add.rectangle(b.x, b.y, b.width, b.height, b.color);
            const label = this.add.text(b.x, b.y, b.label, {
                fontSize: '12px',
                fill: '#fff',
                align: 'center'
            });
            label.setOrigin(0.5);
        });

        // Add some trees/decorations
        for (let i = 0; i < 15; i++) {
            const x = Phaser.Math.Between(50, 900);
            const y = Phaser.Math.Between(150, 600);
            const tree = this.add.circle(x, y, 12, 0x2d5016);
        }
    }

    update() {
        // Reset velocity
        this.player.body.setVelocity(0);

        // Movement controls
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.body.setVelocityX(-this.playerSpeed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.body.setVelocityX(this.playerSpeed);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.body.setVelocityY(-this.playerSpeed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.body.setVelocityY(this.playerSpeed);
        }

        // Check if player is near Building 87
        const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.building87.x,
            this.building87.y
        );

        if (distance < 100) {
            this.interactionHint.setVisible(true);
            this.interactionHint.setPosition(this.player.x, this.player.y - 40);

            // Enter building
            if (Phaser.Input.Keyboard.JustDown(this.interactKey) ||
                Phaser.Input.Keyboard.JustDown(this.interactKeyE)) {
                this.enterBuilding();
            }
        } else {
            this.interactionHint.setVisible(false);
        }
    }

    enterBuilding() {
        // Transition to building scene
        this.cameras.main.fade(300, 0, 0, 0);
        this.time.delayedCall(300, () => {
            this.scene.start('BuildingScene');
        });
    }
}

// ============================================================================
// BUILDING SCENE - Inside Building 87 with program rooms
// ============================================================================

class BuildingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BuildingScene' });
    }

    create() {
        // Building interior background
        this.cameras.main.setBackgroundColor('#8b8b8b');

        // Title
        this.add.text(20, 20, 'Building 87 - ACDM Programs', {
            fontSize: '24px',
            fill: '#fff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 4
        });

        // Instructions
        this.add.text(20, 55, 'Walk to program billboards and press SPACE to learn more | ESC to exit', {
            fontSize: '14px',
            fill: '#fff',
            backgroundColor: '#000000aa',
            padding: { x: 10, y: 5 }
        });

        // Create player
        this.player = this.add.circle(480, 580, 16, 0xffffff);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        // Create program areas with billboard NPCs
        this.createProgramAreas();

        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey('W'),
            down: this.input.keyboard.addKey('S'),
            left: this.input.keyboard.addKey('A'),
            right: this.input.keyboard.addKey('D')
        };
        this.interactKey = this.input.keyboard.addKey('SPACE');
        this.interactKeyE = this.input.keyboard.addKey('E');
        this.escKey = this.input.keyboard.addKey('ESC');

        // Player speed
        this.playerSpeed = 200;

        // Interaction hint
        this.interactionHint = this.add.text(480, 550, '', {
            fontSize: '14px',
            fill: '#ffff00',
            backgroundColor: '#000000cc',
            padding: { x: 8, y: 4 }
        });
        this.interactionHint.setOrigin(0.5);
        this.interactionHint.setVisible(false);

        // Currently nearby program
        this.nearbyProgram = null;

        // Fade in
        this.cameras.main.fadeIn(300, 0, 0, 0);
    }

    createProgramAreas() {
        // Create program billboard areas arranged in a grid
        const gridConfig = {
            cols: 4,
            rows: 3,
            startX: 150,
            startY: 150,
            spacingX: 200,
            spacingY: 150
        };

        this.billboards = [];

        PROGRAMS_DATA.forEach((program, index) => {
            const col = index % gridConfig.cols;
            const row = Math.floor(index / gridConfig.cols);

            const x = gridConfig.startX + (col * gridConfig.spacingX);
            const y = gridConfig.startY + (row * gridConfig.spacingY);

            // Create program area background
            const bgRect = this.add.rectangle(x, y, 160, 100, program.color, 0.3);

            // Create billboard (NPC holding sign)
            const billboard = this.add.rectangle(x, y - 20, 120, 60, program.color);
            this.physics.add.existing(billboard, true);

            // Add program name label
            const label = this.add.text(x, y - 20, program.name, {
                fontSize: '12px',
                fill: '#fff',
                align: 'center',
                wordWrap: { width: 110 },
                fontStyle: 'bold'
            });
            label.setOrigin(0.5);

            // Add degree badges
            const badgeText = program.degrees.join(' | ');
            const badges = this.add.text(x, y + 15, badgeText, {
                fontSize: '9px',
                fill: '#ffff00',
                align: 'center'
            });
            badges.setOrigin(0.5);

            // Store billboard data
            billboard.programId = program.id;
            billboard.programName = program.name;
            this.billboards.push(billboard);
        });
    }

    update() {
        // Reset velocity
        this.player.body.setVelocity(0);

        // Movement controls
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.body.setVelocityX(-this.playerSpeed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.body.setVelocityX(this.playerSpeed);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.body.setVelocityY(-this.playerSpeed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.body.setVelocityY(this.playerSpeed);
        }

        // Check proximity to billboards
        this.nearbyProgram = null;
        this.billboards.forEach(billboard => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                billboard.x,
                billboard.y
            );

            if (distance < 80) {
                this.nearbyProgram = billboard.programId;
                this.interactionHint.setText(`Press SPACE: ${billboard.programName}`);
                this.interactionHint.setPosition(this.player.x, this.player.y - 40);
                this.interactionHint.setVisible(true);
            }
        });

        if (!this.nearbyProgram) {
            this.interactionHint.setVisible(false);
        }

        // Interact with billboard
        if (this.nearbyProgram && (Phaser.Input.Keyboard.JustDown(this.interactKey) ||
            Phaser.Input.Keyboard.JustDown(this.interactKeyE))) {
            this.showProgramInfo(this.nearbyProgram);
        }

        // Exit building
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.exitBuilding();
        }
    }

    showProgramInfo(programId) {
        // Pause game and show modal
        this.scene.pause();
        showProgramModal(programId);

        // Resume when modal closes
        const modal = document.getElementById('program-modal');
        const checkModalClosed = setInterval(() => {
            if (modal.style.display === 'none') {
                this.scene.resume();
                clearInterval(checkModalClosed);
            }
        }, 100);
    }

    exitBuilding() {
        // Return to world map
        this.cameras.main.fade(300, 0, 0, 0);
        this.time.delayedCall(300, () => {
            this.scene.start('WorldMapScene');
        });
    }
}
