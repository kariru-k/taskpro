import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEmployeetaskStatusComponent } from './track-employeetask-status.component';

describe('TrackEmployeetaskStatusComponent', () => {
  let component: TrackEmployeetaskStatusComponent;
  let fixture: ComponentFixture<TrackEmployeetaskStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackEmployeetaskStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackEmployeetaskStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
