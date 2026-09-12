import { Player } from './components/Player';
import { useNowPlaying } from './hooks/useNowPlaying';
import logo from './assets/logo.png';

const STATION_NAME = import.meta.env.VITE_STATION_NAME;

function App() {
  const nowPlaying = useNowPlaying('Rádio CBR ao vivo');

  return (
    <div className="page">
      <header className="header">
        <img src={logo} alt={STATION_NAME} className="header__logo" />
      </header>

      <main className="hero">
        <div className="hero__content">
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
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {STATION_NAME}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
