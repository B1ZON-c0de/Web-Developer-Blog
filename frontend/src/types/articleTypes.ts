export interface Article {
  id: string
  title: string
  imageUrl: string
  content: string
  publishedAt: string
  comments: Comment[]
}

export interface Comment {
  id: string
  content: string
  author: string
  publishedAt: string
}
