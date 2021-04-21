import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career-plan-form',
  templateUrl: './career-plan-form.component.html',
  styleUrls: ['./career-plan-form.component.scss']
})
export class CareerPlanFormComponent implements OnInit {

  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
