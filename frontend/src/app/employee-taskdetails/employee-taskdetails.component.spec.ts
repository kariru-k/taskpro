import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskdetailsComponent } from './employee-taskdetails.component';

describe('EmployeeTaskdetailsComponent', () => {
  let component: EmployeeTaskdetailsComponent;
  let fixture: ComponentFixture<EmployeeTaskdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTaskdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTaskdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
