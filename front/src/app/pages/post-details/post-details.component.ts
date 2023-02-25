import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { fromEvent, map, startWith, Subscription } from 'rxjs';
import { Post } from 'src/app/core/payload/response/post-response';
import { PostService } from 'src/app/core/service/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  public post?: Post;
  private postSub!: Subscription;
  private idSub!: Subscription;
  private id: number = 0;
  private onError: boolean = false;

  public get postDate(): string {
    return format(Date.parse(this.post!.date), "dd/MM/yyyy");
  }

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.idSub = this.route.queryParamMap.subscribe(queryParams => {
      const id = queryParams.get('id');
      if (id) {
        this.id = +id;
      }
    });
    this.postSub = this.postService.getPost(this.id).subscribe({
      next: data => {
        this.post = data;
      }, error: _ => this.onError = true
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.idSub.unsubscribe();
  }

  public navToOverview(show: string): void {
    this.router.navigateByUrl('/overview?show=' + show);
  }

  public goBack(): void {
    this.router.navigateByUrl('/overview?show=post');
  }

}
