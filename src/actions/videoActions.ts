import { domain } from '../conf'

export enum VideoTypeKeys {
  EMBED_VIDEO = 'EMBED_VIDEO'
}

export interface VideoData {
  url: URL
  origin: string
  embedUrl: string
  videoId: string
}

/****************
*** Embedding ***
*****************/

export interface EmbedVideoAction {
  type: VideoTypeKeys.EMBED_VIDEO
  payload: any
}

export const embedVideo = (payload: any): EmbedVideoAction => ({
  type: VideoTypeKeys.EMBED_VIDEO,
  payload
})

/*************
*** Saving ***
**************/

const saveVideo = (data: VideoData) => (dispatch) => {
  fetch(`${domain}/api/set`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(function (response) {
      const res = response.json()
    })
    .catch(function (err) {
      console.log(`Error: ${err}`)
    })
}
