import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

const ColorPicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [previousColors, setPreviousColors] = useState([]);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    setPreviousColors([color.hex, ...previousColors.slice(0, 4)]);
    setShowPicker(false);
  };

  return (
    <div>
      <div>
        {previousColors.map((color, index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: color,
                display: 'inline-block',
                marginRight: '5px',
              }}
            />
          </div>
        ))}
        <button onClick={togglePicker}>+</button>
      </div>
      {showPicker && (
        <CirclePicker
          color={selectedColor}
          onChange={handleColorChange}
          colors={previousColors}
        />
      )}
    </div>
  );
};

export default ColorPicker;
