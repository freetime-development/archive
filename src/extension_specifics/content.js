chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, sender, sendResponse)
  const extension = document.querySelector(`#${chrome.runtime.id}`)
  if (request.command === 'open_extension') {
    if (!extension) {
      const iframe = document.createElement('iframe')
      iframe.id = chrome.runtime.id
      iframe.src = `chrome-extension://${chrome.runtime.id}/archive.html`
      iframe.style.display = 'block'
      iframe.style.background = 'rgba(245,245,245, 0.95)'
      iframe.style.position = 'fixed'
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.top = '0'
      iframe.style.right = '0'
      iframe.style['z-index'] = '99999'
      iframe.style.overflow = 'hidden'
      document.body.appendChild(iframe)
    } else {
      extension.style.display = 'block'
    }
  }

  if (request.command === 'close_extension') {
    extension.style.display = 'none'
  }

  if (request.command === 'wiki_begin') {
    const img = document.querySelector('.infobox img')
    const imgSrc = img.getAttribute('src')

    chrome.runtime.sendMessage({ command: 'init', node: { imgSrc }, tab: request.tab })
  }

  if (request.command === 'yt_begin') {
    chrome.runtime.sendMessage({ command: 'init', node: request.node, tab: request.tab })
  }
})
