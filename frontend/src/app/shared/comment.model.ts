export class Comment {
  constructor(
    public id: number,
    public postId: string,
    public author: string,
    public comment: string,
  ) {}
}
