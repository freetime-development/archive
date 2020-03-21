import { Providers, providers } from "../providers";
import { embedVideo, EmbedVideoAction } from "./videoActions";
  
export type CombinedActions = EmbedVideoAction

export const initPopup = (url: URL) => (dispatch) => {
  switch(url.origin) {
    case Providers.YT:
      const videoId =  url.searchParams.get("v")
      const embedUrl = `${url.origin}/embed/${videoId}`
      const embedElement = providers.get(Providers.YT)(embedUrl)

      dispatch(embedVideo(embedElement))
    default:
      dispatch({ type: "UNKNOWN_PROVIDER" })
  }
}
