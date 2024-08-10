import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from "./search/search.component";
import { TableComponent } from "./table/table.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AddWorkoutComponent } from "./add-workout/add-workout.component";
import { userData } from '../shared/models/userData';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, TableComponent, HeaderComponent, FooterComponent, AddWorkoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Health-Challenge-Tracker';
  constructor(){
    const storedUserData = JSON.parse(localStorage.getItem('userData')!);
    console.log(storedUserData);
    if (!storedUserData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    
  }
}
