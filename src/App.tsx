import { useState } from 'react';
import { Player } from './components/Player';
import { Nav, type Tab } from './components/Nav';
import { SocialLinks } from './components/SocialLinks';
import { useNowPlaying } from './hooks/useNowPlaying';
import { Sobre } from './pages/Sobre';
import { Eventos } from './pages/Eventos';
import { Videos } from './pages/Videos';
import { Anuncie } from './pages/Anuncie';
import logo from './assets/logo.png';

const STATION_NAME = import.meta.env.VITE_STATION_NAME;

function App() {
  const [tab, setTab] = useState<Tab>('home');
  const nowPlaying = useNowPlaying('Rádio CBR ao vivo');

  return (
    <div className="page">
      <header className="header">
        <img src={logo} alt={STATION_NAME} className="header__logo" />
        <Nav active={tab} onChange={setTab} />
      </header>

      <main className="hero">
        <div className="hero__content">
          {tab === 'home' && (
            <>
              <span className="hero__eyebrow">AO VIVO</span>
              <h1 className="hero__title">{STATION_NAME}</h1>
              <p className="hero__subtitle">Sintonizando e direcionando suas afeições a Deus</p>

              <div className="card">
                <Player />
                <div className="now-playing">
                  <span className="now-playing__label">Tocando agora</span>
                  <strong className="now-playing__title">
                    {nowPlaying.artist ? `${nowPlaying.artist} — ${nowPlaying.title}` : nowPlaying.title}
                  </strong>
                </div>
              </div>
            </>
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
    </div>
  );
}

export default App;
