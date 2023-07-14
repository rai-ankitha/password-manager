import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AddSiteDetailsService } from 'src/app/services/add-site-details.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { Clipboard } from '@angular/cdk/clipboard'; 
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
  constructor(private authService: AuthService,private service: CommonService,private addSiteService:AddSiteDetailsService,private clipboard: Clipboard) {}
  isInit = true;
  showProfileDropdown = false;
  showFilterDropdown = false;
  isEmpty = false;
  addDialog = false;
  dialogType: any;
  formIndex:number=0;
  siteDetailsList: any;
  siteListData:any
  siteListLength: any;
  message:any='';
  searchTerm:any='';
  // altImage="./assets/images/home/social_media/linkedin.png";
showMessage=false;
  ngOnInit(): void {
    this.addSiteService.getHomeData();
    this.addSiteService.homeDataDetails.subscribe({
      next: (res: any) => {
       console.log('subscription');
       
        this.siteDetailsList = res['data']['sites'];
        this.siteListData=this.siteDetailsList
       this. checkListLength();
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
  checkListLength(){
    const length = this.siteListData.length;
    if (length < 10) {
      this.siteListLength = `0${length}`;
    } else {
      this.siteListLength = length;
    }
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
  goToSiteDetails(i:number) {
   
    this.dialogType = 'siteDetails';
    this.formIndex=i;
    this.addDialog = true;
    console.log('container');
    console.log( this.siteListData[this.formIndex].sector);
  }
  copyText(e:any,item: any) {
    console.log(item);
    this.clipboard.copy(item);
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
  filterSearch(search:any){
    console.log('inside search func');

    const searchValue=search.target.value
    console.log(searchValue);
    if(searchValue==''){
      this.siteListData=this.siteDetailsList;
      this. checkListLength();
    }
    else{
      this.siteListData=[]
      for( let i=0;i<this.siteDetailsList.length;i++){
        if(this.siteDetailsList[i].siteName.toLowerCase().includes(searchValue.toLowerCase())){
         
          
          this.siteListData.push(this.siteDetailsList[i]);
          this. checkListLength();
          
        }
      }
    }
  }

  searchDropDown(search:string){
    console.log('inside search func');
    this.siteListData=[]
    for( let i=0;i<this.siteDetailsList.length;i++){
      if(this.siteDetailsList[i].sector===search){
       
        
        this.siteListData.push(this.siteDetailsList[i]);
        this. checkListLength();
        
      }
    }
  }

}
