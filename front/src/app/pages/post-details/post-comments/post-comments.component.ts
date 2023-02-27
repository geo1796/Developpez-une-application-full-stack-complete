import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fromEvent, map, startWith } from 'rxjs';
import { Comment } from 'src/app/core/payload/response/comment-response';
import { Post } from 'src/app/core/payload/response/post-response';
import { PostService } from 'src/app/core/service/post.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent {
  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  @Input() comments: Comment[] = [];
  @Input() post!: Post;
  public commentForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]]
  });
  public get commentControl() {
    return this.commentForm.get('content')!;
  }

  constructor(private postService: PostService, private fb: FormBuilder) { }

  onSubmit(): void {
    this.postService.addComment(this.post.id, this.commentForm.value.content!)
      .subscribe({
        next: data => {
          this.comments.push(data);
          this.commentForm.reset();
          this.commentForm.get('content')!.setErrors(null);
        }
      });
  }

}
