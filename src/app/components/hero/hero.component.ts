import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

/**
 * This is a Hero Component
 */
export class HeroComponent implements OnInit {

  /**
   * this will provide a Hero.
   */

  constructor() { }

  ngOnInit() {
  }

}
