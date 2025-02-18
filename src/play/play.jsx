import React from 'react';
import './play.css';
import service from '../service/service';
import { VolumeSlider } from './volumeSlider';

export function Play({ activeUser }) {
  const loadedSounds = React.useRef({});
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [sounds, setSounds] = React.useState({});
  const [calmMessages, setCalmMessages] = React.useState([]);
  const [selectedSounds, setSelectedSounds] = React.useState(service.loadSounds());
  const [volume, setVolume] = React.useState(service.loadVolume());

  React.useEffect(() => {
    (async function loadSounds() {
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
    })();

    return () => {
      Object.values(loadedSounds.current).forEach((sound) => {
        sound.audio.pause();
      });
    };
  }, []);

  React.useEffect(() => {
    if (activeUser) {
      service.addMessageReceiver((msg) => {
        if (msg.from === activeUser?.email) {
          togglePlay(msg.sound, msg.action === 'added', false);
        } else {
          let message = '';
          if (msg.from === 'system') {
            message = `friends are ${msg.action}`;
          } else {
            message = `${msg.from} is ${msg.action === 'removed' ? 'disturbed' : 'calmed'} by ${msg.sound}`;
          }
          setCalmMessages((p) => [message, ...p]);
        }
      });
    }
  }, [activeUser]);

  React.useEffect(() => {
    service.saveSounds(selectedSounds, volume);

    Object.values(sounds).forEach((sound) => {
      if (!isPlaying) {
        sound.audio.pause();
      } else {
        if (selectedSounds.includes(sound.name)) {
          sound.audio.play();
          sound.audio.volume = volume * 0.01;
        } else {
          sound.audio.pause();
        }
      }
    });
  }, [selectedSounds, isPlaying]);

  function togglePlay(sound, added, notify = false) {
    setSelectedSounds((prevSounds) => {
      if (notify) {
        const msg = { action: added ? 'added' : 'removed', from: activeUser?.email, sound };
        service.sendMessage(msg);
      }

      if (added) {
        return prevSounds.includes(sound) ? prevSounds : [...prevSounds, sound];
      } else {
        return prevSounds.filter((s) => s !== sound);
      }
    });
  }

  React.useEffect(() => {
    service.saveSounds(selectedSounds, volume);

    Object.values(sounds).forEach((sound) => {
      sound.audio.volume = volume * 0.01;
    });
  }, [volume]);

  return (
    <main className='container-fluid view-play'>
      <form>
        <h3>Calming tones</h3>
        <div className='player-controls'>
          <div className='input-group sound-button-container'>
            {Object.values(sounds).map((sound, index) => (
              <div key={index} className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value={sound.name}
                  id={sound.name}
                  onChange={(e) => togglePlay(sound.name, e.target.checked, true)}
                  checked={selectedSounds.includes(sound.name)}
                ></input>
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
            <button className={`btn btn-${isPlaying ? 'warning' : 'primary'} play-button-text `} type='button' id='play' onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>
        <VolumeSlider volume={volume} onChange={setVolume} />
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
