import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListusersComponent } from './listusers.component';

describe('ListusersComponent', () => {
  let component: ListusersComponent;
  let fixture: ComponentFixture<ListusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
