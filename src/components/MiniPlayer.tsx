import type { Status } from '../hooks/usePlayer';
import { PlayIcon, PauseIcon } from './icons';

interface Props {
  visible: boolean;
  status: Status;
  title: string;
  onToggle: () => void;
}

export function MiniPlayer({ visible, status, title, onToggle }: Props) {
  return (
    <div className={`mini-player ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <button
        className={`mini-player__play ${status === 'playing' ? 'is-playing' : ''}`}
        onClick={onToggle}
        aria-label={status === 'playing' ? 'Pausar' : 'Tocar'}
        tabIndex={visible ? 0 : -1}
      >
        {status === 'loading' ? (
          <span className="player__spinner" aria-hidden />
        ) : status === 'playing' ? (
          <PauseIcon size={18} />
        ) : (
          <PlayIcon size={18} />
        )}
      </button>

      <div className="mini-player__info">
        <span className="mini-player__label">
          <span className="mini-player__dot" aria-hidden />
          AO VIVO
        </span>
        <strong className="mini-player__title">{title}</strong>
      </div>
    </div>
  );
}
