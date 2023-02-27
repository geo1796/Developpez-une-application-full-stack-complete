import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEvent, map, startWith, Subscription } from 'rxjs';
import { Topic } from 'src/app/core/model/topic';
import { PostService } from 'src/app/core/service/post.service';
import { TopicService } from 'src/app/core/service/topic.service';
import { PostAddedComponent } from './post-added/post-added.component';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit, OnDestroy {

  public screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );
  public postForm = this.fb.group({
    topicId: [0, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    content: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(255)]]
  });
  private topicSub!: Subscription;
  public topics: Topic[] = [];
  private postSub?: Subscription;
  public onError: boolean = false;

  public get topicControl() {
    return this.postForm.get('topicId');
  }

  public get nameControl() {
    return this.postForm.get('name');
  }

  public get contentControl() {
    return this.postForm.get('content');
  }

  constructor(private router: Router, private fb: FormBuilder,
    private topicService: TopicService, private postService: PostService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.topicSub = this.topicService.getTopics().subscribe({
      next: data => this.topics = data,
      error: _ => this.onError = true
    });
  }

  ngOnDestroy(): void {
    this.topicSub.unsubscribe();
    if (this.postSub !== undefined) {
      this.postSub.unsubscribe();
    }
  }

  onSubmit(): void {
    this.postService.addPost(this.postForm.value.topicId!, this.postForm.value.name!, this.postForm.value.content!)
      .subscribe({
        next: _ => {
          const dialogRef = this.dialog.open(PostAddedComponent);
          dialogRef.afterClosed().subscribe({
            next: _ => this.router.navigateByUrl('/overview?show=post')}
          );
        },
        error: _ => this.onError = true
      });
  }

  public navToPost(): void {
    this.router.navigateByUrl('/overview?show=post');
  }

  public navToTopic(): void {
    this.router.navigateByUrl('/overview?show=topic');
  }

  public goBack(): void {
    this.router.navigateByUrl('/overview?show=post');
  }

}
