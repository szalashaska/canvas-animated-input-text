window.addEventListener("load", () => {
  const textInput = document.getElementById("textInput");
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      // Value x and y defines from where particles come
      this.x = Math.random() * this.effect.canvasWidth;
      this.y = this.effect.canvasHeight;
      this.color = color;
      this.originX = x;
      this.originY = y;
      // Interesting effect if u subtract from size
      this.size = this.effect.gap;
      // distance from mouse
      this.dx = 0;
      this.dy = 0;
      // speed
      this.vx = 0;
      this.vy = 0;
      this.force = 0;
      this.angle = 0;
      this.distance = 0;
      this.friction = Math.random() * 0.6 + 0.15;
      this.ease = Math.random() * 0.1 + 0.005;
    }

    draw() {
      // 1:00:30 in video - optimize
      this.effect.context.fillStyle = this.color;
      this.effect.context.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
      // Adding ease makes particles fall from up and side
      this.x += (this.originX - this.x) * this.ease;
      this.y += (this.originY - this.y) * this.ease;
    }
  }

  class Effect {
    constructor(context, canvasWidth, canvasHeight) {
      this.context = context;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.textX = this.canvasWidth / 2;
      this.textY = this.canvasHeight / 2;
      this.fontSize = 100;
      this.lineHeight = this.fontSize * 0.9;
      this.fontName = "Helvetica";
      this.strokeThick = 3;
      this.maxTextWidth = canvas.width * 0.8;
      this.textInput = document.getElementById("textInput");
      this.textInput.addEventListener("keyup", (e) => {
        if (e.key !== " ") {
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.wrapText(e.target.value);
        }
      });
      // particle text
      this.particles = [];
      this.gap = 3;
      this.mouse = {
        radius: 20000,
        x: 0,
        y: 0,
      };
      window.addEventListener("mousemove", (e) => {
        {
          (this.mouse.x = e.x), (this.mouse.y = e.y);
        }
      });
    }

    wrapText(text) {
      // Canvas settings
      const gradient = this.context.createLinearGradient(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      gradient.addColorStop(0.2, "orange");
      gradient.addColorStop(0.4, "yellow");
      gradient.addColorStop(0.6, "green");
      gradient.addColorStop(0.8, "pink");
      this.context.fillStyle = gradient;
      this.context.font = `${this.fontSize}px ${this.fontName}`;
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.lineWidth = this.strokeThick;
      this.context.strokeStyle = "white";

      // Wrap text
      let linesArray = [];
      let words = text.split(" ");
      let lineCounter = 0;
      let line = "";
      for (let i = 0; i < words.length; i++) {
        let testLine = `${line}${words[i]}` + " ";
        if (this.context.measureText(testLine).width > this.maxTextWidth) {
          // Adding space at the end
          line = `${words[i]}` + " ";
          lineCounter++;
        } else {
          line = testLine;
        }
        linesArray[lineCounter] = line;
      }
      let textHeight = this.lineHeight * lineCounter;
      this.textY = canvas.height / 2 - textHeight / 2;
      linesArray.forEach((element, index) => {
        this.context.fillText(
          element,
          this.textX,
          this.textY + index * this.lineHeight
        );
        this.context.strokeText(
          element,
          this.textX,
          this.textY + index * this.lineHeight
        );
      });
      this.convertToParticles();
    }

    convertToParticles() {
      this.particles = [];
      const pixels = this.context.getImageData(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      ).data;
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      for (let y = 0; y < this.canvasHeight; y += this.gap) {
        for (let x = 0; x < this.canvasWidth; x += this.gap) {
          const index = (y * this.canvasWidth + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 0) {
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = `rgb(${red},${green},${blue})`;
            // this -> whole class
            this.particles.push(new Particle(this, x, y, color));
          }
        }
      }
    }

    render() {
      this.particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
    }
  }

  const effect = new Effect(ctx, canvas.width, canvas.height);
  effect.wrapText("Hello guys");

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    requestAnimationFrame(animate);
  };

  animate();
});
