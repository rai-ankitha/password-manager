import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
constructor(private service: CommonService,private cd: ChangeDetectorRef,){}
isRegister=false;
isLogin=false;
message:any='';
showMessage=true;
ngOnInit(): void {

  this.service.data$.subscribe(res => {
    this.message = res;
    if(this.message!=''){
      this.showMessage=true;
    }
    this.hideMessage();
  }) ;
  
  console.log(`the message  is ${this.message}`);

}
hideMessage(){
  setTimeout(() => {
    this.showMessage = false;
}, 3000);
}
// showRegisterToast(value:string) {
// this.message=value;
// this.isRegister=true;
// }
// showLoginToast(value:string) {
//   this.message=value;
//   this.isLogin=true;
//   }

}
