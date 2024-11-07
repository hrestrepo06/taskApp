import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-progress',
  standalone: true,
  imports: [NgCircleProgressModule],
  providers: [],
  template: `
    <circle-progress
      [percent]="85"
      [radius] = "65"
      [outerStrokeWidth] = "6"
      [innerStrokeWidth] = "4"
      [titleColor]="'var(--ion-color-dark)'"
    ></circle-progress>
  `,
})
export class TaskProgressComponent { }
