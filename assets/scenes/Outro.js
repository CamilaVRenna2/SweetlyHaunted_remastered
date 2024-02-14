export default class Outro extends Phaser.Scene {
    constructor() {
        super("Outro");
    }
  
    init() { }

    create () {
        this.fadingOverlay = this.add
        .rectangle(
          0,
          0,
          this.cameras.main.width,
          this.cameras.main.height,
          0xFFFFFF
        ) 
        this.fadingOverlay.setOrigin(0, 0);
        this.fadingOverlay.setDepth(4);
        this.fadingOverlay.setAlpha(0);
  
        this.add.image(600,380, "outro1Comic");
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
                    this.continueButton.destroy();
                    this.add.image(600,380, "outro2Comic");
                    this.tweens.add({
                        targets: this.fadingOverlay,
                        alpha: 0,
                        duration: 1000,
                        onComplete: () => {
               
                    this.continueButton2 = this.add.image (1180, 713, "continueButton").setInteractive();
        this.continueButton2.on("pointerdown", () => {
            this.continueButton2.setFrame(1);
            this.pointerSound.play();
          });
        this.continueButton2.on ("pointerover", () => {
            this.continueButton2.setFrame(1);
        }) 
        this.continueButton2.on ("pointerup", () => {
            this.scene.start("Credits")
        });
                },
              });
            },
        });
           
        }) 

    
    }
}
