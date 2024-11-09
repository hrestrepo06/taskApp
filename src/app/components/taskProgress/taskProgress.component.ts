import { NgCircleProgressModule } from 'ng-circle-progress';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-progress',
  standalone: true,
  imports: [NgCircleProgressModule],
  providers: [],
  template: `
    <circle-progress
      [percent]="avance"
      [radius] = "65"
      [outerStrokeWidth] = "6"
      [innerStrokeWidth] = "4"
      [titleColor]="'var(--ion-color-dark)'"
      [subtitle]="'Progreso'"
    ></circle-progress>
  `,
})
export class TaskProgressComponent { 

  @Input() avance: number; 
}
