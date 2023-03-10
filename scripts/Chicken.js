const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = innerHeight;
/////////////////player///////////////////////////
class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;

    const image = new Image();
    image.src = "../assets/imgChicken/ship6.png";
    image.onload = () => {
      this.image = image;
      this.width = 100;
      this.height = 100;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };
    };
  }

  draw() {
    c.save();
    c.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    );

    c.rotate(this.rotation);

    c.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    );

    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    c.restore();

    // c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}
///////////////// Invader ///////////////////////////
class Invader {
  constructor({ position }) {
    this.velocity = {
      x: 0,
      y: 0,
    };
    const image = new Image();
    image.src = "../assets/imgChicken/invader.png";
    image.onload = () => {
      this.image = image;
      this.width = 60;
      this.height = 60;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    // c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update({ velocity }) {
    if (this.image) {
      this.draw();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }
}
//////////////////////// projectile //////////////////////////////

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = 6;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "red";
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

///////////////// Grid ///////////

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.velocity = {
      x: 4,
      y: 0,
    };
    this.invaders = [];
    const columns = Math.floor(Math.random() * 10 + 5)
    const rows = Math.floor(Math.random() * 5 + 2)

    this.width = columns * 80
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: x * 80,
              y: y * 80
            },
          })
        );
      }
    }

    // console.log(this.invaders);
  }
  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.y = 0
    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x
      this.velocity.y = 15
    }
  }
}
///////////////////////////////////////
const player = new Player();
const projectiles = [];
const grids = [new Grid()];

//////////////keys/////////////////////////////
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

///////////////////

player.update();

//////////////////// animate /////////////////////////////

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  projectiles.forEach((Projectile, index) => {
    if (Projectile.position.y + Projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      Projectile.update();
    }
  });

  grids.forEach((grid) => {
    grid.update();
    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity })
      projectiles.forEach((projectile, j) => {
        if (projectile.position.y - projectile.radius
          <= invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x
          && projectile.position.x - projectile.radius <= invader.position.x + invader.width
          && projectile.position.y + projectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const projectileFound = projectiles.find((projectile2) =>
              projectile2 === projectile)

            const invaderFound = grid.invaders.find((invader2) => invader2 === invader)

            //remove invaders and projectiles
            if (invaderFound && projectileFound) {
              grid.invaders.splice(i, 1);
              projectiles.splice(j, 1)
              // if (grid.invaders.length > 0){
              //   const firstInvader = grid.invaders[0]
              //   const lastInvader = grid.invaders[grid.invaders.length - 1 ]
              // }
            }
          }, 0)

        }
      })

    })
  })

  if (keys.right.pressed && player.position.x + player.width <= canvas.width) {
    player.velocity.x = 9;
    player.rotation = 0.15;
  } else if (keys.left.pressed && player.position.x >= 0) {
    player.velocity.x = -9;
    player.rotation = -0.15;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
}

animate();
//////////////////////move by event listener ////////////////
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 39:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 37:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 32:
      document.getElementById('audio').play();
      console.log("space");
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -12,
          },
        })
      );
      // console.log(projectiles);
      // keys.space.pressed = true;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 39:
      console.log("right");
      keys.right.pressed = false;

      break;
    case 37:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 32:
      document.getElementById('audio').play();
      console.log("space");
      keys.space.pressed = false;
      break;
  }
});

/*
ArrowRight -> 39
ArrowUp -> 38
ArrowDown -> 40
ArrowLeft -> 37
Space -> 32
Escape -> 27
Enter -> 13
w -> 87
d -> 68
a => 65
. -> 190 
*/