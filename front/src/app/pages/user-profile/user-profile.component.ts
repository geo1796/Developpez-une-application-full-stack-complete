import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEvent, map, startWith, Subscription } from 'rxjs';
import { Topic } from 'src/app/core/model/topic';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { TopicService } from 'src/app/core/service/topic.service';
import { UserService } from 'src/app/core/service/user.service';
import { customEmailValidator } from 'src/app/core/validator/email-validator';
import { usernameValidator } from 'src/app/core/validator/username-validator';
import { ProfileUpdatedComponent } from './profile-updated/profile-updated.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  
  public user?: User;
  private userSub!: Subscription;
  private updateSub?: Subscription;
  public following: Topic[] = [];
  private followingSub!: Subscription;
  public onError: boolean = false;
  public userForm = this.fb.group({
    username: ['', [Validators.required, usernameValidator()]],
    email: ['', [Validators.required, Validators.email, customEmailValidator()]],
  });

  constructor(private router: Router, private userService: UserService, private authService: AuthService,
    private topicService: TopicService, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userSub = this.userService.getUser().subscribe({
      next: data => {
        this.user = data;
        this.userForm.patchValue({
          username: data.username,
          email: data.email
        });
      },
      error: _ => this.onError = true
    });
    this.followingSub = this.topicService.getFollowing().subscribe({
      next: data => this.following = data,
      error: _ => this.onError = true
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if (this.updateSub !== undefined) {
      this.updateSub.unsubscribe();
    }
  }

  public onSubmit(): void {
    this.updateSub = this.userService.updateUser(this.userForm.value.username!, this.userForm.value.email!)
      .subscribe({
        next: data => {
          this.user = data;
          this.dialog.open(ProfileUpdatedComponent);
        },
        error: _ => this.onError = true
      });
  }

  public unfollowed(topicId: number): void {
    this.following = this.following.filter(topic => topic.id !== topicId);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  public navToPost(): void {
    this.router.navigateByUrl('/overview?show=post');
  }

  public navToTopic(): void {
    this.router.navigateByUrl('/overview?show=topic');
  }

}
