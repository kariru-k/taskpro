import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueTasksComponent } from './overdue-tasks.component';

describe('OverdueTasksComponent', () => {
  let component: OverdueTasksComponent;
  let fixture: ComponentFixture<OverdueTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdueTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverdueTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
