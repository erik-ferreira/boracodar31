import ytdl from "ytdl-core"
import fs from "fs"

export const downloader = async (videoId) =>
  new Promise((resolve, reject) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    console.log("[START_DOWNLOAD]", videoUrl)

    ytdl(videoUrl, {
      quality: "lowestaudio",
      filter: "audioonly",
    })
      .on("end", () => {
        console.log("[FINISH_DOWNLOAD]")
        resolve()
      })
      .on("error", () => {
        console.log("[ERROR_DOWNLOAD]")
        reject("[ERROR_DOWNLOAD_VIDEO]")
      })
      .pipe(fs.createWriteStream(`./${videoId}.mp4`))
  })
