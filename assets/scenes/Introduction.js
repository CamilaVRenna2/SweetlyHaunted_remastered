export default class Introduction extends Phaser.Scene {
    constructor() {
        super("Introduction");
    }
  
    init() { }

    create () {
        this.fadingOverlay = this.add
        .rectangle(
          0,
          0,
          this.cameras.main.width,
          this.cameras.main.height,
          0x000000
        ) 
        this.fadingOverlay.setOrigin(0, 0);
        this.fadingOverlay.setDepth(4);
        this.fadingOverlay.setAlpha(0);
  
        this.add.image(600,380, "introComic");
        this.pointerSound = this.sound.add ("pointer");
    

        this.continueButton = this.add.image (1180, 713, "continueButton").setInteractive();
        this.continueButton.on("pointerdown", () => {
            this.continueButton.setFrame(1);
            this.pointerSound.play();
          });
        this.continueButton.on ("pointerover", () => {
            this.continueButton.setFrame(1);
        }) 
        this.continueButton.on ("pointerup", () => {
            this.tweens.add({
                targets: this.fadingOverlay,
                alpha: 1,
                duration: 1000,
                onComplete: () => {
                    this.scene.start ("LevelSelector");
                    
                },
              });
           
        }) 

        
    }
}
