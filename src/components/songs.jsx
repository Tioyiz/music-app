import { SongInfo } from "./songInfo"

export function Songs({ allsongs, closeModal, playMusic, currentSong }) {
  return (
    <>
      <dialog id="dialog">
        <button onClick={closeModal}> cerrar</button>
        {allsongs.map((song) => {
          const isPlaying = [currentSong].some(
            (current) => current.id === song.id
          )

          return (
            <div key={song.id} className={isPlaying ? "border" : ""}>
              <SongInfo
                playMusic={playMusic}
                key={song.id}
                song={song}
                className={"list"}
              />
            </div>
          )
        })}
      </dialog>
    </>
  )
}
