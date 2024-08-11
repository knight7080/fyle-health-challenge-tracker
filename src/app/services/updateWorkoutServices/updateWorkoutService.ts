import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateWorkoutServices {
  private workoutsSource = new BehaviorSubject<any[]>([]);
  workouts$ = this.workoutsSource.asObservable();

updateWorkout(workout: any) {
    this.workoutsSource.next(workout);
  }
}
