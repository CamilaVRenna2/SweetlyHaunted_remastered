export default class LevelSelector extends Phaser.Scene {
    constructor() {
      super("LevelSelector");
    }
  init(){
this.level=0;
  }
    create() {
      this.add.image(610, 380, "backgroundMapa");
      let level1Button = this.add
        .image(190, 427, "levelButton")
        .setInteractive(this.input.makePixelPerfect());

      level1Button.on("pointerover", () => {
        level1Button.setFrame(1);
      });

      level1Button.on("pointerup", () => {
        this.level=1;
        this.scene.start("Tutorial", {level:this.level});
      });
  
      level1Button.on("pointerout", () => {
        level1Button.setFrame(0);
      });

      ////////

      let level2Button = this.add
        .image(585, 430, "levelButton")
        .setInteractive(this.input.makePixelPerfect());
  
     
      level2Button.on("pointerover", () => {
        level2Button.setFrame(4);
      });
      level2Button.on("pointerup", () => {
        this.level=2;
        this.scene.start("Game", {level: this.level});
      });
      level2Button.on("pointerout", () => {
        level2Button.setFrame(2);
      });
      //////
      let level3Button = this.add
      .image(960, 430, "levelButton")
      .setInteractive(this.input.makePixelPerfect());

    level3Button.on("pointerover", () => {
      level3Button.setFrame(5);
    });
    level3Button.on("pointerup", () => {

    this.scene.start("Game",{level: this.level});
    });
    level3Button.on("pointerout", () => {
      level3Button.setFrame(2);
    });
   
    }
  }
  