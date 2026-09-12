import { useEffect, useRef, useState } from 'react';

const STREAM_URL = import.meta.env.VITE_STREAM_URL;

type Status = 'idle' | 'loading' | 'playing' | 'error';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  // audio.load() reseta volume/muted para o padrão do elemento, então
  // reaplicamos sempre que o estado ou o próprio elemento mudar.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted, status]);

  // Autoplay ao abrir o site. Navegadores só permitem tocar áudio com som
  // sem interação prévia do usuário se a política de autoplay permitir; caso
  // contrário, tentamos com o som mudo (quase sempre permitido) e o ouvinte
  // ativa o som com um clique no botão de volume.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setStatus('loading');
    audio.load();
    audio.volume = volume;
    audio.muted = false;
    audio
      .play()
      .then(() => setStatus('playing'))
      .catch(() => {
        audio.muted = true;
        setMuted(true);
        audio
          .play()
          .then(() => setStatus('playing'))
          .catch(() => setStatus('idle'));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (status === 'playing') {
      audio.pause();
      setStatus('idle');
      return;
    }

    setStatus('loading');
    audio.load();
    audio.volume = volume;
    audio.muted = muted;
    audio
      .play()
      .then(() => setStatus('playing'))
      .catch(() => setStatus('error'));
  };

  const handleVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
    if (value > 0) setMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const next = !muted;
    audioRef.current.muted = next;
    setMuted(next);
  };

  return (
    <div className="player">
      <audio
        ref={audioRef}
        preload="none"
        onWaiting={() => setStatus('loading')}
        onPlaying={() => setStatus('playing')}
        onError={() => setStatus('error')}
      >
        <source src={STREAM_URL} />
      </audio>

      <div className="player__row">
        <button
          className={`player__play ${status === 'playing' ? 'is-playing' : ''}`}
          onClick={toggle}
          aria-label={status === 'playing' ? 'Pausar' : 'Tocar'}
        >
          {status === 'loading' ? (
            <span className="player__spinner" aria-hidden />
          ) : status === 'playing' ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </button>

        <div className="player__volume">
          <button
            className="player__mute"
            onClick={toggleMute}
            aria-label={muted ? 'Ativar som' : 'Silenciar'}
          >
          {muted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
            onChange={(e) => handleVolume(Number(e.target.value))}
            aria-label="Volume"
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="player__error">
          Não foi possível conectar ao stream. Tente novamente em instantes.
        </p>
      )}

      {status === 'playing' && muted && (
        <p className="player__hint">🔇 Toque no ícone de volume para ativar o som</p>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12z" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.53l2.36 2.36c.09-.28.14-.58.14-.86zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.958 8.958 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
}
