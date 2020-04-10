export interface Node {
  id: string
  saved: boolean
  error: boolean
  nodeData: NodeData
  embed?: any
}

export interface NodeData {
  title: string
  topic: string
  url: string | URL
  origin: string
  favIconUrl: string
  contentId: string
  annotation: string
  refs: string[]
  embedUrl?: string
  text?: string
}
