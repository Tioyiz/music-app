export function SongInfo({ song, className, playMusic = () => { } }) {
  return (
    <section className={className} onClick={() => playMusic(song.id)}>
      <img src={song.img} />
      <div className="info">
        <h1>{song.songName}</h1>
        <h2>{song.artista}</h2>
      </div>
    </section>
  )
}
