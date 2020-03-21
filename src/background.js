import { initializeStore } from './store'

chrome.runtime.onInstalled.addListener(function () {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    console.log(request, sender, sendResponse)
  })

  chrome.contextMenus.create({
    id: "id",
    title: "Archive",
    type: 'normal',
    contexts: ['all'],
  });

  chrome.contextMenus.onClicked.addListener((function (e, a, b) {
    console.log(e, a, b)
  }));
});

/********************************
  Initialize persistent store
  whom components communicate with
  via proxy store messaging
********************************/
initializeStore()
