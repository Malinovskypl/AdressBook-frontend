import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressBookComponent } from './adress-book.component';

describe('AdressBookComponent', () => {
  let component: AdressBookComponent;
  let fixture: ComponentFixture<AdressBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
