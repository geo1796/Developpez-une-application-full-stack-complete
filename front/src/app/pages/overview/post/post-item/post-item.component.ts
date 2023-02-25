import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { Post } from 'src/app/core/payload/response/post-response';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  @Input() post!: Post;

  public get postDate(): string {
    return format(Date.parse(this.post.date), "dd/MM/yyyy");
  }

  constructor(private router: Router) { }

  navToDetails(): void {
    this.router.navigateByUrl('/post-details?id=' + this.post.id);
  }

}
