import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { APIService } from 'src/app/services/api.service';
import { InfoMovie, Movie } from 'src/app/interface/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/date.adapter';
import { DatePipe } from '@angular/common';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class TableComponent implements OnInit, AfterViewInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  datePipe = new DatePipe('en-US');
  start : string;
  end : string;
  showIn = false;
  public movies = [];
  public info: InfoMovie;
  totalMovies = 100;
  moviesPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15, 20];
  @Input() imgPath: string = 'https://image.tmdb.org/t/p/w342';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['userimage', 'title', 'release_date', 'original_language', 'overview'];//, 'action'
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource: MatTableDataSource<Movie>;

  constructor(private api: APIService) { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(); // create new object
    this.getMovies(1); // forgeted this line
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }


  public getMovies(index: number) {

    this.showIn = true;

    this.api.getMovies(index).subscribe((data) => {
      this.showIn = false;
      this.movies = data.results;//data['results'];
      console.log(data.total_results);
      this.totalMovies = data.total_results;
      this.dataSource.data = data.results; // on data receive populate dataSource.data array
      return data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    //this.moviesPerPage = pageData.pageSize;
    this.getMovies(this.currentPage);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    //alert(`${type}: ${event.value}`);

    if (type == "from") {
      this.start = this.datePipe.transform(event.value, 'yyyy-MM-dd')
    }else {
      this.end = this.datePipe.transform(event.value, 'yyyy-MM-dd');

      console.log(`${this.start} ${this.end}`);
    
      let filter = this.movies.filter(m => {
        if (m.release_date > this.start && m.release_date < this.end)
          return m;
      });
      this.dataSource.data = filter; 
    }



  }


}
