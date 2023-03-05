import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { map, Observable } from 'rxjs';
import {Validators, FormBuilder} from '@angular/forms';
import { Contacts } from 'src/app/_int/contacts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DbService } from 'src/app/serv/db.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit{

  contact$!: Observable<Contacts>

   //File
   imageShow:any;
   imgStatus:boolean = true;
   image:any;
   durationInSeconds = 3;

   //Contact id
  contact_id:number = 0;

    //Kontrola uzupełnienia pól pierwszej
    newContactGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      surnameCtrl: ['', Validators.required],
      bdayCtrl: ['', Validators.required],
      photoCtrl: ['', Validators.required]
    });
  

  constructor(private activatedRoute: ActivatedRoute,private _formBuilder:FormBuilder, private dbService: DbService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
  this.contact$ = this.activatedRoute.data.pipe(map(
      (data: any) => data?.contact))
 
  this.contact$.subscribe(res =>{
    this.newContactGroup.setValue({
      nameCtrl: res.contact_name,
      surnameCtrl: res.contact_surname,
      bdayCtrl: String(res.contact_bday),
      photoCtrl: res.contact_photo
    });
    this.contact_id = res.contact_id
  })

  
  
  }


  onFileChange(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
    // Show img after file change
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
    this.imageShow = (<FileReader>event.target).result;
    }
    this.imgStatus = false;
  }

  onSubmit(){
    //Append img
    let contact_name = String(this.newContactGroup.get('nameCtrl')?.value);
    let contact_surname = String(this.newContactGroup.get('surnameCtrl')?.value);
    let contact_bday_str =  String(this.newContactGroup.get('bdayCtrl')?.value);
    let contact_bday = new Date(contact_bday_str);
    


    if(!this.imgStatus){

      const formData = new FormData();
      formData.append('file', this.image, contact_name +'-'+contact_surname);
      let contact_photo = contact_name +'-'+contact_surname;

      this.dbService.updateContactPhoto(contact_name,contact_surname,contact_bday,contact_photo, this.contact_id).subscribe({
        next: data => {
          this.dbService.upload(formData).subscribe({
            next: res=>{
              let status ='';
              status = res
              //Oczekuje 2 sekundy przed przeładowaniem. 
              setTimeout(location.reload.bind(location), 2000);
              this._snackBar.open(`${status} 😎`, 'Rozumiem', {
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
    else{
      this.dbService.updateContact(contact_name,contact_surname,contact_bday, this.contact_id).subscribe({
        next: data => {
          //Oczekuje 2 sekundy przed przeładowaniem. 
          setTimeout(location.reload.bind(location), 2000);
          this._snackBar.open(`${data} 😎`, 'Rozumiem', {
            duration: this.durationInSeconds * 1000
          });
        },
        error: err => {
          err.error.message;
        }
      });  
      
    }


  }


}
