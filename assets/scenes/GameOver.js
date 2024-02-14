export default class GameOver extends Phaser.Scene {
    constructor() {
      super("GameOver");
    }

    init(data) {
      this.score = data.score;
      this.level1Score = data.level1Score || 0;
      this.level2Score = data.level2Score || 0;
      this.level3Score = data.level3Score || 0;
      this.level= data.level;
    }

    create(){

      if (this.level === 1) {
        this.level1Score = 0;
      }
      if (this.level === 2) {
        this.level2Score = 0;
      }
      if (this.level === 3) {
        this.level3Score = 0;
      }
        this.add.image(610, 380, "gameOver");
        let retryButton = this.add
        .image(1100, 660, "retryButton")
        .setInteractive(this.input.makePixelPerfect());
    retryButton.on("pointerdown", () => {
            retryButton.setTexture("retryButtonPressed");
          });
      retryButton.on("pointerup", () => {
        this.scene.start("LevelSelector", {
          score: this.score,
        });
      });

      //add candy cuantity text
      this.candyText = this.add.text(500, 500, `Cantidad:  ${this.score}`,{ 
        fontSize: "50px",} )
      this.add.text(350, 50, `Perdiste!`,{ 
        fontSize: "100px",})
  
      retryButton.on("pointerout", () => {
        retryButton.setTexture("retryButton");
      });
    }
}