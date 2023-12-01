export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    
    this.load.tilemapTiledJSON("map1", "./public/tilemap/level1.json");
    this.load.image("background", "./public/images/background.png");
    this.load.image("platform2", "./public/images/plataforma.png");
    this.load.image("platform", "./public/images/plataforma2.png");
    this.load.image("engranaje", "./public/images/engranaje1.png");
    this.load.image("wall", "./public/images/wall.png");
    this.load.image("door", "./public/images/doorOpen.png");
    this.load.image("cauldron", "./public/images/caldero.png");
    this.load.spritesheet("button", "./public/images/button.png", {frameWidth: 168, frameHeight: 180,});
//////
    this.load.image("menuBackGround", "./public/images/backgroundMenu.png");
    this.load.spritesheet("startButton", "./public/images/startButton.png", {frameWidth: 935, frameHeight: 760,});
    this.load.spritesheet("levelButton", "./public/images/levelButton.png", {frameWidth: 398, frameHeight: 589,});
    this.load.image("backgroundMapa", "./public/images/backgroundmapa.png");
    this.load.spritesheet("continueButton", "./public/images/continueButton.png",{frameWidth:98, frameHeight:73 ,});

    this.load.image("light", "./public/images/light.png");
    this.load.image("interface", "./public/images/interface.png");
    this.load.image("gameOver", "./public/images/gameover.png");
    this.load.image("tutorial", "./public/images/tuto.png");
    this.load.image("candy", "./public/images/candy.png");

    this.load.image("retryButtonPressed", "./public/images/retryButtonpressed.png");
    this.load.image("retryButton", "./public/images/retryButton.png");
    this.load.image("wine", "./public/images/wine.png");
    this.load.spritesheet("ghost", "./public/images/spritesheet.png",{frameWidth: 168, frameHeight: 180,});
    this.load.spritesheet("lyla", "./public/images/lyla.png", {frameWidth: 110,frameHeight: 171,});
    // this.load.spritesheet("lylaJump", "./public/images/spritejump.png", {frameWidth: 100,frameHeight: 171,});
  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    // se crea una sola vez, para que no de error en el restart de la escena
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("lyla", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "lyla", frame: 4 }],
      frameRate: 8,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("lyla", { start: 5, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });
    
    this.anims.create({
      key: "jumpLeft",
      frames: this.anims.generateFrameNumbers("lyla", { frame: 10}),
      frameRate: 8,
    });
    this.anims.create({
      key: "jumpRight",
      frames: this.anims.generateFrameNumbers("lyla", { frame: 9}),
      frameRate: 8,
    
    });
    //////
    this.anims.create({
      key: "Gleft",
      frames: this.anims.generateFrameNumbers("ghost", { start: 0, end: 1 }),
      frameRate: 9,
      repeat: -1,
    });

    this.anims.create({
      key: "Gright",
      frames: this.anims.generateFrameNumbers("ghost", { start: 2, end: 3 }),
      frameRate: 9,
      repeat: -1,
    });
    // init scene juego
    this.scene.start("Menu");
  }
}
