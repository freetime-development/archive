import { domain } from '../conf'

export enum TextTypeKeys {
  SAVE_TEXT = 'SAVE_TEXT'
}

export interface StoreTextSelectionAction {
  type: TextTypeKeys.SAVE_TEXT
  payload: string
}

export const storeTextSelection = (payload: string): StoreTextSelectionAction => ({
  type: TextTypeKeys.SAVE_TEXT,
  payload
})

export const saveText = (text: string) => (dispatch) => {
  fetch(`${domain}/api/set`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(text)
  }).then(function (response) {
    const res = response.json()
  }).catch(function (err) {
    console.log(`Error: ${err}`)
  })
}
