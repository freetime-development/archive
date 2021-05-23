import axios from 'axios'
import { Node } from '../interface'
import { host, saveData } from '../conf'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers/rootReducer'
import uid from 'uid'
import { Action } from 'redux'

const request = axios.create({
  baseURL: host
})

export enum NodeTypeKeys {
  CREATE_NODE = 'CREATE_NODE',
  SAVE_NODE = 'SAVE_NODE',
  SAVE_NODE_SUCCESS = 'SAVE_NODE_SUCCESS',
  SAVE_NODE_ERROR = 'SAVE_NODE_ERROR',
  DISCARD_NODE = 'DISCARD_NODE',
  ANNOTATE_NODE = 'ANNOTATE_NODE',
  ASSIGN_TOPIC = 'ASSIGN_TOPIC',
}

export type CombinedActions =
  CreateNodeAction |
  SaveNodeActionSuccess |
  SaveNodeActionError |
  DiscardNodeAction |
  AnnotateNodeAction |
  AssignTopicAction

export interface CreateNodeAction {
  type: NodeTypeKeys.CREATE_NODE
  payload: Node
}

export const createNode = (url, data: Node, tab): CreateNodeAction => {
  const node: Node = {
    ...data,
    id: uid(),
    saved: false,
    error: false,
    nodeData: {
      ...data.nodeData,
      topic: '',
      annotation: '',
      favIconUrl: tab.favIconUrl,
      title: tab.title,
      origin: url.origin,
      date: new Date().toISOString(),
      url
    }
  }

  return {
    type: NodeTypeKeys.CREATE_NODE,
    payload: node
  }
}

/**********************************************/

type SaveNodeThunkAction = ThunkAction<void, RootState, any, Action<any>>
export interface SaveNodeAction {
  type: NodeTypeKeys.SAVE_NODE
  payload: Node
}

export const saveNode = (node: Node): SaveNodeThunkAction => (dispatch) => {
  request.post(`${saveData}`, node.nodeData).then((response) => {
    if (response.status === 200) {
      dispatch(saveNodeSuccess(node.id))
    } else {
      dispatch(saveNodeError(node.id))
    }
  }).catch(_ => {
    dispatch(saveNodeError(node.id))
  })
}

export interface SaveNodeActionSuccess {
  type: NodeTypeKeys.SAVE_NODE_SUCCESS
  nodeId: string
}

export const saveNodeSuccess = (nodeId: string): SaveNodeActionSuccess => ({
  type: NodeTypeKeys.SAVE_NODE_SUCCESS,
  nodeId
})

export interface SaveNodeActionError {
  type: NodeTypeKeys.SAVE_NODE_ERROR
  nodeId: string
}

export const saveNodeError = (nodeId: string): SaveNodeActionError => ({
  type: NodeTypeKeys.SAVE_NODE_ERROR,
  nodeId
})

/**********************************************/

export interface DiscardNodeAction {
  type: NodeTypeKeys.DISCARD_NODE
  nodeId: string
}

export const discardNode = (nodeId: string): DiscardNodeAction => ({
  type: NodeTypeKeys.DISCARD_NODE,
  nodeId: nodeId
})

/**********************************************/

interface AnnotationPayload {
  nodeId: string
  data: string
}

export interface AnnotateNodeAction {
  type: NodeTypeKeys.ANNOTATE_NODE
  payload: AnnotationPayload
}

export const annotateNode = (nodeId: string, data: string): AnnotateNodeAction => ({
  type: NodeTypeKeys.ANNOTATE_NODE,
  payload: { nodeId, data }
})

/**********************************************/

interface AssignTopicPayload {
  nodeId: string
  data: string
}

export interface AssignTopicAction {
  type: NodeTypeKeys.ASSIGN_TOPIC
  payload: AssignTopicPayload
}

export const assignTopic = (nodeId: string, data: string): AssignTopicAction => ({
  type: NodeTypeKeys.ASSIGN_TOPIC,
  payload: { nodeId, data }
})
