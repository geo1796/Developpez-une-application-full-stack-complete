import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { Post } from 'src/app/core/payload/response/post-response';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() post!: Post;

  public get postDate(): string {
    return format(Date.parse(this.post.date), "dd/MM/yyyy HH:mm");
  }

  constructor() { }

  ngOnInit(): void {
  }

}
