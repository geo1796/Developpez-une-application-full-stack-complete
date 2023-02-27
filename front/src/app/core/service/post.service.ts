import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url: string = 'http://localhost:9000/api/post';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.url + '/' + id);
  }

  addPost(topicId: number, name: string, content: string): Observable<any> {
    const body = { 'topicId': topicId, 'name': name, 'content': content };
    return this.http.post<any>(this.url, body);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/' + postId + '/comments');
  }

  addComment(postId: number, content: string): Observable<Comment> {
    const body = { 'content': content };
    return this.http.post<Comment>(this.url + '/' + postId + '/comments', body);
  }
}
