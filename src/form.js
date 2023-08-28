import { loadVideo } from "./youtube-api"
import { startLoading, stopLoading, loadingMessage } from "./loading"

const form = document.querySelector("#form")

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  try {
    loadingMessage("Iniciando a aplicação")
    startLoading()

    // get form
    const formData = new FormData(form)
    const url = formData.get("url")

    await loadVideo(url)

    // load video
  } catch (e) {
    console.log("[SUBMIT_ERROR]", error)
  } finally {
    stopLoading()
  }
})
