export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }
  
    init(data) {
        this.level =data.level;
        this.score = data.score || 0;
        this.amountcandys = 0;
        this.gameOver = false;
        this.health = data.health || 3;
        this.ghostVelocity = data.ghostVelocity|| -170
        this.isDead = false;
        this.ghostMovingLeft = true;
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
        let mapKey = "map1";
        if (this.level >= 1) {
            
            mapKey = "map1";
        } 
        
        if (this.level >= 2) {
            mapKey = "map2";
        }
         
        if (this.level >= 3) {
            mapKey = "map3";
        }

        this.UI = this.add.image(1220 /2, 763 * 0.04,  "interface");
        this.UI.setDepth (4);
        this.UI.setScrollFactor(0);

        console.log (mapKey);
        console.log (this.level);
        
  
        const map = this.make.tilemap({ key: mapKey });
        const capaBackground = map.addTilesetImage("fondo", "background");
        const capaPlatform = map.addTilesetImage("plataforma2", "platform");
        const capaWall = map.addTilesetImage("wall", "wall");
        
        const backgroundLayer = map.createLayer("background", capaBackground, 0, 0);
        const platformLayer = map.createLayer("platform", capaPlatform, 0, 0);
        const wallLayer = map.createLayer("wall", capaWall, 0, 0);
        platformLayer.setCollisionByProperty({ colision: true });
        wallLayer.setCollisionByProperty({ colision: true });
  
        this.gameSong = this.sound.add("gameSong");
        this.gameSong.play({ loop: true });
        this.candySound = this.sound.add("candySound");
  
        this.candies = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });
        this.tables = this.physics.add.group({
            immovable: false,
            allowGravity: true,
        });
        this.librarys = this.physics.add.group({
            immovable: false,
            allowGravity: true,
        });
        this.doors = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });
  
        this.platformsMobible = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });
        this.abysms = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });
        this.ghosts = this.physics.add.group({
            immovable: true,
            allowGravity: true,
        });
        this.tables = this.physics.add.group({
            immovable: false,
            allowGravity: true,
        });

  
        this.cursors = this.input.keyboard.createCursorKeys();

        this.wKey = this.input.keyboard.addKey('W');
        this.aKey = this.input.keyboard.addKey('A');
        this.sKey = this.input.keyboard.addKey('S');
        this.dKey = this.input.keyboard.addKey('D');
  
        const objectsLayer = map.getObjectLayer("objects");
        objectsLayer.objects.forEach((objData) => {
            const { x = 0, y = 0, name, type } = objData;
  
            switch (name) {
                case "abysm":
                    this.abysm = this.abysms.create(x, y, "abysm");
                    break;
                case "candy":
                    this.candy = this.candies.create(x, y, "candy");
                    break;
                case "doors":
                    this.doors = this.doors.create(x, y, "door");
                    this.doors.setFrame(1);
                    break;
                case "player":
                    this.player = this.physics.add.sprite(x, y, "lyla");
                    this.player.setDepth(2);
                    break;
            }
  
            switch (type) {
                case "platform":
                    this.platformsMobible.create(x, y, "platform2");
                    break;
                    case "table":
                        this.tables.create(x, y, "table");
                        break;
                    case "ghost":
                        const ghost = this.ghosts.create(x, y, "ghost");
                        ghost.setVelocityX(this.ghostVelocity); 
                        ghost.setSize(90, 170);
                        ghost.setOffset(20, 0);
                        ghost.anims.play("gLeft");

                        break;
            }
        });
        const capaFakeWall = map.addTilesetImage("wall", "wall");
        const fakeWallLayer = map.createLayer("fakewall", capaFakeWall, 0, 0);
        
  
        this.player.setBounce(0.0);
        this.player.setCollideWorldBounds(false);
        this.player.setVelocity(10);
        this.player.setSize(60, 160);
        this.player.setOffset(20, 10);

  
        this.platforms = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });
        this.platformsMobible.children.iterate((platform) => {
            this.physics.world.enable(platform);
            platform.body.allowGravity = false;
            platform.body.immovable = true;
            this.physics.add.collider(this.player, platform);
        });
  
        this.platformsMobible.children.iterate((platform) => {
            platform.setSize(160, 32);
            platform.setOffset(0, 7);
        });
  
        this.physics.add.collider(this.player, platformLayer);
        this.physics.add.overlap(
            this.player,
            this.candies,
            this.collectCandy,
            null,
            this
        );
        this.physics.add.collider(this.player, this.platforms);
  
        this.physics.add.collider(this.player, platformLayer);
        this.physics.add.collider(this.player, wallLayer);
        this.physics.add.overlap(
            this.player,
            this.candies,
            this.collectCandy,
            null,
            this
        );
        this.physics.add.overlap(
            this.player,
            this.doors,
            this.nextLevel,
            null,
            this
        );
  
        this.physics.add.overlap(
            this.player,
            fakeWallLayer,
            this.wallDissapear,
            null,
            this
        );
        this.physics.add.collider( platformLayer,this.tables);
        this.physics.add.collider( wallLayer,this.tables);
        this.physics.add.collider( this.player,this.tables);
        this.physics.add.collider(this.platforms, platformLayer);
        this.physics.add.collider(this.ghosts, wallLayer, this.handleGhostWallCollision, null, this);
        this.physics.add.collider(this.ghosts, platformLayer);
        this.physics.add.collider(this.ghosts, this.player, this.die, null, this);
        this.physics.add.collider(this.abysm, this.player, this.die, null, this);
        this.cameras.main.startFollow(this.player);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.amountcandysTexto = this.add.text(
            1220 * 0.08,
            763 * 0.02,
            `${this.amountcandys}`, {
                fontSize: "40px"
            }
        );
  
        this.amountcandysTexto.setScrollFactor(0);
        this.amountcandysTexto.setDepth (5);
        this.activatePlatform(this.platformsMobible);

        this.candyUI = this.add.image (1220 * 0.05, 763 * 0.04, "candy");
        this.candyUI.setDepth (5);
        this.candyUI.setScrollFactor(0);

        this.healthUI = this.add.image(1220 * (1 - 0.1), 763 * 0.04, "full-life");
        this.healthUI.setDepth (5);
        this.healthUI.setScrollFactor(0);

    }
    activatePlatform(platforms) {
        platforms.children.iterate((platform) => {
            this.tweens.add({
                targets: platform,
                y: platform.y + 300,
                duration: 2000,
                ease: "linear",
                yoyo: true,
                repeat: -1,
            });
        });
    }
  
    update() {
        if (this.gameOver) {
            this.tweens.add({
                targets: this.fadingOverlay,
                alpha: 1,
                duration: 500,
                onComplete: () => {
                    this.scene.start("GameOver");
                  // this.menuSong.stop ({loop: false});
                },
              });
            
        }
  
        if (this.cursors.left.isDown || this.aKey.isDown) {
            this.player.setVelocityX(-260);
            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown || this.dKey.isDown) {
            this.player.setVelocityX(260);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }
    
        if ((this.cursors.up.isDown || this.wKey.isDown) && this.player.body.blocked.down) {
            this.player.setVelocityY(-550);
            this.player.anims.play("jumpRight");
        }
  
        this.platformsMobible.children.iterate((platform) => {
       
        });

        if (this.isDead) {
            this.gameSong.stop({loop: false});
            this.health -= 1;
            if(this.health === 0) {
                this.scene.start ("GameOver", {
                    score: this.score,
                    level1Score: this.level1Score,
                    level2Score: this.level2Score,
                    level3Score: this.level3Score,
                    level: this.level,
                    
                });
            } else {

            this.scene.restart( {
                health: this.health,
                level: this.level,
            });
            this.amountcandysTexto.setText(
                `${this.amountcandys}`
            );
            }
        };

        if (this.health === 2) {
            this.healthUI.setTexture("part-life");
        } else if (this.health === 1) {
            this.healthUI.setTexture("last-life")
        }

        
    }
  
    nextLevel(player, doors) {

        if (this.level === 1) {
            this.level1Score = this.score;
        }

        if (this.level === 2) {
            this.level2Score = this.score;
        }

        if (this.level === 3) {
            this.level3Score = this.score;
        }

        if (this.level === 1) {
            this.level = 2;
        } else if (this.level === 2) {
            this.level = 3
        }
        this.gameSong.stop({loop: false});
        this.scene.start("score", {
            score: this.score,
            level: this.level,
            level1Score: this.level1Score,
          level2Score: this.level2Score,
          level3Score: this.level3Score

        });
    }
  
    collectCandy(player, candy) {
        console.log("candy hit");
        this.candySound.play();
        candy.disableBody(true, true);
        this.amountcandys++;
        this.score ++;
        console.log(this.amountcandys);
        this.amountcandysTexto.setText(
            `${this.amountcandys}`
        );
    }

  
    wallDissapear(player, fakeWallLayer) {
        fakeWallLayer.setAlpha(0); // Oculta la capa de pared falsa
    }

    handleGhostWallCollision (ghosts, wallLayer, ghostVelocity,) {
        this.ghostVelocity = -this.ghostVelocity;
        ghosts.setVelocityX(this.ghostVelocity);

        this.ghostMovingLeft = !this.ghostMovingLeft;

        this.ghostMovingLeft ? ghosts.anims.play ("gLeft"): ghosts.anims.play ("gRight");
    }

    die () {
        this.isDead = true;
    }
}