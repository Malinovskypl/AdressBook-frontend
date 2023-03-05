import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts } from '../_int/contacts';
const AUTH_API = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  getContacts():Observable<Contacts[]>{
    return this.http.get<Contacts[]>(AUTH_API + '/contacts' );
  }

  getContact(id:number):Observable<Contacts[]>{
    return this.http.get<Contacts[]>(AUTH_API + `/contact/${id}`)
  }

  upload(file: any): Observable<any> {
    return this.http.post<any>(AUTH_API+ '/file',file)
  }

  delete(contact: any): Observable<any> {
    return this.http.post(
      AUTH_API + '/delete-contact',
      {
        contact
      },
      httpOptions
    );

  }

  addContact(contact_name: string, contact_surname: string, contact_bday:Date, contact_photo:string): Observable<any> {
    return this.http.post(
      AUTH_API + '/add-contact',
      {
        contact_name,
        contact_surname,
        contact_bday,
        contact_photo
      },
      httpOptions
    );

  }

  updateContactPhoto(contact_name: string, contact_surname: string, contact_bday:Date, contact_photo:string, contact_id: Number): Observable<any> {
    return this.http.post(
      AUTH_API + '/update-contact-photo',
      {
        contact_name,
        contact_surname,
        contact_bday,
        contact_photo,
        contact_id
      },
      httpOptions
    );
  }

  updateContact(contact_name: string, contact_surname: string, contact_bday:Date, contact_id: Number): Observable<any> {
    return this.http.post(
      AUTH_API + '/update-contact',
      {
        contact_name,
        contact_surname,
        contact_bday,
        contact_id
      },
      httpOptions
    );
  }

}
