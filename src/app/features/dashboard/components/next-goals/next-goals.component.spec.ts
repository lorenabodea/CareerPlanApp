import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGoalsComponent } from './next-goals.component';

describe('NextGoalsComponent', () => {
  let component: NextGoalsComponent;
  let fixture: ComponentFixture<NextGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
