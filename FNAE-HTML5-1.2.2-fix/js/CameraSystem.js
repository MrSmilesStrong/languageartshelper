// Camera system management
class CameraSystem {
    constructor(game) {
        this.game = game;
        this.cameraPanel = document.getElementById('camera-panel');
        this.currentCamLabel = document.getElementById('current-cam-label');
        this.cameraErrorLabel = document.getElementById('camera-error-label');
        this.playSoundBtn = document.getElementById('play-sound-btn');
        this.shockHawkingBtn = document.getElementById('shock-hawking-btn');
        this.currentSoundToggle = false;
        this.staticVideo = document.getElementById('camera-static-video');
        
        // æ’­æ”¾å£°éŸ³æŒ‰é’®çŠ¶æ€
        this.soundButtonCooldown = false;
        this.soundButtonUseCount = 0;
        this.maxSoundUses = 5; // è¿žç»­ä½¿ç”¨5æ¬¡åŽæ‘„åƒå¤´æ•…éšœ
        this.cooldownTime = 8000; // 8ç§’å†·å´
        this.cooldownInterval = null; // å†·å´åŠ¨ç”»å®šæ—¶å™¨
        
        // æ¯ä¸ªä½ç½®çš„è¿žç»­å¸å¼•è®¡æ•°
        this.locationAttractCount = {}; // { 'cam11': 2, 'cam8': 1, ... }
        this.maxLocationAttractCount = 2; // åŒä¸€ä½ç½®æœ€å¤šè¿žç»­å¸å¼•2æ¬¡
        this.lastEpLocation = null; // è®°å½•EPçš„ä¸Šä¸€ä¸ªä½ç½®ï¼Œç”¨äºŽæ£€æµ‹ç§»åŠ¨
        
        // EP è§’è‰²é…ç½® - ç›´æŽ¥å¼•ç”¨ EnemyAI çš„é…ç½®ï¼ˆæ¸¸æˆåˆå§‹åŒ–åŽä¼šè®¾ç½®ï¼‰
        this.characterImages = null;
        this.characterPositions = null;
        this.characterBrightness = null;
        this.characterRotation = null;
        
        this.bindEvents();
    }
    
    // Initialize EP config (from EnemyAI)
    initEPConfig() {
        if (this.game.enemyAI) {
            this.characterImages = this.game.enemyAI.characterImages;
            this.characterPositions = this.game.enemyAI.characterPositions;
            this.characterBrightness = this.game.enemyAI.characterBrightness;
            this.characterRotation = this.game.enemyAI.characterRotation;
            console.log('EP config initialized from EnemyAI');
        }
    }

    bindEvents() {
        if (this.playSoundBtn) {
            this.playSoundBtn.addEventListener('click', () => this.playAmbientSound());
        }
        if (this.shockHawkingBtn) {
            this.shockHawkingBtn.addEventListener('click', () => this.shockHawking());
        }
    }

    toggle() {
        // console.log('ðŸ“· Camera toggle called, current state:', this.game.state.cameraOpen);
        if (this.game.state.cameraOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        // console.log('ðŸ“· Opening camera...');
        // console.log('ðŸ“· Camera panel element:', this.cameraPanel);
        // console.log('ðŸ“· Camera panel classes before:', this.cameraPanel.className);
        
        this.game.state.cameraOpen = true;
        this.cameraPanel.classList.remove('hidden');
        this.cameraPanel.classList.add('show');
        
        // console.log('ðŸ“· Camera panel classes after:', this.cameraPanel.className);
        // console.log('ðŸ“· Camera panel display:', window.getComputedStyle(this.cameraPanel).display);
        // console.log('ðŸ“· Camera panel opacity:', window.getComputedStyle(this.cameraPanel).opacity);
        // console.log('ðŸ“· Camera panel transform:', window.getComputedStyle(this.cameraPanel).transform);
        
        this.game.assets.playSound('crank1');
        
        // Start looping low volume static sound
        this.game.assets.playSound('staticLoop', true, 0.3);
        
        this.createCameraGrid();
        
        // æ›´æ–°ç”µå‡»æŒ‰é’®æ˜¾ç¤º
        this.updateShockButtonVisibility();
        
        // æ›´æ–°éœé‡‘è­¦å‘Šä½ç½®ï¼ˆä»Žé£Žæ‰‡å·¦è¾¹ç§»åˆ°åœ°å›¾ä¸Šï¼‰
        if (this.game.enemyAI && this.game.enemyAI.hawking.active) {
            this.game.enemyAI.updateHawkingWarningDisplay();
        }
        
        // If camera failed, show failure effect
        if (this.game.state.cameraFailed) {
            console.log('ðŸ“· Camera is failed, showing failure effect');
            this.showCameraFailure();
        } else {
            console.log('ðŸ“· Camera is normal, showing normal view');
            // Normal state, ensure all failure effects removed
            this.cameraPanel.classList.remove('transitioning');
            
            // Hide ERR label
            if (this.cameraErrorLabel) {
                this.cameraErrorLabel.classList.remove('active');
            }
            
            // Stop static
            this.stopStatic();
            
            // Show map
            const cameraGrid = document.getElementById('camera-grid');
            if (cameraGrid) {
                cameraGrid.style.display = 'block';
            }
            
            // Update view
            this.updateView();
        }
        
        // Stop view rotation
        this.game.isRotatingLeft = false;
        this.game.isRotatingRight = false;
    }
    
    // Show camera failure effect
    showCameraFailure() {
        console.log('Showing camera failure effect...');
        
        // Night 5: 30% æ¦‚çŽ‡è§¦å‘ Golden éœé‡‘å½©è›‹
        if (this.game.state.currentNight === 5 && Math.random() < 0.3) {
            this.game.showGoldenStephen();
        }
        
        // Hide background image and characters
        this.cameraPanel.classList.add('transitioning');
        
        // Hide map
        const cameraGrid = document.getElementById('camera-grid');
        if (cameraGrid) {
            cameraGrid.style.display = 'none';
            console.log('Camera grid hidden');
        }
        
        // Show ERR label
        if (this.cameraErrorLabel) {
            this.cameraErrorLabel.classList.add('active');
            console.log('ERR label shown');
        }
        
        // Show and play static video
        if (this.staticVideo) {
            console.log('Starting static video...');
            this.staticVideo.classList.add('active');
            this.staticVideo.currentTime = 0; // Play from beginning
            this.staticVideo.play().catch(e => console.log('Video playback failed:', e));
        } else {
            console.error('Static video element not found!');
        }
    }
    
    // Stop static effect
    stopStatic() {
        if (this.staticVideo) {
            this.staticVideo.classList.remove('active');
            this.staticVideo.pause();
            this.staticVideo.currentTime = 0;
        }
    }
    
    // Start static effect (for switching cameras)
    startStatic() {
        if (this.staticVideo) {
            this.staticVideo.classList.add('active');
            this.staticVideo.play().catch(e => console.log('Video playback failed:', e));
        }
    }
    
    // Restore camera normal display
    restoreCameraView() {
        console.log('Restoring camera view...');
        
        // Stop static
        this.stopStatic();
        console.log('Static video stopped');
        
        // Remove failure state
        this.cameraPanel.classList.remove('transitioning');
        console.log('Removed transitioning class');
        
        // Hide ERR label
        if (this.cameraErrorLabel) {
            this.cameraErrorLabel.classList.remove('active');
            console.log('ERR label hidden');
        }
        
        // Show map
        const cameraGrid = document.getElementById('camera-grid');
        if (cameraGrid) {
            cameraGrid.style.display = 'block';
            console.log('Camera grid shown');
        }
        
        // Update view
        this.updateView();
        console.log('View updated');
    }
    
    // Fix camera
    restartCamera() {
        // å¦‚æžœæŽ§åˆ¶é¢æ¿æ­£å¿™ï¼Œä¸å…è®¸æ“ä½œ
        if (this.game.state.controlPanelBusy) {
            console.log('Control panel is busy, cannot restart camera');
            return;
        }
        
        console.log('Restarting camera system...');
        this.game.state.cameraRestarting = true;
        this.game.state.controlPanelBusy = true; // é”å®šæŽ§åˆ¶é¢æ¿
        
        // æ’­æ”¾å¿ƒç”µå›¾éŸ³æ•ˆ
        this.game.assets.playSound('ekg', false, 0.8);
        
        // Restore after 4 seconds
        setTimeout(() => {
            // æ— è®ºä¹‹å‰æ˜¯å¦æ•…éšœï¼Œé‡å¯åŽéƒ½æ¢å¤æ­£å¸¸
            this.game.state.cameraFailed = false;
            this.game.state.cameraRestarting = false;
            this.game.state.controlPanelBusy = false; // è§£é”æŽ§åˆ¶é¢æ¿
            
            // Stop static noise (å¦‚æžœæœ‰çš„è¯)
            this.game.assets.stopSound('static');
            
            // Reset sound button count (æ¢å¤5æ¬¡ä½¿ç”¨æ¬¡æ•°)
            this.resetSoundButtonCount();
            
            console.log('Camera system restored!');
            
            // If camera is open, immediately restore display
            if (this.game.state.cameraOpen) {
                console.log('Camera is open, restoring view...');
                this.restoreCameraView();
            }
        }, 4000);
    }

    close() {
        this.game.state.cameraOpen = false;
        this.cameraPanel.classList.add('closing');
        this.cameraPanel.classList.remove('show');
        
        // Stop looping static sound
        this.game.assets.stopSound('staticLoop');
        
        // Clear character display
        const characterOverlay = document.getElementById('character-overlay');
        if (characterOverlay) {
            characterOverlay.innerHTML = '';
            console.log('Character overlay cleared');
        }
        
        // æ›´æ–°éœé‡‘è­¦å‘Šä½ç½®ï¼ˆä»Žåœ°å›¾ç§»åˆ°é£Žæ‰‡å·¦è¾¹ï¼‰
        if (this.game.enemyAI && this.game.enemyAI.hawking.active) {
            this.game.enemyAI.updateHawkingWarningDisplay();
        }
        
        setTimeout(() => {
            this.cameraPanel.classList.add('hidden');
            this.cameraPanel.classList.remove('closing');
        }, 400);
        
        this.game.assets.playSound('crank2');
    }

    switchCamera(camNum) {
        // If camera failed, cannot switch
        if (this.game.state.cameraFailed) {
            console.log('Camera system is offline! Cannot switch cameras.');
            return;
        }
        
        // Add transition state, hide background image
        this.cameraPanel.classList.add('transitioning');
        
        // Hide map
        const cameraGrid = document.getElementById('camera-grid');
        if (cameraGrid) {
            cameraGrid.style.display = 'none';
        }
        
        // éšè—è§’è‰²
        const characterOverlay = document.getElementById('character-overlay');
        if (characterOverlay) {
            characterOverlay.style.display = 'none';
        }
        
        // æš‚æ—¶é™ä½Žå¾ªçŽ¯é™æ€éŸ³çš„éŸ³é‡
        this.game.assets.setSoundVolume('staticLoop', 0.1);
        
        // æ’­æ”¾æ­£å¸¸éŸ³é‡çš„é™æ€éŸ³æ•ˆ
        this.game.assets.playSound('static', false, 1.0);
        
        // 1000ms åŽåœæ­¢é™æ€éŸ³æ•ˆ
        setTimeout(() => {
            this.game.assets.stopSound('static');
        }, 1000);
        
        // Show static effect
        this.startStatic();
        
        // Switch camera after 500ms
        setTimeout(() => {
            // If camera already failed, stop switch animation, show failure effect
            if (this.game.state.cameraFailed) {
                console.log('Camera failed during switch, showing failure effect');
                this.showCameraFailure();
                return;
            }
            
            this.game.state.currentCam = `cam${camNum}`;
            this.updateView();
            this.createCameraGrid();
            
            // After another 500ms fade out static, restore background
            setTimeout(() => {
                // Check again if failed
                if (this.game.state.cameraFailed) {
                    console.log('Camera failed during switch, showing failure effect');
                    this.showCameraFailure();
                    return;
                }
                
                this.stopStatic();
                this.cameraPanel.classList.remove('transitioning');
                
                // æ˜¾ç¤ºåœ°å›¾
                if (cameraGrid) {
                    cameraGrid.style.display = 'block';
                }
                
                // æ˜¾ç¤ºè§’è‰²
                if (characterOverlay) {
                    characterOverlay.style.display = 'block';
                }
                
                // æ›´æ–°ç”µå‡»æŒ‰é’®æ˜¾ç¤ºï¼ˆæ ¹æ®å½“å‰æ‘„åƒå¤´ï¼‰
                this.updateShockButtonVisibility();
                
                // æ¢å¤å¾ªçŽ¯é™æ€éŸ³çš„éŸ³é‡
                this.game.assets.setSoundVolume('staticLoop', 0.3);
            }, 500);
        }, 500);
    }

    updateView() {
        // If camera failed, don't update view
        if (this.game.state.cameraFailed) {
            return;
        }
        
        // Update camera panel background image
        if (this.game.assets.images[this.game.state.currentCam]) {
            this.cameraPanel.style.backgroundImage = `url('${this.game.assets.images[this.game.state.currentCam].src}')`;
        }
        
        // æ›´æ–°æ‘„åƒå¤´æ ‡ç­¾
        const camNum = this.game.state.currentCam.replace('cam', '');
        this.currentCamLabel.textContent = `CAM ${camNum}`;
        
        // æ›´æ–°è§’è‰²æ˜¾ç¤º
        this.updateCharacterDisplay();
        
        // æ›´æ–°ç”µå‡»æŒ‰é’®æ˜¾ç¤º
        this.updateShockButtonVisibility();
    }
    
    // æ›´æ–°è§’è‰²æ˜¾ç¤ºï¼ˆæ”¯æŒå¤šä¸ªæ•Œäººï¼‰
    updateCharacterDisplay() {
        const currentCam = this.game.state.currentCam;
        const epLocation = this.game.enemyAI.getCurrentLocation();
        const trumpLocation = this.game.enemyAI.getTrumpCurrentLocation();
        const hawkingActive = this.game.enemyAI.hawking.active;
        
        console.log(`updateCharacterDisplay - Current Cam: ${currentCam}, EP: ${epLocation}, Trump: ${trumpLocation}, Hawking: ${hawkingActive}, Night: ${this.game.state.currentNight}`);
        
        // æ‰“å°æ‰€æœ‰ç›¸å…³å…ƒç´ çš„z-index
        console.log('ðŸ” Z-Index Debug:');
        console.log('  - cameraPanel:', window.getComputedStyle(this.cameraPanel).zIndex);
        const staticVideo = document.getElementById('camera-static-video');
        if (staticVideo) {
            console.log('  - staticVideo:', window.getComputedStyle(staticVideo).zIndex);
        }
        const existingOverlay = document.getElementById('character-overlay');
        if (existingOverlay) {
            console.log('  - characterOverlay:', window.getComputedStyle(existingOverlay).zIndex);
            console.log('  - characterOverlay display:', window.getComputedStyle(existingOverlay).display);
            console.log('  - characterOverlay children count:', existingOverlay.children.length);
        }
        
        // èŽ·å–æˆ–åˆ›å»ºè§’è‰²å®¹å™¨
        let characterOverlay = document.getElementById('character-overlay');
        if (!characterOverlay) {
            characterOverlay = document.createElement('div');
            characterOverlay.id = 'character-overlay';
            characterOverlay.style.position = 'absolute';
            characterOverlay.style.top = '0';
            characterOverlay.style.left = '0';
            characterOverlay.style.width = '100%';
            characterOverlay.style.height = '100%';
            characterOverlay.style.pointerEvents = 'none';
            characterOverlay.style.zIndex = '5';
            characterOverlay.style.overflow = 'hidden';
            this.cameraPanel.appendChild(characterOverlay);
        }
        
        // æ¸…ç©ºä¹‹å‰çš„è§’è‰²
        characterOverlay.innerHTML = '';
        
        console.log('ðŸ” Character overlay cleared, checking EP display conditions...');
        console.log('ðŸ” EP hasSpawned:', this.game.enemyAI.epstein.hasSpawned);
        console.log('ðŸ” EP location matches current cam:', epLocation === currentCam);
        console.log('ðŸ” Has characterImages:', !!this.characterImages);
        console.log('ðŸ” Has image for current cam:', this.characterImages ? !!this.characterImages[currentCam] : 'N/A');
        
        // æ˜¾ç¤ºéœé‡‘ï¼ˆå¦‚æžœæ¿€æ´»ä¸”åœ¨cam6ï¼‰
        if (hawkingActive && currentCam === 'cam6') {
            const hawkingImg = document.createElement('img');
            hawkingImg.src = '/FNAE-HTML5-1.2.2-fix/assets/images/mrstephen.png';
            hawkingImg.style.position = 'absolute';
            hawkingImg.className = 'visible hawking-character';
            hawkingImg.style.zIndex = '3'; // Hawking åœ¨æœ€ä¸Šå±‚
            hawkingImg.style.left = '59.6%';
            hawkingImg.style.bottom = '0.9%';
            hawkingImg.style.width = '37%';
            hawkingImg.style.transform = 'translateX(-50%) rotate(-5deg)';
            hawkingImg.style.filter = 'brightness(0.33) contrast(1) saturate(1)';
            
            characterOverlay.appendChild(hawkingImg);
            console.log(`âœ“ Displaying Hawking at cam6`);
        }
        
        // æ˜¾ç¤º EPï¼ˆå¦‚æžœå·²å‡ºåœºä¸”åœ¨å½“å‰æ‘„åƒå¤´ï¼‰
        // console.log('ðŸ” EP Display Check:', {
        //     hasSpawned: this.game.enemyAI.epstein.hasSpawned,
        //     epLocation: epLocation,
        //     currentCam: currentCam,
        //     match: epLocation === currentCam,
        //     hasImage: !!this.characterImages,
        //     imageForCam: this.characterImages ? !!this.characterImages[currentCam] : 'N/A'
        // });
        
        if (this.game.enemyAI.epstein.hasSpawned && epLocation === currentCam && this.characterImages && this.characterImages[currentCam]) {
            // åˆ›å»ºEPå®¹å™¨ï¼ˆç”¨äºŽåŒ…å«EPå›¾ç‰‡å’Œç”µçœ¼ï¼‰
            const epContainer = document.createElement('div');
            epContainer.className = 'ep-container';
            epContainer.style.position = 'absolute';
            epContainer.style.zIndex = '1';
            
            const pos = this.characterPositions[currentCam];
            if (pos) {
                if (pos.left) {
                    epContainer.style.left = pos.left;
                    epContainer.style.right = 'auto';
                } else if (pos.right) {
                    epContainer.style.right = pos.right;
                    epContainer.style.left = 'auto';
                }
                
                epContainer.style.bottom = pos.bottom;
                epContainer.style.width = pos.width;
                epContainer.style.transform = pos.transform || 'none';
            }
            
            // EPå›¾ç‰‡
            const epImg = document.createElement('img');
            epImg.src = this.characterImages[currentCam];
            epImg.style.position = 'relative';
            epImg.style.width = '100%';
            epImg.style.height = 'auto';
            epImg.style.display = 'block';
            epImg.className = 'visible ep-character';
            
            // åº”ç”¨æ˜Žæš—åº¦
            const brightness = this.characterBrightness[currentCam] || 100;
            epImg.style.filter = `brightness(${brightness}%)`;
            
            epContainer.appendChild(epImg);
            characterOverlay.appendChild(epContainer);
            console.log(`âœ“ Displaying EP at ${currentCam}`);
            
            // Night 6: æ¸²æŸ“ç”µçœ¼ç‰¹æ•ˆï¼ˆä½œä¸ºEPå®¹å™¨çš„å­å…ƒç´ ï¼‰
            if (this.game.state.currentNight === 6) {
                this.renderLightningEyes(epContainer, currentCam);
            }
        }
        
        // æ˜¾ç¤º Trumpï¼ˆå¦‚æžœå·²å‡ºåœºä¸”åœ¨å½“å‰æ‘„åƒå¤´ï¼Œä¸”ä¸åœ¨çˆ¬è¡ŒçŠ¶æ€ï¼Œä¸”å½“å‰å¤œæ™šæœ‰Trumpé…ç½®ï¼‰
        if (this.game.enemyAI.trump.hasSpawned && !this.game.enemyAI.trump.isCrawling && trumpLocation === currentCam && this.game.enemyAI.currentTrumpConfig) {
            const trumpImages = this.game.enemyAI.trumpImages;
            const trumpPositions = this.game.enemyAI.trumpPositions;
            const trumpBrightness = this.game.enemyAI.trumpBrightness;
            
            if (trumpImages[currentCam]) {
                const trumpImg = document.createElement('img');
                trumpImg.src = trumpImages[currentCam];
                trumpImg.style.position = 'absolute';
                trumpImg.className = 'visible trump-character';
                trumpImg.style.zIndex = '2'; // Trump åœ¨ä¸Šå±‚
                
                const pos = trumpPositions[currentCam];
                if (pos) {
                    if (pos.left) {
                        trumpImg.style.left = pos.left;
                        trumpImg.style.right = 'auto';
                    } else if (pos.right) {
                        trumpImg.style.right = pos.right;
                        trumpImg.style.left = 'auto';
                    }
                    
                    trumpImg.style.bottom = pos.bottom;
                    trumpImg.style.width = pos.width;
                    trumpImg.style.transform = pos.transform || 'none';
                }
                
                const brightness = trumpBrightness[currentCam] || 100;
                trumpImg.style.filter = `brightness(${brightness}%)`;
                
                characterOverlay.appendChild(trumpImg);
                console.log(`âœ“ Displaying Trump at ${currentCam}`);
            }
        }
        
        if (characterOverlay.children.length === 0) {
            console.log(`âœ— No characters at current camera (viewing ${currentCam})`);
        }
    }

    createCameraGrid() {
        const grid = document.getElementById('camera-grid');
        grid.innerHTML = '';
        
        // åˆ›å»ºåœ°å›¾å®¹å™¨
        const mapContainer = document.createElement('div');
        mapContainer.style.position = 'relative';
        mapContainer.style.width = '100%';
        mapContainer.style.height = '100%';
        
        // æ·»åŠ åœ°å›¾å›¾ç‰‡
        const mapImg = document.createElement('img');
        mapImg.src = '/FNAE-HTML5-1.2.2-fix/assets/images/FNAE-Map-layout.png';
        mapImg.style.width = '100%';
        mapImg.style.height = 'auto';
        mapImg.style.display = 'block';
        mapContainer.appendChild(mapImg);
        
        // æ·»åŠ  YOU æ ‡è®°ï¼ˆçŽ©å®¶ä½ç½®ï¼‰
        const youMarker = document.createElement('div');
        youMarker.style.position = 'absolute';
        youMarker.style.left = '7.0%';
        youMarker.style.top = '82.6%';
        youMarker.style.width = '13.0%';
        youMarker.style.height = '8.0%';
        youMarker.style.display = 'flex';
        youMarker.style.alignItems = 'center';
        youMarker.style.justifyContent = 'center';
        youMarker.style.fontSize = '0.7vw';
        youMarker.style.fontWeight = 'bold';
        youMarker.style.color = '#fff';
        youMarker.style.textShadow = '1px 1px 2px #000';
        youMarker.style.fontFamily = 'Arial, sans-serif';
        youMarker.style.background = 'rgba(0, 0, 0, 0.5)';
        youMarker.style.borderRadius = '4px';
        youMarker.textContent = 'YOU';
        mapContainer.appendChild(youMarker);
        
        // å®šä¹‰æ¯ä¸ªæ‘„åƒå¤´åœ¨åœ°å›¾ä¸Šçš„ä½ç½®ï¼ˆç™¾åˆ†æ¯”ï¼‰
        const cameraPositions = [
            { cam: 1, x: 25.7, y: 84.3, width: 13.0, height: 8.0 },
            { cam: 2, x: 35.0, y: 56.6, width: 13.0, height: 8.0 },
            { cam: 3, x: 51.5, y: 77.6, width: 13.0, height: 8.0 },
            { cam: 4, x: 57.7, y: 44.9, width: 12.9, height: 8.0 },
            { cam: 5, x: 75.4, y: 60.3, width: 12.9, height: 8.0 },
            { cam: 6, x: 77.2, y: 82.2, width: 13.0, height: 8.0 },
            { cam: 7, x: 52.0, y: 27.9, width: 12.9, height: 8.0 },
            { cam: 8, x: 80.2, y: 21.9, width: 12.8, height: 8.0 },
            { cam: 9, x: 24.4, y: 20.6, width: 12.9, height: 8.0 },
            { cam: 10, x: 7.9, y: 39.1, width: 12.8, height: 8.0 },
            { cam: 11, x: 72.9, y: 4.6, width: 13.0, height: 8.0 },
        ];
        
        // ä¸ºæ¯ä¸ªæ‘„åƒå¤´åˆ›å»ºå¯ç‚¹å‡»çƒ­åŒº
        cameraPositions.forEach(pos => {
            const hotspot = document.createElement('div');
            hotspot.className = 'camera-hotspot';
            hotspot.style.position = 'absolute';
            hotspot.style.left = pos.x + '%';
            hotspot.style.top = pos.y + '%';
            hotspot.style.width = pos.width + '%';
            hotspot.style.height = pos.height + '%';
            hotspot.style.cursor = 'pointer';
            hotspot.style.transition = 'all 0.2s';
            hotspot.style.display = 'flex';
            hotspot.style.alignItems = 'center';
            hotspot.style.justifyContent = 'center';
            hotspot.style.fontSize = '0.7vw';
            hotspot.style.fontWeight = 'bold';
            hotspot.style.color = '#fff';
            hotspot.style.textShadow = '1px 1px 2px #000';
            hotspot.style.fontFamily = 'Arial, sans-serif';
            hotspot.style.whiteSpace = 'nowrap';
            hotspot.style.borderRadius = '4px';
            hotspot.style.letterSpacing = '0.5px';
            
            // æ·»åŠ CAMæ–‡æœ¬
            hotspot.textContent = `CAM ${pos.cam}`;
            
            // å½“å‰é€‰ä¸­çš„æ‘„åƒå¤´ç»¿è‰²é—ªçƒ
            if (this.game.state.currentCam === `cam${pos.cam}`) {
                hotspot.classList.add('camera-selected');
                hotspot.style.border = 'none';
            } else {
                hotspot.style.border = 'none';
                hotspot.style.background = 'transparent';
            }
            
            // æ‚¬æµ®æ•ˆæžœ
            hotspot.addEventListener('mouseenter', () => {
                if (this.game.state.currentCam !== `cam${pos.cam}`) {
                    hotspot.style.background = 'rgba(255, 255, 255, 0.2)';
                }
            });
            
            hotspot.addEventListener('mouseleave', () => {
                if (this.game.state.currentCam !== `cam${pos.cam}`) {
                    hotspot.style.background = 'transparent';
                }
            });
            
            // ç‚¹å‡»åˆ‡æ¢æ‘„åƒå¤´
            hotspot.addEventListener('click', () => this.switchCamera(pos.cam));
            
            mapContainer.appendChild(hotspot);
        });
        
        grid.appendChild(mapContainer);
    }

    playAmbientSound() {
        // å¦‚æžœåœ¨å†·å´ä¸­ï¼Œä¸èƒ½ä½¿ç”¨
        if (this.soundButtonCooldown) {
            console.log('Sound button on cooldown');
            return;
        }
        
        const currentCam = this.game.state.currentCam;
        
        // æ£€æŸ¥EPæ˜¯å¦ç§»åŠ¨äº†ï¼Œå¦‚æžœç§»åŠ¨äº†åˆ™é‡ç½®æ‰€æœ‰ä½ç½®çš„è®¡æ•°
        const currentEpLocation = this.game.enemyAI.getCurrentLocation();
        if (this.lastEpLocation !== currentEpLocation) {
            console.log(`EP moved from ${this.lastEpLocation} to ${currentEpLocation}, resetting all location counts`);
            this.locationAttractCount = {}; // é‡ç½®æ‰€æœ‰ä½ç½®è®¡æ•°
            this.lastEpLocation = currentEpLocation;
        }
        
        // äº¤æ›¿æ’­æ”¾ 1.ogg å’Œ 2.ogg
        const soundFile = this.currentSoundToggle ? '2.ogg' : '1.ogg';
        this.currentSoundToggle = !this.currentSoundToggle;
        
        // åˆ›å»ºå¹¶æ’­æ”¾éŸ³é¢‘
        const audio = new Audio(`assets/sounds/${soundFile}`);
        audio.play().catch(e => console.log('éŸ³é¢‘æ’­æ”¾å¤±è´¥:', e));
        
        // æ£€æŸ¥å½“å‰ä½ç½®æ˜¯å¦å·²ç»ç”¨å®Œ2æ¬¡
        let canAttract = true;
        if (this.locationAttractCount[currentCam] >= this.maxLocationAttractCount) {
            console.log(`Location ${currentCam} already used ${this.maxLocationAttractCount} times - wasting player's attempt`);
            canAttract = false;
        }
        
        // å°è¯•å¸å¼•EPåˆ°å½“å‰æ‘„åƒå¤´ä½ç½®ï¼ˆå¦‚æžœä½ç½®å¯ç”¨ï¼‰
        let attracted = false;
        if (canAttract) {
            attracted = this.game.enemyAI.attractToSound(currentCam);
            
            if (attracted) {
                // å¸å¼•æˆåŠŸï¼Œæ’­æ”¾è¿‡åœºåŠ¨ç”»
                this.playAttractionTransition();
                
                // å¢žåŠ è¯¥ä½ç½®çš„è®¡æ•°
                this.locationAttractCount[currentCam] = (this.locationAttractCount[currentCam] || 0) + 1;
                console.log(`Epstein attracted to ${currentCam}! Count: ${this.locationAttractCount[currentCam]}/${this.maxLocationAttractCount}`);
                
                // æ›´æ–°EPä½ç½®è®°å½•
                this.lastEpLocation = currentCam;
            } else {
                // å¸å¼•å¤±è´¥ï¼ˆä¸é‚»è¿‘æˆ–å…¶ä»–åŽŸå› ï¼‰ï¼Œä¸ç»™ç”¨æˆ·æç¤º
                console.log('Attraction failed');
            }
        } else {
            // ä½ç½®å·²ç”¨å®Œ2æ¬¡ï¼Œæµªè´¹çŽ©å®¶çš„å°è¯•
            console.log('Location maxed out - player wasted an attempt');
        }
        
        // å¢žåŠ ä½¿ç”¨æ¬¡æ•°ï¼ˆæ— è®ºæ˜¯å¦æˆåŠŸï¼‰
        this.soundButtonUseCount++;
        console.log(`Sound button used: ${this.soundButtonUseCount}/${this.maxSoundUses}`);
        
        // æ£€æŸ¥æ˜¯å¦è¾¾åˆ°æœ€å¤§ä½¿ç”¨æ¬¡æ•°
        if (this.soundButtonUseCount >= this.maxSoundUses) {
            console.log('Sound button overused! Camera failure!');
            this.soundButtonUseCount = 0; // é‡ç½®è®¡æ•°
            
            // å¦‚æžœæ­£åœ¨æ’­æ”¾å¸å¼•åŠ¨ç”»ï¼Œç«‹å³åœæ­¢
            if (this.cameraPanel.classList.contains('transitioning')) {
                this.stopStatic();
                this.cameraPanel.classList.remove('transitioning');
            }
            
            // è§¦å‘æ‘„åƒå¤´æ•…éšœ
            this.game.enemyAI.triggerCameraFailure();
        }
        
        // å¼€å§‹å†·å´
        this.soundButtonCooldown = true;
        this.playSoundBtn.style.opacity = '0.5';
        this.playSoundBtn.style.cursor = 'not-allowed';
        
        // æ·»åŠ åŠ è½½åŠ¨ç”»
        this.startCooldownAnimation();
        
        // 8ç§’åŽè§£é™¤å†·å´
        setTimeout(() => {
            this.soundButtonCooldown = false;
            this.playSoundBtn.style.opacity = '1';
            this.playSoundBtn.style.cursor = 'pointer';
            this.stopCooldownAnimation();
        }, this.cooldownTime);
    }
    
    // å¼€å§‹å†·å´åŠ¨ç”»
    startCooldownAnimation() {
        let dotCount = 0;
        this.cooldownInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            const dots = '.'.repeat(dotCount);
            this.playSoundBtn.textContent = `PLAY SOUND${dots}`;
        }, 500);
    }
    
    // åœæ­¢å†·å´åŠ¨ç”»
    stopCooldownAnimation() {
        if (this.cooldownInterval) {
            clearInterval(this.cooldownInterval);
            this.cooldownInterval = null;
        }
        this.playSoundBtn.textContent = 'PLAY SOUND';
    }
    
    // å¸å¼•æˆåŠŸçš„è¿‡åœºåŠ¨ç”»
    playAttractionTransition() {
        console.log('Playing attraction transition...');
        
        // æ·»åŠ è¿‡åœºçŠ¶æ€ï¼Œéšè—èƒŒæ™¯å›¾ç‰‡å’Œåœ°å›¾
        this.cameraPanel.classList.add('transitioning');
        
        // éšè—åœ°å›¾
        const cameraGrid = document.getElementById('camera-grid');
        if (cameraGrid) {
            cameraGrid.style.display = 'none';
        }
        
        // éšè—è§’è‰²
        const characterOverlay = document.getElementById('character-overlay');
        if (characterOverlay) {
            characterOverlay.style.display = 'none';
        }
        
        // æš‚æ—¶é™ä½Žå¾ªçŽ¯é™æ€éŸ³çš„éŸ³é‡
        this.game.assets.setSoundVolume('staticLoop', 0.1);
        
        // æ’­æ”¾æ­£å¸¸éŸ³é‡çš„é™æ€éŸ³æ•ˆ
        this.game.assets.playSound('static', false, 1.0);
        
        // 1000ms åŽåœæ­¢é™æ€éŸ³æ•ˆ
        setTimeout(() => {
            this.game.assets.stopSound('static');
        }, 1000);
        
        // æ˜¾ç¤ºé›ªèŠ±æ•ˆæžœ
        this.startStatic();
        
        // 500ms åŽæ›´æ–°æ˜¾ç¤º
        setTimeout(() => {
            // å¦‚æžœæ‘„åƒå¤´å·²ç»æ•…éšœï¼Œåœæ­¢åŠ¨ç”»å¹¶æ˜¾ç¤ºæ•…éšœæ•ˆæžœ
            if (this.game.state.cameraFailed) {
                console.log('Camera failed during attraction transition, showing failure effect');
                this.showCameraFailure();
                return;
            }
            
            this.updateCharacterDisplay();
            
            // å†è¿‡ 500ms æ·¡å‡ºé›ªèŠ±ï¼Œæ¢å¤èƒŒæ™¯
            setTimeout(() => {
                // å¦‚æžœæ‘„åƒå¤´å·²ç»æ•…éšœï¼Œåœæ­¢åŠ¨ç”»å¹¶æ˜¾ç¤ºæ•…éšœæ•ˆæžœ
                if (this.game.state.cameraFailed) {
                    console.log('Camera failed during attraction transition, showing failure effect');
                    this.showCameraFailure();
                    return;
                }
                
                this.stopStatic();
                this.cameraPanel.classList.remove('transitioning');
                
                // æ˜¾ç¤ºåœ°å›¾
                if (cameraGrid) {
                    cameraGrid.style.display = 'block';
                }
                
                // æ˜¾ç¤ºè§’è‰²
                if (characterOverlay) {
                    characterOverlay.style.display = 'block';
                }
                
                // æ¢å¤å¾ªçŽ¯é™æ€éŸ³çš„éŸ³é‡
                this.game.assets.setSoundVolume('staticLoop', 0.3);
            }, 500);
        }, 500);
    }
    
    // é‡ç½®å£°éŸ³æŒ‰é’®è®¡æ•°ï¼ˆæ‘„åƒå¤´é‡å¯åŽè°ƒç”¨ï¼‰
    resetSoundButtonCount() {
        this.soundButtonUseCount = 0;
    }
    
    // EPç§»åŠ¨æ—¶çš„è¿‡åœºåŠ¨ç”»
    playMovementTransition() {
        console.log('Playing movement transition...');
        
        // å¦‚æžœæ‘„åƒå¤´å·²ç»æ•…éšœï¼Œä¸æ’­æ”¾åŠ¨ç”»
        if (this.game.state.cameraFailed) {
            console.log('Camera already failed, skipping movement transition');
            return;
        }
        
        // æ·»åŠ è¿‡åœºçŠ¶æ€
        this.cameraPanel.classList.add('transitioning');
        
        // éšè—åœ°å›¾
        const cameraGrid = document.getElementById('camera-grid');
        if (cameraGrid) {
            cameraGrid.style.display = 'none';
        }
        
        // éšè—è§’è‰²
        const characterOverlay = document.getElementById('character-overlay');
        if (characterOverlay) {
            characterOverlay.style.display = 'none';
        }
        
        // æš‚æ—¶é™ä½Žå¾ªçŽ¯é™æ€éŸ³çš„éŸ³é‡
        this.game.assets.setSoundVolume('staticLoop', 0.1);
        
        // æ’­æ”¾æ­£å¸¸éŸ³é‡çš„é™æ€éŸ³æ•ˆ
        this.game.assets.playSound('static', false, 1.0);
        
        // 1000ms åŽåœæ­¢é™æ€éŸ³æ•ˆ
        setTimeout(() => {
            this.game.assets.stopSound('static');
        }, 1000);
        
        // æ˜¾ç¤ºé›ªèŠ±æ•ˆæžœ
        this.startStatic();
        
        // 500ms åŽæ›´æ–°æ˜¾ç¤º
        setTimeout(() => {
            // å¦‚æžœæ‘„åƒå¤´å·²ç»æ•…éšœï¼Œåœæ­¢åŠ¨ç”»å¹¶æ˜¾ç¤ºæ•…éšœæ•ˆæžœ
            if (this.game.state.cameraFailed) {
                console.log('Camera failed during movement transition, showing failure effect');
                this.showCameraFailure();
                return;
            }
            
            this.updateCharacterDisplay();
            
            // å†è¿‡ 500ms æ·¡å‡ºé›ªèŠ±ï¼Œæ¢å¤èƒŒæ™¯
            setTimeout(() => {
                // å¦‚æžœæ‘„åƒå¤´å·²ç»æ•…éšœï¼Œåœæ­¢åŠ¨ç”»å¹¶æ˜¾ç¤ºæ•…éšœæ•ˆæžœ
                if (this.game.state.cameraFailed) {
                    console.log('Camera failed during movement transition, showing failure effect');
                    this.showCameraFailure();
                    return;
                }
                
                this.stopStatic();
                this.cameraPanel.classList.remove('transitioning');
                
                // æ˜¾ç¤ºåœ°å›¾
                if (cameraGrid) {
                    cameraGrid.style.display = 'block';
                }
                
                // æ˜¾ç¤ºè§’è‰²
                if (characterOverlay) {
                    characterOverlay.style.display = 'block';
                }
                
                // æ¢å¤å¾ªçŽ¯é™æ€éŸ³çš„éŸ³é‡
                this.game.assets.setSoundVolume('staticLoop', 0.3);
            }, 500);
        }, 500);
    }
    
    // ç”µå‡»éœé‡‘
    shockHawking() {
        // ç«‹å³æ’­æ”¾éŸ³æ•ˆ
        this.game.assets.playSound('hawking_shock', false, 1.0);
        
        // æ˜¾ç¤ºé›ªèŠ±è¿‡åœºåŠ¨ç”»
        this.cameraPanel.classList.add('transitioning');
        
        // æ’­æ”¾é›ªèŠ±è§†é¢‘
        if (this.staticVideo) {
            this.staticVideo.classList.add('active');
            this.staticVideo.currentTime = 0;
            this.staticVideo.play().catch(e => console.log('Video playback failed:', e));
        }
        
        // 1ç§’åŽæ‰§è¡Œç”µå‡»å¹¶æ¢å¤ç”»é¢
        setTimeout(() => {
            if (this.game.enemyAI && this.game.enemyAI.shockHawking()) {
                console.log('Hawking shocked successfully!');
            }
            
            // åœæ­¢é›ªèŠ±è§†é¢‘
            if (this.staticVideo) {
                this.staticVideo.classList.remove('active');
                this.staticVideo.pause();
            }
            
            // æ¢å¤æ‘„åƒå¤´ç”»é¢
            this.cameraPanel.classList.remove('transitioning');
            this.updateView();
        }, 1000);
    }
    
    // æ›´æ–°ç”µå‡»æŒ‰é’®æ˜¾ç¤ºï¼ˆNight 3-5 å’Œ Custom Night ä¸­ Hawking æ¿€æ´»æ—¶æ˜¾ç¤ºï¼‰
    updateShockButtonVisibility() {
        if (this.shockHawkingBtn) {
            const currentCam = this.game.state.currentCam;
            const night = this.game.state.currentNight;
            
            // Night 3-5 æ˜¾ç¤º
            const isNormalNight = night >= 3 && night <= 5;
            
            // Custom Night ä¸” Hawking AI > 0 æ—¶æ˜¾ç¤º
            const isCustomNightWithHawking = this.game.state.customNight && 
                                            night === 7 && 
                                            this.game.state.customAILevels.hawking > 0;
            
            if ((isNormalNight || isCustomNightWithHawking) && this.game.state.cameraOpen && currentCam === 'cam6') {
                this.shockHawkingBtn.style.display = 'block';
            } else {
                this.shockHawkingBtn.style.display = 'none';
            }
        }
    }
    
    // æ¸²æŸ“ç”µçœ¼ç‰¹æ•ˆï¼ˆNight 6ï¼‰- ä½œä¸ºEPå®¹å™¨çš„å­å…ƒç´ 
    renderLightningEyes(epContainer, currentCam) {
        const eyesConfig = this.game.enemyAI.lightningEyesConfig[currentCam];
        if (!eyesConfig) return;
        
        // åˆ›å»ºä¸¤åªçœ¼ç›ï¼ˆç›¸å¯¹äºŽEPå›¾ç‰‡å®šä½ï¼‰
        [eyesConfig.eye1, eyesConfig.eye2].forEach((eyeConfig, index) => {
            // çœ¼ç›å®¹å™¨
            const eyeContainer = document.createElement('div');
            eyeContainer.className = 'lightning-eye-container';
            eyeContainer.style.position = 'absolute';
            eyeContainer.style.left = eyeConfig.left;
            eyeContainer.style.top = eyeConfig.top;
            eyeContainer.style.width = eyeConfig.width;
            eyeContainer.style.height = eyeConfig.height;
            eyeContainer.style.transform = 'translate(-50%, -50%)';
            eyeContainer.style.transformOrigin = 'center center';
            eyeContainer.style.zIndex = '10';
            eyeContainer.style.pointerEvents = 'none';
            
            // æ ¸å¿ƒå‘å…‰ç‚¹
            const core = document.createElement('div');
            core.className = 'lightning-eye-core';
            core.style.position = 'absolute';
            core.style.top = '50%';
            core.style.left = '50%';
            core.style.width = '60%';
            core.style.height = '60%';
            core.style.transform = 'translate(-50%, -50%)';
            core.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 255, 255, 1) 40%, rgba(0, 200, 255, 0.6) 70%, transparent 100%)';
            core.style.borderRadius = '50%';
            core.style.filter = 'brightness(2)';
            core.style.animation = 'lightning-pulse 0.15s infinite';
            
            // å¤–å±‚å…‰æ™•
            const glow = document.createElement('div');
            glow.className = 'lightning-eye-glow';
            glow.style.position = 'absolute';
            glow.style.top = '50%';
            glow.style.left = '50%';
            glow.style.width = '100%';
            glow.style.height = '100%';
            glow.style.transform = 'translate(-50%, -50%)';
            glow.style.background = 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.8) 0%, rgba(0, 255, 255, 0.4) 30%, rgba(0, 200, 255, 0.2) 60%, transparent 100%)';
            glow.style.borderRadius = '50%';
            glow.style.boxShadow = `
                0 0 20px rgba(0, 255, 255, 1),
                0 0 40px rgba(0, 255, 255, 0.8),
                0 0 60px rgba(0, 255, 255, 0.6)
            `;
            glow.style.animation = 'lightning-flicker 0.1s infinite';
            
            // é›·ç”µæ•ˆæžœï¼ˆå¤šæ¡éšæœºé—ªç”µï¼‰
            for (let i = 0; i < 3; i++) {
                const lightning = document.createElement('div');
                lightning.className = 'lightning-bolt';
                lightning.style.position = 'absolute';
                lightning.style.top = '50%';
                lightning.style.left = '50%';
                lightning.style.width = '2px';
                lightning.style.height = `${30 + Math.random() * 40}%`;
                lightning.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(0, 255, 255, 0.8), transparent)';
                lightning.style.transformOrigin = 'top center';
                lightning.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
                lightning.style.boxShadow = '0 0 5px rgba(0, 255, 255, 1), 0 0 10px rgba(0, 255, 255, 0.8)';
                lightning.style.animation = `lightning-bolt ${0.1 + Math.random() * 0.1}s infinite`;
                lightning.style.animationDelay = `${Math.random() * 0.1}s`;
                lightning.style.opacity = '0.8';
                eyeContainer.appendChild(lightning);
            }
            
            eyeContainer.appendChild(glow);
            eyeContainer.appendChild(core);
            epContainer.appendChild(eyeContainer);
        });
        
        console.log(`âš¡ Rendered lightning eyes with electric effects at ${currentCam}`);
    }
}