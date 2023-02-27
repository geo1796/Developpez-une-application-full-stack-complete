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
    return this.router.url.includes('overview?show=topic');
  }

  public get onPosts(): boolean {
    return this.router.url.includes('overview?show=post');
  }

  public get onUserProfile(): boolean {
    return this.router.url.includes('user-profile');
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

  public navToPost(): void {
    this.router.navigateByUrl('/overview?show=post');
  }

  public navToTopic(): void {
    this.router.navigateByUrl('/overview?show=topic');
  }
}
