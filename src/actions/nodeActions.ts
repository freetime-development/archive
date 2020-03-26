import uid from 'uid'
import { Node } from '../interface'

export enum NodeTypeKeys {
  CREATE_NODE = 'CREATE_NODE'
}

export interface CreateNodeAction {
  type: NodeTypeKeys.CREATE_NODE
  payload: Node
}

export const createNode = (node: any): CreateNodeAction => ({
  type: NodeTypeKeys.CREATE_NODE,
  payload: {
    id: uid(),
    title: document.title,
    saved: false,
    ...node
  }
})
