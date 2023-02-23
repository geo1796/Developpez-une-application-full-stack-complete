import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/core/payload/response/topic-response';

@Component({
  selector: 'app-topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss']
})
export class TopicItemComponent implements OnInit {

  @Input() topic!: Topic;
  constructor() { }

  ngOnInit(): void {
  }

}
