import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[];
  selectedVideo: any;

  constructor(public youtubeService: YoutubeService) {
    this.youtubeService.getVideos().subscribe( videos => {
      this.videos = videos;
    });
  }

  ngOnInit() {
  }

  watchVideo( video: any ) {
    this.selectedVideo = video;
    $('#videoModal').modal();
  }

  closeModal() {
    this.selectedVideo = null;
    $('#videoModal').modal('hide');
  }

  loadMore() {
    this.youtubeService.getVideos().subscribe( videos => {
      this.videos.push.apply(this.videos, videos);
    });
  }


}
