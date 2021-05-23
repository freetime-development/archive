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

chrome.runtime.onStartup.addListener(function () {
  init()
})

chrome.runtime.onInstalled.addListener(function () {
  init()
})

function init () {
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
}

function onClickContextMenu(info, tab) {
  const url = new URL(tab.url)

  const textData = {
    nodeData: { text: info.selectionText }
  } as Node
  chrome.tabs.sendMessage(tab.id, { command: 'open_extension' })
  store.dispatch(createNode(url, textData, tab) as any)
}

function onClickBrowserIcon(tab) {
  // chrome.tabs.captureVisibleTab(tab.windowId, {}, (image) => {
  //   console.log(image)
  // })
  const url = new URL(tab.url)
  const match = origins.find((o) => String(url.origin).includes(o.value))
  // const match = origins.find((o) => {
  //   const predicate = o.regexp.test(url.origin)
  //   console.log('predicate', predicate, predicate === o.regexp.test(url.origin))
  //   return predicate
  // })
  console.log(match)
  providers.get(match.label)(url, tab)
}
