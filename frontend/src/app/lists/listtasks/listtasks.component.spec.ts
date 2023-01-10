import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtasksComponent } from './listtasks.component';

describe('ListtasksComponent', () => {
  let component: ListtasksComponent;
  let fixture: ComponentFixture<ListtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
