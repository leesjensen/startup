import React from 'react';
import './play.css';
import service from '../service';

export function Play({ activeUser }) {
  const loadedSounds = React.useRef({});
  const [sounds, setSounds] = React.useState([]);
  const [calmMessages, setCalmMessages] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedSounds, setSelectedSounds] = React.useState(service.loadSounds());

  React.useEffect(() => {
    loadSounds();
    service.addMessageReceiver(processMessage);

    async function loadSounds() {
      const soundTypes = await service.calmSoundTypes();
      if (!loadedSounds.current.length) {
        loadedSounds.current = soundTypes.reduce((acc, soundType) => {
          const sound = { name: soundType, audio: new Audio(`/sounds/${soundType}.mp3`) };
          sound.audio.loop = true;
          acc[soundType] = sound;
          return acc;
        }, {});
      }
      setSounds(loadedSounds.current);
    }

    return () => {
      Object.values(loadedSounds.current).forEach((sound) => {
        sound.audio.pause();
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
        sounds[sound]?.audio.play();
      } else {
        sounds[sound]?.audio.pause();
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
        const audio = sounds[sound].audio;
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
            {Object.values(sounds).map((sound, index) => (
              <div key={index} className='form-check form-switch'>
                <input className='form-check-input' type='checkbox' value={sound.name} id={sound.name} onChange={() => togglePlay(sound.name)} checked={selectedSounds.includes(sound.name)}></input>
                <label className='form-check-label' htmlFor={sound.name}>
                  {sound.name}
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
    </main>
  );
}
