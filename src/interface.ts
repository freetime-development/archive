export interface Node {
  id: string
  saved: boolean
  error: boolean
  nodeData: NodeData
  embed?: any
}

export interface NodeData {
  title: string
  url: string
  origin: string
  favIconUrl: string
  videoId?: string
  postId?: string
  text?: string
  embedUrl?: string
  annotation?: string
}
