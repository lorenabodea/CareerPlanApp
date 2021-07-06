import { Injectable } from '@angular/core';
import { Goal } from 'src/app/domain/goal.model';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  public calculateTotalAccomplished(goals: Goal[]) {
    let sumOfpointsTotal = 0;
    let sumOfPointsAccomplished = 0;

    goals.forEach((goal) => {
      goal.tasks.forEach((task) => {
        if (task.done) {
          sumOfPointsAccomplished += task.effort;
        }

        sumOfpointsTotal += task.effort;
      });
    });

    return {
      sumOfPointsAccomplished: sumOfPointsAccomplished,
      sumOfpointsTotal: sumOfpointsTotal,
    };
  }

  public calculateMonthlyAccomplishment(goals: Goal[]) {
    let monthlyAccomplished: number[] = [];
    let monthlyPlan: number[] = [];

    let currentMonth = DateTime.now().month;

    for (let index = 0; index <= currentMonth; index++) {
      monthlyPlan[index] = 0;
      monthlyAccomplished[index] = 0;
    }

    goals.forEach((goal) => {
      goal.tasks.forEach((task) => {
        let month = DateTime.fromISO(task.duedate).month;
        if (month !== NaN && month <= currentMonth) {
          monthlyPlan[month - 1] += task.effort;

          if (task.done) {
            monthlyAccomplished[month - 1] += task.effort;
          }
        }
      });
    });

    return {
      monthlyAccomplished: monthlyAccomplished,
      monthlyPlan: monthlyPlan,
    };
  }
}
