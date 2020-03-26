import { logo, logoClientId } from '../conf'
import { EmbedVideoAction } from './videoActions'
import { StoreTextSelectionAction } from './textActions'
import { CreateNodeAction, createNode } from './nodeActions'
import { arrayBufferToBase64 } from '../utils'

export type CombinedActions =
  EmbedVideoAction &
  StoreTextSelectionAction &
  CreateNodeAction

export const initPopup = (url: URL, data) => async (dispatch, getState) => {
  const existingNode = getState().nodes.find((node) => node.meta.origin === url.origin)
  if (!existingNode) {
    const node: any = {
      ...data,
      meta: {
        ...data.meta,
        origin: url.origin,
        url
      }
    }
    const logoData = await getLogo(url.origin)
    if (logoData) {
      chrome.runtime.sendMessage({ from: 'actions', logo: `logoData${logoData}` })
      const buffer = await logoData.arrayBuffer()
      const base64Flag = 'data:image/jpeg;base64,'
      const imageStr = arrayBufferToBase64(buffer)

      node.logo = base64Flag + imageStr
    }

    // Create a Node
    dispatch(createNode(node))
  }
}

const getLogo = async (domain: string) => {
  return fetch(`${logo}/images/logo?client_id=${logoClientId}&domain=${domain}`)
}
