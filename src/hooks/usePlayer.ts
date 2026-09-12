import { useEffect, useRef, useState } from 'react';

export const STREAM_URL = import.meta.env.VITE_STREAM_URL;

export type Status = 'idle' | 'loading' | 'playing' | 'error';

export function usePlayer() {
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

  // Tenta autoplay com som ao abrir o site. Se o navegador bloquear (política
  // de autoplay sem interação prévia), volta pro estado parado normal — um
  // único clique no play já toca com som, sem ficar preso mudo por baixo.
  // Roda uma única vez: este hook vive no App, então persiste entre abas.
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
      .catch(() => setStatus('idle'));
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

  return {
    audioRef,
    status,
    volume,
    muted,
    toggle,
    handleVolume,
    toggleMute,
    setStatus,
  };
}
