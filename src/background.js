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
  store.dispatch(initPopup(url, { nodeData: { text: info.selectionText } }, tab))
}

function onClickBrowserIcon(tab) {
  const url = new URL(tab.url)

  const providerSpecificData = createNodeData(url)
  chrome.tabs.sendMessage(tab.id, { msg: 'open_extension', providerSpecificData: providerSpecificData || 'no_data' })
  if (providerSpecificData) {
    store.dispatch(initPopup(url, providerSpecificData, tab))
  }
}

function createNodeData(url) {
  const node = {
    nodeData: {}
  }
  switch (url.origin) {
    case Providers.YT: {
      const videoId = url.searchParams.get('v')
      if (store.getState().nodes.find((node) => node.nodeData.videoId === videoId)) {
        return null
      }
      const embedUrl = `${url.origin}/embed/${videoId}`
      const embedElement = providers.get(Providers.YT)(embedUrl)

      node.nodeData.videoId = videoId
      node.nodeData.embedUrl = embedUrl
      node.embed = embedElement
      return node
    }
    case Providers.IMGUR: {
      const postId = window.location.pathname.split('/')[2]
      if (store.getState().nodes.find((node) => node.nodeData.postId === postId)) {
        return null
      }
      const embedElement = providers.get(Providers.IMGUR)(postId)

      node.nodeData.postId = postId
      node.embed = embedElement

      return node
    }
    default:
      return null
  }
}
