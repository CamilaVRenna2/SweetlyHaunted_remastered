export default class LevelSelector extends Phaser.Scene {
    constructor() {
      super("LevelSelector");
    }
  init(data){
  this.level= data.level || 0;
  this.score= data.score || 0;
  this.level1Score = data.level1Score || 0;
  this.level2Score = data.level2Score || 0;
  this.level3Score = data.level3Score || 0;
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
        this.pointerSound = this.sound.add ("pointer");
      this.add.image(610, 380, "backgroundMapa");
      let level1Button = this.add
        .image(190, 497, "levelButton")
        .setInteractive(this.input.makePixelPerfect());

      level1Button.on("pointerover", () => {
        level1Button.setFrame(1);
      });

      level1Button.on("pointerup", () => {
        this.level=1;
        this.tweens.add({
          targets: this.fadingOverlay,
          alpha: 1,
          duration: 500,
          onComplete: () => {
            this.scene.start("Tutorial", {
              level:this.level,
              level1Score: this.level1Score,
              level2Score: this.level2Score,
              level3Score: this.level3Score
            });
          //   this.menuSong.stop ({loop: false});
          },
        });
        
      });


  
      level1Button.on("pointerout", () => {
        level1Button.setFrame(0);
      });

      console.log (this.level1Score);

      if (this.level1Score >= 10 / 3  ) {
        this.pumpkin1 = this.add.image (((1220 /3)/3)-50 , (763 / 2)-100, "pumpkin");
        console.log ("tarea 1 realizada");
      }

      if (this.level1Score >= 10 * (2/3)) {
        this.pumpkin2 = this.add.image ((((1220 /3)/3)*2)-60, (763 / 2)-150, "pumpkin");
        this.pumpkin2.setDepth (5);
        console.log ("tarea 2 realizada");
      }

      if (this.level1Score >= 10) {
        this.pumpkin3 = this.add.image ((1220 /3)-70 , (763 /2)-100, "pumpkin");
        this.pumpkin3.setDepth (5);
        console.log ("tarea 3 realizada");
      }
      ////////

      let level2Button = this.add
        .image(585, 497, "levelButton")
        .setInteractive(this.input.makePixelPerfect())
        .setFrame(3);
  
     
       if (this.level >= 2) {
        level2Button.setFrame(2);

        level2Button.on("pointerover", () => {
          level2Button.setFrame(1);
         });
      level2Button.on("pointerup", () => {
        this.level = 2;
        this.tweens.add({
          targets: this.fadingOverlay,
          alpha: 1,
          duration: 500,
          onComplete: () => {
            this.scene.start("Game", {
              level: this.level,
              level1Score: this.level1Score,
              level2Score: this.level2Score,
              level3Score: this.level3Score
            });
            // this.menuSong.stop ({loop: false});
          },
        });
        
      });

      level2Button.on("pointerout", () => {
        level2Button.setFrame(2);
      });

     }
     if (this.level2Score >= 11 / 3  ) {
      this.pumpkin4 = this.add.image ((1220/2)-120, (763 / 2)-100, "pumpkin");
      console.log ("tarea 1 realizada");
    }

    if (this.level2Score >= 11 * (2/3)) {
      this.pumpkin5 = this.add.image ((1220/2), (763 / 2)-150, "pumpkin");
      this.pumpkin5.setDepth (5);
      console.log ("tarea 2 realizada");
    }

    if (this.level2Score >= 11) {
      this.pumpkin6 = this.add.image ((1220/2)+120 , (763 /2)-100, "pumpkin");
      this.pumpkin6.setDepth (5);
      console.log ("tarea 3 realizada");
    }
      //////
      let level3Button = this.add
      .image(960, 497, "levelButton")
      .setInteractive(this.input.makePixelPerfect())
      .setFrame(6);


    if (this.level >= 3) {
      level3Button.setFrame(5);
    level3Button.on("pointerover", () => {
      level3Button.setFrame(4);
    });
    level3Button.on("pointerup", () => {
      this.tweens.add({
        targets: this.fadingOverlay,
        alpha: 1,
        duration: 500,
        onComplete: () => {
          this.scene.start("Game",{level: this.level,
            level1Score: this.level1Score,
            level2Score: this.level2Score,
            level3Score: this.level3Score});
          // this.menuSong.stop ({loop: false});
        },
      });
    });

    
    level3Button.on("pointerout", () => {
      level3Button.setFrame(5);
    });
  }

  if (this.level3Score >= 11 / 3  ) {
    this.pumpkin7 = this.add.image ((1220/2)+250 , (763 /2)-100, "pumpkin");
    console.log ("tarea 1 realizada");
  }

  if (this.level3Score >= 11 * (2/3)) {
    this.pumpkin8 = this.add.image ((1220/2)+390, (763 / 2)-150, "pumpkin");
    this.pumpkin8.setDepth (5);
    console.log ("tarea 2 realizada");
  }

  if (this.level3Score >= 11) {
    this.pumpkin9 = this.add.image ((1220)-135, (763 / 2)-100, "pumpkin");
    this.pumpkin9.setDepth (5);
    console.log ("tarea 3 realizada");
  }

  if (this.level3Score >= 1) {
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
                    this.scene.start ("Outro");
                    
                },
              });
           
        }) 

  }
    }
  }
  