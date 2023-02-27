import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, startWith, Subscription } from 'rxjs';
import { Post } from 'src/app/core/model/post';
import { PostService } from 'src/app/core/service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  public posts: Post[] = [];
  private postSub!: Subscription;
  public onError: boolean = false;
  public orderAsc: boolean = true;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postSub = this.postService.getPosts().subscribe({
      next: data => this.posts = data,
      error: _ => this.onError = true
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  public sortPosts(): void {
    this.posts.reverse();
    this.orderAsc = !this.orderAsc;
  }

}
