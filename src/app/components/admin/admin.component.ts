import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

/**
 * The Admin component
 */

export class AdminComponent implements OnInit {
  /**
   * @constructor 
   * @param router Provides an instance of a router 
   */
  constructor(private router: Router) { }

  /**
   * This is an OnInit function that is evoked once.
   */

  ngOnInit() {
  }
  /**
   * Function that takes no parameters. 
   * It will clear the sesssion storage.
   * @return {void} 
   * 
   */
  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
