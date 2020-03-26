export interface Node {
  id: string
  title: string
  logo: string
  meta: MetaData
  saved: boolean
  embed?: any
  text?: string
}

export interface MetaData {
  url: URL
  origin: string
  videoId?: string
  embedUrl?: string
}
