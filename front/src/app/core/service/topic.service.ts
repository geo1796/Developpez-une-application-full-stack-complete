import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../model/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private url: string = 'http://localhost:9000/api/topic';

  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.url);
  }

  followTopic(topicId: number): Observable<any> {
    return this.http.post<any>(this.url + '/' + topicId + '/follow', null);
  }

  unfollowTopic(topicId: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + topicId + '/follow');
  }

  getFollowing(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.url + '/following');
  }
}
