// æ•ŒäººAIç³»ç»Ÿ - åŸºäºŽFNAFæœºåˆ¶
class EnemyAI {
    constructor(game) {
        this.game = game;
        
        // ==================== AIé…ç½®ç³»ç»Ÿ ====================
        // Epstein AIé…ç½®ï¼ˆæŒ‰å¤œæ•°ï¼‰
        this.epsteinConfig = {
            1: {
                aiLevel: 12,              // AIç­‰çº§ (0-20)ï¼Œ12/24 = 50%ç§»åŠ¨æ¦‚çŽ‡
                movementInterval: [9000, 10000],  // ç§»åŠ¨æ£€æŸ¥é—´éš”ï¼ˆæ¯«ç§’ï¼‰[æœ€å°å€¼, æœ€å¤§å€¼]
                movementDuration: 1000,   // ç§»åŠ¨åŠ¨ç”»æ—¶é•¿ï¼ˆæ¯«ç§’ï¼‰
                spawnDelay: 120000,        // å‡ºåœºå»¶è¿Ÿï¼ˆæ¯«ç§’ï¼‰
                movementProbability: {    // ç§»åŠ¨æ–¹å‘æ¦‚çŽ‡
                    forward: 0.8,         // å‰è¿›æ¦‚çŽ‡ 100%
                    lateral: 0.1,         // å¹³ç§»æ¦‚çŽ‡ 0%ï¼ˆå½“å‰ä¸æ”¯æŒï¼‰
                    backward: 0.1         // åŽé€€æ¦‚çŽ‡ 0%
                },
                soundLureResistance: 0  // å¯¹soundå¸å¼•çš„æŠµæŠ—æ¦‚çŽ‡ï¼ˆ0-1ï¼‰
            },
            2: {
                aiLevel: 12,
                movementInterval: [9000, 10000],
                movementDuration: 1000,
                spawnDelay: 0,
                movementProbability: {
                    forward: 0.8,
                    lateral: 0.1,
                    backward: 0.1
                },
                soundLureResistance: 0.1
            },
            3: {
                aiLevel: 12,
                movementInterval: [9000, 10000],
                movementDuration: 1000,
                spawnDelay: 0,
                movementProbability: {
                    forward: 0.8,
                    lateral: 0.2,
                    backward: 0
                },
                soundLureResistance: 0.1  // Night 3å¼€å§‹ï¼š15%æ¦‚çŽ‡æŠµæŠ—soundå¸å¼•
            },
            4: {
                aiLevel: 12,
                movementInterval: [9000, 10000],    // Night 4ï¼š9-10ç§’é—´éš”
                movementDuration: 1000,
                spawnDelay: 0,
                movementProbability: {
                    forward: 0.9,
                    lateral: 0.1,
                    backward: 0
                },
                soundLureResistance: 0.15
            },
            5: {
                aiLevel: 12,
                movementInterval: [9000, 10000],    // Night 5ï¼š9-10ç§’é—´éš”
                movementDuration: 1000,
                spawnDelay: 0,
                movementProbability: {
                    forward: 0.9,
                    lateral: 0.1,
                    backward: 0.0
                },
                soundLureResistance: 0.15
            },
            6: {
                aiLevel: 12,
                movementInterval: [7500, 8500],  // 7.5-8.5ç§’é—´éš”
                movementDuration: 1000,
                spawnDelay: 0,  // Night 6ç«‹å³å‡ºåœº
                movementProbability: {
                    forward: 0.85,  // 85%å‰è¿›
                    lateral: 0.15,  // 15%å¹³ç§»
                    backward: 0.0  // ä¸åŽé€€
                },
                soundLureResistance: 0.15
            }
        };
        
        // Trump AIé…ç½®ï¼ˆæŒ‰å¤œæ•°ï¼ŒNight 2å¼€å§‹ï¼‰
        this.trumpConfig = {
            2: {
                aiLevel: 10,              // AIç­‰çº§ï¼Œ10/24 = 42%ç§»åŠ¨æ¦‚çŽ‡
                movementInterval: [8000, 9000],  // 8-9ç§’éšæœºï¼ˆæ¯”EPå¿«ä¸€ç‚¹ï¼‰
                movementDuration: 1000,   // ç§»åŠ¨åŠ¨ç”»æ—¶é•¿ï¼ˆæ¯«ç§’ï¼‰
                spawnDelay: 0,            // å‡ºåœºå»¶è¿Ÿï¼ˆæ¯«ç§’ï¼‰ï¼Œå¼€å±€å°±å‡ºåœº
                movementProbability: {    // ç§»åŠ¨æ–¹å‘æ¦‚çŽ‡
                    forward: 0.9,         // 90% å‰è¿›ï¼ˆæ›´æ¿€è¿›ï¼‰
                    lateral: 0.1,         // 10% å¹³ç§»
                    backward: 0.0         // 0% åŽé€€
                },
                ventCrawling: {           // é€šé£Žç®¡çˆ¬è¡Œé…ç½®
                    cam1Probability: 1.0, // åœ¨cam1æ—¶çˆ¬è¡Œæ¦‚çŽ‡ 100%
                    cam2Probability: 0.5, // åœ¨cam2æ—¶çˆ¬è¡Œæ¦‚çŽ‡ 50%
                    soundDelay: 5000,     // å¼€å§‹çˆ¬è¡ŒåŽå¤šä¹…æ’­æ”¾éŸ³æ•ˆï¼ˆæ¯«ç§’ï¼‰
                    soundDuration: 10000, // çˆ¬è¡ŒéŸ³æ•ˆæŒç»­æ—¶é•¿ï¼ˆæ¯«ç§’ï¼‰
                    totalDuration: 20000, // çˆ¬è¡Œæ€»æ—¶é•¿ï¼ˆæ¯«ç§’ï¼‰
                    retreatDelay: 2000,   // è¢«é˜»æ­¢åŽå¤šä¹…æ’­æ”¾æ’¤é€€éŸ³æ•ˆï¼ˆæ¯«ç§’ï¼‰
                    retreatSoundDuration: 3000 // æ’¤é€€éŸ³æ•ˆæŒç»­æ—¶é•¿ï¼ˆæ¯«ç§’ï¼‰
                }
            },
            3: {
                aiLevel: 11,              // é™ä½Žåˆ°46%ç§»åŠ¨æ¦‚çŽ‡ï¼ˆä»Ž55%ï¼‰
                movementInterval: [9000, 10000],  // æ”¹ä¸º9-10ç§’ï¼ˆä»Ž8-9ç§’ï¼‰
                movementDuration: 1000,
                spawnDelay: 0,
                movementProbability: {
                    forward: 0.75,        // é™ä½Žåˆ°75%å‰è¿›ï¼ˆä»Ž80%ï¼‰
                    lateral: 0.25,        // å¢žåŠ åˆ°25%å¹³ç§»
                    backward: 0.0
                },
                ventCrawling: {
                    cam1Probability: 1.0,
                    cam2Probability: 0.4, // é™ä½Žåˆ°40%ï¼ˆä»Ž50%ï¼‰
                    soundDelay: 5000,
                    soundDuration: 10000,
                    totalDuration: 20000,
                    retreatDelay: 2000,
                    retreatSoundDuration: 3000
                }
            },
            4: {
                aiLevel: 13,
                movementInterval: [8000, 9000],    // 8-9ç§’éšæœºï¼ˆæ¯”EPå¿«ï¼‰
                movementDuration: 1000,
                spawnDelay: 0,
                movementProbability: {
                    forward: 0.8,         // 80% å‰è¿›
                    lateral: 0.2,         // 20% å¹³ç§»
                    backward: 0.0
                },
                ventCrawling: {
                    cam1Probability: 1.0,
                    cam2Probability: 0.5,
                    soundDelay: 5000,
                    soundDuration: 10000,
                    totalDuration: 20000,
                    retreatDelay: 2000,
                    retreatSoundDuration: 3000
                }
            },
            5: {
                aiLevel: 13,
                movementInterval: [8000, 9000],    // 8-9ç§’éšæœºï¼ˆæ¯”EPå¿«ï¼‰
                movementDuration: 1000,
                spawnDelay: 0,
                movementProbability: {
                    forward: 0.8,         // 80% å‰è¿›
                    lateral: 0.2,         // 20% å¹³ç§»
                    backward: 0.0
                },
                ventCrawling: {
                    cam1Probability: 1.0,
                    cam2Probability: 0.5,
                    soundDelay: 5000,
                    soundDuration: 10000,
                    totalDuration: 20000,
                    retreatDelay: 2000,
                    retreatSoundDuration: 3000
                }
            }
        };
        
        // å½“å‰é…ç½®ï¼ˆè¿è¡Œæ—¶ä½¿ç”¨ï¼‰
        this.currentEpsteinConfig = null;
        this.currentTrumpConfig = null;
        
        // çˆ±æ³¼æ–¯å¦çš„çŠ¶æ€
        this.epstein = {
            currentLocation: 'cam11', // èµ·å§‹ä½ç½®ï¼ˆæœ€è¿œï¼‰
            aiLevel: 0, // AIç­‰çº§ (0-20, åˆ†æ¯24)
            movementTimer: null,
            movementInterval: 12000, // ç§»åŠ¨æ£€æŸ¥é—´éš”
            hasMovedOnce: false, // æ˜¯å¦å·²ç»ç§»åŠ¨è¿‡ä¸€æ¬¡
            hasSpawned: false, // æ˜¯å¦å·²ç»å‡ºåœº
        };
        
        // ç‰¹æœ—æ™®çš„çŠ¶æ€
        this.trump = {
            currentLocation: 'cam10', // èµ·å§‹ä½ç½®
            aiLevel: 0, // AIç­‰çº§ (0-20)
            movementTimer: null,
            movementInterval: 10000, // ç§»åŠ¨æ£€æŸ¥é—´éš”
            hasSpawned: false, // æ˜¯å¦å·²ç»å‡ºåœº
            isCrawling: false, // æ˜¯å¦æ­£åœ¨çˆ¬è¡Œ
            crawlingTimer: null, // çˆ¬è¡Œè®¡æ—¶å™¨
            crawlingFrom: null, // ä»Žå“ªä¸ªæ‘„åƒå¤´å¼€å§‹çˆ¬è¡Œï¼ˆcam1æˆ–cam2ï¼‰
            retreatTimer: null, // æ’¤é€€è®¡æ—¶å™¨
        };
        
        // éœé‡‘çš„çŠ¶æ€ï¼ˆç¬¬3å…³å¼€å§‹ï¼‰
        this.hawking = {
            active: false, // æ˜¯å¦æ¿€æ´»
            location: 'cam6', // å›ºå®šåœ¨cam6
            timer: null, // è®¡æ—¶å™¨
            warningLevel: 0, // 0=æ— è­¦å‘Š, 1=é»„è‰²è­¦å‘Š, 2=çº¢è‰²è­¦å‘Š
            warningTimer: null, // è­¦å‘Šè®¡æ—¶å™¨
            attackTimer: null, // æ”»å‡»è®¡æ—¶å™¨
        };
        
        // æ¯ä¸ªæ‘„åƒå¤´ä½¿ç”¨çš„è§’è‰²å›¾ç‰‡ï¼ˆæ ¹æ®è·ç¦»åŠžå…¬å®¤è¿œè¿‘ï¼‰
        this.characterImages = {
            'cam11': 'assets/images/enemyep1.png',
            'cam10': 'assets/images/ep1.png',
            'cam1': 'assets/images/ep4.png',
            'cam9': 'assets/images/enemyep1.png',
            'cam8': 'assets/images/enemyep1.png',
            'cam7': 'assets/images/enemyep1.png',
            'cam6': 'assets/images/enemyep1.png',
            'cam5': 'assets/images/enemyep4.png',
            'cam4': 'assets/images/ep1.png',
            'cam3': 'assets/images/ep4.png',
            'cam2': 'assets/images/enemyep1.png',
        };
        
        // Night 6 ä¸“ç”¨å›¾ç‰‡ï¼ˆå¸¦ç”µçœ¼ï¼‰
        this.characterImagesNight6 = {
            'cam11': 'assets/images/enemyep1_night6.png',
            'cam10': 'assets/images/ep1_night6.png',
            'cam1': 'assets/images/ep4_night6.png',
            'cam9': 'assets/images/enemyep1_night6.png',
            'cam8': 'assets/images/enemyep1_night6.png',
            'cam7': 'assets/images/enemyep1_night6.png',
            'cam6': 'assets/images/enemyep1_night6.png',
            'cam5': 'assets/images/enemyep4_night6.png',
            'cam4': 'assets/images/ep1_night6.png',
            'cam3': 'assets/images/ep4_night6.png',
            'cam2': 'assets/images/enemyep1_night6.png',
        };
        
        // ç‰¹æœ—æ™®çš„å›¾ç‰‡é…ç½®ï¼ˆä½¿ç”¨ç»å¯¹è·¯å¾„ï¼‰
        this.trumpImages = {
            'cam10': 'assets/images/trump3.png',
            'cam11': 'assets/images/trump3.png',
            'cam9': 'assets/images/trump.png',
            'cam8': 'assets/images/trump5.png',
            'cam7': 'assets/images/trump3.png',
            'cam6': 'assets/images/trump3.png',
            'cam5': 'assets/images/trump2.png',
            'cam1': 'assets/images/trump4.png',
            'cam2': 'assets/images/trump4.png',
            'cam3': 'assets/images/trump2.png',
            'cam4': 'assets/images/trump3.png',
        };
        
        // å®šä¹‰ç§»åŠ¨è·¯å¾„å›¾ï¼ˆæ ¹æ®åœ°å›¾è¿žæŽ¥å…³ç³»ï¼Œåªèƒ½å‘å‰ç§»åŠ¨ï¼‰
        // æ¯ä¸ªä½ç½®çš„æ­¥é•¿ï¼ˆè·ç¦»åŠžå…¬å®¤çš„æœ€çŸ­è·¯å¾„é•¿åº¦ï¼‰- ä½¿ç”¨BFSè®¡ç®—
        // Office â† Cam1 â† Cam3 â† ...
        this.locationDepth = {
            'office': 0,  // ç»ˆç‚¹
            'cam1': 1,    // Cam1 â†’ Office (1æ­¥)
            'cam2': 2,    // Cam2 â†’ Cam1 â†’ Office (2æ­¥) âœ… ä¿®æ­£
            'cam3': 2,    // Cam3 â†’ Cam1 â†’ Office (2æ­¥)
            'cam6': 3,    // Cam6 â†’ Cam3 â†’ Cam1 â†’ Office (3æ­¥)
            'cam4': 3,    // Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (3æ­¥)
            'cam5': 4,    // Cam5 â†’ Cam6 â†’ Cam3 â†’ Cam1 â†’ Office (4æ­¥)
            'cam7': 4,    // Cam7 â†’ Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (4æ­¥)
            'cam8': 5,    // Cam8 â†’ Cam5 â†’ Cam6 â†’ Cam3 â†’ Cam1 â†’ Office (5æ­¥)
            'cam11': 5,   // Cam11 â†’ Cam7 â†’ Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (5æ­¥)
            'cam9': 5,    // Cam9 â†’ Cam7 â†’ Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (5æ­¥)
            'cam10': 6,   // Cam10 â†’ Cam9 â†’ Cam7 â†’ Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (6æ­¥)
        };
        
        // ç‰¹æœ—æ™®çš„æ­¥é•¿é…ç½®ï¼ˆä½¿ç”¨å’ŒEPç›¸åŒçš„æ­¥é•¿ï¼Œä¸€æ­¥ä¸€æ­¥èµ°ï¼‰
        this.trumpLocationDepth = {
            'office': 0,  // ç»ˆç‚¹
            'cam1': 1,    // Cam1 â†’ Office (1æ­¥)
            'cam2': 2,    // Cam2 â†’ Cam1 â†’ Office (2æ­¥)
            'cam3': 2,    // Cam3 â†’ Cam1 â†’ Office (2æ­¥)
            'cam6': 3,    // Cam6 â†’ Cam3 â†’ Cam1 â†’ Office (3æ­¥)
            'cam4': 3,    // Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (3æ­¥)
            'cam5': 4,    // Cam5 â†’ Cam6 â†’ Cam3 â†’ Cam1 â†’ Office (4æ­¥)
            'cam7': 4,    // Cam7 â†’ Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (4æ­¥)
            'cam8': 5,    // Cam8 â†’ Cam5 â†’ Cam6 â†’ Cam3 â†’ Cam1 â†’ Office (5æ­¥)
            'cam11': 5,   // Cam11 â†’ Cam7 â†’ Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (5æ­¥)
            'cam9': 5,    // Cam9 â†’ Cam7 â†’ Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (5æ­¥)
            'cam10': 6,   // Cam10 â†’ Cam9 â†’ Cam7 â†’ Cam4 â†’ Cam3 â†’ Cam1 â†’ Office (6æ­¥)
        };
        
        // å®šä¹‰ç§»åŠ¨è·¯å¾„å›¾ï¼ˆåªèƒ½å‘åŠžå…¬å®¤æ–¹å‘ç§»åŠ¨ï¼Œä¸èƒ½åŽé€€ï¼‰
        this.movementPaths = {
            'cam11': ['cam7', 'cam8'], // Cam11åªè¿žæŽ¥Cam7å’ŒCam8
            'cam9': ['cam7', 'cam10'],
            'cam10': ['cam9'], // æ­»èƒ¡åŒï¼Œåªèƒ½åŽ»cam9
            'cam8': ['cam7', 'cam5'],
            'cam7': ['cam4'],
            'cam4': ['cam2', 'cam3'], // ä¿®æ­£ï¼šæ·»åŠ cam3
            'cam5': ['cam4', 'cam6'],
            'cam2': ['cam3', 'cam1'], // ä¿®æ­£ï¼šæ·»åŠ cam1
            'cam3': ['cam1', 'cam6'],
            'cam6': ['cam3'],
            'cam1': ['office'], // å¤§é—¨ï¼Œåªèƒ½è¿›åŠžå…¬å®¤
            'office': [] // åˆ°è¾¾åŠžå…¬å®¤ï¼Œæ¸¸æˆç»“æŸ
        };
        
        // æ¯ä¸ªæ‘„åƒå¤´çš„é‚»è¿‘æˆ¿é—´ï¼ˆç”¨äºŽsoundå¸å¼•ï¼‰- å®Œæ•´çš„åŒå‘è¿žæŽ¥
        this.adjacentRooms = {
            'cam11': ['cam7', 'cam8'],
            'cam9': ['cam7', 'cam10'],
            'cam10': ['cam9'],
            'cam8': ['cam11', 'cam7', 'cam5'],
            'cam7': ['cam11', 'cam8', 'cam9', 'cam4'],
            'cam4': ['cam7', 'cam2', 'cam5', 'cam3'], // ä¿®æ­£ï¼šæ·»åŠ cam3
            'cam5': ['cam8', 'cam4', 'cam6'],
            'cam2': ['cam4', 'cam3', 'cam1'], // ä¿®æ­£ï¼šæ·»åŠ cam1
            'cam3': ['cam2', 'cam1', 'cam6', 'cam4'], // ä¿®æ­£ï¼šæ·»åŠ cam4
            'cam6': ['cam5', 'cam3'],
            'cam1': ['cam3', 'cam2'], // ä¿®æ­£ï¼šæ·»åŠ cam2ï¼ˆä¸åŒ…æ‹¬officeï¼Œå› ä¸ºé‚£æ˜¯ç»ˆç‚¹ï¼‰
        };
        
        // æ¯ä¸ªæ‘„åƒå¤´çš„è§’è‰²ä½ç½®é…ç½®ï¼ˆCSSå®šä½ï¼‰
        this.characterPositions = {
            'cam11': { left: '57.1%', bottom: '0%', width: '29%', transform: 'translateX(-50%) rotate(0deg)' },
            'cam10': { left: '73.8%', bottom: '1.6%', width: '89.2%', transform: 'translateX(-50%) rotate(0deg)' },
            'cam1': { left: '39.9%', bottom: '35.3%', width: '38.8%', transform: 'translateX(-50%) rotate(0deg)' },
            'cam9': { left: '18.5%', bottom: '0%', width: '29.6%', transform: 'translateX(-50%) rotate(0deg)' },
            'cam8': { left: '96.1%', bottom: '0%', width: '29.6%', transform: 'translateX(-50%) rotate(-23deg)' },
            'cam7': { left: '49.7%', bottom: '0%', width: '29.6%', transform: 'translateX(-50%) rotate(-5deg)' },
            'cam6': { left: '16.6%', bottom: '0%', width: '29.6%', transform: 'translateX(-50%) rotate(-5deg)' },
            'cam5': { left: '71.1%', bottom: '0%', width: '29.6%', transform: 'translateX(-50%) rotate(-5deg)' },
            'cam4': { left: '91.4%', bottom: '6.8%', width: '66.9%', transform: 'translateX(-50%) rotate(-5deg)' },
            'cam3': { left: '7.4%', bottom: '5%', width: '66.9%', transform: 'translateX(-50%) rotate(-5deg)' },
            'cam2': { left: '39.6%', bottom: '27.7%', width: '37.8%', transform: 'translateX(-50%) rotate(-139deg)' },
        };
        
        // è§’è‰²æ˜Žæš—åº¦é…ç½®ï¼ˆç™¾åˆ†æ¯”ï¼‰
        this.characterBrightness = {
            'cam11': 100,
            'cam10': 100,
            'cam1': 22,
            'cam9': 8,
            'cam8': 9,
            'cam7': 9,
            'cam6': 9,
            'cam5': 7,
            'cam4': 65,
            'cam3': 30,
            'cam2': 8,
        };
        
        // è§’è‰²æ—‹è½¬é…ç½®ï¼ˆåº¦æ•°ï¼‰
        this.characterRotation = {
            'cam11': 0,
            'cam10': 0,
            'cam1': 0,
            'cam9': 0,
            'cam8': -23,
            'cam7': -5,
            'cam6': -5,
            'cam5': -5,
            'cam4': -5,
            'cam3': -5,
            'cam2': -139,
        };
        
        // ç”µçœ¼ç‰¹æ•ˆé…ç½®ï¼ˆNight 6 ç‰¹æ®Šå¤œæ™šï¼‰- åæ ‡ç›¸å¯¹äºŽEPå›¾ç‰‡
        this.lightningEyesConfig = {
            'cam11': {
                eye1: { left: '46.3%', top: '14.8%', width: '10%', height: '10%' },
                eye2: { left: '54.2%', top: '13.8%', width: '10%', height: '10%' }
            },
            'cam10': {
                eye1: { left: '37.0%', top: '41.7%', width: '10%', height: '10%' },
                eye2: { left: '38.7%', top: '43.5%', width: '10%', height: '10%' }
            },
            'cam1': {
                eye1: { left: '47.7%', top: '41.6%', width: '10%', height: '10%' },
                eye2: { left: '49.9%', top: '42.3%', width: '10%', height: '10%' }
            },
            'cam9': {
                eye1: { left: '46.8%', top: '15.1%', width: '10%', height: '10%' },
                eye2: { left: '54.7%', top: '14.1%', width: '10%', height: '10%' }
            },
            'cam8': {
                eye1: { left: '47.1%', top: '15.8%', width: '10%', height: '10%' },
                eye2: { left: '53.9%', top: '15.3%', width: '10%', height: '10%' }
            },
            'cam7': {
                eye1: { left: '46.3%', top: '15.6%', width: '10%', height: '10%' },
                eye2: { left: '54.2%', top: '13.6%', width: '10%', height: '10%' }
            },
            'cam6': {
                eye1: { left: '46.8%', top: '15.4%', width: '10%', height: '10%' },
                eye2: { left: '53.7%', top: '14.5%', width: '10%', height: '10%' }
            },
            'cam5': {
                eye1: { left: '52.2%', top: '21.3%', width: '10%', height: '10%' },
                eye2: { left: '62.0%', top: '23.1%', width: '10%', height: '10%' }
            },
            'cam4': {
                eye1: { left: '37.1%', top: '42.4%', width: '10%', height: '10%' },
                eye2: { left: '38.4%', top: '43.6%', width: '10%', height: '10%' }
            },
            'cam3': {
                eye1: { left: '47.7%', top: '41.4%', width: '10%', height: '10%' },
                eye2: { left: '50.0%', top: '42.5%', width: '10%', height: '10%' }
            },
            'cam2': {
                eye1: { left: '46.1%', top: '15.3%', width: '10%', height: '10%' },
                eye2: { left: '53.9%', top: '14.3%', width: '10%', height: '10%' }
            }
        };
        
        // ç‰¹æœ—æ™®çš„ä½ç½®é…ç½®ï¼ˆä½¿ç”¨è°ƒè¯•å·¥å…·è®¾ç½®ï¼‰
        this.trumpPositions = {
            'cam10': { left: '10%', bottom: '0%', width: '40%', transform: 'translateX(-50%) rotate(0deg)' },
            'cam11': { left: '38.2%', bottom: '0%', width: '40%', transform: 'translateX(-50%) rotate(0deg)' },
            'cam9': { left: '0%', bottom: '34.6%', width: '13.9%', transform: 'translateX(-50%) rotate(44deg)' },
            'cam8': { left: '1.5%', bottom: '24.5%', width: '20.1%', transform: 'translateX(-50%) rotate(58deg)' },
            'cam7': { left: '7.4%', bottom: '0%', width: '41.4%', transform: 'translateX(-50%) rotate(1deg)' },
            'cam6': { left: '86.3%', bottom: '0%', width: '41.4%', transform: 'translateX(-50%) rotate(1deg)' },
            'cam5': { left: '0%', bottom: '0%', width: '29.3%', transform: 'translateX(-50%) rotate(1deg)' },
            'cam1': { left: '10.8%', bottom: '15%', width: '31.6%', transform: 'translateX(-50%) rotate(1deg)' },
            'cam2': { left: '77.2%', bottom: '32.3%', width: '31.6%', transform: 'translateX(-50%) rotate(1deg)' },
            'cam3': { left: '100%', bottom: '21.4%', width: '32.9%', transform: 'translateX(-50%) rotate(-62deg)' },
            'cam4': { left: '11%', bottom: '0%', width: '31.6%', transform: 'translateX(-50%) rotate(1deg)' },
        };
        
        // ç‰¹æœ—æ™®çš„æ˜Žæš—åº¦é…ç½®
        this.trumpBrightness = {
            'cam10': 31,
            'cam11': 100,
            'cam9': 29,
            'cam8': 28,
            'cam7': 28,
            'cam6': 28,
            'cam5': 12,
            'cam1': 40,
            'cam2': 31,
            'cam3': 19,
            'cam4': 31,
        };
        
        // ç‰¹æœ—æ™®çš„æ—‹è½¬é…ç½®
        this.trumpRotation = {
            'cam10': 0,
            'cam11': 0,
            'cam9': 44,
            'cam8': 58,
            'cam7': 1,
            'cam6': 1,
            'cam5': 1,
            'cam1': 1,
            'cam2': 1,
            'cam3': -62,
            'cam4': 1,
        };
    }

    // å¼€å§‹AIå¾ªçŽ¯
    start() {
        console.log(`ðŸŽ® EnemyAI.start() called for Night ${this.game.state.currentNight}`);
        
        // æ ¹æ®å¤œæ•°åŠ è½½é…ç½®å¹¶è®¾ç½®AIç­‰çº§
        this.loadAIConfig();
        
        console.log(`Night ${this.game.state.currentNight} - Epstein AI Config:`, this.currentEpsteinConfig);
        console.log(`Epstein will spawn in ${this.currentEpsteinConfig.spawnDelay / 1000} seconds...`);
        
        // æ ¹æ®é…ç½®å»¶è¿ŸåŽEPå‡ºåœºï¼ˆå¦‚æžœAIç­‰çº§>0ï¼‰
        if (this.epstein.aiLevel > 0) {
            const spawnTimer = setTimeout(() => {
                console.log(`â° Spawn timer triggered after ${this.currentEpsteinConfig.spawnDelay}ms`);
                this.spawnEpstein();
            }, this.currentEpsteinConfig.spawnDelay);
            
            console.log(`â° Spawn timer created:`, spawnTimer);
        } else {
            console.log('Epstein AI level is 0, not spawning');
        }
        
        // Trumpå‡ºåœºé€»è¾‘
        if (this.currentTrumpConfig && this.trump.aiLevel > 0) {
            console.log(`Night ${this.game.state.currentNight} - Trump AI Config:`, this.currentTrumpConfig);
            console.log(`Trump will spawn in ${this.currentTrumpConfig.spawnDelay / 1000} seconds...`);
            
            // æ ¹æ®é…ç½®å»¶è¿ŸåŽTrumpå‡ºåœº
            setTimeout(() => {
                this.spawnTrump();
            }, this.currentTrumpConfig.spawnDelay);
        }
        
        // Hawkingæ¿€æ´»é€»è¾‘
        // Custom Night: æ ¹æ®è‡ªå®šä¹‰ç­‰çº§å†³å®šæ˜¯å¦æ¿€æ´»
        if (this.game.state.customNight && this.game.state.customAILevels.hawking > 0) {
            console.log('Custom Night: Hawking activated at cam6!');
            this.startHawking();
        }
        // æ™®é€šå¤œæ™šï¼šNight 3-5 æ¿€æ´»
        else if (!this.game.state.customNight && this.game.state.currentNight >= 3 && this.game.state.currentNight <= 5) {
            console.log('Hawking activated at cam6!');
            this.startHawking();
        }
    }
    
    // åŠ è½½AIé…ç½®
    loadAIConfig() {
        const night = this.game.state.currentNight;
        
        // Custom Night (Night 7) - ä½¿ç”¨è‡ªå®šä¹‰AIç­‰çº§
        if (this.game.state.customNight && night === 7) {
            const customLevels = this.game.state.customAILevels;
            
            // Epstein è‡ªå®šä¹‰é…ç½®
            this.currentEpsteinConfig = {
                aiLevel: customLevels.epstein,
                movementInterval: [9000, 10000],
                movementDuration: 1000,
                spawnDelay: 0,
                movementProbability: {
                    forward: 0.9,
                    lateral: 0.1,
                    backward: 0.0
                },
                soundLureResistance: 0.15
            };
            this.epstein.aiLevel = customLevels.epstein;
            this.epstein.movementInterval = this.getRandomInterval(this.currentEpsteinConfig.movementInterval);
            
            // Trump è‡ªå®šä¹‰é…ç½®
            if (customLevels.trump > 0) {
                this.currentTrumpConfig = {
                    aiLevel: customLevels.trump,
                    movementInterval: [8000, 9000],
                    movementDuration: 1000,
                    spawnDelay: 0,
                    movementProbability: {
                        forward: 0.8,
                        lateral: 0.2,
                        backward: 0.0
                    },
                    ventCrawling: {
                        cam1Probability: 1.0,
                        cam2Probability: 0.5,
                        soundDelay: 5000,
                        soundDuration: 10000,
                        totalDuration: 20000,
                        retreatDelay: 2000,
                        retreatSoundDuration: 3000
                    }
                };
                this.trump.aiLevel = customLevels.trump;
                this.trump.movementInterval = this.getRandomInterval(this.currentTrumpConfig.movementInterval);
            } else {
                this.currentTrumpConfig = null;
            }
            
            // Hawking è‡ªå®šä¹‰é…ç½®ï¼ˆé€šè¿‡ customAILevels.hawking æŽ§åˆ¶ï¼‰
            // Hawking çš„ AI ç­‰çº§ä¸å½±å“ç§»åŠ¨ï¼Œåªå½±å“æ˜¯å¦æ¿€æ´»
            
            console.log(`Custom Night AI Config loaded:`);
            console.log(`- Epstein: Level ${this.epstein.aiLevel}`);
            console.log(`- Trump: Level ${this.trump.aiLevel || 0}`);
            console.log(`- Hawking: Level ${customLevels.hawking}`);
            
            return;
        }
        
        // æ™®é€šå¤œæ™šé…ç½®
        // åŠ è½½Epsteiné…ç½®
        this.currentEpsteinConfig = this.epsteinConfig[night] || this.epsteinConfig[1];
        this.epstein.aiLevel = this.currentEpsteinConfig.aiLevel;
        this.epstein.movementInterval = this.getRandomInterval(this.currentEpsteinConfig.movementInterval);
        
        // åŠ è½½Trumpé…ç½®ï¼ˆNight 2-5ï¼‰
        if (night >= 2 && night <= 5) {
            this.currentTrumpConfig = this.trumpConfig[night] || this.trumpConfig[2];
            this.trump.aiLevel = this.currentTrumpConfig.aiLevel;
            this.trump.movementInterval = this.getRandomInterval(this.currentTrumpConfig.movementInterval);
        } else {
            this.currentTrumpConfig = null; // Night 6 æ²¡æœ‰ Trump
        }
        
        console.log(`AI Config loaded for Night ${night}`);
        console.log(`- Epstein: Level ${this.epstein.aiLevel}, Interval ${this.epstein.movementInterval}ms`);
        if (this.currentTrumpConfig) {
            console.log(`- Trump: Level ${this.trump.aiLevel}, Interval ${this.trump.movementInterval}ms`);
        } else {
            console.log(`- Trump: Not active this night`);
        }
    }
    
    // ä»ŽåŒºé—´ä¸­éšæœºé€‰æ‹©ä¸€ä¸ªé—´éš”æ—¶é—´
    getRandomInterval(intervalConfig) {
        // å¦‚æžœæ˜¯æ•°ç»„ï¼Œä»ŽåŒºé—´ä¸­éšæœºé€‰æ‹©
        if (Array.isArray(intervalConfig)) {
            const [min, max] = intervalConfig;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // å¦‚æžœæ˜¯æ•°å­—ï¼Œç›´æŽ¥è¿”å›ž
        return intervalConfig;
    }
    
    // EPå‡ºåœº
    spawnEpstein() {
        if (this.epstein.hasSpawned) return;
        
        this.epstein.hasSpawned = true;
        console.log('âœ… Epstein has spawned!');
        
        // ç¬¬ä¸€å…³è§¦å‘æ‘„åƒå¤´æ•…éšœï¼Œç¬¬äºŒå…³åŠä»¥åŽä¸è§¦å‘
        if (this.game.state.currentNight === 1) {
            this.triggerCameraFailure();
        }
        
        // å¼€å§‹ç§»åŠ¨æ£€æŸ¥å¾ªçŽ¯
        this.startMovementLoop();
    }
    
    // Trumpå‡ºåœº
    spawnTrump() {
        if (this.trump.hasSpawned) return;
        
        this.trump.hasSpawned = true;
        console.log('Trump has spawned at cam10!');
        
        // ç«‹å³æ›´æ–°æ‘„åƒå¤´æ˜¾ç¤ºï¼ˆå¦‚æžœæ‘„åƒå¤´æ‰“å¼€ï¼‰
        if (this.game.state.cameraOpen) {
            this.updateCameraDisplay();
        }
        
        // å¼€å§‹Trumpçš„ç§»åŠ¨æ£€æŸ¥å¾ªçŽ¯
        this.startTrumpMovementLoop();
    }

    // åœæ­¢AI
    stop() {
        if (this.epstein.movementTimer) {
            clearTimeout(this.epstein.movementTimer);  // æ”¹ä¸º clearTimeout
            this.epstein.movementTimer = null;
        }
        if (this.trump.movementTimer) {
            clearTimeout(this.trump.movementTimer);    // æ”¹ä¸º clearTimeout
            this.trump.movementTimer = null;
        }
        if (this.trump.crawlingTimer) {
            clearTimeout(this.trump.crawlingTimer);
            this.trump.crawlingTimer = null;
        }
        if (this.trump.retreatTimer) {
            clearTimeout(this.trump.retreatTimer);
            this.trump.retreatTimer = null;
        }
        if (this.hawking.timer) {
            clearTimeout(this.hawking.timer);
            this.hawking.timer = null;
        }
        if (this.hawking.warningTimer) {
            clearTimeout(this.hawking.warningTimer);
            this.hawking.warningTimer = null;
        }
        if (this.hawking.attackTimer) {
            clearTimeout(this.hawking.attackTimer);
            this.hawking.attackTimer = null;
        }
        // åœæ­¢çˆ¬è¡ŒéŸ³æ•ˆ
        this.game.assets.stopSound('ventCrawling');
        // éšè—éœé‡‘è­¦å‘Š
        this.hideHawkingWarning();
    }

    // å¼€å§‹ç§»åŠ¨æ£€æŸ¥å¾ªçŽ¯
    startMovementLoop() {
        // ä½¿ç”¨ setTimeout è€Œä¸æ˜¯ setIntervalï¼Œä»¥æ”¯æŒåŠ¨æ€é—´éš”
        const scheduleNextCheck = () => {
            // Night 4ç‰¹æ®Šæœºåˆ¶ï¼š4AMåŽEPå˜å¾—æ›´æ¿€è¿›
            let currentConfig = this.currentEpsteinConfig;
            if (this.game.state.currentNight === 4 && this.game.state.currentTime >= 4) {
                // 4AMåŽä½¿ç”¨æ›´æ¿€è¿›çš„é…ç½®
                currentConfig = {
                    ...this.currentEpsteinConfig,
                    movementInterval: [8000, 10000],
                    movementProbability: {
                        forward: 1.0,
                        lateral: 0.0,
                        backward: 0.0
                    }
                };
            }
            
            // ä»Žé…ç½®åŒºé—´ä¸­éšæœºé€‰æ‹©ä¸‹ä¸€æ¬¡æ£€æŸ¥çš„é—´éš”
            const nextInterval = this.getRandomInterval(currentConfig.movementInterval);
            
            this.epstein.movementTimer = setTimeout(() => {
                this.checkMovement();
                // é€’å½’è°ƒåº¦ä¸‹ä¸€æ¬¡æ£€æŸ¥
                scheduleNextCheck();
            }, nextInterval);
        };
        
        // å¼€å§‹ç¬¬ä¸€æ¬¡è°ƒåº¦
        scheduleNextCheck();
    }
    
    // å¼€å§‹Trumpçš„ç§»åŠ¨æ£€æŸ¥å¾ªçŽ¯
    startTrumpMovementLoop() {
        // ä½¿ç”¨ setTimeout è€Œä¸æ˜¯ setIntervalï¼Œä»¥æ”¯æŒåŠ¨æ€é—´éš”
        const scheduleNextCheck = () => {
            // Night 5ç‰¹æ®Šæœºåˆ¶ï¼š4AMåŽTrumpå˜å¾—æ›´æ¿€è¿›
            let currentConfig = this.currentTrumpConfig;
            if (this.game.state.currentNight === 5 && this.game.state.currentTime >= 4) {
                // 4AMåŽä½¿ç”¨æ›´æ¿€è¿›çš„é…ç½®
                currentConfig = {
                    ...this.currentTrumpConfig,
                    movementInterval: [6000, 7000], // 6-7ç§’é—´éš”
                    movementProbability: {
                        forward: 1.0,
                        lateral: 0.0,
                        backward: 0.0
                    }
                };
            }
            
            // ä»Žé…ç½®åŒºé—´ä¸­éšæœºé€‰æ‹©ä¸‹ä¸€æ¬¡æ£€æŸ¥çš„é—´éš”
            const nextInterval = this.getRandomInterval(currentConfig.movementInterval);
            
            this.trump.movementTimer = setTimeout(() => {
                this.checkTrumpMovement();
                // é€’å½’è°ƒåº¦ä¸‹ä¸€æ¬¡æ£€æŸ¥
                scheduleNextCheck();
            }, nextInterval);
        };
        
        // å¼€å§‹ç¬¬ä¸€æ¬¡è°ƒåº¦
        scheduleNextCheck();
    }

    // æ£€æŸ¥æ˜¯å¦ç§»åŠ¨ï¼ˆFNAFæœºåˆ¶ï¼‰
    checkMovement() {
        // å¦‚æžœè¿˜æœªå‡ºåœºï¼Œä¸ç§»åŠ¨
        if (!this.epstein.hasSpawned) return;
        
        // å¦‚æžœAIç­‰çº§ä¸º0ï¼Œä¸ç§»åŠ¨
        if (this.epstein.aiLevel === 0) return;
        
        // å¦‚æžœå·²ç»åœ¨åŠžå…¬å®¤ï¼Œä¸å†ç§»åŠ¨
        if (this.epstein.currentLocation === 'office') return;
        
        // Custom Night ä½¿ç”¨ 1-24ï¼Œæ™®é€šå¤œæ™šä½¿ç”¨ 1-20
        const maxRandom = (this.game.state.customNight && this.game.state.currentNight === 7) ? 24 : 20;
        const randomNumber = Math.floor(Math.random() * maxRandom) + 1;
        
        // å¦‚æžœéšæœºæ•° <= AIç­‰çº§ï¼Œç§»åŠ¨æˆåŠŸ
        if (randomNumber <= this.epstein.aiLevel) {
            this.moveToNextLocation();
        }
    }
    
    // æ£€æŸ¥Trumpæ˜¯å¦ç§»åŠ¨
    checkTrumpMovement() {
        // å¦‚æžœè¿˜æœªå‡ºåœºï¼Œä¸ç§»åŠ¨
        if (!this.trump.hasSpawned) return;
        
        // å¦‚æžœAIç­‰çº§ä¸º0ï¼Œä¸ç§»åŠ¨
        if (this.trump.aiLevel === 0) return;
        
        // å¦‚æžœå·²ç»åœ¨åŠžå…¬å®¤ï¼Œä¸å†ç§»åŠ¨
        if (this.trump.currentLocation === 'office') return;
        
        // Custom Night ä½¿ç”¨ 1-24ï¼Œæ™®é€šå¤œæ™šä½¿ç”¨ 1-20
        const maxRandom = (this.game.state.customNight && this.game.state.currentNight === 7) ? 24 : 20;
        const randomNumber = Math.floor(Math.random() * maxRandom) + 1;
        
        // å¦‚æžœéšæœºæ•° <= AIç­‰çº§ï¼Œç§»åŠ¨æˆåŠŸ
        if (randomNumber <= this.trump.aiLevel) {
            this.moveTrumpToNextLocation();
        }
    }

    // ç§»åŠ¨åˆ°ä¸‹ä¸€ä¸ªä½ç½®ï¼ˆæ”¯æŒå‰è¿›ã€å¹³ç§»ã€åŽé€€ï¼‰
    moveToNextLocation() {
        const currentLoc = this.epstein.currentLocation;
        const currentDepth = this.locationDepth[currentLoc];
        
        // Night 4ç‰¹æ®Šæœºåˆ¶ï¼š4AMåŽEPå˜å¾—æ›´æ¿€è¿›
        let config = this.currentEpsteinConfig;
        if (this.game.state.currentNight === 4 && this.game.state.currentTime >= 4) {
            config = {
                ...this.currentEpsteinConfig,
                movementProbability: {
                    forward: 1.0,
                    lateral: 0.0,
                    backward: 0.0
                }
            };
            // åªåœ¨ç¬¬ä¸€æ¬¡è§¦å‘æ—¶æ˜¾ç¤ºæ—¥å¿—
            if (!this.epstein.night4AggressiveMode) {
                console.log('âš¡ Night 4: 4AM reached! EP is now in aggressive mode (forward only)');
                this.epstein.night4AggressiveMode = true;
            }
        }
        
        // èŽ·å–æ‰€æœ‰ä½ç½®ï¼ˆä¸é™äºŽé‚»å±…ï¼‰
        const allLocations = Object.keys(this.locationDepth).filter(loc => 
            loc !== 'office' && loc !== currentLoc
        );
        
        // èŽ·å–é‚»è¿‘æˆ¿é—´
        const adjacentLocs = this.adjacentRooms[currentLoc] || [];
        
        // åˆ†ç±»æ‰€æœ‰å¯èƒ½çš„ç§»åŠ¨ä½ç½®
        // å‰è¿›ï¼šæ‰€æœ‰æ­¥é•¿å‡1çš„ä½ç½®ï¼ˆä¸é™äºŽé‚»è¿‘ï¼‰
        const forwardLocations = allLocations.filter(loc => this.locationDepth[loc] === currentDepth - 1);
        // å¹³ç§»ï¼šåªèƒ½ç§»åŠ¨åˆ°é‚»è¿‘æˆ¿é—´ä¸”æ­¥é•¿ç›¸åŒçš„ä½ç½®
        const lateralLocations = adjacentLocs.filter(loc => this.locationDepth[loc] === currentDepth);
        // åŽé€€ï¼šåªèƒ½ç§»åŠ¨åˆ°é‚»è¿‘æˆ¿é—´ä¸”æ­¥é•¿åŠ 1çš„ä½ç½®
        const backwardLocations = adjacentLocs.filter(loc => this.locationDepth[loc] === currentDepth + 1);
        
        // å¦‚æžœå½“å‰æ­¥é•¿æ˜¯1ä¸”æ²¡æœ‰å‰è¿›ä½ç½®ï¼Œå°è¯•ç§»åŠ¨åˆ°office
        if (forwardLocations.length === 0 && currentDepth === 1) {
            console.log(`Epstein moved: ${currentLoc} -> office`);
            this.epstein.currentLocation = 'office';
            this.triggerJumpscare('epstein');
            return;
        }
        
        // æ ¹æ®é…ç½®æ¦‚çŽ‡å†³å®šç§»åŠ¨æ–¹å‘
        const movementProb = config.movementProbability;
        const totalProb = movementProb.forward + movementProb.lateral + movementProb.backward;
        
        // å¦‚æžœæ€»æ¦‚çŽ‡ä¸º0æˆ–æ²¡æœ‰ä»»ä½•å¯ç§»åŠ¨ä½ç½®ï¼Œä¸ç§»åŠ¨
        if (totalProb === 0 || (forwardLocations.length === 0 && lateralLocations.length === 0 && backwardLocations.length === 0)) {
            console.log(`Epstein has no valid path from ${currentLoc}`);
            return;
        }
        
        // å½’ä¸€åŒ–æ¦‚çŽ‡ï¼ˆç¡®ä¿æ€»å’Œä¸º1ï¼‰
        const normalizedProb = {
            forward: movementProb.forward / totalProb,
            lateral: movementProb.lateral / totalProb,
            backward: movementProb.backward / totalProb
        };
        
        // æ ¹æ®æ¦‚çŽ‡é€‰æ‹©ç§»åŠ¨æ–¹å‘
        const random = Math.random();
        let selectedLocations = [];
        let movementType = '';
        
        if (random < normalizedProb.forward && forwardLocations.length > 0) {
            // å‰è¿›
            selectedLocations = forwardLocations;
            movementType = 'forward';
        } else if (random < normalizedProb.forward + normalizedProb.lateral && lateralLocations.length > 0) {
            // å¹³ç§»
            selectedLocations = lateralLocations;
            movementType = 'lateral';
        } else if (backwardLocations.length > 0) {
            // åŽé€€
            selectedLocations = backwardLocations;
            movementType = 'backward';
        } else {
            // å¦‚æžœé€‰ä¸­çš„æ–¹å‘æ²¡æœ‰å¯ç”¨ä½ç½®ï¼Œå›žé€€åˆ°å‰è¿›ï¼ˆé»˜è®¤è¡Œä¸ºï¼‰
            if (forwardLocations.length > 0) {
                selectedLocations = forwardLocations;
                movementType = 'forward (fallback)';
            } else if (lateralLocations.length > 0) {
                selectedLocations = lateralLocations;
                movementType = 'lateral (fallback)';
            } else if (backwardLocations.length > 0) {
                selectedLocations = backwardLocations;
                movementType = 'backward (fallback)';
            } else {
                console.log(`Epstein has no valid path from ${currentLoc}`);
                return;
            }
        }
        
        // ä»Žé€‰ä¸­çš„æ–¹å‘ä¸­éšæœºé€‰æ‹©ä¸€ä¸ªä½ç½®
        const nextLocation = selectedLocations[Math.floor(Math.random() * selectedLocations.length)];
        
        console.log(`Epstein moved [${movementType}]: ${currentLoc} (depth ${currentDepth}) -> ${nextLocation} (depth ${this.locationDepth[nextLocation]})`);
        
        this.epstein.currentLocation = nextLocation;
        
        // æ’­æ”¾ç§»åŠ¨éŸ³æ•ˆ
        this.game.assets.playSound('blip', false, 0.5);
        
        // å¦‚æžœåˆ°è¾¾åŠžå…¬å®¤ï¼Œè§¦å‘æ¸¸æˆç»“æŸ
        if (nextLocation === 'office') {
            this.triggerJumpscare('epstein');
            return;
        }
        
        // å¦‚æžœæ‘„åƒå¤´æ‰“å¼€ä¸”æ²¡æœ‰æ•…éšœï¼Œæ— è®ºæŸ¥çœ‹å“ªä¸ªæ‘„åƒå¤´éƒ½æ’­æ”¾åŠ¨ç”»
        if (this.game.state.cameraOpen && !this.game.state.cameraFailed) {
            this.game.camera.playMovementTransition();
        }
        
        // æ›´æ–°æ‘„åƒå¤´æ˜¾ç¤º
        this.updateCameraDisplay();
    }
    
    // Trumpç§»åŠ¨åˆ°ä¸‹ä¸€ä¸ªä½ç½®ï¼ˆæ”¯æŒå‰è¿›ã€å¹³ç§»ã€åŽé€€ï¼‰
    moveTrumpToNextLocation() {
        const currentLoc = this.trump.currentLocation;
        const currentDepth = this.trumpLocationDepth[currentLoc];
        
        // Night 5ç‰¹æ®Šæœºåˆ¶ï¼š4AMåŽTrumpå˜å¾—æ›´æ¿€è¿›
        let config = this.currentTrumpConfig;
        if (this.game.state.currentNight === 5 && this.game.state.currentTime >= 4) {
            config = {
                ...this.currentTrumpConfig,
                movementProbability: {
                    forward: 1.0,
                    lateral: 0.0,
                    backward: 0.0
                },
                ventCrawling: {
                    ...this.currentTrumpConfig.ventCrawling,
                    cam1Probability: 1.0, // 4AMåŽåœ¨cam1å¿…å®šçˆ¬è¡Œ
                    cam2Probability: 0.8  // 4AMåŽåœ¨cam2æœ‰80%æ¦‚çŽ‡çˆ¬è¡Œ
                }
            };
            // åªåœ¨ç¬¬ä¸€æ¬¡è§¦å‘æ—¶æ˜¾ç¤ºæ—¥å¿—
            if (!this.trump.night5AggressiveMode) {
                console.log('âš¡ Night 5: 4AM reached! Trump is now in aggressive mode (faster + more crawling)');
                this.trump.night5AggressiveMode = true;
            }
        }
        
        // å¦‚æžœæ­£åœ¨çˆ¬è¡Œï¼Œä¸èƒ½ç§»åŠ¨
        if (this.trump.isCrawling) {
            console.log('Trump is crawling, cannot move');
            return;
        }
        
        // å¦‚æžœåœ¨cam1ï¼Œæ ¹æ®é…ç½®æ¦‚çŽ‡å†³å®šæ˜¯å¦çˆ¬è¡Œ
        if (currentLoc === 'cam1') {
            const shouldCrawl = Math.random() < config.ventCrawling.cam1Probability;
            if (shouldCrawl) {
                console.log(`Trump starting to crawl from ${currentLoc} to office (${config.ventCrawling.cam1Probability * 100}% chance)`);
                this.startTrumpCrawling(currentLoc);
                return;
            }
        }
        
        // å¦‚æžœåœ¨cam2ï¼Œæ ¹æ®é…ç½®æ¦‚çŽ‡å†³å®šæ˜¯å¦çˆ¬è¡Œ
        if (currentLoc === 'cam2') {
            const shouldCrawl = Math.random() < config.ventCrawling.cam2Probability;
            if (shouldCrawl) {
                console.log(`Trump decided to crawl from ${currentLoc} to office (${config.ventCrawling.cam2Probability * 100}% chance)`);
                this.startTrumpCrawling(currentLoc);
                return;
            } else {
                console.log(`Trump decided to continue moving from ${currentLoc} (${(1 - config.ventCrawling.cam2Probability) * 100}% chance)`);
                // ç»§ç»­æ‰§è¡Œæ­£å¸¸ç§»åŠ¨é€»è¾‘
            }
        }
        
        // èŽ·å–Trumpå¯ä»¥åŽ»çš„ä½ç½®
        const allLocations = Object.keys(this.trumpLocationDepth).filter(loc => 
            loc !== 'office' && loc !== currentLoc
        );
        
        // èŽ·å–é‚»è¿‘æˆ¿é—´
        const adjacentLocs = this.adjacentRooms[currentLoc] || [];
        
        // åˆ†ç±»æ‰€æœ‰å¯èƒ½çš„ç§»åŠ¨ä½ç½®
        // å‰è¿›ï¼šæ‰€æœ‰æ­¥é•¿å‡1çš„ä½ç½®ï¼ˆä¸é™äºŽé‚»è¿‘ï¼‰
        const forwardLocations = allLocations.filter(loc => this.trumpLocationDepth[loc] === currentDepth - 1);
        // å¹³ç§»ï¼šåªèƒ½ç§»åŠ¨åˆ°é‚»è¿‘æˆ¿é—´ä¸”æ­¥é•¿ç›¸åŒçš„ä½ç½®
        const lateralLocations = adjacentLocs.filter(loc => this.trumpLocationDepth[loc] === currentDepth);
        // åŽé€€ï¼šåªèƒ½ç§»åŠ¨åˆ°é‚»è¿‘æˆ¿é—´ä¸”æ­¥é•¿åŠ 1çš„ä½ç½®
        const backwardLocations = adjacentLocs.filter(loc => this.trumpLocationDepth[loc] === currentDepth + 1);
        
        // å¦‚æžœæ²¡æœ‰ä»»ä½•å¯ç§»åŠ¨ä½ç½®ï¼Œä¸ç§»åŠ¨
        if (forwardLocations.length === 0 && lateralLocations.length === 0 && backwardLocations.length === 0) {
            console.log(`Trump has no valid path from ${currentLoc}`);
            return;
        }
        
        // æ ¹æ®é…ç½®æ¦‚çŽ‡å†³å®šç§»åŠ¨æ–¹å‘
        const movementProb = config.movementProbability;
        const totalProb = movementProb.forward + movementProb.lateral + movementProb.backward;
        
        // å¦‚æžœæ€»æ¦‚çŽ‡ä¸º0ï¼Œä¸ç§»åŠ¨
        if (totalProb === 0) {
            console.log(`Trump movement probability is 0`);
            return;
        }
        
        // å½’ä¸€åŒ–æ¦‚çŽ‡
        const normalizedProb = {
            forward: movementProb.forward / totalProb,
            lateral: movementProb.lateral / totalProb,
            backward: movementProb.backward / totalProb
        };
        
        // æ ¹æ®æ¦‚çŽ‡é€‰æ‹©ç§»åŠ¨æ–¹å‘
        const random = Math.random();
        let selectedLocations = [];
        let movementType = '';
        
        if (random < normalizedProb.forward && forwardLocations.length > 0) {
            selectedLocations = forwardLocations;
            movementType = 'forward';
        } else if (random < normalizedProb.forward + normalizedProb.lateral && lateralLocations.length > 0) {
            selectedLocations = lateralLocations;
            movementType = 'lateral';
        } else if (backwardLocations.length > 0) {
            selectedLocations = backwardLocations;
            movementType = 'backward';
        } else {
            // å›žé€€åˆ°å¯ç”¨çš„æ–¹å‘
            if (forwardLocations.length > 0) {
                selectedLocations = forwardLocations;
                movementType = 'forward (fallback)';
            } else if (lateralLocations.length > 0) {
                selectedLocations = lateralLocations;
                movementType = 'lateral (fallback)';
            } else if (backwardLocations.length > 0) {
                selectedLocations = backwardLocations;
                movementType = 'backward (fallback)';
            } else {
                console.log(`Trump has no valid path from ${currentLoc}`);
                return;
            }
        }
        
        // ä»Žé€‰ä¸­çš„æ–¹å‘ä¸­éšæœºé€‰æ‹©ä¸€ä¸ªä½ç½®
        const nextLocation = selectedLocations[Math.floor(Math.random() * selectedLocations.length)];
        
        console.log(`Trump moved [${movementType}]: ${currentLoc} (depth ${currentDepth}) -> ${nextLocation} (depth ${this.trumpLocationDepth[nextLocation]})`);
        
        this.trump.currentLocation = nextLocation;
        
        // æ’­æ”¾ç§»åŠ¨éŸ³æ•ˆ
        this.game.assets.playSound('blip', false, 0.5);
        
        // å¦‚æžœæ‘„åƒå¤´æ‰“å¼€ä¸”æ²¡æœ‰æ•…éšœï¼Œæ’­æ”¾åŠ¨ç”»
        if (this.game.state.cameraOpen && !this.game.state.cameraFailed) {
            this.game.camera.playMovementTransition();
        }
        
        // æ›´æ–°æ‘„åƒå¤´æ˜¾ç¤º
        this.updateCameraDisplay();
    }
    
    // Trumpå¼€å§‹çˆ¬è¡Œè¿›å…¥åŠžå…¬å®¤
    startTrumpCrawling(fromLocation) {
        const config = this.currentTrumpConfig.ventCrawling;
        
        // æ£€æŸ¥é€šé£Žç®¡æ˜¯å¦å·²ç»å…³é—­
        if (this.game.state.ventsClosed) {
            console.log('Trump tried to crawl but vents are already closed! Silent retreat.');
            
            // é™é»˜æ’¤é€€ - ä¸æ’­æ”¾ä»»ä½•éŸ³æ•ˆ
            // æ‰¾å‡ºæ‰€æœ‰æ­¥é•¿ä¸º3çš„ä½ç½®
            const depth3Locations = Object.keys(this.trumpLocationDepth).filter(loc => 
                this.trumpLocationDepth[loc] === 3 && loc !== 'office'
            );
            
            // å¦‚æžœæ²¡æœ‰æ­¥é•¿ä¸º3çš„ä½ç½®ï¼Œä½¿ç”¨EPçš„æ­¥é•¿3ä½ç½®
            let retreatLocation;
            if (depth3Locations.length > 0) {
                retreatLocation = depth3Locations[Math.floor(Math.random() * depth3Locations.length)];
            } else {
                const epDepth3Locations = Object.keys(this.locationDepth).filter(loc => 
                    this.locationDepth[loc] === 3 && loc !== 'office'
                );
                retreatLocation = epDepth3Locations[Math.floor(Math.random() * epDepth3Locations.length)];
            }
            
            console.log(`Trump silently retreats to ${retreatLocation} (depth 3)`);
            
            // ç›´æŽ¥ç§»åŠ¨åˆ°æ’¤é€€ä½ç½®ï¼Œä¸æ’­æ”¾éŸ³æ•ˆ
            this.trump.currentLocation = retreatLocation;
            this.trump.isCrawling = false;
            this.trump.crawlingFrom = null;
            
            // æ›´æ–°æ‘„åƒå¤´æ˜¾ç¤º
            this.updateCameraDisplay();
            return;
        }
        
        this.trump.isCrawling = true;
        this.trump.crawlingFrom = fromLocation; // è®°å½•ä»Žå“ªé‡Œå¼€å§‹çˆ¬è¡Œ
        this.trump.currentLocation = 'crawling'; // æ ‡è®°ä¸ºçˆ¬è¡ŒçŠ¶æ€
        
        console.log(`Trump is crawling from ${fromLocation}...`);
        console.log(`Crawling config: soundDelay=${config.soundDelay}ms, soundDuration=${config.soundDuration}ms, totalDuration=${config.totalDuration}ms`);
        
        // æ›´æ–°æ‘„åƒå¤´æ˜¾ç¤ºï¼ˆTrumpæ¶ˆå¤±ï¼‰
        this.updateCameraDisplay();
        
        // æ ¹æ®é…ç½®å»¶è¿ŸåŽå¼€å§‹æ’­æ”¾çˆ¬è¡ŒéŸ³æ•ˆ
        setTimeout(() => {
            // æ£€æŸ¥Trumpæ˜¯å¦è¿˜åœ¨çˆ¬è¡Œï¼ˆå¯èƒ½å·²ç»è¢«é˜»æ­¢ï¼‰
            if (this.trump.isCrawling && this.trump.currentLocation === 'crawling') {
                console.log('Playing crawling sound...');
                this.game.assets.playSound('ventCrawling', true, 1.0);
                
                // æ ¹æ®é…ç½®æŒç»­æ—¶é•¿åŽåœæ­¢çˆ¬è¡ŒéŸ³æ•ˆ
                setTimeout(() => {
                    if (this.trump.isCrawling && this.trump.currentLocation === 'crawling') {
                        console.log('Stopping crawling sound...');
                        this.game.assets.stopSound('ventCrawling');
                    }
                }, config.soundDuration);
            }
        }, config.soundDelay);
        
        // æ ¹æ®é…ç½®æ€»æ—¶é•¿åŽåˆ°è¾¾åŠžå…¬å®¤å¹¶è§¦å‘è·³æ€
        this.trump.crawlingTimer = setTimeout(() => {
            console.log('Trump reached the office!');
            this.trump.currentLocation = 'office';
            this.trump.isCrawling = false;
            this.trump.crawlingFrom = null;
            
            // åœæ­¢çˆ¬è¡ŒéŸ³æ•ˆï¼ˆå¦‚æžœè¿˜åœ¨æ’­æ”¾ï¼‰
            this.game.assets.stopSound('ventCrawling');
            
            // è§¦å‘è·³æ€
            this.triggerJumpscare('trump');
        }, config.totalDuration);
    }
    
    // é˜»æ­¢Trumpçˆ¬è¡Œï¼ˆçŽ©å®¶å…³é—­é€šé£Žå£ï¼‰
    stopTrumpCrawling() {
        if (!this.trump.isCrawling) {
            return false;
        }
        
        const config = this.currentTrumpConfig.ventCrawling;
        
        console.log('Trump crawling blocked by closed vents!');
        
        // æ¸…é™¤çˆ¬è¡Œè®¡æ—¶å™¨
        if (this.trump.crawlingTimer) {
            clearTimeout(this.trump.crawlingTimer);
            this.trump.crawlingTimer = null;
        }
        
        // åœæ­¢çˆ¬è¡ŒéŸ³æ•ˆ
        this.game.assets.stopSound('ventCrawling');
        
        // Trumpè¢«é˜»æ­¢ï¼Œç«‹å³åˆ¤å®šç¦»å¼€
        this.trump.isCrawling = false;
        
        // æ‰¾å‡ºæ‰€æœ‰æ­¥é•¿ä¸º3çš„ä½ç½®
        const depth3Locations = Object.keys(this.trumpLocationDepth).filter(loc => 
            this.trumpLocationDepth[loc] === 3 && loc !== 'office'
        );
        
        // å¦‚æžœæ²¡æœ‰æ­¥é•¿ä¸º3çš„ä½ç½®ï¼Œä½¿ç”¨EPçš„æ­¥é•¿3ä½ç½®
        let retreatLocation;
        if (depth3Locations.length > 0) {
            // éšæœºé€‰æ‹©ä¸€ä¸ªæ­¥é•¿ä¸º3çš„ä½ç½®
            retreatLocation = depth3Locations[Math.floor(Math.random() * depth3Locations.length)];
        } else {
            // ä½¿ç”¨EPçš„æ­¥é•¿é…ç½®ä¸­çš„æ­¥é•¿3ä½ç½®
            const epDepth3Locations = Object.keys(this.locationDepth).filter(loc => 
                this.locationDepth[loc] === 3 && loc !== 'office'
            );
            retreatLocation = epDepth3Locations[Math.floor(Math.random() * epDepth3Locations.length)];
        }
        
        console.log(`Trump will retreat to ${retreatLocation} (depth 3)`);
        
        // ç«‹å³ç§»åŠ¨åˆ°æ’¤é€€ä½ç½®
        this.trump.currentLocation = retreatLocation;
        this.trump.crawlingFrom = null;
        
        // æ›´æ–°æ‘„åƒå¤´æ˜¾ç¤º
        this.updateCameraDisplay();
        
        // æ ¹æ®é…ç½®å»¶è¿ŸåŽæ’­æ”¾æ’¤é€€éŸ³æ•ˆ
        setTimeout(() => {
            console.log('Playing retreat crawling sound...');
            this.game.assets.playSound('ventCrawling', false, 1.0);
            
            // æ ¹æ®é…ç½®æŒç»­æ—¶é•¿åŽåœæ­¢éŸ³æ•ˆ
            setTimeout(() => {
                this.game.assets.stopSound('ventCrawling');
            }, config.retreatSoundDuration);
        }, config.retreatDelay);
        
        return true;
    }
    
    // æ£€æŸ¥é€šé£Žå£çŠ¶æ€å˜åŒ–ï¼ˆä»ŽGame.jsè°ƒç”¨ï¼‰
    onVentsChanged(ventsClosed) {
        // å¦‚æžœTrumpæ­£åœ¨çˆ¬è¡Œä¸”çŽ©å®¶å…³é—­äº†é€šé£Žå£ï¼Œé˜»æ­¢Trump
        if (this.trump.isCrawling && ventsClosed) {
            this.stopTrumpCrawling();
        }
    }
    
    // ä½¿ç”¨soundå¸å¼•æ•Œäººï¼ˆä»ŽCameraSystemè°ƒç”¨ï¼‰
    attractToSound(soundLocation) {
        let epAttracted = false;
        let trumpAttracted = false;
        
        // å°è¯•å¸å¼•EP
        const epCurrentLoc = this.epstein.currentLocation;
        const adjacentToEp = this.adjacentRooms[epCurrentLoc];
        
        if (this.epstein.hasSpawned && adjacentToEp && adjacentToEp.includes(soundLocation)) {
            // æ ¹æ®é…ç½®æ£€æŸ¥æ˜¯å¦æŠµæŠ—soundå¸å¼•
            const resistance = this.currentEpsteinConfig.soundLureResistance;
            if (resistance > 0) {
                const failChance = Math.random();
                if (failChance < resistance) {
                    console.log(`Epstein resisted the sound lure! (${resistance * 100}% chance on Night ${this.game.state.currentNight})`);
                    // å¸å¼•å¤±è´¥ï¼Œä½†ä»ç„¶æ’­æ”¾éŸ³æ•ˆè®©çŽ©å®¶ä»¥ä¸ºæˆåŠŸäº†
                    this.game.assets.playSound('blip', false, 0.5);
                    return false; // è¿”å›žfalseè¡¨ç¤ºæ²¡æœ‰çœŸæ­£å¸å¼•åˆ°
                }
            }
            
            // å¸å¼•æˆåŠŸï¼ŒEPç§»åŠ¨åˆ°soundä½ç½®ï¼ˆå¯ä»¥å‰è¿›æˆ–åŽé€€ï¼‰
            const currentDepth = this.locationDepth[epCurrentLoc];
            const soundDepth = this.locationDepth[soundLocation];
            console.log(`Epstein attracted by sound: ${epCurrentLoc} (depth ${currentDepth}) -> ${soundLocation} (depth ${soundDepth})`);
            
            this.epstein.currentLocation = soundLocation;
            
            // æ’­æ”¾ç§»åŠ¨éŸ³æ•ˆ
            this.game.assets.playSound('blip', false, 0.5);
            
            // å¦‚æžœåˆ°è¾¾åŠžå…¬å®¤ï¼Œè§¦å‘æ¸¸æˆç»“æŸ
            if (soundLocation === 'office') {
                this.triggerJumpscare('epstein');
            }
            
            epAttracted = true;
        } else {
            console.log(`Sound at ${soundLocation} is not adjacent to Epstein at ${epCurrentLoc}`);
        }
        
        // å°è¯•å¸å¼•Trumpï¼ˆå¦‚æžœå·²å‡ºåœºä¸”ä¸åœ¨çˆ¬è¡ŒçŠ¶æ€ï¼‰
        const trumpCurrentLoc = this.trump.currentLocation;
        const adjacentToTrump = this.adjacentRooms[trumpCurrentLoc];
        
        if (this.trump.hasSpawned && !this.trump.isCrawling && adjacentToTrump && adjacentToTrump.includes(soundLocation)) {
            // å¸å¼•æˆåŠŸï¼ŒTrumpç§»åŠ¨åˆ°soundä½ç½®ï¼ˆå¯ä»¥å‰è¿›æˆ–åŽé€€ï¼‰
            const currentDepth = this.trumpLocationDepth[trumpCurrentLoc];
            const soundDepth = this.trumpLocationDepth[soundLocation];
            console.log(`Trump attracted by sound: ${trumpCurrentLoc} (depth ${currentDepth}) -> ${soundLocation} (depth ${soundDepth})`);
            
            this.trump.currentLocation = soundLocation;
            
            // æ’­æ”¾ç§»åŠ¨éŸ³æ•ˆï¼ˆå¦‚æžœEPæ²¡æœ‰æ’­æ”¾ï¼‰
            if (!epAttracted) {
                this.game.assets.playSound('blip', false, 0.5);
            }
            
            // å¦‚æžœåˆ°è¾¾åŠžå…¬å®¤ï¼Œè§¦å‘æ¸¸æˆç»“æŸ
            if (soundLocation === 'office') {
                this.triggerJumpscare('trump');
            }
            
            trumpAttracted = true;
        } else if (this.trump.hasSpawned && !this.trump.isCrawling) {
            console.log(`Sound at ${soundLocation} is not adjacent to Trump at ${trumpCurrentLoc}`);
        }
        
        // æ³¨æ„ï¼šä¸åœ¨è¿™é‡Œæ›´æ–°æ˜¾ç¤ºï¼Œç”±CameraSystemçš„åŠ¨ç”»å¤„ç†
        
        return epAttracted || trumpAttracted;
    }
    
    // è§¦å‘æ‘„åƒå¤´æ•…éšœ
    triggerCameraFailure() {
        console.log('Camera system failure!');
        this.game.state.cameraFailed = true;
        
        // æ’­æ”¾é™æ€å™ªéŸ³
        this.game.assets.playSound('static', true, 1.0);
        
        // å¦‚æžœæ‘„åƒå¤´æ‰“å¼€ï¼Œç«‹å³æ˜¾ç¤ºæ•…éšœæ•ˆæžœ
        if (this.game.state.cameraOpen) {
            this.game.camera.showCameraFailure();
        }
        // å¦‚æžœæ‘„åƒå¤´æ²¡æ‰“å¼€ï¼Œä¸‹æ¬¡æ‰“å¼€æ—¶ä¼šè‡ªåŠ¨æ˜¾ç¤ºæ•…éšœæ•ˆæžœï¼ˆåœ¨open()æ–¹æ³•ä¸­ï¼‰
    }

    // æ›´æ–°æ‘„åƒå¤´æ˜¾ç¤º
    updateCameraDisplay() {
        // ç›´æŽ¥è°ƒç”¨ CameraSystem çš„æ˜¾ç¤ºæ–¹æ³•
        if (this.game.camera) {
            this.game.camera.updateCharacterDisplay();
        }
    }

    // è§¦å‘è·³æ€
    triggerJumpscare(enemy = 'epstein') {
        console.log(`JUMPSCARE by ${enemy}!`);
        this.stop();
        
        // éœé‡‘çš„ç‰¹æ®Šè·³æ€åŠ¨ç”»
        if (enemy === 'hawking') {
            this.triggerHawkingMissileJumpscare();
            return;
        }
        
        // åœæ­¢æ‰€æœ‰éŸ³æ•ˆ
        this.game.assets.stopSound('vents');
        this.game.assets.stopSound('static');
        
        // åˆ›å»ºè·³æ€åŠ¨ç”»å®¹å™¨
        const jumpscareContainer = document.createElement('div');
        jumpscareContainer.id = 'jumpscare-container';
        jumpscareContainer.style.position = 'fixed';
        jumpscareContainer.style.top = '0';
        jumpscareContainer.style.left = '0';
        jumpscareContainer.style.width = '100%';
        jumpscareContainer.style.height = '100%';
        jumpscareContainer.style.display = 'flex';
        jumpscareContainer.style.alignItems = 'center';
        jumpscareContainer.style.justifyContent = 'center';
        jumpscareContainer.style.zIndex = '99999';
        jumpscareContainer.style.overflow = 'hidden';
        
        // åˆ›å»ºåŠžå…¬å®¤èƒŒæ™¯
        const officeBackground = document.createElement('img');
        officeBackground.src = this.game.assets.images.office.src;
        officeBackground.style.position = 'absolute';
        officeBackground.style.top = '0';
        officeBackground.style.left = '0';
        officeBackground.style.width = '100%';
        officeBackground.style.height = '100%';
        officeBackground.style.objectFit = 'cover';
        officeBackground.style.zIndex = '1';
        
        // åˆ›å»ºè·³æ€å›¾ç‰‡ï¼ˆå±…ä¸­æ˜¾ç¤ºï¼‰
        const jumpscareImg = document.createElement('img');
        // æ ¹æ®æ•Œäººé€‰æ‹©è·³æ€å›¾ç‰‡
        if (enemy === 'trump') {
            jumpscareImg.src = this.game.assets.images.trumpJumpscare?.src || this.game.assets.images.jumpscare.src;
        } else if (enemy === 'hawking') {
            jumpscareImg.src = this.game.assets.images.hawkingJumpscare?.src || this.game.assets.images.jumpscare.src;
        } else {
            jumpscareImg.src = this.game.assets.images.jumpscare.src;
        }
        jumpscareImg.style.position = 'absolute';
        jumpscareImg.style.top = '50%';
        jumpscareImg.style.left = '50%';
        jumpscareImg.style.transform = 'translate(-50%, -50%)';
        jumpscareImg.style.width = '25%'; // åˆå§‹å¤§å°25%
        jumpscareImg.style.height = 'auto';
        jumpscareImg.style.zIndex = '2';
        jumpscareImg.style.transition = 'none';
        
        jumpscareContainer.appendChild(officeBackground);
        jumpscareContainer.appendChild(jumpscareImg);
        document.body.appendChild(jumpscareContainer);
        
        // æ’­æ”¾è·³æ€éŸ³æ•ˆ
        if (enemy === 'hawking') {
            this.game.assets.playSound('hawkingJumpscare', false, 1.0);
        } else {
            this.game.assets.playSound('jumpscare', false, 1.0);
        }
        
        // ç¬¬1å¸§ï¼š25% (ç«‹å³æ˜¾ç¤º)
        // å·²ç»è®¾ç½®
        
        // ç¬¬2å¸§ï¼š50% (0.15ç§’åŽ)
        setTimeout(() => {
            jumpscareImg.style.width = '50%';
        }, 150);
        
        // ç¬¬3å¸§ï¼š100% (0.3ç§’åŽ)
        setTimeout(() => {
            jumpscareImg.style.width = '100%';
        }, 300);
        
        // 1.5ç§’åŽæ·¡å‡ºå¹¶æ˜¾ç¤ºæ¸¸æˆç»“æŸç”»é¢
        setTimeout(() => {
            jumpscareContainer.style.transition = 'opacity 0.5s';
            jumpscareContainer.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(jumpscareContainer);
                this.game.gameOver('GAME OVER');
            }, 500);
        }, 1500);
    }

    // èŽ·å–å½“å‰ä½ç½®
    getCurrentLocation() {
        return this.epstein.currentLocation;
    }
    
    // èŽ·å–å½“å‰EPçš„å›¾ç‰‡ï¼ˆæ ¹æ®å¤œæ•°é€‰æ‹©æ˜¯å¦å¸¦ç”µçœ¼ï¼‰
    getCurrentImage(cam, night) {
        if (night === 6 && this.characterImagesNight6[cam]) {
            return this.characterImagesNight6[cam];
        }
        return this.characterImages[cam];
    }
    
    // èŽ·å–Trumpå½“å‰ä½ç½®
    getTrumpCurrentLocation() {
        return this.trump.currentLocation;
    }
    
    // æ£€æŸ¥Trumpæ˜¯å¦æ­£åœ¨çˆ¬è¡Œ
    isTrumpCrawling() {
        return this.trump.isCrawling;
    }

    // é‡ç½®AI
    reset() {
        this.stop();
        
        // é‡ç½® Epstein
        this.epstein.currentLocation = 'cam11';
        this.epstein.aiLevel = 0;
        this.epstein.hasMovedOnce = false;
        this.epstein.hasSpawned = false;
        this.epstein.night4AggressiveMode = false; // é‡ç½®Night 4æ¿€è¿›æ¨¡å¼æ ‡å¿—
        if (this.epstein.timer) {
            clearTimeout(this.epstein.timer);
            this.epstein.timer = null;
        }
        
        // é‡ç½® Trump
        this.trump.currentLocation = 'cam10';
        this.trump.aiLevel = 0;
        this.trump.hasSpawned = false;
        this.trump.isCrawling = false;
        this.trump.crawlingFrom = null;
        this.trump.night5AggressiveMode = false; // é‡ç½®Night 5æ¿€è¿›æ¨¡å¼æ ‡å¿—
        if (this.trump.timer) {
            clearTimeout(this.trump.timer);
            this.trump.timer = null;
        }
        if (this.trump.crawlingTimer) {
            clearTimeout(this.trump.crawlingTimer);
            this.trump.crawlingTimer = null;
        }
        if (this.trump.retreatTimer) {
            clearTimeout(this.trump.retreatTimer);
            this.trump.retreatTimer = null;
        }
        
        // é‡ç½® Hawking
        this.hawking.active = false;
        this.hawking.warningLevel = 0;
        if (this.hawking.timer) {
            clearTimeout(this.hawking.timer);
            this.hawking.timer = null;
        }
        if (this.hawking.warningTimer) {
            clearTimeout(this.hawking.warningTimer);
            this.hawking.warningTimer = null;
        }
        if (this.hawking.attackTimer) {
            clearTimeout(this.hawking.attackTimer);
            this.hawking.attackTimer = null;
        }
        this.hideHawkingWarning();
        
        // æ¸…é™¤æ‰€æœ‰è§’è‰²æ˜¾ç¤º
        const characterOverlay = document.getElementById('character-overlay');
        if (characterOverlay) {
            characterOverlay.innerHTML = '';
        }
        
        console.log('EnemyAI reset complete');
    }
    
    // å¯åŠ¨éœé‡‘æœºåˆ¶
    startHawking() {
        this.hawking.active = true;
        this.hawking.warningLevel = 0;
        console.log('Hawking started at cam6');
        
        // æ ¹æ®AIç­‰çº§è®¡ç®—è­¦å‘Šæ—¶é—´
        // AIç­‰çº§è¶Šé«˜ï¼Œè­¦å‘Šæ—¶é—´è¶ŠçŸ­ï¼ˆæ›´éš¾ï¼‰
        // AI 1-5: 30ç§’ â†’ é»„è‰²
        // AI 6-10: 25ç§’ â†’ é»„è‰²
        // AI 11-15: 20ç§’ â†’ é»„è‰²
        // AI 16-20: 18ç§’ â†’ é»„è‰²
        let initialWarningTime = 30000; // é»˜è®¤30ç§’
        
        if (this.game.state.customNight && this.game.state.currentNight === 7) {
            const hawkingLevel = this.game.state.customAILevels.hawking;
            if (hawkingLevel >= 16) {
                initialWarningTime = 18000; // 18ç§’
            } else if (hawkingLevel >= 11) {
                initialWarningTime = 20000; // 20ç§’
            } else if (hawkingLevel >= 6) {
                initialWarningTime = 25000; // 25ç§’
            } else {
                initialWarningTime = 30000; // 30ç§’
            }
            console.log(`Hawking AI Level ${hawkingLevel}: Initial warning in ${initialWarningTime/1000}s`);
        } else {
            // æ™®é€šå¤œæ™šä½¿ç”¨é»˜è®¤20ç§’
            initialWarningTime = 20000;
        }
        
        // Xç§’åŽå¼€å§‹é»„è‰²è­¦å‘Š
        this.hawking.timer = setTimeout(() => {
            this.showHawkingWarning('yellow');
        }, initialWarningTime);
    }
    
    // æ˜¾ç¤ºéœé‡‘è­¦å‘Š
    showHawkingWarning(level) {
        if (!this.hawking.active) return;
        
        console.log(`Hawking warning: ${level}`);
        
        // æ ¹æ®AIç­‰çº§è®¡ç®—è­¦å‘Šå‡çº§æ—¶é—´
        // AIç­‰çº§è¶Šé«˜ï¼Œè­¦å‘Šå‡çº§è¶Šå¿«ï¼ˆæ›´éš¾ï¼‰
        let yellowToRedTime = 5000; // é»˜è®¤5ç§’
        let redToBreakTime = 5000;  // é»˜è®¤5ç§’
        
        if (this.game.state.customNight && this.game.state.currentNight === 7) {
            const hawkingLevel = this.game.state.customAILevels.hawking;
            if (hawkingLevel >= 16) {
                yellowToRedTime = 3000; // 3ç§’
                redToBreakTime = 3000;  // 3ç§’
            } else if (hawkingLevel >= 11) {
                yellowToRedTime = 4000; // 4ç§’
                redToBreakTime = 4000;  // 4ç§’
            } else if (hawkingLevel >= 6) {
                yellowToRedTime = 5000; // 5ç§’
                redToBreakTime = 5000;  // 5ç§’
            } else {
                yellowToRedTime = 6000; // 6ç§’
                redToBreakTime = 6000;  // 6ç§’
            }
        }
        
        if (level === 'yellow') {
            this.hawking.warningLevel = 1;
            this.updateHawkingWarningDisplay();
            
            // Xç§’åŽå‡çº§ä¸ºçº¢è‰²è­¦å‘Š
            this.hawking.warningTimer = setTimeout(() => {
                this.showHawkingWarning('red');
            }, yellowToRedTime);
        } else if (level === 'red') {
            this.hawking.warningLevel = 2;
            this.updateHawkingWarningDisplay();
            
            // Xç§’åŽæ‘„åƒå¤´åæŽ‰
            this.hawking.warningTimer = setTimeout(() => {
                this.hawkingBreakCamera();
            }, redToBreakTime);
        }
    }
    
    // æ›´æ–°éœé‡‘è­¦å‘Šæ˜¾ç¤º
    updateHawkingWarningDisplay() {
        let warningIcon = document.getElementById('hawking-warning-icon');
        
        if (!warningIcon) {
            warningIcon = document.createElement('img');
            warningIcon.id = 'hawking-warning-icon';
            warningIcon.style.position = 'absolute';
            warningIcon.style.zIndex = '1000';
            warningIcon.style.display = 'block';
            warningIcon.style.animation = 'flash 0.5s infinite';
            
            // æ ¹æ®æ‘„åƒå¤´çŠ¶æ€å†³å®šæ·»åŠ åˆ°å“ªé‡Œ
            if (this.game.state.cameraOpen) {
                const cameraGrid = document.getElementById('camera-grid');
                if (cameraGrid) {
                    cameraGrid.appendChild(warningIcon);
                }
            } else {
                document.body.appendChild(warningIcon);
            }
        }
        
        // æ ¹æ®æ‘„åƒå¤´çŠ¶æ€å†³å®šä½ç½®å’Œå¤§å°
        if (this.game.state.cameraOpen) {
            // æ‘„åƒå¤´æ‰“å¼€ï¼šåœ¨åœ°å›¾ä¸Š cam6 å³è¾¹ï¼Œä½¿ç”¨ç›¸å¯¹äºŽåœ°å›¾çš„ç™¾åˆ†æ¯”å®šä½
            // cam6 ä½ç½®: x: 77.2%, y: 82.2%, width: 13.0%, height: 8.0%
            // è­¦å‘Šå›¾æ ‡æ”¾åœ¨ cam6 å³è¾¹
            warningIcon.style.position = 'absolute';
            warningIcon.style.left = '91%'; // 77.2% + 13.0% + å°é—´è·
            warningIcon.style.top = '82.2%';
            warningIcon.style.width = '11.2%'; // 8% * 1.4 = 11.2%
            warningIcon.style.height = 'auto';
            warningIcon.style.transform = 'none';
            
            // ç¡®ä¿åœ¨åœ°å›¾å®¹å™¨ä¸­
            const cameraGrid = document.getElementById('camera-grid');
            if (cameraGrid && warningIcon.parentElement !== cameraGrid) {
                cameraGrid.appendChild(warningIcon);
            }
        } else {
            // æ‘„åƒå¤´å…³é—­ï¼šåœ¨é£Žæ‰‡æ ‡å¿—ï¼ˆæ°§æ°”æ˜¾ç¤ºï¼‰å·¦è¾¹ï¼Œä½¿ç”¨ fixed å®šä½
            warningIcon.style.position = 'fixed';
            warningIcon.style.left = 'auto';
            warningIcon.style.right = 'calc(2vw + 15vw)'; // æ°§æ°”æ˜¾ç¤ºå³è¾¹è· + æ°§æ°”æ˜¾ç¤ºå®½åº¦ + é—´è·
            warningIcon.style.top = 'auto';
            warningIcon.style.bottom = '2vh';
            warningIcon.style.width = '3vw';
            warningIcon.style.height = 'auto';
            warningIcon.style.transform = 'none';
            
            // ç¡®ä¿åœ¨ body ä¸­
            if (warningIcon.parentElement !== document.body) {
                document.body.appendChild(warningIcon);
            }
        }
        
        // è®¾ç½®è­¦å‘Šå›¾ç‰‡
        if (this.hawking.warningLevel === 1) {
            warningIcon.src = 'assets/images/Warninglight.png';
        } else if (this.hawking.warningLevel === 2) {
            warningIcon.src = 'assets/images/Warningheavy.png';
        }
    }
    
    // éšè—éœé‡‘è­¦å‘Š
    hideHawkingWarning() {
        const warningIcon = document.getElementById('hawking-warning-icon');
        if (warningIcon) {
            warningIcon.remove();
        }
    }
    
    // éœé‡‘ç ´åæ‘„åƒå¤´
    hawkingBreakCamera() {
        console.log('Hawking broke the camera!');
        
        // éšè—è­¦å‘Š
        this.hideHawkingWarning();
        
        // æ‘„åƒå¤´åæŽ‰
        this.triggerCameraFailure();
        
        // éœé‡‘ä»Žcam6æ¶ˆå¤±
        this.hawking.active = false;
        this.updateCameraDisplay();
        
        // 4ç§’åŽè·³æ€
        this.hawking.attackTimer = setTimeout(() => {
            this.triggerJumpscare('hawking');
        }, 4000);
    }
    
    // éœé‡‘çš„å¯¼å¼¹è·³æ€åŠ¨ç”»
    triggerHawkingMissileJumpscare() {
        console.log('Hawking missile jumpscare!');
        
        // åœæ­¢æ‰€æœ‰éŸ³æ•ˆ
        this.game.assets.stopSound('vents');
        this.game.assets.stopSound('static');
        
        // åˆ›å»ºè·³æ€åŠ¨ç”»å®¹å™¨
        const jumpscareContainer = document.createElement('div');
        jumpscareContainer.id = 'jumpscare-container';
        jumpscareContainer.style.position = 'fixed';
        jumpscareContainer.style.top = '0';
        jumpscareContainer.style.left = '0';
        jumpscareContainer.style.width = '100%';
        jumpscareContainer.style.height = '100%';
        jumpscareContainer.style.zIndex = '99999';
        jumpscareContainer.style.overflow = 'hidden';
        jumpscareContainer.style.backgroundColor = '#000';
        
        // åˆ›å»ºåŠžå…¬å®¤èƒŒæ™¯
        const officeBackground = document.createElement('img');
        officeBackground.src = this.game.assets.images.office.src;
        officeBackground.style.position = 'absolute';
        officeBackground.style.top = '0';
        officeBackground.style.left = '0';
        officeBackground.style.width = '100%';
        officeBackground.style.height = '100%';
        officeBackground.style.objectFit = 'cover';
        officeBackground.style.zIndex = '1';
        
        // åˆ›å»ºéœé‡‘å›¾ç‰‡ï¼ˆåœ¨æˆ¿é—´é‡Œï¼‰
        const hawkingImg = document.createElement('img');
        hawkingImg.src = 'assets/images/mrstephen.png';
        hawkingImg.style.position = 'absolute';
        hawkingImg.style.left = '43.6%';
        hawkingImg.style.bottom = '27.4%';
        hawkingImg.style.width = '30%';
        hawkingImg.style.height = 'auto';
        hawkingImg.style.zIndex = '2';
        hawkingImg.style.filter = 'brightness(0.68) contrast(1) saturate(1)';
        
        // åˆ›å»ºå¯¼å¼¹å›¾ç‰‡ï¼ˆä»Žéœé‡‘ä½ç½®é£žå‘çŽ©å®¶ï¼‰
        const missileImg = document.createElement('img');
        missileImg.src = 'assets/images/front.png';
        missileImg.style.position = 'absolute';
        missileImg.style.left = '25%';
        missileImg.style.top = '40%';
        missileImg.style.width = '5%';
        missileImg.style.height = 'auto';
        missileImg.style.zIndex = '3';
        missileImg.style.transition = 'all 1s ease-out';
        
        // åˆ›å»ºçˆ†ç‚¸å¸§å›¾å®¹å™¨ï¼ˆåˆå§‹éšè—ï¼‰
        const explosionImg = document.createElement('div');
        explosionImg.style.position = 'absolute';
        explosionImg.style.top = '50%';
        explosionImg.style.left = '50%';
        explosionImg.style.transform = 'translate(-50%, -50%)';
        explosionImg.style.width = '50vw'; // å®¹å™¨å®½åº¦
        explosionImg.style.height = '50vh'; // å®¹å™¨é«˜åº¦
        explosionImg.style.zIndex = '4';
        explosionImg.style.backgroundImage = 'url(assets/images/exp2.png)';
        explosionImg.style.backgroundSize = '400% auto'; // 4åˆ—ï¼Œé«˜åº¦è‡ªé€‚åº”
        explosionImg.style.backgroundRepeat = 'no-repeat';
        explosionImg.style.backgroundPosition = '0% 0%';
        explosionImg.style.display = 'none';
        
        jumpscareContainer.appendChild(officeBackground);
        jumpscareContainer.appendChild(hawkingImg);
        jumpscareContainer.appendChild(missileImg);
        jumpscareContainer.appendChild(explosionImg);
        document.body.appendChild(jumpscareContainer);
        
        // æ’­æ”¾éœé‡‘è·³æ€éŸ³æ•ˆ
        this.game.assets.playSound('hawkingJumpscare', false, 1.0);
        
        // å¯¼å¼¹é£žå‘çŽ©å®¶ï¼ˆæ”¾å¤§å¹¶ç§»åŠ¨åˆ°ä¸­å¿ƒï¼‰
        setTimeout(() => {
            missileImg.style.left = '50%';
            missileImg.style.top = '50%';
            missileImg.style.transform = 'translate(-50%, -50%)';
            missileImg.style.width = '80%';
        }, 50);
        
        // 1ç§’åŽå¯¼å¼¹åˆ°è¾¾ï¼Œå¼€å§‹çˆ†ç‚¸åŠ¨ç”»
        setTimeout(() => {
            missileImg.style.display = 'none';
            explosionImg.style.display = 'block';
            
            // æ’­æ”¾çˆ†ç‚¸å¸§åŠ¨ç”»ï¼ˆä½¿ç”¨ç¬¬ä¸€åˆ—çš„4å¸§ï¼ŒåŽŸå›¾æ˜¯4åˆ—3è¡Œï¼‰
            let frame = 0;
            const totalFrames = 3; // 0-3å…±4å¸§
            const frameInterval = 80; // æ¯å¸§80ms
            
            // ç¬¬ä¸€åˆ—çš„4å¸§å¯¹åº”çš„Yä½ç½®ï¼ˆæ‰‹åŠ¨è°ƒæ•´åŽçš„ç²¾ç¡®ä½ç½®ï¼‰
            const yPositions = [8.00, 36.50, 65.00, 93.00];
            
            const animateExplosion = setInterval(() => {
                // Xä½ç½®å›ºå®šåœ¨0%ï¼ˆç¬¬ä¸€åˆ—ï¼‰ï¼ŒYä½ç½®ä½¿ç”¨é¢„è®¾æ•°ç»„
                explosionImg.style.backgroundPosition = `0% ${yPositions[frame]}%`;
                
                frame++;
                if (frame > totalFrames) {
                    clearInterval(animateExplosion);
                    
                    // çˆ†ç‚¸åŠ¨ç”»ç»“æŸåŽæ·¡å‡º
                    setTimeout(() => {
                        jumpscareContainer.style.transition = 'opacity 0.5s';
                        jumpscareContainer.style.opacity = '0';
                        
                        setTimeout(() => {
                            document.body.removeChild(jumpscareContainer);
                            this.game.gameOver('GAME OVER');
                        }, 500);
                    }, 200);
                }
            }, frameInterval);
        }, 1000);
    }
    
    // ç”µå‡»éœé‡‘ï¼ˆçŽ©å®¶ç‚¹å‡»æŒ‰é’®ï¼‰
    shockHawking() {
        if (!this.hawking.active) {
            console.log('Hawking is not active');
            return false;
        }
        
        console.log('Hawking shocked! Resetting timer...');
        
        // æ¸…é™¤æ‰€æœ‰è®¡æ—¶å™¨
        if (this.hawking.timer) {
            clearTimeout(this.hawking.timer);
            this.hawking.timer = null;
        }
        if (this.hawking.warningTimer) {
            clearTimeout(this.hawking.warningTimer);
            this.hawking.warningTimer = null;
        }
        if (this.hawking.attackTimer) {
            clearTimeout(this.hawking.attackTimer);
            this.hawking.attackTimer = null;
        }
        
        // é‡ç½®è­¦å‘Šç­‰çº§
        this.hawking.warningLevel = 0;
        this.hideHawkingWarning();
        
        // æ’­æ”¾ç”µå‡»éŸ³æ•ˆ
        this.game.assets.playSound('hawking_shock', false, 0.8);
        
        // æ ¹æ®AIç­‰çº§è®¡ç®—é‡ç½®åŽçš„è­¦å‘Šæ—¶é—´
        let resetWarningTime = 20000; // é»˜è®¤20ç§’
        
        if (this.game.state.customNight && this.game.state.currentNight === 7) {
            const hawkingLevel = this.game.state.customAILevels.hawking;
            if (hawkingLevel >= 16) {
                resetWarningTime = 18000; // 18ç§’
            } else if (hawkingLevel >= 11) {
                resetWarningTime = 20000; // 20ç§’
            } else if (hawkingLevel >= 6) {
                resetWarningTime = 25000; // 25ç§’
            } else {
                resetWarningTime = 30000; // 30ç§’
            }
        }
        
        // Xç§’åŽé‡æ–°å¼€å§‹è­¦å‘Š
        this.hawking.timer = setTimeout(() => {
            this.showHawkingWarning('yellow');
        }, resetWarningTime);
        
        return true;
    }
}
