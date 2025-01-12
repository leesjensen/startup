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

    return () => {
      Object.values(calmSoundAudio).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

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
  }

  return (
    <main className='container-fluid'>
      <form>
        <h3>Calming tones</h3>
        <div className='player-controls'>
          <fieldset>
            <div>
              {calmSoundTypes.map((sound, index) => (
                <div className='input-group' key={index}>
                  <div className='input-group-text'>
                    <input className='form-check-input' type='checkbox' value={sound} id={sound} onClick={(e) => togglePlay(e.target)} />
                  </div>
                  <input type='text' className={`form-control ${document.getElementById(sound)?.checked ? 'active' : ''}`} disabled value={sound} id={`${sound}-label`} />
                </div>
              ))}
            </div>
          </fieldset>
          <div className='input-group play-button-container'>
            <span className='input-group-text' id='username'>
              <img className='play-button' src='logo.svg' />
            </span>
            <button className='btn btn-primary' type='button' id='play' onClick={togglePlayAll}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>
        <h3>Calm friends</h3>
        <div className='messages form-control'>{calmMessages}</div>
        <div className='text-start lead'>
          <a className='text-body-secondary' href='https://forecast.weather.gov/MapClick.php?lat=40.231783&lon=-111.645982'>
            Weather forecast: Snow
          </a>
        </div>
      </form>
    </main>
  );
}
