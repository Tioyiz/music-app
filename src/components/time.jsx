export function Time({ duration, value, formatTime, handleChange }) {
  return (
    <div>
      <span>{formatTime(value)}</span>
      <input
        onChange={handleChange}
        type="range"
        min={0}
        max={duration}
        value={value}
      />
      <span>{formatTime(duration)}</span>
    </div>
  )
}
