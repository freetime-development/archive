import uid from 'uid'
import { Node } from '../interface'
import {
  createNode,
  CreateNodeAction,
  SaveNodeActionError,
  DiscardNodeAction,
  AnnotateNodeAction,
  SaveNodeActionSuccess
} from './nodeActions'

export type CombinedActions =
  CreateNodeAction |
  SaveNodeActionSuccess |
  SaveNodeActionError |
  DiscardNodeAction |
  AnnotateNodeAction

export const initPopup = (url: URL, data, tab) => (dispatch, getState) => {
  const existingNode = getState().nodes.find((node) => node.nodeData.origin === url.origin)
  if (!existingNode) {
    const node: Node = {
      ...data,
      id: uid(),
      saved: false,
      error: false,
      nodeData: {
        ...data.nodeData,
        favIconUrl: tab.favIconUrl,
        title: tab.title,
        origin: url.origin,
        url
      }
    }

    // Create a Node
    dispatch(createNode(node))
  }
}
