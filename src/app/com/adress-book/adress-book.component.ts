import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/serv/db.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-adress-book',
  templateUrl: './adress-book.component.html',
  styleUrls: ['./adress-book.component.css']
})
export class AdressBookComponent implements OnInit{
  constructor(private dbService: DbService, private _snackBar: MatSnackBar){}

  contacts: any;
  dataSource:any;
  durationInSeconds = 3;
  displayedColumns: string[] = ['contact_id','contact_name','contact_surname','contact_bday','contact_photo','contact_edit'];


  ngOnInit(): void {
    this.dbService.getContacts().subscribe((data)=>{
      this.contacts = data;
      this.dataSource = new MatTableDataSource(this.contacts) ;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  destroy(item:any){
      this.dbService.delete(item).subscribe((data) =>{
        //Add destroy UX
        //Oczekuje 2 sekundy przed przeładowaniem. 
        setTimeout(location.reload.bind(location), 2000);
        this._snackBar.open(`Kontakt skasowany 😂`, 'Rozumiem', {
          duration: this.durationInSeconds * 1000
        });
      window.location.reload();
      });
  }

  

}
