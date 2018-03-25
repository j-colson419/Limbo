import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { User } from '../limb/mock-user';
import { BackendService } from '../backend/backend.service';


// import { LimbComponent } from './limb';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public userEmail: string;
  constructor(public auth: AuthenticationService, public router: Router, private server: BackendService) { }

  ngOnInit() {
    if (!this.auth.userProfile) {
      this.router.navigate(['login']);
    
    }
    this.userEmail = this.auth.userProfile.email;
    let postResult = this.server.getUser(this.userEmail).subscribe(res => {
      let user: User = <User>res;
      console.log(JSON.stringify(user));
      if (!user.lastName) {
        this.router.navigate(['register']);
      }
      localStorage.setItem('username', user.username);
    });
    localStorage.setItem('email', this.userEmail);

  }

}
