import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, startWith } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  screenWidth$ = fromEvent(window, 'resize')
  .pipe(
    map(() => window.innerWidth),
    startWith(window.innerWidth)
  );

  public get onTopics(): boolean {
    return this.router.url.includes('overview?show=topic');
  }

  public get onPosts(): boolean {
    return this.router.url.includes('overview?show=post');
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public navToPost(): void {
    this.router.navigateByUrl('/overview?show=post');
  }

  public navToTopic(): void {
    this.router.navigateByUrl('/overview?show=topic');
  }

}
