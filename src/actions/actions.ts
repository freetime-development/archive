import { Providers, providers } from '../providers'
import { embedVideo, EmbedVideoAction } from './videoActions'
import { StoreTextSelectionAction } from './textActions'

export type CombinedActions =
  EmbedVideoAction &
  StoreTextSelectionAction

export const initPopup = (url: URL) => (dispatch) => {
  switch (url.origin) {
    case Providers.YT:
      const videoId = url.searchParams.get('v')
      const embedUrl = `${url.origin}/embed/${videoId}`
      const embedElement = providers.get(Providers.YT)(embedUrl)

      dispatch(embedVideo(embedElement))
      break
    default:
      dispatch({ type: 'UNKNOWN_PROVIDER' })
  }
}
