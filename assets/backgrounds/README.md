# Program Room Backgrounds

This directory contains background images for program-specific rooms.

## Recording Arts & Technology Studio

**Filename:** `recording-studio.jpg`

**Instructions:**
1. Save the recording studio panorama image as `recording-studio.jpg` in this directory
2. Recommended dimensions: 1920x600 or similar wide format
3. The image will be automatically scaled to fit the game canvas (800x600)
4. A semi-transparent overlay will be added for UI element visibility

**Current Image:** The studio console/mixing board panorama with:
- SSL console in center
- Studio monitors/speakers
- Computer workstations
- Professional recording environment

## Adding More Program Backgrounds

To add backgrounds for other programs:

1. Save the image in this directory with a descriptive name (e.g., `art-studio.jpg`)
2. Update `js/game.js` preload function to load the image:
   ```javascript
   this.load.image('art-studio-bg', 'assets/backgrounds/art-studio.jpg');
   ```
3. Update `createProgramRoom()` function to check for the program ID and apply background:
   ```javascript
   if (program.id === 'art' && this.textures.exists('art-studio-bg')) {
       // Add background logic
   }
   ```

## Recommended Programs for Custom Backgrounds

- **Architecture** - Design studio or drafting lab
- **Art** - Art studio with easels and supplies
- **Music** - Music room with instruments
- **Theatre** - Theatre stage or black box
- **Film** - Production studio or editing suite
- **Dance** - Dance studio with mirrors
- **CAD** - Computer lab with CAD workstations
