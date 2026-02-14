// æ¸¸æˆçŠ¶æ€ç®¡ç†
class GameState {
    constructor() {
        this.currentNight = 1;
        this.maxNights = 5; // å½“å‰ç‰ˆæœ¬æœ‰5æ™šï¼ˆNight 1-5ï¼‰ï¼ŒNight 6 æ˜¯ç‰¹æ®Šå…³å¡
        this.currentTime = 0; // 0-6 (12AM-6AM)
        this.oxygen = 100; // æ°§æ°”æ›¿ä»£ç”µé‡
        this.isGameRunning = false;
        this.tutorialActive = false; // æ•™ç¨‹æ˜¯å¦æ¿€æ´»
        this.currentScene = 'office';
        this.cameraOpen = false;
        this.ventsClosed = false; // é€šé£Žå£çŠ¶æ€
        this.ventsToggling = false; // é€šé£Žå£æ˜¯å¦æ­£åœ¨åˆ‡æ¢
        this.currentCam = 'cam11'; // å½“å‰æ‘„åƒå¤´
        this.cameraFailed = false; // æ‘„åƒå¤´æ˜¯å¦æ•…éšœ
        this.cameraRestarting = false; // æ‘„åƒå¤´æ˜¯å¦æ­£åœ¨é‡å¯
        this.controlPanelBusy = false; // æŽ§åˆ¶é¢æ¿æ˜¯å¦æ­£åœ¨å¤„ç†æ“ä½œ
        
        // Custom Night çŠ¶æ€
        this.customNight = false; // æ˜¯å¦ä¸ºè‡ªå®šä¹‰å¤œæ™š
        this.customAILevels = {
            epstein: 0,
            trump: 0,
            hawking: 0
        };
    }

    reset() {
        this.currentTime = 0;
        this.oxygen = 100;
        this.isGameRunning = true;
        this.tutorialActive = false;
        this.currentScene = 'office';
        this.cameraOpen = false;
        this.ventsClosed = false;
        this.ventsToggling = false;
        this.currentCam = 'cam11';
        this.cameraFailed = false;
        this.cameraRestarting = false;
        this.controlPanelBusy = false;
        // æ³¨æ„ï¼šä¸é‡ç½® customNight å’Œ customAILevelsï¼Œå› ä¸ºå®ƒä»¬åœ¨ initGame ä¹‹å‰è®¾ç½®
    }
}