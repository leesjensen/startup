import React from 'react';

export function VolumeSlider({ volume = 100, onChange }) {
  const [value, setValue] = React.useState(volume);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      onChange?.(value);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return (
    <div className='play-volume-container'>
      🔊 <input type='range' min='0' max='100' value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
