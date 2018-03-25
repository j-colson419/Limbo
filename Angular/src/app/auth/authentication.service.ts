import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';
import { appSettings } from '../appSettings';
@Injectable()
export class AuthenticationService {

  public userProfile: any;
  public errorMessage: any;

  auth0 = new auth0.WebAuth({
    clientID: '0ALaNaZnhA2AYZfI1OnEnjXsW9DBc7bL',
    domain: 'revature-limbo.auth0.com',
    responseType: 'token id_token',
    audience: 'https://revature-limbo.auth0.com/userinfo',
    redirectUri: appSettings.ANGULAR_URL + 'auth',
    scope: 'openid email'
  });


  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }


  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
      } else if (err) {
        this.router.navigate(['/verify']);
        console.log(err);
      }
      this.setSession(authResult);
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.setProfile();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public setProfile(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
    const self = this;

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        this.router.navigate(['/feed']);
      }
    });
  }

}
