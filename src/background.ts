import { initializeStore } from './store'
import { createNode } from './actions/nodeActions'
import { providers, origins } from './providers'
import { Node, NodeType } from './interface'

/********************************
  Initialize persistent store
  whom components communicate with
  via proxy store messaging
********************************/
const store = initializeStore()

chrome.runtime.onInstalled.addListener(function () {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === 'init') {
      const url = new URL(request.tab.url)
      chrome.tabs.sendMessage(request.tab.id, { command: 'open_extension' })
      store.dispatch(createNode(url, request.node, request.tab))
    }
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
    nodeData: { text: info.selectionText, type: NodeType.Text }
  } as Node
  chrome.tabs.sendMessage(tab.id, { command: 'open_extension' })
  store.dispatch(createNode(url, textData, tab) as any)
}

function onClickBrowserIcon(tab) {
  const url = new URL(tab.url)
  const match = origins.find((o) => String(url.origin).includes(o.value))

  providers.get(match.label)(url, tab)
}
