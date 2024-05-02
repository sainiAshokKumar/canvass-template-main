import React, { useState, useEffect, useRef } from "react";
import ColorPicker from "../ColorPicker/colorpicker";
import CanvasEditor from "../CanvasEditor/canvasEditor";

const CanvasEditorApp = () => {
  const template = {
    caption: {
      text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
      position: { x: 100, y: 150 },
      max_characters_per_line: 31,
      font_size: 44,
      alignment: "left",
      text_color: "#FFFFFF",
      //increase width between sentences
      line_height: 1.5,
    },
    cta: {
      text: "Shop Now",
      position: { x: 110, y: 250 },
      text_color: "#000000",
      background_color: "#ffffff",
      border_radius: "10px",
    },
    image_mask: { x: 56, y: 442, width: 970, height: 600 },
    urls: {
      mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
      stroke:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png?random=12356",
      // "stroke" : "https://picsum.photos/200/300?grayscale",
      design_pattern:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
    },
  };

  const [captionText, setCaptionText] = useState(template.caption.text);
  const [callToActionText, setCallToActionText] = useState(template.cta.text);
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");
  const [imageSrc, setImageSrc] = useState("");
  const [colorHistory, setColorHistory] = useState([]);

  const handleCaptionTextChange = (e) => {
    setCaptionText(e.target.value);
  };

  const handleCallToActionChange = (e) => {
    setCallToActionText(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundColorChange = (e) => {
    const newColor = e.target.value;
    setBackgroundColor(newColor);

    // Add the new color to the history, keeping only the last five colors
    setColorHistory((prevHistory) => [newColor, ...prevHistory].slice(0, 5));
    //here we got the last color
    console.log(newColor);
  };

  const handleColorChange = () => {};

  const handleColorHistoryClick = (color) => {
    setBackgroundColor(color);
  };

  const InputBox = (inputText, text, handler) => {
    return (
      <div className="flex flex-col gap-4 border-2 border-slate-300 items-start px-4 py-2 rounded-md w-[500px] my-2">
        <div className="text-slate-400 text-[12px] pl-[2px]"> {inputText} </div>
        <input
          className="w-full border-2 rounded-md border-slate-100 p-2 text-slate-700 mt-[-14px]"
          type="text"
          value={text}
          onChange={handler}
          placeholder={" "}
        />
      </div>
    );
  };

  const ColorHistory = () => (
    <div className="flex text-slate-400 my-4">
      <div className="mr-4">Last Selected:</div>
      <div>
        {colorHistory.length > 0 ? (
          colorHistory.map((color, index) => (
            <button
              key={index}
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded-full border-2 border-white"
              onClick={() => handleColorHistoryClick(color)}
            >
              {""}
            </button>
          ))
        ) : (
          <div className="text-slate-500"> No Color Selected yet </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-start bg-slate-50">
      <div className="">
        <CanvasEditor
          template={template}
          captionText={captionText}
          callToActionText={callToActionText}
          backgroundColor={backgroundColor}
          imageSrc={imageSrc}
        />
      </div>
      <div className="flex flex-col m-[-200px]">
        {InputBox("Ad Content", captionText, handleCaptionTextChange)}
        {InputBox("Call to Action", callToActionText, handleCallToActionChange)}

        <div className="flex">
          <div className="flex items-center mr-4">
            <label for="color-picker" className="mr-4 my-2">
              {" "}
              Pick Color:{" "}
            </label>
            <input
              id="color-picker"
              className="w-6 h-6 rounded-full border-2 border-white"
              style={{ borderRadius: "50%" }}
              type="color"
              value={backgroundColor}
              onChange={handleBackgroundColorChange}
            />
          </div>

          <ColorHistory />
        </div>

        {/* <ColorPicker/> */}

        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
    </div>
  );
};

export default CanvasEditorApp;
