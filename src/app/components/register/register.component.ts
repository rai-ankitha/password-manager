import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from './confirm-password-valid';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private fb: FormBuilder,private router: Router,private authService:AuthService,private service: CommonService){
    this.createForm();
  }
  
  @Output() displayToastMessage = new EventEmitter();
 registerForm!:FormGroup;
  hide=true;
notFocused = false;
showMessage=false;
message:string=''
ngOnInit(): void {
  this.service.data$.subscribe(res => this.message = res)
}
createForm() {
  this.registerForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [
      Validators.required,
    
      Validators.pattern("^[0-9]{4}$")
   ]],
   confirmPassword:['', [
    Validators.required, Validators.minLength(4), 
    Validators.pattern("^[0-9]{4}$")
 ]]

  },
  { 
    validator: ConfirmedValidator('password', 'confirmPassword')
  }
  );
}
  gotToHome(){
    if(this.registerForm.valid){
      this.authService.createUser(this.registerForm.get('email')!.value,this.registerForm.get("password")!.value).subscribe({
        next: (res:any) => {
          sessionStorage.setItem('access-token',res["data"]["access_token"])
          console.log(res["data"]["access_token"])
          sessionStorage.setItem('refresh-token',res["data"]["refresh_token"])
          console.log('refresh token');
          
          console.log(res["data"]["refresh_token"]);
          this.showMessage=true;
          this.service.changeData(res["message"]);
         console.log(this.service.data$);
         
          
      
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
