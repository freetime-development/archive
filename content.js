console.log(window.location.href)

chrome.runtime.sendMessage({
    from: "content",
    subject: "data"
})