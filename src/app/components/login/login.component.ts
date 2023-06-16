import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Output() displayToastMessage = new EventEmitter<{ message: string }>();
  loginForm!:FormGroup;
hide=true;
message:string=''
notFocused = false;
constructor(private fb: FormBuilder,private router: Router,private authService:AuthService,private service: CommonService){
  this.createForm();
}
ngOnInit(): void {
  this.service.data$.subscribe(res => this.message = res)
}
createForm() {
  this.loginForm = this.fb.group({
    email:['' ,[ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),]],
    password: ['', [
      Validators.required, 
      Validators.pattern("^[0-9]{4}$")
   ]],
  });
}
goToSignup(){
  this.router.navigateByUrl('pop-up/signup')
}

gotToHome(){
  if(this.loginForm.valid){
    this.authService.userLogin(this.loginForm.get('email')!.value,this.loginForm.get("password")!.value).subscribe({
      next: (res:any) => {
        console.log('inside api call');
        
        sessionStorage.setItem('access-token',res["data"]["access_token"])
        console.log(res["data"]["access_token"])
        sessionStorage.setItem('refresh-token',res["data"]["refresh_token"])
        console.log('refresh token');
        
        console.log(res["data"]["refresh_token"])
        this.service.changeData(res["message"]);
       
    
    },
      error: (e) => {
        this.service.changeData(e.error.message);
      },
      complete: () => {
        console.log(" user details submitted!!")
        this.router.navigateByUrl('home')
      }
    });
}
}
}
