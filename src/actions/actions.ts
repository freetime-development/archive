import uid from 'uid'
import { CreateNodeAction, SaveNodeAction, DiscardNodeAction, createNode } from './nodeActions'
import { Node } from '../interface'

export type CombinedActions =
  CreateNodeAction &
  SaveNodeAction &
  DiscardNodeAction

export const initPopup = (url: URL, data, tab) => (dispatch, getState) => {
  const existingNode = getState().nodes.find((node) => node.nodeData.origin === url.origin)
  if (!existingNode) {
    const node: Node = {
      ...data,
      id: uid(),
      saved: false,
      error: false,
      favIconUrl: tab.favIconUrl,
      nodeData: {
        ...data.nodeData,
        title: tab.title,
        origin: url.origin,
        url
      }
    }

    // Create a Node
    dispatch(createNode(node))
  }
}
