export class Comment {
  constructor(
    public id: number,
    public postId: number,
    public author: string,
    public comment: string,
  ) {}
}
