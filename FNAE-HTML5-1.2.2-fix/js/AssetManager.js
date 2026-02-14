// èµ„æºç®¡ç†å™¨
class AssetManager {
    constructor() {
        this.images = {};
        this.sounds = {};
        this.loaded = false;
        
        // åˆ†ç±»éŸ³é‡è®¾ç½®
        this.volumeSettings = this.loadVolumeSettings();
    }
    
    // ä»Ž localStorage åŠ è½½éŸ³é‡è®¾ç½®
    loadVolumeSettings() {
        const saved = localStorage.getItem('fnae_volume_settings');
        if (saved) {
            return JSON.parse(saved);
        }
        // é»˜è®¤éŸ³é‡è®¾ç½®
        return {
            master: 0.7,
            gameBg: 0.7,
            menuMusic: 0.7,
            jumpscare: 0.7,
            ventCrawling: 0.7
        };
    }
    
    // ä¿å­˜éŸ³é‡è®¾ç½®
    saveVolumeSettings() {
        localStorage.setItem('fnae_volume_settings', JSON.stringify(this.volumeSettings));
    }
    
    // è®¾ç½®ç‰¹å®šç±»åž‹çš„éŸ³é‡
    setVolume(type, volume) {
        this.volumeSettings[type] = Math.max(0, Math.min(1, volume));
        this.saveVolumeSettings();
    }
    
    // èŽ·å–ç‰¹å®šç±»åž‹çš„éŸ³é‡
    getVolume(type) {
        return this.volumeSettings[type] || 0.7;
    }
    
    // èŽ·å–æ‰€æœ‰éŸ³é‡è®¾ç½®
    getAllVolumes() {
        return this.volumeSettings;
    }

    async loadAssets() {
        // èŽ·å–å½“å‰è„šæœ¬çš„åŸºç¡€è·¯å¾„
        const basePath = this.getBasePath();
        
        // ä»Ž Unity æå–çš„èµ„æº
        const imagePaths = {
            office: `${basePath}assets/images/original.png`,
            cam1: `${basePath}assets/images/Cam1.png`,
            cam2: `${basePath}assets/images/Cam2.png`,
            cam3: `${basePath}assets/images/Cam3.png`,
            cam4: `${basePath}assets/images/Cam4.png`,
            cam5: `${basePath}assets/images/Cam5.png`,
            cam6: `${basePath}assets/images/Cam6.png`,
            cam7: `${basePath}assets/images/Cam7.png`,
            cam8: `${basePath}assets/images/Cam8.png`,
            cam9: `${basePath}assets/images/Cam9.png`,
            cam10: `${basePath}assets/images/Cam10.png`,
            cam11: `${basePath}assets/images/Cam11.png`,
            jumpscare: `${basePath}assets/images/jump.png`, // EPè·³æ€å›¾ç‰‡
            trumpJumpscare: `${basePath}assets/images/jumptrump.png`, // Trumpè·³æ€å›¾ç‰‡
            hawkingJumpscare: `${basePath}assets/images/scaryhawking.png`, // Hawkingè·³æ€å›¾ç‰‡
        };

        const soundPaths = {
            ambient: `${basePath}assets/sounds/music.ogg`,
            static: `${basePath}assets/sounds/Static_sound.ogg`,
            staticLoop: `${basePath}assets/sounds/Static_sound.ogg`,
            vents: `${basePath}assets/sounds/vents.ogg`,
            ventCrawling: `${basePath}assets/sounds/vent-crawling.mp3`,
            jumpscare: `${basePath}assets/sounds/jumpcare.ogg`,
            hawkingJumpscare: `${basePath}assets/sounds/stephenjumpscare.ogg`, // Hawkingè·³æ€éŸ³æ•ˆ
            blip: `${basePath}assets/sounds/Blip.ogg`,
            win: `${basePath}assets/sounds/winmusic.ogg`,
            chimes: `${basePath}assets/sounds/chimes.ogg`,
            crank1: `${basePath}assets/sounds/Crank1.ogg`,
            crank2: `${basePath}assets/sounds/Crank2.ogg`,
            ekg: `${basePath}assets/sounds/ekg.wav`,
            hawking_shock: `${basePath}assets/sounds/hawking_shock.wav`,
            goldenstephenscare: `${basePath}assets/sounds/goldenstephenscare.ogg`, // Golden éœé‡‘éŸ³æ•ˆ
        };

        // åŠ è½½å›¾ç‰‡
        for (const [key, path] of Object.entries(imagePaths)) {
            try {
                this.images[key] = await this.loadImage(path);
            } catch (e) {
                console.warn(`Failed to load image: ${path}`);
            }
        }

        // åŠ è½½éŸ³é¢‘
        for (const [key, path] of Object.entries(soundPaths)) {
            try {
                this.sounds[key] = new Audio(path);
            } catch (e) {
                console.warn(`Failed to load sound: ${path}`);
            }
        }

        this.loaded = true;
    }

    getBasePath() {
        // æ£€æŸ¥æ˜¯å¦åœ¨ iframe ä¸­
        const currentPath = window.location.pathname;
        if (currentPath.includes('/FNAE-HTML5-1.2.2-fix/')) {
            return '/FNAE-HTML5-1.2.2-fix/';
        }
        // æœ¬åœ°å¼€å‘çŽ¯å¢ƒ
        return './';
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    playSound(key, loop = false, volume = 1.0) {
        if (this.sounds[key]) {
            this.sounds[key].loop = loop;
            
            // æ ¹æ®éŸ³æ•ˆç±»åž‹åº”ç”¨å¯¹åº”çš„éŸ³é‡
            let categoryVolume = this.volumeSettings.master;
            
            if (key === 'music' || key === 'music3') {
                categoryVolume *= this.volumeSettings.menuMusic;
            } else if (key === 'jumpscare' || key === 'hawkingJumpscare' || key === 'trumpJumpscare') {
                categoryVolume *= this.volumeSettings.jumpscare;
            } else if (key === 'ventCrawling') {
                categoryVolume *= this.volumeSettings.ventCrawling;
            } else if (key === 'vents' || key === 'ambience' || key === 'staticLoop' || key === 'static' || key === 'blip' || key === 'Blip') {
                // æ¸¸æˆèƒŒæ™¯éŸ³ä¹ï¼šåŒ…æ‹¬é€šé£Žå£å£°éŸ³ã€é™æ€å™ªå£°ã€æ‘„åƒæœºåˆ‡æ¢å£°ç­‰
                categoryVolume *= this.volumeSettings.gameBg;
            }
            
            this.sounds[key].volume = Math.min(1, volume * categoryVolume);
            this.sounds[key].play();
        }
    }

    stopSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].pause();
            this.sounds[key].currentTime = 0;
        }
    }

    setSoundVolume(key, volume) {
        if (this.sounds[key]) {
            this.sounds[key].volume = volume;
        }
    }
}