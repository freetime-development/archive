import { Node, NodeType } from './interface'

export const providers = new Map()

export enum Providers {
  YT = 'YT',
  WIKI = 'WIKI'
}

export const origins = [
  {
    label: Providers.YT,
    regexp: /https:\/\/www\.youtube\.com/g,
    value: 'youtube.com'
  },
  {
    label: Providers.WIKI,
    regexp: /https:\/\/[a-z]{2}\.wikipedia\.org/g,
    value: 'wikipedia.org'
  }
]

providers.set(Providers.YT, createYoutubeNode)
providers.set(Providers.WIKI, createWikiNode)

function createYoutubeNode(url: URL, tab) {
  const node = {
    nodeData: {}
  } as Node
  const videoId = url.searchParams.get('v')
  const embedUrl = `${url.origin}/embed/${videoId}`

  node.nodeData.contentId = videoId
  node.nodeData.embedUrl = embedUrl
  node.nodeData.type = NodeType.Video
  // node.embed = {
  //   type: 'iframe',
  //   props: {
  //     width: 360,
  //     height: 200,
  //     src: embedUrl,
  //     frameBorder: 0,
  //     allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
  //     allowFullScreen: false
  //   }
  // }

  chrome.tabs.sendMessage(tab.id, { command: 'yt_begin', node, tab })
}

function createWikiNode(url: URL, tab) {
  chrome.tabs.sendMessage(tab.id, { command: 'wiki_begin', tab })
}
