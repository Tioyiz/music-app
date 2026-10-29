import { SongInfo } from "./components/songInfo.jsx"
import { Time } from "./components/time.jsx"
import {
  Backbutton,
  Pausebutton,
  Playbutton,
  Nextbutton,
  Heart,
  Letra
} from "./components/icons.jsx"
import { ListSongs } from "./components/icons.jsx"
import { Songs } from "./components/songs.jsx"
import { useMusic } from "./hooks/useMusic.jsx"
import "./App.css"

function App() {
  const {
    audio,
    currentSong,
    duration,
    value,
    formatTime,
    handleChange,
    isPlaying,
    changeSongState,
    nextSong,
    backSong,
    uploadFile,
    showModal,
    allsongs,
    closeModal,
    playMusic
  } = useMusic()
  return (
    <>
      <audio src={currentSong.src} ref={audio}></audio>

      <main>
        <SongInfo song={currentSong} className={"player"} />
        <Time
          duration={duration}
          value={value}
          formatTime={formatTime}
          handleChange={handleChange}
        />
        <footer>
          <div className="controls">
            <Backbutton handleClick={backSong} />
            {isPlaying ? (
              <Pausebutton handleClick={changeSongState} />
            ) : (
              <Playbutton handleClick={changeSongState} />
            )}
            <Nextbutton handleClick={nextSong} />
          </div>
          <div className="opcions">
            <Heart />
            <button>
              <label htmlFor="file-upload-input">
                <Letra />
                <input
                  type="file"
                  id="file-upload-input"
                  onChange={uploadFile}
                  style={{ display: "none" }}
                />
              </label>
            </button>
            <ListSongs showModal={showModal} />
          </div>
        </footer>
      </main>
      <Songs
        allsongs={allsongs}
        closeModal={closeModal}
        playMusic={playMusic}
        currentSong={currentSong}
      />
    </>
  )
}
export default App
