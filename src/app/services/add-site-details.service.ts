import { Injectable } from '@angular/core';
import { SiteService } from './site.service';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddSiteDetailsService {
  private homeData: any;
  homeDataDetails = new Subject<any>();
  constructor(
    private siteService: SiteService,
    private authService: AuthService
  ) {}

  getHomeData() {
    this.siteService.getAllSites().subscribe({
      next: (value: any) => {
        console.log(`from site services ${value}`);

        this.homeData = value;
        this.homeDataDetails.next(value);
      },
      error: (e) => {
        if (e['status'] == 401) {
          this.authService.refreshToken().subscribe({
            next: (res: any) => {
              console.log('inside 401 error');
              sessionStorage.clear();
              sessionStorage.setItem('access-token', res['access_token']);

              sessionStorage.setItem('refresh-token', res['refresh_token']);
              this.getHomeData();
            },
            error: (e) => {
              console.log(e);
            },
          });
        } else {
          console.log('seeeee');
          console.log(e['status']);
          console.log(e);
        }
      },
    });
  }
}
