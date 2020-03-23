import { initializeStore } from './store'
import { storeTextSelection } from './actions/textActions'

chrome.runtime.onInstalled.addListener(function () {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, sender, sendResponse)
  })

  chrome.contextMenus.create({
    id: 'id',
    title: 'Archive',
    type: 'normal',
    contexts: ['all']
  })

  chrome.contextMenus.onClicked.addListener(onClickContextMenu)
})

/********************************
  Initialize persistent store
  whom components communicate with
  via proxy store messaging
********************************/
const store = initializeStore()

function onClickContextMenu (info, tab) {
  if (info.selectionText) {
    store.dispatch(storeTextSelection(info.selectionText))
  }
}
