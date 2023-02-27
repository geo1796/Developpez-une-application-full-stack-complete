import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { unauthGuard } from './guard/unauth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [unauthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [unauthGuard] },
  { path: 'overview', component: OverviewComponent, canActivate: [authGuard] },
  { path: 'post-details', component: PostDetailsComponent, canActivate: [authGuard] },
  { path: 'new-post', component: NewPostComponent, canActivate: [authGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
