import { initializeStore } from './store'
import { initPopup } from './actions/actions'
import { providers, Providers } from './providers'

/********************************
  Initialize persistent store
  whom components communicate with
  via proxy store messaging
********************************/
const store = initializeStore()

chrome.runtime.onInstalled.addListener(function () {
  // For debugging
  chrome.runtime.onMessage.addListener(function (request) {
    console.log(request)
  })

  // Creating item in context menu {mouse_click_right | event.button === 2}
  chrome.contextMenus.create({
    id: 'id',
    title: 'Archive',
    type: 'normal',
    contexts: ['all']
  })

  // Clicking on archive icon in browser
  chrome.browserAction.onClicked.addListener(onClickBrowserIcon)

  // Clicking on context menu item
  chrome.contextMenus.onClicked.addListener(onClickContextMenu)
})

function onClickContextMenu(info, tab) {
  const url = new URL(tab.url)

  chrome.tabs.sendMessage(tab.id, { msg: 'open_extension', tab })
  store.dispatch(initPopup(url, { text: info.selectionText }))
}

function onClickBrowserIcon(tab) {
  const url = new URL(tab.url)

  const nodeData = createNodeData(url)
  chrome.tabs.sendMessage(tab.id, { msg: 'open_extension', nodeData })
  if (nodeData) {
    store.dispatch(initPopup(url, nodeData))
  }
}

function createNodeData(url) {
  const node = {
    meta: {}
  }
  switch (url.origin) {
    case Providers.YT: {
      const videoId = url.searchParams.get('v')
      if (store.getState().nodes.find((node) => node.meta.videoId === videoId)) {
        return null
      }
      const embedUrl = `${url.origin}/embed/${videoId}`
      const embedElement = providers.get(Providers.YT)(embedUrl)

      node.meta.videoId = videoId
      node.meta.embedUrl = embedUrl
      node.embed = embedElement
      return node
    }
    default:
      return null
  }
}
