import { Node } from '../interface'

export enum NodeTypeKeys {
  CREATE_NODE = 'CREATE_NODE',
  SAVE_NODE = 'SAVE_NODE',
  SAVE_NODE_SUCCESS = 'SAVE_NODE_SUCCESS',
  SAVE_NODE_ERROR = 'SAVE_NODE_ERROR',
  DISCARD_NODE = 'DISCARD_NODE'
}

export interface CreateNodeAction {
  type: NodeTypeKeys.CREATE_NODE
  payload: Node
}

export const createNode = (node: Node): CreateNodeAction => ({
  type: NodeTypeKeys.CREATE_NODE,
  payload: node
})

export interface SaveNodeAction {
  type: NodeTypeKeys.SAVE_NODE
  payload: Node
}

export const saveNode = (node: Node): SaveNodeAction => ({
  type: NodeTypeKeys.SAVE_NODE,
  payload: node
})

export interface DiscardNodeAction {
  type: NodeTypeKeys.DISCARD_NODE
  nodeId: string
}

export const discardNode = (nodeId: string): DiscardNodeAction => ({
  type: NodeTypeKeys.DISCARD_NODE,
  nodeId: nodeId
})
