import { loadingMessage } from "./loading"

var tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api"

var firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

window.YTPlayer = null

function getVideoId(url) {
  const [part1, part2] = url.split("?v=")
  const [videoId, other] = part2.split("&")

  return videoId
}

export async function loadVideo(url) {
  loadingMessage("Carregando o vídeo do Youtube")

  return new Promise((resolve) => {
    const videoId = getVideoId(url)
    window.YTPlayer = new YT.Player("youtubeVideo", {
      videoId,

      events: {
        onReady: () => resolve(),
      },
    })
  })
}
