import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css'
})
export class AddWorkoutComponent {
  addWorkoutGroup = new FormGroup({
    user_name : new FormControl(""),
    filter_field: new FormControl(""),
    total_time : new FormControl("")
  })
  tableData = JSON.parse(localStorage.getItem('userData')!);

  addWorkout(){
    this.tableData.push({
      id: this.tableData.length+1,
      name : this.addWorkoutGroup.get('user_name')?.value,
      workouts : [{
        type: this.addWorkoutGroup.get('filter_field')?.value,
        minutes: this.addWorkoutGroup.get('total_time')?.value,
      }]
    })
    console.log(this.tableData)
    localStorage.setItem("userData",this.tableData);
  }
}
