import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public loggedIn: boolean;
  private loggedInSub!: Subscription;

  public get onTopics(): boolean {
    return this.router.url.includes('topic');
  }

  public get onArticles(): boolean {
    return this.router.url.includes('article');
  }

  constructor(private authService: AuthService, private router: Router) {
    this.loggedIn = authService.loggedIn;
  }

  ngOnInit(): void {
    this.loggedInSub = this.authService.loggedIn$.subscribe(b => this.loggedIn = b);
  }

  ngOnDestroy(): void {
    this.loggedInSub.unsubscribe();
  }

}
