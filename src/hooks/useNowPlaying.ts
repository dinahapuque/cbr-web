import { useEffect, useState } from 'react';

interface NowPlaying {
  title: string;
  artist?: string;
}

const PROVIDER = import.meta.env.VITE_NOWPLAYING_PROVIDER;
const ZENO_MOUNT_ID = import.meta.env.VITE_ZENO_MOUNT_ID;
const RADIOCO_STATION_ID = import.meta.env.VITE_RADIOCO_STATION_ID;

function splitArtistTitle(raw: string): NowPlaying {
  const [a, b] = raw.split(' - ');
  return b ? { artist: a.trim(), title: b.trim() } : { title: raw.trim() };
}

export function useNowPlaying(fallback: string) {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ title: fallback });

  useEffect(() => {
    if (PROVIDER === 'zeno' && ZENO_MOUNT_ID) {
      const source = new EventSource(
        `https://api.zeno.fm/mounts/metadata/subscribe/${ZENO_MOUNT_ID}`
      );
      source.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.streamTitle) setNowPlaying(splitArtistTitle(data.streamTitle));
        } catch {
          // ignora mensagens malformadas
        }
      };
      return () => source.close();
    }

    if (PROVIDER === 'radioco' && RADIOCO_STATION_ID) {
      const poll = async () => {
        try {
          const res = await fetch(
            `https://public.radio.co/stations/${RADIOCO_STATION_ID}/status`
          );
          const data = await res.json();
          if (data?.current_track?.title) {
            setNowPlaying(splitArtistTitle(data.current_track.title));
          }
        } catch {
          // mantém o último valor conhecido em caso de falha
        }
      };
      poll();
      const interval = setInterval(poll, 15000);
      return () => clearInterval(interval);
    }
  }, []);

  return nowPlaying;
}
