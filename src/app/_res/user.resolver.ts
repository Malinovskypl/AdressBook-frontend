import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { DbService } from '../serv/db.service';
import { Contacts } from '../_int/contacts';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Contacts[]> {

  constructor (private dbService: DbService, private router:Router){}

  resolve(route: ActivatedRouteSnapshot): Observable<Contacts[]> {
    return this.dbService.getContact(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate([""]);
        return EMPTY
      })
    )
  }
}
