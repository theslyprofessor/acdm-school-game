// Sprite generation for pixel art characters and tiles
class SpriteGenerator {
    static createPlayerSprites(scene) {
        // Create jaguar character sprite with walking animation!
        // 4 frames per direction for smooth walking
        
        const directions = ['down', 'up', 'left', 'right'];
        
        // Create sprite sheet for each direction
        directions.forEach(direction => {
            const sheetGraphics = scene.add.graphics();
            const frameWidth = 48;
            const frameHeight = 48;
            
            // Draw 4 walking frames
            for (let frame = 0; frame < 4; frame++) {
                const x = frame * frameWidth;
                this.drawJaguar(sheetGraphics, x, 0, direction, frame);
            }
            
            sheetGraphics.generateTexture(`player-${direction}-sheet`, frameWidth * 4, frameHeight);
            sheetGraphics.destroy();
        });
        
        // Create portrait
        const portraitGraphics = scene.add.graphics();
        this.drawJaguarPortrait(portraitGraphics);
        portraitGraphics.generateTexture('player-portrait', 64, 64);
        portraitGraphics.destroy();
    }
    
    static drawJaguar(graphics, x, y, direction, frame) {
        // Jaguar colors
        const goldFur = 0xFFB84D;      // Golden/orange base coat
        const darkGold = 0xE09536;     // Darker gold for shading
        const spotColor = 0x2C1810;    // Dark brown/black spots
        const white = 0xFFFFFF;        // White chest/belly
        const pink = 0xFF9999;         // Pink nose/ears
        
        // Animation offsets for walking (paw positions)
        const walkCycle = [0, 2, 0, -2]; // Bobbing motion
        const legOffset = walkCycle[frame];
        
        if (direction === 'down') {
            // HEAD
            // Face shape
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(x + 14, y + 8, 20, 16);
            
            // Ears
            graphics.fillRect(x + 14, y + 6, 6, 6);
            graphics.fillRect(x + 28, y + 6, 6, 6);
            graphics.fillStyle(pink, 1);
            graphics.fillRect(x + 16, y + 8, 2, 2);
            graphics.fillRect(x + 30, y + 8, 2, 2);
            
            // White muzzle/chest
            graphics.fillStyle(white, 1);
            graphics.fillRect(x + 18, y + 18, 12, 8);
            
            // Eyes (fierce green)
            graphics.fillStyle(0x00FF00, 1);
            graphics.fillRect(x + 18, y + 12, 4, 4);
            graphics.fillRect(x + 26, y + 12, 4, 4);
            graphics.fillStyle(0x000000, 1);
            graphics.fillRect(x + 20, y + 14, 2, 2); // pupils
            graphics.fillRect(x + 28, y + 14, 2, 2);
            
            // Nose
            graphics.fillStyle(pink, 1);
            graphics.fillRect(x + 22, y + 20, 4, 3);
            
            // Whisker dots
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 16, y + 20, 1, 1);
            graphics.fillRect(x + 31, y + 20, 1, 1);
            
            // BODY
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(x + 12, y + 24, 24, 12);
            
            // Jaguar spots on body
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 14, y + 26, 3, 3);
            graphics.fillRect(x + 20, y + 27, 2, 2);
            graphics.fillRect(x + 28, y + 26, 3, 3);
            graphics.fillRect(x + 16, y + 32, 2, 2);
            graphics.fillRect(x + 26, y + 33, 2, 2);
            
            // LEGS (with walking animation)
            graphics.fillStyle(darkGold, 1);
            // Front legs
            graphics.fillRect(x + 16, y + 36 + (frame % 2 === 0 ? legOffset : 0), 4, 8);
            graphics.fillRect(x + 28, y + 36 + (frame % 2 === 1 ? legOffset : 0), 4, 8);
            // Back legs
            graphics.fillRect(x + 14, y + 36 + (frame % 2 === 1 ? -legOffset : 0), 4, 8);
            graphics.fillRect(x + 30, y + 36 + (frame % 2 === 0 ? -legOffset : 0), 4, 8);
            
            // TAIL (swishing)
            const tailX = frame < 2 ? x + 36 : x + 34;
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(tailX, y + 26, 4, 12);
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(tailX + 1, y + 28, 2, 2);
            graphics.fillRect(tailX + 1, y + 34, 2, 2);
            
        } else if (direction === 'up') {
            // BACK VIEW
            // Ears visible
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(x + 14, y + 6, 6, 4);
            graphics.fillRect(x + 28, y + 6, 6, 4);
            
            // Head back
            graphics.fillRect(x + 14, y + 8, 20, 12);
            
            // Body
            graphics.fillRect(x + 12, y + 20, 24, 16);
            
            // Spots on back
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 15, y + 22, 4, 4);
            graphics.fillRect(x + 22, y + 24, 3, 3);
            graphics.fillRect(x + 29, y + 22, 4, 4);
            graphics.fillRect(x + 17, y + 30, 2, 2);
            graphics.fillRect(x + 27, y + 31, 3, 3);
            
            // Legs
            graphics.fillStyle(darkGold, 1);
            graphics.fillRect(x + 14, y + 36 + (frame % 2 === 0 ? legOffset : 0), 4, 8);
            graphics.fillRect(x + 30, y + 36 + (frame % 2 === 1 ? legOffset : 0), 4, 8);
            graphics.fillRect(x + 16, y + 36 + (frame % 2 === 1 ? -legOffset : 0), 4, 8);
            graphics.fillRect(x + 28, y + 36 + (frame % 2 === 0 ? -legOffset : 0), 4, 8);
            
            // Tail (curved upward)
            const tailCurve = frame < 2 ? 0 : 2;
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(x + 22 + tailCurve, y + 10, 4, 14);
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 23 + tailCurve, y + 12, 2, 2);
            graphics.fillRect(x + 23 + tailCurve, y + 18, 2, 2);
            
        } else if (direction === 'left') {
            // SIDE VIEW (left)
            // Head
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(x + 10, y + 8, 16, 14);
            
            // Ear
            graphics.fillRect(x + 10, y + 6, 6, 4);
            graphics.fillStyle(pink, 1);
            graphics.fillRect(x + 12, y + 8, 2, 2);
            
            // Eye
            graphics.fillStyle(0x00FF00, 1);
            graphics.fillRect(x + 12, y + 12, 4, 4);
            graphics.fillStyle(0x000000, 1);
            graphics.fillRect(x + 14, y + 14, 2, 2);
            
            // Snout
            graphics.fillStyle(white, 1);
            graphics.fillRect(x + 8, y + 16, 6, 6);
            graphics.fillStyle(pink, 1);
            graphics.fillRect(x + 8, y + 18, 3, 2);
            
            // Spots on face
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 12, y + 10, 2, 2);
            graphics.fillRect(x + 18, y + 12, 2, 2);
            
            // Body
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(x + 14, y + 22, 20, 14);
            
            // Spots on body
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 16, y + 24, 3, 3);
            graphics.fillRect(x + 22, y + 26, 2, 2);
            graphics.fillRect(x + 28, y + 25, 3, 3);
            
            // Legs (walking animation)
            graphics.fillStyle(darkGold, 1);
            graphics.fillRect(x + 16, y + 36 + (frame % 2 === 0 ? legOffset : 0), 4, 8);
            graphics.fillRect(x + 26, y + 36 + (frame % 2 === 1 ? legOffset : 0), 4, 8);
            
            // Tail
            graphics.fillStyle(goldFur, 1);
            const tailY = frame < 2 ? y + 24 : y + 22;
            graphics.fillRect(x + 34, tailY, 4, 10);
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 35, tailY + 2, 2, 2);
            
        } else if (direction === 'right') {
            // SIDE VIEW (right)
            // Head
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(x + 22, y + 8, 16, 14);
            
            // Ear
            graphics.fillRect(x + 32, y + 6, 6, 4);
            graphics.fillStyle(pink, 1);
            graphics.fillRect(x + 34, y + 8, 2, 2);
            
            // Eye
            graphics.fillStyle(0x00FF00, 1);
            graphics.fillRect(x + 32, y + 12, 4, 4);
            graphics.fillStyle(0x000000, 1);
            graphics.fillRect(x + 32, y + 14, 2, 2);
            
            // Snout
            graphics.fillStyle(white, 1);
            graphics.fillRect(x + 34, y + 16, 6, 6);
            graphics.fillStyle(pink, 1);
            graphics.fillRect(x + 37, y + 18, 3, 2);
            
            // Spots on face
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 34, y + 10, 2, 2);
            graphics.fillRect(x + 28, y + 12, 2, 2);
            
            // Body
            graphics.fillStyle(goldFur, 1);
            graphics.fillRect(x + 14, y + 22, 20, 14);
            
            // Spots on body
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 17, y + 25, 3, 3);
            graphics.fillRect(x + 24, y + 26, 2, 2);
            graphics.fillRect(x + 29, y + 24, 3, 3);
            
            // Legs (walking animation)
            graphics.fillStyle(darkGold, 1);
            graphics.fillRect(x + 18, y + 36 + (frame % 2 === 1 ? legOffset : 0), 4, 8);
            graphics.fillRect(x + 28, y + 36 + (frame % 2 === 0 ? legOffset : 0), 4, 8);
            
            // Tail
            graphics.fillStyle(goldFur, 1);
            const tailY = frame < 2 ? y + 24 : y + 22;
            graphics.fillRect(x + 10, tailY, 4, 10);
            graphics.fillStyle(spotColor, 1);
            graphics.fillRect(x + 11, tailY + 2, 2, 2);
        }
    }
    
    static drawJaguarPortrait(graphics) {
        // Jaguar face portrait
        const goldFur = 0xFFB84D;
        const spotColor = 0x2C1810;
        const white = 0xFFFFFF;
        const pink = 0xFF9999;
        
        // Background (jungle green)
        graphics.fillStyle(0x2F4F2F, 1);
        graphics.fillRect(0, 0, 64, 64);
        
        // Border
        graphics.fillStyle(goldFur, 1);
        graphics.lineStyle(3, goldFur, 1);
        graphics.strokeRect(2, 2, 60, 60);
        
        // Face
        graphics.fillStyle(goldFur, 1);
        graphics.fillRect(16, 16, 32, 32);
        
        // Ears
        graphics.fillRect(14, 12, 10, 8);
        graphics.fillRect(40, 12, 10, 8);
        graphics.fillStyle(pink, 1);
        graphics.fillRect(17, 15, 4, 3);
        graphics.fillRect(43, 15, 4, 3);
        
        // White muzzle area
        graphics.fillStyle(white, 1);
        graphics.fillRect(22, 32, 20, 14);
        
        // Eyes (fierce green)
        graphics.fillStyle(0x00FF00, 1);
        graphics.fillRect(22, 24, 6, 6);
        graphics.fillRect(36, 24, 6, 6);
        
        // Pupils
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(24, 26, 3, 4);
        graphics.fillRect(38, 26, 3, 4);
        
        // Eye shine
        graphics.fillStyle(white, 1);
        graphics.fillRect(25, 27, 1, 2);
        graphics.fillRect(39, 27, 1, 2);
        
        // Nose
        graphics.fillStyle(pink, 1);
        graphics.fillRect(28, 38, 8, 4);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(30, 39, 1, 2);
        graphics.fillRect(33, 39, 1, 2);
        
        // Mouth line
        graphics.fillRect(32, 42, 1, 2);
        
        // Spots on face
        graphics.fillStyle(spotColor, 1);
        graphics.fillRect(18, 20, 4, 4);
        graphics.fillRect(42, 20, 4, 4);
        graphics.fillRect(20, 28, 3, 3);
        graphics.fillRect(41, 28, 3, 3);
        graphics.fillRect(24, 18, 2, 2);
        graphics.fillRect(38, 18, 2, 2);
        
        // Whisker dots
        graphics.fillRect(18, 36, 2, 2);
        graphics.fillRect(44, 36, 2, 2);
        graphics.fillRect(16, 38, 2, 2);
        graphics.fillRect(46, 38, 2, 2);
    }
    
    static createGrassTile(scene) {
        const graphics = scene.add.graphics();
        
        // Base grass color
        graphics.fillStyle(0x90ee90, 1);
        graphics.fillRect(0, 0, 16, 16);
        
        // Darker grass patches for texture
        graphics.fillStyle(0x7ebe7e, 1);
        graphics.fillRect(2, 3, 2, 2);
        graphics.fillRect(8, 1, 1, 1);
        graphics.fillRect(11, 7, 2, 2);
        graphics.fillRect(4, 11, 1, 2);
        graphics.fillRect(13, 13, 2, 1);
        
        graphics.generateTexture('grass-tile', 16, 16);
        graphics.destroy();
    }
    
    static createPathTile(scene) {
        const graphics = scene.add.graphics();
        
        // Path color (beige/tan)
        graphics.fillStyle(0xd2b48c, 1);
        graphics.fillRect(0, 0, 16, 16);
        
        // Darker spots for texture
        graphics.fillStyle(0xb8956f, 1);
        graphics.fillRect(3, 2, 2, 1);
        graphics.fillRect(10, 5, 1, 1);
        graphics.fillRect(6, 9, 2, 2);
        graphics.fillRect(12, 12, 1, 2);
        
        graphics.generateTexture('path-tile', 16, 16);
        graphics.destroy();
    }
    
    static createBuildingSprite(scene) {
        const graphics = scene.add.graphics();
        
        // Building body (brick red)
        graphics.fillStyle(0x8b4513, 1);
        graphics.fillRect(0, 0, 96, 96);
        
        // Roof (darker brown)
        graphics.fillStyle(0x654321, 1);
        graphics.fillRect(-8, -8, 112, 16);
        
        // Door (dark wood)
        graphics.fillStyle(0x3d2817, 1);
        graphics.fillRect(32, 64, 32, 32);
        
        // Door frame
        graphics.fillStyle(0x654321, 1);
        graphics.lineStyle(2, 0x654321, 1);
        graphics.strokeRect(32, 64, 32, 32);
        
        // Windows
        graphics.fillStyle(0x87ceeb, 1);
        graphics.fillRect(12, 20, 20, 20);
        graphics.fillRect(64, 20, 20, 20);
        
        // Window frames
        graphics.lineStyle(2, 0x654321, 1);
        graphics.strokeRect(12, 20, 20, 20);
        graphics.strokeRect(64, 20, 20, 20);
        
        // Window cross
        graphics.beginPath();
        graphics.moveTo(22, 20);
        graphics.lineTo(22, 40);
        graphics.moveTo(12, 30);
        graphics.lineTo(32, 30);
        graphics.strokePath();
        
        graphics.beginPath();
        graphics.moveTo(74, 20);
        graphics.lineTo(74, 40);
        graphics.moveTo(64, 30);
        graphics.lineTo(84, 30);
        graphics.strokePath();
        
        graphics.generateTexture('building-sprite', 96, 96);
        graphics.destroy();
    }
    
    static createDegreeIcon(scene, type) {
        const graphics = scene.add.graphics();
        
        // Base color depends on type
        let color, label;
        if (type === 'AA') {
            color = 0x2c3e50; // Dark blue for Associate of Arts
            label = 'AA';
        } else if (type === 'AS') {
            color = 0x16a085; // Teal for Associate of Science
            label = 'AS';
        } else if (type === 'Certificate') {
            color = 0xe67e22; // Orange for Certificates
            label = 'CERT';
        } else {
            color = 0x95a5a6; // Gray default
            label = 'DEG';
        }
        
        // Document/diploma shape (24x32)
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 0, 24, 32);
        
        // Border
        graphics.lineStyle(2, color, 1);
        graphics.strokeRect(0, 0, 24, 32);
        
        // Colored header bar
        graphics.fillStyle(color, 1);
        graphics.fillRect(2, 2, 20, 8);
        
        // Lines representing text (gray)
        graphics.fillStyle(0xbdc3c7, 1);
        graphics.fillRect(4, 14, 16, 2);
        graphics.fillRect(4, 18, 16, 2);
        graphics.fillRect(4, 22, 12, 2);
        
        // Seal/stamp at bottom
        graphics.lineStyle(1, color, 1);
        graphics.strokeCircle(12, 28, 3);
        
        graphics.generateTexture(`degree-${type.toLowerCase()}`, 24, 32);
        graphics.destroy();
    }
    
    static createMidimazeIcon(scene) {
        const graphics = scene.add.graphics();
        
        // Book/knowledge icon with musical notes
        // Book shape (32x32)
        graphics.fillStyle(0x2ecc71, 1); // Green for midimaze
        graphics.fillRect(4, 6, 24, 20);
        
        // Book spine highlight
        graphics.fillStyle(0x27ae60, 1);
        graphics.fillRect(4, 6, 4, 20);
        
        // Pages effect
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(9, 8, 17, 16);
        
        // Musical note on cover
        graphics.fillStyle(0x2c3e50, 1);
        // Note head
        graphics.fillCircle(16, 18, 2);
        // Note stem
        graphics.fillRect(18, 12, 1, 6);
        
        // Second note
        graphics.fillCircle(20, 16, 2);
        graphics.fillRect(22, 10, 1, 6);
        
        // "M" letter
        graphics.fillStyle(0x2ecc71, 1);
        graphics.fillRect(10, 10, 2, 6);
        graphics.fillRect(12, 10, 2, 2);
        graphics.fillRect(14, 10, 2, 6);
        
        // Sparkle effect (educational!)
        graphics.fillStyle(0xf39c12, 1);
        graphics.fillRect(26, 8, 3, 1);
        graphics.fillRect(27, 7, 1, 3);
        graphics.fillRect(26, 22, 3, 1);
        graphics.fillRect(27, 21, 1, 3);
        
        graphics.generateTexture('midimaze-icon', 32, 32);
        graphics.destroy();
    }
    
    static createChairIcon(scene) {
        const graphics = scene.add.graphics();
        
        // Professional icon representing department chair
        // Podium/desk shape
        graphics.fillStyle(0x654321, 1);
        graphics.fillRect(4, 20, 24, 12);
        
        // Person silhouette
        graphics.fillStyle(0x2c3e50, 1);
        // Head
        graphics.fillCircle(16, 12, 4);
        // Body
        graphics.fillRect(12, 16, 8, 8);
        
        // Star/badge indicating authority
        graphics.fillStyle(0xf39c12, 1);
        graphics.fillCircle(22, 10, 3);
        
        graphics.generateTexture('chair-icon', 32, 32);
        graphics.destroy();
    }
    
    static createVendingMachine(scene) {
        const graphics = scene.add.graphics();
        
        // Machine body (dark gray)
        graphics.fillStyle(0x2c3e50, 1);
        graphics.fillRect(0, 0, 32, 48);
        
        // Front panel (lighter gray)
        graphics.fillStyle(0x34495e, 1);
        graphics.fillRect(2, 2, 28, 44);
        
        // Display window (black)
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(4, 4, 24, 20);
        
        // Empty shelves (very faint lines)
        graphics.lineStyle(1, 0x7f8c8d, 1);
        graphics.beginPath();
        graphics.moveTo(6, 10);
        graphics.lineTo(26, 10);
        graphics.moveTo(6, 16);
        graphics.lineTo(26, 16);
        graphics.strokePath();
        
        // Coin slot (silver)
        graphics.fillStyle(0x95a5a6, 1);
        graphics.fillRect(8, 28, 8, 3);
        
        // Button panel (red buttons)
        graphics.fillStyle(0xe74c3c, 1);
        graphics.fillRect(20, 28, 3, 3);
        graphics.fillRect(24, 28, 3, 3);
        graphics.fillRect(20, 32, 3, 3);
        graphics.fillRect(24, 32, 3, 3);
        
        // Dispenser slot (dark)
        graphics.fillStyle(0x1a1a1a, 1);
        graphics.fillRect(6, 38, 20, 6);
        
        // Out of order sticker (yellow with red X)
        graphics.fillStyle(0xf39c12, 0.8);
        graphics.fillRect(10, 12, 12, 8);
        graphics.lineStyle(2, 0xe74c3c, 1);
        graphics.beginPath();
        graphics.moveTo(12, 14);
        graphics.lineTo(20, 18);
        graphics.moveTo(20, 14);
        graphics.lineTo(12, 18);
        graphics.strokePath();
        
        graphics.generateTexture('vending-machine', 32, 48);
        graphics.destroy();
    }
    
    static createNPCSprite(scene, theme) {
        const graphics = scene.add.graphics();
        
        // NPC body (different colors per theme)
        const colors = {
            architecture: 0xff6b35,
            art: 0x9b59b6,
            communication: 0x3498db,
            cad: 0x95a5a6,
            dance: 0xff69b4,
            film: 0x2c3e50,
            'graphic-design': 0xe74c3c,
            journalism: 0x34495e,
            'liberal-arts': 0x16a085,
            music: 0xf39c12,
            'recording-arts': 0xc0392b,
            theatre: 0x8e44ad
        };
        
        const color = colors[theme] || 0x4169e1;
        
        // Head
        graphics.fillStyle(0xffdbac, 1);
        graphics.fillRect(4, 2, 8, 6);
        
        // Hair
        graphics.fillStyle(0x2c1810, 1);
        graphics.fillRect(4, 1, 8, 3);
        
        // Eyes
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(5, 4, 2, 2);
        graphics.fillRect(9, 4, 2, 2);
        
        // Body (theme color)
        graphics.fillStyle(color, 1);
        graphics.fillRect(4, 8, 8, 8);
        
        // Billboard/sign held up
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 16, 16, 12);
        
        // Sign border
        graphics.lineStyle(1, 0x000000, 1);
        graphics.strokeRect(0, 16, 16, 12);
        
        // Sign icon (simple shape representing theme)
        graphics.fillStyle(color, 1);
        graphics.fillRect(4, 19, 8, 6);
        
        graphics.generateTexture(`npc-${theme}`, 16, 28);
        graphics.destroy();
    }
}
