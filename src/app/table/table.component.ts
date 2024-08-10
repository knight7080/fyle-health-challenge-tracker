import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { userData } from '../../shared/models/userData';
import { EventServices } from '../../shared/services/EventServices';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  currentPage = 0;
  pageSize = 5;
  totalItems = userData.length;
  paginatedData = this.paginateData(userData, this.currentPage, this.pageSize);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private events: EventServices) {
    this.events.listen("filter_field", (value: string) => this.filterData(value));
    this.events.listen("search_field", (value: string) => this.searchByName(value));
  }

  displayedColumns: string[] = ['name', "workouts", "numberOfWorkouts", "totalWorkoutMinutes"];

  tableData = JSON.parse(localStorage.getItem('userData')!);

  ngOnInit() {
    this.updatePaginatedData();
  }

  transformWorkouts(workouts: { type: string, mins: number }[]): string {
    return workouts.map(workout => workout.type).join(", ");
  }

  transformMinutes(workouts: { type: string, minutes: number }[]): number {
    let totalMins: number = 0;
    workouts.forEach(workout => totalMins += workout.minutes);
    return totalMins;
  }

  searchByName(value: string) {
    this.tableData = value.length > 0 ? userData.filter((ele) => ele.name.includes(value)) : userData;
    this.updatePaginatedData();
  }

  filterData(value: string) {
    this.tableData = value === "All" ? userData : userData.filter((ele) =>
      ele.workouts.some((workout) => workout.type === value)
    );
    this.updatePaginatedData();
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    this.totalItems = this.tableData.length;
    this.paginatedData = this.paginateData(this.tableData, this.currentPage, this.pageSize);
  }

  paginateData(data: any[], pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }
}
