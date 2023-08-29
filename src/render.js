window.seek = function (event) {
  const seekTo = event.target.dataset.seekTo

  window.YTPlayer.seekTo(seekTo)
  window.YTPlayer.playVideo()
}

function getMinutes(timestamp) {
  let date = new Date(null)
  date.setTime(timestamp[0] * 1000)

  return date.toISOString().slice(11, 19)
}

function groupedText(text, timestamp) {
  const words = text.split(" ")

  const groups = []

  for (let index = 0; index < words.length; index++) {
    if (index % 3 === 0) {
      groups.push(words.slice(index, index + 3).join(" "))
    }
  }

  return groups
    .map((item, i) => {
      const [initialTime, finalTime] = timestamp
      const seekTo =
        i == 0
          ? initialTime
          : (finalTime - initialTime) / (groups.length - i) + initialTime

      return `<span onClick=seek(event) data-seek-to=${seekTo}>${item}</span>`
    })
    .join("")
}

const renderChunk = ({ timestamp, text }) => `
<div class="chunk flex">
  <time class="flex">${getMinutes(timestamp)}</time>
  <p>
    ${groupedText(text, timestamp)}
  </p>
</div>
`

export function renderText({ chunks }) {
  const formattedTranscription = chunks.map(renderChunk).join("")

  document.querySelector(".transcription .content").innerHTML =
    formattedTranscription
}
