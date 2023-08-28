import cors from "cors"
import express from "express"

import { downloader } from "./download-video.js"

const app = express()
app.use(cors())

app.get("/audio", async (req, res) => {
  const videoId = req.query.v

  try {
    // download the video
    await downloader(videoId)

    // convert to mp3

    return res.send("Ok")
  } catch (err) {
    return res.send(err)
  }

  return res.send(videoId)
})

app.listen(3333, () => console.log("Server running"))
