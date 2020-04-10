import { NodeTypeKeys, CombinedActions } from '../actions/nodeActions'
import { Node } from '../interface'

export interface RootState {
  nodes: Node[]
}

const initialState: RootState = {
  nodes: []
}

export default function rootReducer (
  state: RootState = initialState,
  action: CombinedActions
): RootState {
  switch (action.type) {
    case NodeTypeKeys.CREATE_NODE:
      return {
        ...state,
        nodes: [...state.nodes, action.payload]
      }
    case NodeTypeKeys.SAVE_NODE_SUCCESS:
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === action.nodeId) {
            return {
              ...node,
              saved: true
            }
          } else {
            return node
          }
        })
      }
    case NodeTypeKeys.SAVE_NODE_ERROR:
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === action.nodeId) {
            return {
              ...node,
              error: true
            }
          } else {
            return node
          }
        })
      }
    case NodeTypeKeys.DISCARD_NODE:
      return {
        ...state,
        nodes: state.nodes.filter((node) => node.id !== action.nodeId)
      }
    case NodeTypeKeys.ANNOTATE_NODE:
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === action.payload.nodeId) {
            return {
              ...node,
              nodeData: {
                ...node.nodeData,
                annotation: action.payload.data
              }
            }
          } else {
            return node
          }
        })
      }
    case NodeTypeKeys.ASSIGN_TOPIC:
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === action.payload.nodeId) {
            return {
              ...node,
              nodeData: {
                ...node.nodeData,
                topic: action.payload.data
              }
            }
          } else {
            return node
          }
        })
      }
    default:
      return state
  }
}
