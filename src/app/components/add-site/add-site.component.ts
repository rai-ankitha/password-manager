import {
  Component,

  EventEmitter,
 
  Input,
 
  OnInit,
  Output,
 
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddSiteDetailsService } from 'src/app/services/add-site-details.service';
import { CommonService } from 'src/app/services/common.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css'],
})
export class AddSiteComponent implements OnInit {
  hide = true;
  isReadOnly = false;
  strengthBarWidth: any;
  strengthBarColor: any;
  showSectorDropdown = false;
 folderValue:string='';
  
  @Input() dialogType = '';
  @Input() siteDetails: any;
  socialMedia = [
    { label: 'Social Media' },
    { label: 'E-Commerce' },
    { label: 'Games' },
    { label: 'Health' },
    { label: 'Other' },
  ];
  @Output() onCloseDialog = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private siteService: SiteService,private service:CommonService,private addSiteService:AddSiteDetailsService) {
    this.createForm();
  }

  siteDetailsForm!: FormGroup;
  createForm() {
    this.siteDetailsForm = this.fb.group({
      url: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
      siteName: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      sitePassword: [
        '',
        [
          Validators.required,
          // Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")
        ],
      ],
      notes: [''],
    });
  }
  checkDropValue(value:string){
    
    
    console.log(this.siteDetailsForm.get('sector')?.value);
    if(value=='SOCIAL_MEDIA'){
    
      this.siteDetailsForm.get('sector')?.setValue('Social Media');
    }
    else if(value=='E_COMMERCE'){
      this.siteDetailsForm.get('sector')?.setValue('E-Commerce');
    }
    else if(value=='GAMES'){
      this.siteDetailsForm.get('sector')?.setValue('Games');
   
    }
    else if(value=='HEALTH'){
      this.siteDetailsForm.get('sector')?.setValue('Health');
    }
    else{
      this.siteDetailsForm.get('sector')?.setValue('Other');
    }
  }
  ngOnInit(): void {
    this.siteDetailsForm.get('url')?.setValue(this.siteDetails.url);
        this.siteDetailsForm.get('siteName')?.setValue(this.siteDetails.siteName);
this.folderValue=this.siteDetails.siteName;
        // this.siteDetailsForm.get('sector')?.setValue(this.siteDetails.sector);
        this.siteDetailsForm.get('userName')?.setValue(this.siteDetails.userName);
        this.siteDetailsForm.get('sitePassword')?.setValue(this.siteDetails.sitePassword);
        this.siteDetailsForm.get('notes')?.setValue(this.siteDetails.notes);
   this.checkDropValue(this.folderValue)
    console.log(this.dialogType);
    if (this.dialogType == 'siteDetails') {
      this.isReadOnly = true;
    } else if (this.dialogType == 'addSite') {
     
      this.siteDetailsForm.get('url')?.setValue('');
      this.siteDetailsForm.get('siteName')?.setValue('');
      this.siteDetailsForm.get('sector')?.setValue('');
        this.siteDetailsForm.get('userName')?.setValue('');
        this.siteDetailsForm.get('sitePassword')?.setValue('');
        this.siteDetailsForm.get('notes')?.setValue('');
      this.isReadOnly = false;
    } else {
      this.isReadOnly = false;
    }
  }
  goToEditDetails() {
    this.dialogType = 'editDetails';
    this.isReadOnly = false;
   
    
  }

  checkStrength(password: string) {
    console.log(`inside password strngth **${password}`);
    if (password) {
      const n = password.length;
      // Checking lower alphabet in string
      let hasLower = false;
      let hasUpper = false;
      let hasDigit = false;
      let specialChar = false;
      const normalChars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ';

      for (let i = 0; i < n; i++) {
        if (password[i] >= 'a' && password[i] <= 'z') {
          hasLower = true;
        }
        if (password[i] >= 'A' && password[i] <= 'Z') {
          hasUpper = true;
        }
        if (password[i] >= '0' && password[i] <= '9') {
          hasDigit = true;
        }
        if (!normalChars.includes(password[i])) {
          specialChar = true;
        }
      }

      // Strength of password

      if (hasLower && hasUpper && hasDigit && specialChar && n >= 8) {
        this.strengthBarWidth = '250px';
        this.strengthBarColor = '#8BB477';
      } else if ((hasLower || hasUpper) && specialChar && n >= 6) {
        this.strengthBarWidth = '160px';
        this.strengthBarColor = 'orange';
      } else {
        this.strengthBarWidth = '60px';
        this.strengthBarColor = 'red';
      }

      console.log(`the color is ${this.strengthBarColor}`);
      console.log(`the width is ${this.strengthBarWidth}`);
    }
  }
  sectorDropdown() {
    this.showSectorDropdown = !this.showSectorDropdown;
  }
  resetForm() {
    this.siteDetailsForm.reset();
  }
  postSiteDetails() {
    this.siteService
      .addSiteDetails(
        this.siteDetailsForm.get('url')!.value,
        this.siteDetailsForm.get('siteName')!.value,
        this.siteDetailsForm.get('sector')!.value,
        this.siteDetailsForm.get('userName')!.value,
        this.siteDetailsForm.get('sitePassword')!.value,
        this.siteDetailsForm.get('notes')!.value
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.addSiteService.getHomeData();
        
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          
          this.closeDialog();
          this.service.changeData('Site Added Successfully');
        },
      });
  }
 
  updateSiteDetails() {
    this.siteService
      .editSiteDetails(
        this.siteDetailsForm.get('url')!.value,
        this.siteDetailsForm.get('siteName')!.value,
        this.siteDetailsForm.get('sector')!.value,
        this.siteDetailsForm.get('userName')!.value,
        this.siteDetailsForm.get('sitePassword')!.value,
        this.siteDetailsForm.get('notes')!.value
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.addSiteService.getHomeData();
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.closeDialog();
          this.service.changeData('Site details updated Successfully');
        },
      });
  }
  closeDialog() {
    this.onCloseDialog.emit();
  }

  // onClick(event:any) {
  //   if (!this._eref.nativeElement.contains(event.target)) // or some similar check
  //   this.closeDialog();
  //  }
}
