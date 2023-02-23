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

  public get onArticles(): boolean {
    return this.router.url.includes('overview?show=article');
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public navToOverview(show: string): void {
    this.router.navigateByUrl('/overview?show=' + show);
  }

}
