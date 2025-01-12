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

  React.useEffect(() => {
    setCalmMessages(getCalmMessages());
    loadSounds();

    return () => {
      Object.values(calmSoundAudio).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  function saveSounds() {
    const sounds = calmSoundTypes.filter((sound) => document.getElementById(sound).checked);
    localStorage.setItem('sounds', JSON.stringify(sounds));
  }

  function loadSounds() {
    const sounds = JSON.parse(localStorage.getItem('sounds') || '[]');
    sounds.forEach((sound) => {
      document.getElementById(sound).checked = true;
    });
  }

  function getCalmMessages() {
    const mockedMessages = ['Bud calmed by static', 'Tal calmed by cars', 'Jordan calmed by gunshots', 'John calmed by rain', '민수 calmed by waves', 'Sai calmed by thunder'];
    return mockedMessages.map((calm, i) => {
      return <div key={i}>{calm}</div>;
    });
  }

  function togglePlayAll() {
    if (!isPlaying) {
      const checkedSounds = calmSoundTypes.filter((sound) => document.getElementById(sound).checked);
      checkedSounds.forEach((sound) => {
        const audio = calmSoundAudio[sound];
        audio.play();
      });
    } else {
      Object.values(calmSoundAudio).forEach((audio) => {
        audio.pause();
      });
    }

    setIsPlaying(!isPlaying);
  }

  function togglePlay(audioElement) {
    if (isPlaying) {
      if (audioElement.checked) {
        calmSoundAudio[audioElement.value].play();
      } else {
        calmSoundAudio[audioElement.value].pause();
      }
    }
    saveSounds();
  }

  return (
    <main className='container-fluid view-play'>
      <form>
        <h3>Calming tones</h3>
        <div className='player-controls'>
          <div className='input-group sound-button-container'>
            {calmSoundTypes.map((sound, index) => (
              <div key={index} className='form-check form-switch'>
                <input className='form-check-input' type='checkbox' value={sound} id={sound} onChange={(e) => togglePlay(e.target)}></input>
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
            <button className='btn btn-primary play-button-text' type='button' id='play' onClick={togglePlayAll}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>
        <h3>Calming friends</h3>
        <div className='messages form-control'>{calmMessages}</div>
        <div>
          <a className='weather-forecast' href='https://forecast.weather.gov/MapClick.php?lat=40.231783&lon=-111.645982'>
            Weather forecast: Snow
          </a>
        </div>
      </form>
    </main>
  );
}
