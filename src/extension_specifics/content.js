console.log(window.location.href)

chrome.runtime.sendMessage({
  from: 'content',
  subject: 'data'
})

document.addEventListener('mousedown', function(event) {
  // right click
  if (event.button == 2) {
    const post = event.path.find(function(node) {
      return node.className === 'Bundle AnswerStoryBundle'
    })

    const share = post.querySelector('.AnswerQuickShare')
    share.click()

    setTimeout(function () {
      const embedLink = post.querySelector('.EmbedModalLink > a')
      embedLink.click()

      setTimeout(function () {
        const embed = document.querySelector('.code_area').value
        console.log(embed)
      }, 1000)
    }, 1000)
  }
}, false)
