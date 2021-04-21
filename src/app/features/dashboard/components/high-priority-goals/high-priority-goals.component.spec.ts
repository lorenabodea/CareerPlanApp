import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighPriorityGoalsComponent } from './high-priority-goals.component';

describe('HighPriorityGoalsComponent', () => {
  let component: HighPriorityGoalsComponent;
  let fixture: ComponentFixture<HighPriorityGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighPriorityGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighPriorityGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
