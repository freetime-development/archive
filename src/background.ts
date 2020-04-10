import { initializeStore } from './store'
import { createNode } from './actions/nodeActions'
import { providers, Providers } from './providers'
import { Node } from './interface'

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

  const textData = {
    nodeData: { text: info.selectionText }
  } as Node
  chrome.tabs.sendMessage(tab.id, { msg: 'open_extension', tab, info })
  store.dispatch(createNode(url, textData, tab) as any)
}

function onClickBrowserIcon(tab) {
  const url = new URL(tab.url)

  const providerSpecificData = createNodeData(url)
  chrome.tabs.sendMessage(tab.id, { msg: 'open_extension', providerSpecificData: providerSpecificData || 'no_data' })
  if (providerSpecificData) {
    store.dispatch(createNode(url, providerSpecificData, tab) as any)
  }
}

function createNodeData(url: URL): Node {
  switch (url.origin) {
    case Providers.YT: {
      const node = {
        nodeData: {}
      } as Node
      const videoId = url.searchParams.get('v')
      const embedUrl = `${url.origin}/embed/${videoId}`
      const embedElement = providers.get(Providers.YT)(embedUrl)

      node.nodeData.contentId = videoId
      node.nodeData.embedUrl = embedUrl
      node.embed = embedElement
      return node
    }
    case Providers.IMGUR: {
      const node = {
        nodeData: {}
      } as Node
      const postId = window.location.pathname.split('/')[2]
      const embedElement = providers.get(Providers.IMGUR)(postId)

      node.nodeData.contentId = postId
      node.embed = embedElement

      return node
    }
    default:
      return null
  }
}
