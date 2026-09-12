import { useState } from 'react';
import { Player } from './components/Player';
import { MiniPlayer } from './components/MiniPlayer';
import { Nav, type Tab } from './components/Nav';
import { SocialLinks } from './components/SocialLinks';
import { useNowPlaying } from './hooks/useNowPlaying';
import { usePlayer, STREAM_URL } from './hooks/usePlayer';
import { Sobre } from './pages/Sobre';
import { Eventos } from './pages/Eventos';
import { Videos } from './pages/Videos';
import { Anuncie } from './pages/Anuncie';
import logo from './assets/logo.png';

const STATION_NAME = import.meta.env.VITE_STATION_NAME;

const LEAVE_HOME_DELAY = 500;

function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [leavingHome, setLeavingHome] = useState(false);
  const nowPlaying = useNowPlaying('Rádio CBR ao vivo');
  const player = usePlayer();

  const nowPlayingTitle = nowPlaying.artist
    ? `${nowPlaying.artist} — ${nowPlaying.title}`
    : nowPlaying.title;

  const handleTabChange = (next: Tab) => {
    if (next === tab) return;

    // Ao sair da Home, dá tempo do player grande "descer" (animação CSS)
    // antes de trocar de fato a aba — reforça a ideia de que ele virou o mini player.
    if (tab === 'home' && next !== 'home') {
      setLeavingHome(true);
      setTimeout(() => {
        setTab(next);
        setLeavingHome(false);
      }, LEAVE_HOME_DELAY);
      return;
    }

    setTab(next);
  };

  return (
    <div className={`page ${tab !== 'home' ? 'has-mini-player' : ''}`}>
      {/* Único <audio> da aplicação: fica fora das abas pra tocar sem interrupção
          ao navegar entre elas. */}
      <audio
        ref={player.audioRef}
        preload="none"
        onWaiting={() => player.setStatus('loading')}
        onPlaying={() => player.setStatus('playing')}
        onError={() => player.setStatus('error')}
      >
        <source src={STREAM_URL} />
      </audio>

      <header className="header">
        <img src={logo} alt={STATION_NAME} className="header__logo" />
        <Nav active={tab} onChange={handleTabChange} />
      </header>

      <main className="hero">
        <div className="hero__content">
          {tab === 'home' && (
            <div className={`home-content ${leavingHome ? 'is-leaving' : ''}`}>
              <span className="hero__eyebrow">AO VIVO</span>
              <h1 className="hero__title">{STATION_NAME}</h1>
              <p className="hero__subtitle">Sintonizando e direcionando suas afeições a Deus</p>

              <div className="card">
                <Player
                  status={player.status}
                  volume={player.volume}
                  muted={player.muted}
                  onToggle={player.toggle}
                  onVolumeChange={player.handleVolume}
                  onToggleMute={player.toggleMute}
                />
                <div className="now-playing">
                  <span className="now-playing__label">Tocando agora</span>
                  <strong className="now-playing__title">{nowPlayingTitle}</strong>
                </div>
              </div>
            </div>
          )}

          {tab === 'sobre' && <Sobre />}
          {tab === 'eventos' && <Eventos />}
          {tab === 'videos' && <Videos />}
          {tab === 'anuncie' && <Anuncie />}
        </div>
      </main>

      <footer className="footer">
        <SocialLinks />
        <p>&copy; {new Date().getFullYear()} {STATION_NAME}. Todos os direitos reservados.</p>
      </footer>

      <MiniPlayer
        visible={tab !== 'home'}
        status={player.status}
        title={nowPlayingTitle}
        onToggle={player.toggle}
      />
    </div>
  );
}

export default App;
