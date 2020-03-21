import { CombinedActions } from '../actions/actions'
import { VideoTypeKeys } from '../actions/videoActions'

export interface RootState {
  embed: any
}

const initialState: RootState = {
  embed: null
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
    default:
      return state
  }
}
