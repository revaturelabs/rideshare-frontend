import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: number;
  name: string = '';

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.token = Number(sessionStorage.getItem('auth'));
    if (this.token) {
      this.userService.getUserById(this.token).then((response)=>{
        this.name = response.firstName;
      })
    }

    this.authService.getEmitter().subscribe((user: User) => {
      this.token = user.userId;
      this.name = user.firstName;
    });

    // this.userService.getEmitter().subscribe((user: User) => {
    //   this.token = user.userId;
    //   this.name = user.firstName;
    // });
  }

  logout() {
    sessionStorage.clear();
    this.token = null;
    this.name = '';
    this.router.navigate(['']);
  }
}
