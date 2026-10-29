import { useState, useEffect, useRef } from "react"
import { songs } from "../songs.js"
import { supabase } from "../supabase/supabase.js"

export function useMusic() {
  const [allsongs, setallsongs] = useState(() => {
    const local = JSON.parse(localStorage.getItem("allsongs"))

    return local ? local : songs
  })

  const [currentSong, setCurrentSong] = useState(allsongs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [value, setValue] = useState(0)
  const [duration, setDuration] = useState(0)
  const audio = useRef()

  const [file, setfile] = useState(null)

  function uploadFile(e) {
    setfile(e.target.files[0])
  }

  useEffect(
    () => async () => {
      const { data } = await supabase.from("songs").select()
      console.log(data)
      localStorage.setItem("allsongs", JSON.stringify(allsongs))
    },
    []
  )

  useEffect(
    () => async () => {
      if (!file) return

      const src = URL.createObjectURL(file)
      const text = file.name.split("(")
      const [songName, _] = text
      //const artist = songName.split("(")[0]

      const newSong = {
        id: allsongs.slice(-1)[0].id + 1,
        src,
        artist: songName,
        songName,
        img: "../../public/poster.jpeg"
      }

      setallsongs((prev) => [...prev, newSong])
      const { data, error } = await supabase
        .from("songs")
        .insert({ user_id: "1", song_info: newSong })
        .select()
      //console.log(data)
      localStorage.setItem("allsongs", JSON.stringify(newSong))
    },
    [file]
  )

  function changeSongState() {
    setIsPlaying(!isPlaying)
  }

  function handleChange(e) {
    audio.current.currentTime = e.target.value
  }

  function backSong() {
    const indexSong = (currentSong.id - 2 + allsongs.length) % allsongs.length
    setCurrentSong(allsongs[indexSong])
    setIsPlaying(true)
  }

  function nextSong() {
    const indexSong = currentSong.id % allsongs.length
    setCurrentSong(allsongs[indexSong])
    setIsPlaying(true)
  }

  function formatTime(time) {
    if (time == null) return "00:00"
    const seg = Math.floor(time % 60)
    const min = Math.floor(time / 60)
    return `${min}:${seg.toString().padStart(2, 0)}`
  }

  function showModal() {
    const dialog = document.querySelector("#dialog")
    dialog.showModal()
  }

  function closeModal() {
    const dialog = document.querySelector("#dialog")
    dialog.close()
  }

  function playMusic(id) {
    const newSong = allsongs.find((song) => song.id == id)
    setCurrentSong(newSong)
    setIsPlaying(true)
    closeModal()
  }

  useEffect(() => {
    if (isPlaying) {
      audio.current.play()
    } else {
      audio.current.pause()
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    const audioElement = audio.current
    function TimeUpdate() {
      setValue(audioElement.currentTime)
    }

    function Duration() {
      setDuration(audioElement.duration)
    }

    audioElement.addEventListener("timeupdate", TimeUpdate)

    audioElement.addEventListener("loadedmetadata", Duration)

    audioElement.addEventListener("ended", nextSong)

    return () => {
      audioElement.removeEventListener("timeupdate", TimeUpdate)

      audioElement.removeEventListener("loadedmetadata", Duration)

      audioElement.removeEventListener("ended", nextSong)
    }
  }, [currentSong])

  return {
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
  }
}
