import { CombinedActions } from '../actions/actions'
import { VideoTypeKeys } from '../actions/videoActions'
import { TextTypeKeys } from '../actions/textActions'

export interface RootState {
  embed: any
  textSelection: string
}

const initialState: RootState = {
  embed: null,
  textSelection: ''
}

export default function rootReducer (
  state: RootState = initialState,
  action: CombinedActions
): RootState {
  switch (action.type) {
    case VideoTypeKeys.EMBED_VIDEO:
      return {
        ...state,
        embed: action.payload
      }
    case TextTypeKeys.SAVE_TEXT:
      return {
        ...state,
        textSelection: action.payload
      }
    default:
      return state
  }
}
