import React from 'react';
import {useRef, useEffect} from 'react'

const CanvasEditor = ({
    template,
    captionText,
    callToActionText,
    imageSrc,
    backgroundColor,
  }) => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      const image = new Image();
      image.src = template.urls.design_pattern;
  
      image.onload = () => {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
        ctx.font = `${template.caption.font_size}px Arial`;
        ctx.fillStyle = template.caption.text_color;
  
        const lines = [];
        let line = "";
  
        captionText.split(" ").forEach((word) => {
          if (
            line.length + word.length <=
            template.caption.max_characters_per_line
          ) {
            line += `${word} `;
          } else {
            lines.push(line);
            line = `${word} `;
          }
        });
  
        lines.push(line);
  
        lines.forEach((line, index) => {
          ctx.fillText(
            line,
            template.caption.position.x,
            template.caption.position.y + index * template.caption.font_size
          );
        });
  
        ctx.fillStyle = template.cta.background_color;
        ctx.fillRect(template.cta.position.x, template.cta.position.y, 200, 50);
  
        //                         ctx.beginPath();
        //                         ctx.roundRect(10, 20, 150, 100, [40]);
        //                         ctx.stroke();
  
        ctx.font = "30px Arial";
        ctx.fillStyle = template.cta.text_color;
        ctx.fillText(
          callToActionText,
          template.cta.position.x + 10,
          template.cta.position.y + 30
        );
  
        const mask = new Image();
        mask.src = template.urls.mask;
  
        mask.onload = () => {
          ctx.drawImage(
            mask,
            template.image_mask.x,
            template.image_mask.y,
            template.image_mask.width,
            template.image_mask.height
          );
  
          const stroke = new Image();
          stroke.src = template.urls.stroke;
  
          stroke.onload = () => {
            ctx.drawImage(
              stroke,
              template.image_mask.x,
              template.image_mask.y,
              template.image_mask.width,
              template.image_mask.height
            );
          };
          //update the image src here
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            ctx.drawImage(
              img,
              template.image_mask.x,
              template.image_mask.y,
              template.image_mask.width,
              template.image_mask.height
            );
          };
        };
      };
    }, [template, captionText, callToActionText, imageSrc, backgroundColor]);
  
    return (
      <canvas
        ref={canvasRef}
        width={1080} // canvas width
        height={1080} // canvas height
        style={{ border: "1px solid black", transform: "scale(0.5)" }}
      />
    );
  };

  export default CanvasEditor