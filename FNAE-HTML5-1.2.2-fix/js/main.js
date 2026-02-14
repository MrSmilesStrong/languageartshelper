// æ¸¸æˆå…¥å£ - åˆå§‹åŒ–æ‰€æœ‰æ¨¡å—
let game;
let staticNoise;

// é¢„åŠ è½½è¿›åº¦è·Ÿè¸ª
let loadedAssets = 0;
let totalAssets = 0;

// ç¦ç”¨æµè§ˆå™¨é»˜è®¤è¡Œä¸ºï¼Œæå‡æ¸¸æˆä½“éªŒ
function disableBrowserDefaults() {
    // ç¦ç”¨å³é”®èœå•
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    }, { capture: true });
    
    // ç¦ç”¨æ‹–æ‹½
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    }, { capture: true });
    
    // ç¦ç”¨é€‰æ‹©æ–‡æœ¬ï¼ˆåŒå‡»ã€é•¿æŒ‰ç­‰ï¼‰
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    }, { capture: true });
    
    // ç¦ç”¨å¤åˆ¶
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
    }, { capture: true });
    
    // ç¦ç”¨å‰ªåˆ‡
    document.addEventListener('cut', (e) => {
        e.preventDefault();
        return false;
    }, { capture: true });
    
    // ç¦ç”¨æŸäº›å¿«æ·é”®
    document.addEventListener('keydown', (e) => {
        // ç¦ç”¨ Ctrl+A (å…¨é€‰)
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            return false;
        }
        // ç¦ç”¨ Ctrl+C (å¤åˆ¶)
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            return false;
        }
        // ç¦ç”¨ Ctrl+X (å‰ªåˆ‡)
        if (e.ctrlKey && e.key === 'x') {
            e.preventDefault();
            return false;
        }
        // ç¦ç”¨ Ctrl+S (ä¿å­˜)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
        // ç¦ç”¨ Ctrl+P (æ‰“å°)
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            return false;
        }
        // ç¦ç”¨ Ctrl+U (æŸ¥çœ‹æºä»£ç )
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
    }, { capture: true });
    
    // ç¦ç”¨è§¦æ‘¸è®¾å¤‡çš„é•¿æŒ‰èœå•
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false, capture: true });
    
    // ç¦ç”¨åŒæŒ‡ç¼©æ”¾
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false, capture: true });
    
    // é˜»æ­¢é¼ æ ‡é€‰æ‹©æ–‡æœ¬
    document.addEventListener('mousedown', (e) => {
        // å…è®¸æŒ‰é’®ç‚¹å‡»
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return true;
        }
        // é˜»æ­¢å…¶ä»–å…ƒç´ çš„é¼ æ ‡æŒ‰ä¸‹ï¼ˆé˜²æ­¢æ‹–æ‹½é€‰æ‹©ï¼‰
        if (e.detail > 1) { // åŒå‡»æˆ–å¤šå‡»
            e.preventDefault();
            return false;
        }
    }, { capture: true });
    
    // console.log('Browser defaults disabled for better game experience');
}

// æ›´æ–°é¢„åŠ è½½è¿›åº¦
function updatePreloadProgress(progress) {
    const progressBar = document.getElementById('progress-bar');
    const percentage = document.getElementById('preloader-percentage');
    
    if (progressBar && percentage) {
        progressBar.style.width = progress + '%';
        percentage.textContent = Math.round(progress) + '%';
    }
}

// é¢„åŠ è½½æ‰€æœ‰æ¸¸æˆèµ„æº
async function preloadGameAssets() {
    const basePath = window.location.pathname.includes('/FNAE-HTML5-1.2.2-fix/') 
        ? '/FNAE-HTML5-1.2.2-fix/' 
        : './';
    
    // å®šä¹‰æ‰€æœ‰éœ€è¦é¢„åŠ è½½çš„èµ„æº
    const imagePaths = [
        'assets/images/original.png',
        'assets/images/Cam1.png',
        'assets/images/Cam2.png',
        'assets/images/Cam3.png',
        'assets/images/Cam4.png',
        'assets/images/Cam5.png',
        'assets/images/Cam6.png',
        'assets/images/Cam7.png',
        'assets/images/Cam8.png',
        'assets/images/Cam9.png',
        'assets/images/Cam10.png',
        'assets/images/Cam11.png',
        'assets/images/jump.png',
        'assets/images/menubackground.png',
        'assets/images/cutscene.png',
        'assets/images/fa3.png',
        'assets/images/FNAE-Map-layout.png',
        'assets/images/enemyep1.png',
        'assets/images/ep1.png',
        'assets/images/ep4.png',
        'assets/images/enemyep4.png',
        'assets/images/scaryhawk.png',
        'assets/images/scaryep.png',
        'assets/images/scarytrump.png',
        'assets/images/winscreen.png',  // Night 5 èƒœåˆ©ç”»é¢
        'assets/images/goldenstephen.png'  // Golden éœé‡‘
    ];
    
    const soundPaths = [
        'assets/sounds/music.ogg',
        'assets/sounds/music3.ogg',
        'assets/sounds/Static_sound.ogg',
        'assets/sounds/vents.ogg',
        'assets/sounds/jumpcare.ogg',
        'assets/sounds/Blip.ogg',
        'assets/sounds/winmusic.ogg',
        'assets/sounds/chimes.ogg',
        'assets/sounds/Crank1.ogg',
        'assets/sounds/Crank2.ogg',
        'assets/sounds/goldenstephenscare.ogg'  // Golden éœé‡‘éŸ³æ•ˆ
    ];
    
    totalAssets = imagePaths.length + soundPaths.length;
    loadedAssets = 0;
    
    // é¢„åŠ è½½å›¾ç‰‡
    const imagePromises = imagePaths.map(path => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                loadedAssets++;
                updatePreloadProgress((loadedAssets / totalAssets) * 100);
                resolve();
            };
            img.onerror = () => {
                console.warn(`Failed to load image: ${path}`);
                loadedAssets++;
                updatePreloadProgress((loadedAssets / totalAssets) * 100);
                resolve();
            };
            img.src = basePath + path;
        });
    });
    
    // é¢„åŠ è½½éŸ³é¢‘ï¼ˆä¸é˜»å¡žï¼Œå¿«é€ŸåŠ è½½ï¼‰
    const audioPromises = soundPaths.map(path => {
        return new Promise((resolve) => {
            const audio = new Audio();
            audio.addEventListener('canplaythrough', () => {
                loadedAssets++;
                updatePreloadProgress((loadedAssets / totalAssets) * 100);
                resolve();
            }, { once: true });
            audio.addEventListener('error', () => {
                console.warn(`Failed to load audio: ${path}`);
                loadedAssets++;
                updatePreloadProgress((loadedAssets / totalAssets) * 100);
                resolve();
            }, { once: true });
            audio.src = basePath + path;
            audio.load();
        });
    });
    
    // ç­‰å¾…æ‰€æœ‰èµ„æºåŠ è½½å®Œæˆ
    await Promise.all([...imagePromises, ...audioPromises]);
    
    // ç¡®ä¿è¿›åº¦æ¡æ˜¾ç¤º100%
    updatePreloadProgress(100);
    
    // ç­‰å¾…ä¸€å°æ®µæ—¶é—´è®©çŽ©å®¶çœ‹åˆ°100%
    await new Promise(resolve => setTimeout(resolve, 500));
}

// éšè—é¢„åŠ è½½åŠ¨ç”»
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// é¡µé¢åŠ è½½å®ŒæˆåŽå¯åŠ¨
window.addEventListener('DOMContentLoaded', async () => {
    // ç¦ç”¨æµè§ˆå™¨é»˜è®¤è¡Œä¸º
    disableBrowserDefaults();
    
    // å…ˆé¢„åŠ è½½æ‰€æœ‰èµ„æº
    await preloadGameAssets();
    
    // é¢„åŠ è½½èƒŒæ™¯å›¾ç‰‡ï¼ˆç”¨äºŽææ€–è„¸æ•ˆæžœï¼‰
    preloadBackgrounds();
    
    // éšè—é¢„åŠ è½½åŠ¨ç”»
    hidePreloader();
    
    // åˆå§‹åŒ–æ¸¸æˆ
    game = new Game();
    staticNoise = new StaticNoise();
    
    // æ›´æ–°ContinueæŒ‰é’®æ˜¾ç¤º
    game.updateContinueButton();
    
    const mainMenu = document.getElementById('main-menu');
    
    // æ£€æŸ¥æ˜¯å¦ä»Žå¤–éƒ¨é¡µé¢å¯åŠ¨ï¼ˆå¸¦autostartå‚æ•°ï¼‰
    const urlParams = new URLSearchParams(window.location.search);
    const autostart = urlParams.get('autostart');
    
    // å¯åŠ¨èœå•éŸ³ä¹
    const menuMusic = document.getElementById('menu-music');
    if (menuMusic) {
        menuMusic.volume = 0.5;
        
        // å¦‚æžœæ˜¯autostartï¼Œç«‹å³å°è¯•æ’­æ”¾
        if (autostart === '1') {
            // console.log('æ£€æµ‹åˆ°autostartå‚æ•°ï¼Œå°è¯•è‡ªåŠ¨æ’­æ”¾éŸ³ä¹...');
            menuMusic.play().then(() => {
                // console.log('âœ… éŸ³ä¹è‡ªåŠ¨æ’­æ”¾æˆåŠŸï¼');
            }).catch(e => {
                // console.log('âŒ è‡ªåŠ¨æ’­æ”¾å¤±è´¥ï¼Œç­‰å¾…ç”¨æˆ·äº¤äº’:', e);
                // å¤±è´¥åˆ™ç­‰å¾…ç”¨æˆ·ç‚¹å‡»
                setupManualPlayback();
            });
        } else {
            // æ­£å¸¸æµç¨‹ï¼šç­‰å¾…ç”¨æˆ·ç‚¹å‡»
            setupManualPlayback();
        }
        
        function setupManualPlayback() {
            const playMusic = () => {
                if (mainMenu && !mainMenu.classList.contains('hidden')) {
                    menuMusic.play().catch(e => {/* console.log('éŸ³ä¹æ’­æ”¾éœ€è¦ç”¨æˆ·äº¤äº’') */});
                }
                document.removeEventListener('click', playMusic);
                document.removeEventListener('keydown', playMusic);
            };
            
            document.addEventListener('click', playMusic);
            document.addEventListener('keydown', playMusic);
        }
    }
    
    // ç›‘å¬ä¸»èœå•æ˜¾ç¤º/éšè—ï¼ŒæŽ§åˆ¶é›ªèŠ±å’Œé¬¼è„¸æ•ˆæžœ
    const observer = new MutationObserver(() => {
        if (mainMenu && !mainMenu.classList.contains('hidden')) {
            startScaryFaceFlicker();
            staticNoise.start();
        } else {
            stopScaryFaceFlicker();
            staticNoise.stop();
        }
    });
    
    if (mainMenu) {
        observer.observe(mainMenu, { attributes: true, attributeFilter: ['class'] });
        
        if (!mainMenu.classList.contains('hidden')) {
            startScaryFaceFlicker();
            staticNoise.start();
        }
    }
});

// ç›‘å¬æ¥è‡ªçˆ¶é¡µé¢çš„æ¶ˆæ¯ï¼ˆiframe é€šä¿¡ï¼‰
window.addEventListener('message', (event) => {
    if (event.data.type === 'USER_CLICKED_PLAY') {
        // console.log('æ”¶åˆ°çˆ¶é¡µé¢çš„ç”¨æˆ·ç‚¹å‡»äº‹ä»¶');
        const menuMusic = document.getElementById('menu-music');
        if (menuMusic) {
            // ç«‹å³å°è¯•æ’­æ”¾éŸ³ä¹
            menuMusic.volume = 0.5;
            menuMusic.play().then(() => {
                // console.log('âœ… éŸ³ä¹è‡ªåŠ¨æ’­æ”¾æˆåŠŸï¼');
            }).catch(e => {
                // console.log('âŒ éŸ³ä¹æ’­æ”¾å¤±è´¥:', e);
                // å¦‚æžœå¤±è´¥ï¼Œç­‰å¾…ç”¨æˆ·åœ¨æ¸¸æˆå†…ç‚¹å‡»
            });
        }
    }
});