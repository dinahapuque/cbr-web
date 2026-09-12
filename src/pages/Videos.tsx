const VIDEO_IDS = ['TOxEHfjGZC8', 'xzeRODg3qOg', 'yMaEFDy0-bw', 'yY3SrQoiAo4'];

export function Videos() {
  return (
    <div className="page-section">
      <h2 className="page-section__title">Vídeos</h2>
      <div className="video-grid">
        {VIDEO_IDS.map((id) => (
          <div className="video-grid__item" key={id}>
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title={`Vídeo Rádio CBR ${id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>
      <a
        className="link-button"
        href="https://www.youtube.com/@RadioCBREsperanca"
        target="_blank"
        rel="noreferrer"
      >
        Ver mais no YouTube
      </a>
    </div>
  );
}
