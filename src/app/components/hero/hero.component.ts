import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  imageURL: string = 'https://github.com/revaturelabs/rideshare-frontend/blob/Jia_Li/src/assets/carsharing.jpeg'
  constructor() { }

  ngOnInit() {
  }

}
