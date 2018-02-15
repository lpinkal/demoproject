import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaystudentComponent } from './displaystudent.component';

describe('DisplaystudentComponent', () => {
  let component: DisplaystudentComponent;
  let fixture: ComponentFixture<DisplaystudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaystudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaystudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
