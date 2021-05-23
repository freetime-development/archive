export enum NodeType {
  YOUTUBE,
  WIKIPEDIA,
  TEXT
}

export interface Node {
  id: string
  saved: boolean
  error: boolean
  nodeData: NodeData
  type: NodeType
  embed?: any
}

type NodeData = Wikipedia & Youtube & Text

export interface Wikipedia {
  date: string
  title: string
  topic: string
  url: string | URL
  origin: string
  favIconUrl: string
  contentId: string
  annotation: string
  imgSrc: string
}

export interface Youtube {
  date: string
  title: string
  topic: string
  url: string | URL
  origin: string
  favIconUrl: string
  contentId: string
  annotation: string
}

export interface Text {
  date: string
  text: string
  origin: string
  favIconUrl: string
  contentId: string
  annotation: string
}
