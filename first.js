window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const text = "Hello! How are you?";
  const textX = canvas.width / 2;
  const textY = canvas.height / 2;

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

  ctx.fillStyle = "white";
  ctx.strokeStyle = "orange";
  ctx.font = "80px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  //   ctx.letterSpacing = "15px";
  ctx.fillText(text, textX, textY); // gives text
  ctx.strokeText(text, textX, textY); // gives outline

  const wrapText = (text) => {
    let linesArray = [];
    let lineCounter = 0;
    let line = "";
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      let testLine = `${line}${words[i]} `;
      console.log(ctx.measureText(testLine));
    }
    ctx.fillText(testLine, canvas.width / 2, canvas.height / 2); // gives text
  };
});
