import { CombinedActions } from '../actions/actions'
import { VideoTypeKeys } from '../actions/videoActions'
import { TextTypeKeys } from '../actions/textActions'
import { NodeTypeKeys } from '../actions/nodeActions'
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
    case VideoTypeKeys.EMBED_VIDEO:
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === action.payload.id) {
            return {
              ...node,
              embed: action.payload.data
            }
          } else {
            return node
          }
        })
      }
    case TextTypeKeys.SAVE_TEXT:
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === action.payload.id) {
            return {
              ...node,
              text: action.payload.data
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
