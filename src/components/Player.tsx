import type { Status } from '../hooks/usePlayer';
import { PlayIcon, PauseIcon, VolumeIcon, MuteIcon } from './icons';

interface Props {
  status: Status;
  volume: number;
  muted: boolean;
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
}

export function Player({ status, volume, muted, onToggle, onVolumeChange, onToggleMute }: Props) {
  return (
    <div className="player">
      <div className="player__row">
        <button
          className={`player__play ${status === 'playing' ? 'is-playing' : ''}`}
          onClick={onToggle}
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
            onClick={onToggleMute}
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
            onChange={(e) => onVolumeChange(Number(e.target.value))}
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
