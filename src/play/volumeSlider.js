import { useState, useEffect } from 'react';

const VolumeSlider = () => {
  const [value, setValue] = useState(50); // Immediate value
  const [debouncedValue, setDebouncedValue] = useState(50); // Debounced value

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return (
    <div>
      <input type='range' min='0' max='100' value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <p>Immediate Value: {value}</p>
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default VolumeSlider;
