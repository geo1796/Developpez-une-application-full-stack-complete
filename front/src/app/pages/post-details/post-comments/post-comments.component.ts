import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, startWith, Subscription } from 'rxjs';
import { Comment } from 'src/app/core/payload/response/comment-response';
import { Post } from 'src/app/core/payload/response/post-response';
import { PostService } from 'src/app/core/service/post.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  screenWidth$ = fromEvent(window, 'resize')
  .pipe(
    map(() => window.innerWidth),
    startWith(window.innerWidth)
  );

  @Input() post!: Post;
  public comments: Comment[] = [];
  public onError: boolean = false;
  private commentSub!: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.commentSub = this.postService.getComments(this.post.id).subscribe({
      next: data => this.comments = data,
      error: _ => this.onError = true
    });
  }

  ngOnDestroy(): void {
    this.commentSub.unsubscribe();
  }

}
