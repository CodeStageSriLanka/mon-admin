import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankloansComponent } from './bankloans.component';

describe('BankloansComponent', () => {
  let component: BankloansComponent;
  let fixture: ComponentFixture<BankloansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankloansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
