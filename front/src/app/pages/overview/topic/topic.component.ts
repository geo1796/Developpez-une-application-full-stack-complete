import { Component, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, map, startWith, Subscription } from "rxjs";
import { Topic } from "src/app/core/payload/response/topic-response";
import { TopicService } from "src/app/core/service/topic.service";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnDestroy {
  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  private topicSub!: Subscription;
  public onError: boolean = false;
  public topics: Topic[] = [];

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicSub = this.topicService.getTopics().subscribe({
      next: data => this.topics = data,
      error: _ => this.onError = true
    });
  }

  ngOnDestroy(): void {
    this.topicSub.unsubscribe();
  }
}
