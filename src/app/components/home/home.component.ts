import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddSiteDetailsService } from 'src/app/services/add-site-details.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    this.closeAddPopup();
    event.stopPropagation();
  }
  constructor(private authService: AuthService,private service: CommonService,private addSiteService:AddSiteDetailsService,private router:Router) {}
  isInit = true;
  showProfileDropdown = false;
  showFilterDropdown = false;
  isEmpty = false;
  addDialog = false;
  dialogType: any;
  siteDetailsList: any;
  siteListLength: any;
  message:any='';
  // altImage="./assets/images/home/social_media/linkedin.png";
showMessage=false;
  ngOnInit(): void {
    this.addSiteService.getHomeData();
    this.addSiteService.homeDataDetails.subscribe({
      next: (res: any) => {
       console.log('subscription');
       
        this.siteDetailsList = res['data']['sites'];
        const length = this.siteDetailsList.length;
        if (length < 10) {
          this.siteListLength = `0${length}`;
        } else {
          this.siteListLength = length;
        }
        console.log(this.siteDetailsList);
        if (this.siteDetailsList == '') {
          this.isEmpty = true;
        }
        this.isInit = false;
      },
      error: (e) => {
      
        console.log(e);
      },
      complete: () => {
        this.isInit = false;
      },
    });
  }
  profileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }
  filterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }
  openAddPopup() {
    console.log('clicked');
    this.dialogType = 'addSite';
    this.addDialog = true;
    this.service.data$.subscribe(res => {
      this.message = res;
      if(this.message!=''){
        this.showMessage=true;
      }
      this.hideMessage();
    }) ;
    
    console.log(`the message  is ${this.message}`);
    // this.dialogRef.open(AddSiteComponent);
  }
  hideMessage(){
    setTimeout(() => {
      this.showMessage = false;
  }, 3000);
  }
  goToSiteDetails(id:number) {
    sessionStorage.setItem('id',id.toString())
    this.dialogType = 'siteDetails';
    this.addDialog = true;
    console.log('container');
  }
  copyText(e: any) {
    console.log('copy text');
    e.stopPropagation();
  }
  closeAddPopup() {
    this.addDialog = false;
  }
  signout(){
    console.log('clickrf');
    
    this.authService.logout().subscribe({
      next:(res:any)=>{
        console.log('log out success');
     
        this.service.changeData(res["data"]);
        // this.router.navigateByUrl('/pop-up');

      },error:(e)=>{
        console.log(e);
        // this.router.navigateByUrl('/login');
      },complete:()=>{
       
      }
    })
  }
}
