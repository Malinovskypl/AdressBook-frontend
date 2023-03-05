import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { DbService } from 'src/app/serv/db.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  //File
  imageShow:any;
  filecheck:boolean = true;
  image:any;
  img_name =''
  durationInSeconds = 3;

  constructor(private _formBuilder:FormBuilder, private dbService: DbService, private _snackBar: MatSnackBar){}

  //Kontrola uzupełnienia pól pierwszej
  newContactGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    surnameCtrl: ['', Validators.required],
    bdayCtrl: ['', Validators.required],
    photoCtrl: ['', Validators.required,]
  });


  onFileChange(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      this.img_name = file.name;
    }
    // Show img after file change
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
    this.imageShow = (<FileReader>event.target).result;
    }
  }


  onSubmit(){
    //Append img
    let contact_name = String(this.newContactGroup.get('nameCtrl')?.value);
    let contact_surname = String(this.newContactGroup.get('surnameCtrl')?.value);
    let contact_bday_str =  String(this.newContactGroup.get('bdayCtrl')?.value);
    let contact_bday = new Date(contact_bday_str);
    console.log(this.img_name);
    
    const formData = new FormData();
    formData.append('file', this.image, this.img_name);
    let contact_photo = this.img_name;

    this.dbService.addContact(contact_name,contact_surname,contact_bday,contact_photo).subscribe({
      next: data => {
        this.dbService.upload(formData).subscribe({
          next: res=>{
            //Oczekuje 2 sekundy przed przeładowaniem. 
            setTimeout(location.reload.bind(location), 2000);
            this._snackBar.open(`${res} 😎`, 'Rozumiem', {
              duration: this.durationInSeconds * 1000
            });
          },
          error: err =>{
            err.error.message;
          }
        })
      },
      error: err => {
        err.error.message;
      }
    });   
  }

}
