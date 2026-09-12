export type Tab = 'home' | 'sobre' | 'eventos' | 'videos' | 'anuncie';

const TABS: { id: Tab; label: string }[] = [
  { id: 'home', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'videos', label: 'Vídeos' },
  { id: 'anuncie', label: 'Anuncie na CBR' },
];

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function Nav({ active, onChange }: Props) {
  return (
    <nav className="nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav__item ${active === tab.id ? 'is-active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
