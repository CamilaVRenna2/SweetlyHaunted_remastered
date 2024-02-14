export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
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

    this.add.image(610, 380, "menuBackGround");
    this.add.text(20, 70, `Sweetly \n Haunted `,{ 
      fontSize: "100px",})
    this.menuSong = this.sound.add ("menuSong");
    this.menuSong.play({loop: true});
    this.pointerSound = this.sound.add ("pointer");
    

    let startButton = this.add
      .image(750, 380, "startButton")
      .setInteractive(this.input.makePixelPerfect());

    startButton.on("pointerdown", () => {
      startButton.setFrame(1);
      this.pointerSound.play();
    });
    startButton.on("pointerover", () => {
      startButton.setFrame(2);
    });
    startButton.on("pointerup", () => {
        this.tweens.add({
          targets: this.fadingOverlay,
          alpha: 1,
          duration: 1000,
          onComplete: () => {
            this.scene.start("Introduction");
            this.menuSong.stop ({loop: false});
          },
        });
      });


    startButton.on("pointerout", () => {
      startButton.setFrame(0);
    });
  }
}
