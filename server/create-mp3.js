import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

export const createMP3 = (videoId) =>
  new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic)

    ffmpeg()
      .input(`./${videoId}.mp4`)
      .outputOptions("-ab", "20k")
      .saveToFile(`./${videoId}.mp3`)
      .on("end", () => {
        console.log("Audio convertido com sucesso.")
        resolve()
      })
      .on("error", (error) => {
        console.error(error)
        reject(error)
      })
  })
