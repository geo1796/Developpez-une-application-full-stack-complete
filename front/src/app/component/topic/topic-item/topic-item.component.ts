import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Topic } from 'src/app/core/model/topic';
import { TopicService } from 'src/app/core/service/topic.service';

@Component({
  selector: 'app-topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss']
})
export class TopicItemComponent implements OnDestroy {

  @Input() topic!: Topic;
  @Output() unfollowed = new EventEmitter<number>();
  private followSub?: Subscription;
  private loading: boolean = false;
  public onError: boolean = false;

  constructor(private topicService: TopicService, private router: Router) { }

  public get onUserProfile(): boolean {
    return this.router.url.includes('user-profile');
  }

  ngOnDestroy(): void {
    if (this.followSub !== undefined) {
      this.followSub.unsubscribe();
    }
  }

  public followTopic(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.topicService.followTopic(this.topic.id).subscribe({
      next: _ => {
        this.topic.followed = true;
        this.loading = false;
      }, error: _ => {
        this.onError = true;
        this.loading = false;
      }
    });
  }

  public unfollowTopic(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.topicService.unfollowTopic(this.topic.id).subscribe({
      next: _ => {
        this.topic.followed = false;
        this.unfollowed.emit(this.topic.id);
        this.loading = false;
      }, error: _ => {
        this.onError = true;
        this.loading = false;
      }
    });
  }

}
