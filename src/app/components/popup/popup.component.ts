import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
constructor(private service: CommonService){}
isRegister=false;
isLogin=false;
message:any='';
ngOnInit(): void {

  this.service.data$.subscribe(res => this.message = res) 
  console.log(`the message  is ${this.message}`);

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
