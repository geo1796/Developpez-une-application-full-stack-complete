import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { fromEvent, map, startWith } from 'rxjs';
import { Post } from 'src/app/core/model/post';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent {

  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  @Input() post!: Post;

  public get postDate(): string {
    return format(Date.parse(this.post!.date), "dd/MM/yyyy");
  }

  constructor(private router: Router) { }

  public goBack(): void {
    this.router.navigateByUrl('/overview?show=post');
  }

}
