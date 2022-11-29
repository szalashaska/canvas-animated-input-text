window.addEventListener("load", () => {
  const textInput = document.getElementById("textInput");
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontName = "Helvetica";
  const fontSize = 80;
  const lineHeight = fontSize;

  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // ...createLinearGradient(start coords, end coords) , also radialGradient method can be useda
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0.3, "red");
  gradient.addColorStop(0.5, "orange");
  gradient.addColorStop(0.7, "yellow");
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "red";
  ctx.font = `${fontSize}px ${fontName}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxTextWidth = canvas.width / 2;

  const wrapText = (text) => {
    let linesArray = [];
    let lineCounter = 0;
    let line = "";
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      // Adding space at the end
      let testLine = `${line}${words[i]} `;
      if (ctx.measureText(testLine).width > maxTextWidth) {
        line = `${words[i]} `;
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }
    let textHeight = lineHeight * lineCounter;
    let textY = canvas.height / 2 - textHeight / 2;
    linesArray.forEach((element, index) => {
      ctx.fillText(element, canvas.width / 2, textY + index * lineHeight);
    });
  };

  //   wrapText("Hello, how are you? Good? Good :)");
  textInput.addEventListener("keyup", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wrapText(e.target.value);
  });
});
