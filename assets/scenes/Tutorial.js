export default class Tutorial extends Phaser.Scene {
    constructor() {
      super("Tutorial");
    }
    init(data){
    this.level=data.level;
    }

    create(){
        this.add.image(610, 380, "tutorial");
      let tutoButton = this.add
        .image(580, 430, "continueButton")
        .setInteractive(this.input.makePixelPerfect());

      tutoButton.on("pointerover", () => {
        tutoButton.setFrame(1);
      });
      tutoButton.on("pointerup", () => {
        this.scene.start("Game", {level: this.level});
      });
  
      tutoButton.on("pointerout", () => {
        tutoButton.setFrame(0);
      });
      tutoButton.on("pointerdown", () => {
        tutoButton.setFrame(2);
      });
    }
}