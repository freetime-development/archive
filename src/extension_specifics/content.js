chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const extension = document.querySelector(`#${chrome.runtime.id}`)
  if (request.msg === 'open_extension') {
    if (!extension) {
      console.log(request, sender, sendResponse)
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
  if (request.msg === 'close_extension') {
    extension.style.display = 'none'
  }
})
