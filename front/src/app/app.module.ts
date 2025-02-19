import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { JwtModule } from "@auth0/angular-jwt";
import { HeaderComponent } from './component/header/header.component';
import { tokenGetter } from './core/service/auth.service';
import { TopicComponent } from './component/topic/topic.component';
import { LoginComponent } from './pages/login/login.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { TopicItemComponent } from './component/topic/topic-item/topic-item.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostCommentsComponent } from './pages/post-details/post-comments/post-comments.component';
import { PostContentComponent } from './pages/post-details/post-content/post-content.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProfileUpdatedComponent } from './pages/user-profile/profile-updated/profile-updated.component';
import { PostAddedComponent } from './pages/new-post/post-added/post-added.component';
import { PostItemComponent } from './component/post/post-item/post-item.component';
import { PostComponent } from './component/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    PostComponent,
    TopicComponent,
    LoginComponent,
    OverviewComponent,
    TopicItemComponent,
    PostItemComponent,
    NewPostComponent,
    PostDetailsComponent,
    PostCommentsComponent,
    PostContentComponent,
    UserProfileComponent,
    ProfileUpdatedComponent,
    PostAddedComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:9000"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
