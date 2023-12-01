export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    this.add.image(610, 380, "menuBackGround");
    
    let startButton = this.add
      .image(750, 380, "startButton")
      .setInteractive(this.input.makePixelPerfect());

    startButton.on("pointerdown", () => {
      startButton.setFrame(1);
    });
    startButton.on("pointerover", () => {
      startButton.setFrame(2);
    });
    startButton.on("pointerup", () => {
      this.scene.start("LevelSelector");
    });

    startButton.on("pointerout", () => {
      startButton.setFrame(0);
    });
  }
}
