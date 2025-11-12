// Music Manager for ACDM Game
// Uses royalty-free chiptune music

class MusicManager {
    constructor(scene) {
        this.scene = scene;
        this.currentMusic = null;
        this.musicEnabled = true;
        
        // Music tracks (we'll generate simple melodies using Web Audio API)
        this.tracks = {};
    }
    
    // Create simple chiptune-style music using Web Audio API
    createSimpleTrack(name, tempo, notes) {
        // Store the configuration for later playback
        this.tracks[name] = { tempo, notes };
    }
    
    init() {
        // Campus music - cheerful and welcoming
        this.createSimpleTrack('campus', 120, [
            {freq: 523, duration: 0.3}, // C
            {freq: 587, duration: 0.3}, // D
            {freq: 659, duration: 0.3}, // E
            {freq: 784, duration: 0.6}, // G
            {freq: 659, duration: 0.3}, // E
            {freq: 587, duration: 0.3}, // D
            {freq: 523, duration: 0.6}, // C
        ]);
        
        // School building - focused and academic
        this.createSimpleTrack('school', 100, [
            {freq: 392, duration: 0.4}, // G
            {freq: 494, duration: 0.4}, // B
            {freq: 587, duration: 0.4}, // D
            {freq: 494, duration: 0.4}, // B
            {freq: 392, duration: 0.4}, // G
            {freq: 330, duration: 0.8}, // E
        ]);
        
        // Program room - inspiring and motivational
        this.createSimpleTrack('program', 110, [
            {freq: 659, duration: 0.3}, // E
            {freq: 698, duration: 0.3}, // F
            {freq: 784, duration: 0.3}, // G
            {freq: 880, duration: 0.6}, // A
            {freq: 784, duration: 0.3}, // G
            {freq: 698, duration: 0.3}, // F
            {freq: 659, duration: 0.6}, // E
        ]);
    }
    
    play(trackName) {
        if (!this.musicEnabled) return;
        
        // Stop current music
        this.stop();
        
        // For now, we'll just log that we'd play music
        // In a full implementation, you'd use Web Audio API or load actual audio files
        console.log(`🎵 Playing music: ${trackName}`);
        
        // You can uncomment this to use actual sound
        // this.playWithWebAudio(trackName);
    }
    
    playWithWebAudio(trackName) {
        const track = this.tracks[trackName];
        if (!track) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let currentTime = audioContext.currentTime;
        
        const playNote = (freq, duration, startTime) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'square'; // Chiptune sound
            oscillator.frequency.setValueAtTime(freq, startTime);
            
            gainNode.gain.setValueAtTime(0.1, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };
        
        // Play all notes in sequence
        track.notes.forEach(note => {
            playNote(note.freq, note.duration, currentTime);
            currentTime += note.duration;
        });
        
        // Loop the track
        this.currentMusic = setTimeout(() => {
            if (this.musicEnabled) {
                this.playWithWebAudio(trackName);
            }
        }, (currentTime - audioContext.currentTime) * 1000);
    }
    
    stop() {
        if (this.currentMusic) {
            clearTimeout(this.currentMusic);
            this.currentMusic = null;
        }
    }
    
    toggle() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.stop();
        }
        return this.musicEnabled;
    }
}

// For using actual audio files (recommended for production)
// Place audio files in assets/audio/ directory:
// - campus.mp3 or campus.ogg
// - school.mp3 or school.ogg  
// - program.mp3 or program.ogg

// Recommended free chiptune sources:
// - OpenGameArt.org (CC0 licensed music)
// - FreeMusicArchive.org (filter by chiptune/8-bit)
// - Incompetech.com (royalty-free with attribution)
// - Bosca Ceoil (free chiptune music maker)
