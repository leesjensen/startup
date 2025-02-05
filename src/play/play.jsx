import React, { act } from 'react';
import './play.css';
import service from '../service';

const sounds = await service.calmSoundTypes();
const calmSoundAudio = sounds.reduce((acc, sound) => {
  acc[sound] = new Audio(`/sounds/${sound}.mp3`);
  acc[sound].loop = true;
  return acc;
}, {});

export function Play({ activeUser }) {
  const [calmMessages, setCalmMessages] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [weather, setWeather] = React.useState('...loading');
  const [selectedSounds, setSelectedSounds] = React.useState(service.loadSounds());

  React.useEffect(() => {
    setCalmMessages([]);
    setWeather(service.loadWeather());
    service.addMessageReceiver(processMessage);

    return () => {
      Object.values(calmSoundAudio).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  React.useEffect(() => {
    service.saveSounds(selectedSounds);
  }, [selectedSounds]);

  function processMessage(messageEvent) {
    const message = `${messageEvent.from} ${messageEvent.msg}`;
    setCalmMessages((p) => [message, ...p]);
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

      const msg = `is ${isSelected ? 'disturbed' : 'calmed'} by ${sound}`;
      service.sendMessage(activeUser?.email ?? 'someone', msg);

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
            {sounds.map((sound, index) => (
              <div key={index} className='form-check form-switch'>
                <input className='form-check-input' type='checkbox' value={sound} id={sound} onChange={() => togglePlay(sound)} checked={selectedSounds.includes(sound)}></input>
                <label className='form-check-label' htmlFor={sound}>
                  {sound}
                </label>
              </div>
            ))}
          </div>
          <div className='input-group play-button-container'>
            <span className='input-group-text'>
              <img className='play-button-img' src='logo.svg' />
            </span>
            <button className={`btn btn-${isPlaying ? 'warning' : 'primary'} play-button-text `} type='button' id='play' onClick={(e) => togglePlayAll()}>
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
      </form>
      <div className='quote'>{weather}</div>
    </main>
  );
}
