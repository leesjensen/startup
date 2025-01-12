import React from 'react';
import './play.css';

const calmSoundTypes = ['rain', 'thunder', 'waves', 'bowl', 'static', 'wind'];

const calmSoundAudio = calmSoundTypes.reduce((acc, sound) => {
  acc[sound] = new Audio(`/sounds/${sound}.mp3`);
  acc[sound].loop = true;
  return acc;
}, {});

export function Play() {
  const [calmMessages, setCalmMessages] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [weather, setWeather] = React.useState('...loading');
  const [selectedSounds, setSelectedSounds] = React.useState([]);

  React.useEffect(() => {
    setCalmMessages(getCalmMessages());
    setSelectedSounds(loadSounds());
    loadWeather();
    listenForMessages();

    return () => {
      Object.values(calmSoundAudio).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  React.useEffect(() => {
    saveSounds(selectedSounds);
  }, [selectedSounds]);

  function loadWeather() {
    // This will get replaced with a call to the service.
    setWeather('snow');
  }

  function saveSounds() {
    // This will get replaced with a call to the service.
    localStorage.setItem('sounds', JSON.stringify(selectedSounds));
  }

  function loadSounds() {
    // This will get replaced with a call to the service.
    return JSON.parse(localStorage.getItem('sounds') || '[]');
  }

  function getCalmMessages() {
    // This will get replaced with a call to the service.
    return ['Bud calmed by static', 'John calmed by rain', '민수 calmed by waves', 'Sai calmed by thunder'];
  }

  function listenForMessages() {
    // This will get replaced with a call to the service.
    const names = ['Bud', 'Tal', 'Jordan', 'John', '민수', 'Sai'];
    setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const message = `${name} calmed by ${calmSoundTypes[Math.floor(Math.random() * calmSoundTypes.length)]}`;
      setCalmMessages((p) => [message, ...p]);
    }, 1000);
  }

  function togglePlayAll() {
    selectedSounds.forEach((sound) => {
      if (!isPlaying) {
        calmSoundAudio[sound].play();
      } else {
        calmSoundAudio[sound].pause();
      }
    });
    setIsPlaying(!isPlaying);
  }

  function togglePlay(sound) {
    setSelectedSounds((prevSounds) => {
      const isSelected = prevSounds.includes(sound);
      if (isPlaying) {
        const audio = calmSoundAudio[sound];
        isSelected ? audio.pause() : audio.play();
      }
      return isSelected ? prevSounds.filter((s) => s !== sound) : [...prevSounds, sound];
    });
  }

  return (
    <main className='container-fluid view-play'>
      <form>
        <h3>Calming tones</h3>
        <div className='player-controls'>
          <div className='input-group sound-button-container'>
            {calmSoundTypes.map((sound, index) => (
              <div key={index} className='form-check form-switch'>
                <input className='form-check-input' type='checkbox' value={sound} id={sound} onChange={() => togglePlay(sound)} checked={selectedSounds.includes(sound)}></input>
                <label className='form-check-label' htmlFor={sound}>
                  {sound}
                </label>
              </div>
            ))}
          </div>
          <div className='input-group play-button-container'>
            <span className='input-group-text' id='username'>
              <img className='play-button-img' src='logo.svg' />
            </span>
            <button className='btn btn-primary play-button-text' type='button' id='play' onClick={(e) => togglePlayAll()}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>
        <h3>Calming friends</h3>
        <div className='messages form-control'>
          {calmMessages.map((calm, i) => {
            return <div key={i}>{calm}</div>;
          })}
        </div>
        <div>
          <a className='weather-forecast' href='https://forecast.weather.gov/MapClick.php?lat=40.231783&lon=-111.645982'>
            Weather forecast: {weather}
          </a>
        </div>
      </form>
    </main>
  );
}
