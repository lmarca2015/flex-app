import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/interface/movie';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {

  @Input() movie : Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
