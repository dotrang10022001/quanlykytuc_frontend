export interface Forum{
  id: number,
  posterName: string,
  posterRoleId: number,
  creationTime: string,
  posterRole: string,
  forumTitle: string,
  forumCaption: string,
  imageUrl: string | null,
  state: number,
  type: number
}
