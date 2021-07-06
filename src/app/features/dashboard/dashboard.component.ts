import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, map, pluck, tap } from 'rxjs/operators';
import { Goal, RECURRING_TYPE, Task } from 'src/app/domain/goal.model';
import { DashboardActions } from './state/dashboard.actions';
import { DashboardSelectors } from './state/dashboard.selector';
import { DateTime } from 'luxon';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from './components/comment-doalog/comment-doalog.component';
import { CommentService } from './services/service/comment.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from './services/service/chart.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public goals$: Observable<Goal[]>;

  public goals: Goal[];

  public goalsHighPiority$: Observable<Goal[]>;
  public goalsMonth$: Observable<Goal[]>;
  public goalstoday$: Observable<Goal[]>;
  public goalsWeek$: Observable<Goal[]>;
  public goalsHistory$: Observable<Goal[]>;

  @ViewChild('detection') detection: ElementRef;
  @ViewChild('lineClamp') lineClamp: ElementRef;

  public labels = [
    'FirstPlaceholder',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Nov',
    'Dec',
    'LastPlaceholder',
  ];
  public comparingChartLabels;

  public chart = {
    labels: [
      'FirstPlaceholder',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'LastPlaceholder',
    ],
    options: {
      legend: {
        text: 'You awesome chart with average line',
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              min: 'Jan',
              max: 'May',
            },
          },
        ],
      },
    },
  };

  public datasets;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = ['Accomplished', 'To Do'];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,255,255,0.3)'],
    },
  ];

  constructor(
    private readonly store: Store,
    public dialog: MatDialog,
    private readonly commentService: CommentService,
    private readonly chartService: ChartService,
    public auth: AuthService,
    private http: HttpClient
  ) {
    // this.auth.user$
    // .pipe(
    //   concatMap((user) =>
    //     // Use HttpClient to make the call
    //     this.http.get(
    //       encodeURI(`https://careerplan.eu.auth0.com/api/v2/users/${user.sub}`)
    //     )
    //   ),
    //   pluck('user_metadata'),
    //   tap((meta) => (this.metadata = meta))
    // )
    // .subscribe();

    this.store.dispatch(DashboardActions.getGoals());

    this.goals$ = this.store.select(DashboardSelectors.getGoals);

    this.goals$.subscribe((result) => {
      let totalAccomplishedValues =
        this.chartService.calculateTotalAccomplished(result);
      this.pieChartData = [
        totalAccomplishedValues.sumOfPointsAccomplished,
        totalAccomplishedValues.sumOfpointsTotal -
          totalAccomplishedValues.sumOfPointsAccomplished,
      ];

      let monthlyAccomplishedValues =
        this.chartService.calculateMonthlyAccomplishment(result);

      this.datasets = [
        {
          data: [0, ...monthlyAccomplishedValues.monthlyPlan, 0],
          label: 'Planned',
        },
        {
          data: [0, ...monthlyAccomplishedValues.monthlyAccomplished, 0],
          label: 'Accomplished',
          type: 'line',
        },
      ];

      this.comparingChartLabels = this.labels.slice(
        0,
        DateTime.now().month + 1
      );
    });

    this.goalsHighPiority$ = this.goals$.pipe(
      map((goals) =>
        goals.filter((goal) =>
          goal.tasks.some(
            (task) => DateTime.fromISO(task.duedate) <= DateTime.now()
          )
        )
      )
    );

    this.goalsMonth$ = this.goals$.pipe(
      map((goals) =>
        goals.filter((goal) =>
          goal.tasks.some(
            (task) =>
              DateTime.fromISO(task.duedate) > DateTime.now() &&
              DateTime.fromISO(task.duedate).month === DateTime.now().month
          )
        )
      )
    );

    this.goalsWeek$ = this.goals$.pipe(
      map((goals) =>
        goals.filter((goal) =>
          goal.tasks.some(
            (task) =>
              DateTime.fromISO(task.duedate).weekNumber ===
                DateTime.now().weekNumber ||
              (DateTime.fromISO(task.duedate) > DateTime.now() &&
                task.recurringType === RECURRING_TYPE.WEEKLY)
          )
        )
      )
    );

    this.goalsHistory$ = this.goals$.pipe(
      map((goals) =>
        goals.filter((goal) => goal.tasks.some((task) => task.done === true))
      )
    );
  }

  metadata = {};

  ngAfterViewInit(): void {
    console.log(
      this.detection.nativeElement.offsetWidth -
        this.detection.nativeElement.scrollWidth
    );

    console.log(
      this.detection.nativeElement.offsetHeight -
        this.detection.nativeElement.scrollHeight
    );
  }

  public over(): void {
    console.log('over');
  }

  public markTaskAsDone(goalFromTemplate: Goal, task: Task): void {
    let tasks: Task[] = [];

    goalFromTemplate.tasks.forEach((element) => {
      if (element.id === task.id) {
        let newTask: Task = {
          id: task.id,
          description: task.description,
          effort: task.effort,
          duedate: task.duedate,
          done: !task.done,
          recurringType: task.recurringType,
          goalId: task.goalId,
        };
        tasks.push(newTask);
      } else {
        tasks.push(element);
      }
    });

    let newDone = !goalFromTemplate.tasks.some((item) => item.done === true);

    let goal: Goal = {
      id: goalFromTemplate.id,
      title: goalFromTemplate.title,
      tasks: tasks,
      done: newDone,
      comments: goalFromTemplate.comments,
      careerPlanId: goalFromTemplate.careerPlanId,
      userId: goalFromTemplate.userId,
    };

    this.store.dispatch(DashboardActions.updateGoal({ goal }));
  }

  public markGoalAsDone(goalFromTemplate: Goal): void {
    let tasks: Task[] = [];

    goalFromTemplate.tasks.forEach((element) => {
      let newTask: Task = {
        id: element.id,
        description: element.description,
        effort: element.effort,
        duedate: element.duedate,
        done: !goalFromTemplate.done,
        recurringType: element.recurringType,
        goalId: element.goalId,
      };

      tasks.push(newTask);
    });

    let newDone = !goalFromTemplate.done;

    let goal: Goal = {
      id: goalFromTemplate.id,
      title: goalFromTemplate.title,
      tasks: tasks,
      done: newDone,
      comments: goalFromTemplate.comments,
      careerPlanId: goalFromTemplate.careerPlanId,
      userId: goalFromTemplate.userId,
    };

    this.store.dispatch(DashboardActions.updateGoal({ goal }));
  }

  public addComment(currentGoalComment: Goal, event) {
    this.commentService.changeActiveGoal(currentGoalComment);

    this.dialog.open(CommentDialogComponent, {
      data: {
        position: {
          top: event.clientY,
          left: event.clientX,
        },
      },
    });
  }

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.offsetWidth < elem.scrollWidth;
    } else {
      return false;
    }
  }
}
