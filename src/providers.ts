import { Node, NodeType } from './interface'

export const providers = new Map()

export enum Providers {
  YOUTUBE = 'YOUTUBE',
  WIKIPEDIA = 'WIKIPEDIA'
}

export const origins = [
  {
    label: Providers.YOUTUBE,
    regexp: /https:\/\/www\.youtube\.com/g,
    value: 'youtube.'
  },
  {
    label: Providers.WIKIPEDIA,
    regexp: /https:\/\/[a-z]{2}\.wikipedia\.org/g,
    value: 'wikipedia.org'
  }
]

providers.set(Providers.YOUTUBE, createYoutubeNode)
providers.set(Providers.WIKIPEDIA, createWikiNode)

function createYoutubeNode(url: URL, tab) {
  const node = {
    type: NodeType.YOUTUBE,
    nodeData: {}
  } as Node
  const videoId = url.searchParams.get('v')
  const embedUrl = `${url.origin}/embed/${videoId}`

  node.nodeData.contentId = videoId

  chrome.tabs.sendMessage(tab.id, { command: 'yt_begin', node, tab })
}

function createWikiNode(url: URL, tab) {
  const node = {
    type: NodeType.WIKIPEDIA,
    nodeData: {}
  } as Node
  chrome.tabs.sendMessage(tab.id, { command: 'wiki_begin', node, tab })
}
