export default class Credits extends Phaser.Scene {
    constructor() {
      super("Credits");
    }
    init(data){

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
      this.add.image (610, 380,"score")
      this.add.text (50, 50, `Gracias por jugar!`, {
        fontSize: "100px"});
      this.add.text (50, 600, `Juego producido por \n Camila Renna`, {
        fontSize: "50px"
    });
      let tutoButton = this.add
        .image(1180, 713, "continueButton")
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
            this.scene.start("Menu");

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
