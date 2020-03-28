export interface Node {
  id: string
  favIconUrl: string
  saved: boolean
  error: boolean
  nodeData: NodeData
  embed?: any
}

export interface NodeData {
  title: string
  url: URL
  origin: string
  videoId?: string
  postId?: string
  text?: string
  embedUrl?: string
}
