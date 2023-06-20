import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSiteComponent } from '../add-site/add-site.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private dialogRef:MatDialog){}
showDropdown=false;
isEmpty=false;
iters=[
  {},{},{},{},{},{},{},{},
];
profile(){
  this.showDropdown=! this.showDropdown;
}
openAddPopup(){
  this.dialogRef.open(AddSiteComponent);
}
}
