import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TopicService } from "src/app/core/service/topic.service";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnDestroy {
  
  private topicSub!: Subscription;
  public onError: boolean = false;

  constructor(private topicService: TopicService){}

  ngOnInit(): void {
    this.topicSub = this.topicService.getTopics().subscribe({
      next: data => console.log(data),
      error: _ => this.onError = true
    });
  }

  ngOnDestroy(): void {
    this.topicSub.unsubscribe();
  }
}
