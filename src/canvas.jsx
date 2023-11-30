import React, { useRef, useEffect } from "react";

const Canvas = ({ distance, threshhold }) => {

  const canvasRef = useRef(null);
  console.log(distance, threshhold);

  useEffect(() => {

      const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    let threshold = threshhold;
      if (distance > threshold) {
        ctx.fillStyle = "red";
      }
      else {
          ctx.fillStyle = "cyan";
      }
    
    
    ctx.rect(10, 490, 330, -distance);
    ctx.moveTo(10, 500 - threshold);
    ctx.lineTo(340, 500 - threshold);
    ctx.stroke();  
    ctx.fill();
  }, [distance, threshhold]);

  return <canvas style={{border: '1px solid black'}} ref={canvasRef} width={350} height={500} />;
};

export default Canvas;