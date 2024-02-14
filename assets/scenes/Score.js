export default class Score extends Phaser.Scene {
    constructor() {
        super("score");
    }
  
    init(data) {
        this.level = data.level;
        this.score = data.score || 10;
        this.amountcandys = 0;
        this.health = 3;
        this.ghostVelocity = data.ghostVelocity|| -170
        this.level1Score = data.level1Score || 0;
        this.level2Score = data.level2Score || 0;
        this.level3Score = data.level3Score || 0;
     
    }

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

        this.add.image (610, 380,"score")
         
        this.scoreText = this.add.text (50, 100, `Puntos: ${this.score}  nivel: ${this.level - 1}`, {
            fontSize: "80px"
        });

        this.continueButton = this.add.image (1220/2, 763 * 0.75, "continueButton").setInteractive();
        this.continueButton.on ("pointedown", () => {
            this.continueButton.setFrame(1);
            this.pointerSound.play();
        }) 
        this.continueButton.on ("pointerover", () => {
            this.continueButton.setFrame(1);
        }) 
        this.continueButton.on ("pointerup", () => {
            this.tweens.add({
                targets: this.fadingOverlay,
                alpha: 1,
                duration: 500,
                onComplete: () => {
                    this.scene.start ("LevelSelector", {
                        score: this.score,
                        level1Score: this.level1Score,
                        level2Score: this.level2Score,
                        level3Score: this.level3Score,
                        level: this.level,
                            
                    });
               
                },
              });
          
            }) 
        
    }
}
