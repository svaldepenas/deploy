import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeURL = 'https://www.googleapis.com/youtube/v3/';
  private apiKey = 'AIzaSyAjrPk977_UZtwW295wPDJkPNjoMHlMLM8';
  private playlistId = 'UUX9NJ471o7Wie1DQe94RVIg';

  private nextPageToken: string;

  constructor( public http: HttpClient ) { }

  getVideos() {
    // tslint:disable-next-line:no-shadowed-variable
    const url = `${this.youtubeURL}playlistItems`;
    const params = { params: new HttpParams().set('part', 'snippet')
                                             .set('maxResults', '10')
                                             .set('playlistId', this.playlistId)
                                             .set('key', this.apiKey)};

    if (this.nextPageToken) {
      params.params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, params).pipe(
      map( (res: any) => {
        this.nextPageToken = res.nextPageToken;
        const videos: any[] = [];
        for (const video of res.items) {
          const snippet = video.snippet;
          videos.push(snippet);
        }

        return videos;

      })
    );
  }

}
