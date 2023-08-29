import cors from "cors"
import express from "express"

import { downloader } from "./download-video.js"
import { createMP3 } from "./create-mp3.js"

const app = express()
app.use(cors())

app.get("/audio", async (req, res) => {
  const videoId = req.query.v

  try {
    await downloader(videoId)
    await createMP3(videoId)

    return res.send("Ok")
  } catch (err) {
    return res.send(err)
  }
})

app.listen(3333, () => console.log("Server running"))
