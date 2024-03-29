export default class Tutorial extends Phaser.Scene {
    constructor() {
      super("Tutorial");
    }
    init(data){
    this.level=data.level;
    }

    create(){
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
        this.add.image(610, 380, "tutorial");
      let tutoButton = this.add
        .image(580, 430, "continueButton")
        .setInteractive(this.input.makePixelPerfect());

      tutoButton.on("pointerover", () => {
        tutoButton.setFrame(1);
      });
      tutoButton.on("pointerup", () => {
        this.tweens.add({
          targets: this.fadingOverlay,
          alpha: 1,
          duration: 500,
          onComplete: () => {
            this.scene.start("Game", {level: this.level});
            // this.menuSong.stop ({loop: false});
          },
        });
      });
  
      tutoButton.on("pointerout", () => {
        tutoButton.setFrame(0);
      });
      tutoButton.on("pointerdown", () => {
        tutoButton.setFrame(2);
      });
    }
}