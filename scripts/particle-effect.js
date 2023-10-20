const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = (window.innerWidth * 100)/125;
canvas.height = window.innerHeight;

let particlesArray;
let speed = 0.2;

class Particle
{
  // basic particle properties
  constructor(x, y, directionX, directionY, size)
  {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = '#003002';
  }

  // draw particle
  draw()
  {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update()
  {
    // redirecting particle
    if(this.x + this.size > canvas.width || this.x < 0)
    {
      this.directionX = - this.directionX;
    }
    if(this.y > canvas.height || this.y < 0)
    {
      this.directionY = - this.directionY;
    }
    if(this.directionX == 0)
    {
      this.directionX = (Math.random() * 5) - 2.5;
    }

    this.x += speed * this.directionX;
    this.y += speed * this.directionY;
    this.draw();
  }
}

// creating particles
function init()
{
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width)/10000;

  for(let i=0; i<numberOfParticles; i++)
  {
    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;

    particlesArray.push(new Particle(x, y, directionX, directionY, size));
  }
}

// animation loop
function animate()
{
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, innerWidth, innerHeight);

  for(let i=0; i<particlesArray.length; i++)
  {
    particlesArray[i].update();
  }
}

init();
animate();