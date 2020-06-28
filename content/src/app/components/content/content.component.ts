import { Component, OnInit, Input, Inject } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialogs/dialog/dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { InfoMovie } from 'src/app/interface/movie';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input() imgPath: string = 'https://image.tmdb.org/t/p/w342';
  public movies = [];
  public info: InfoMovie;

  // MatPaginator Inputs
  totalMovies = 100;
  moviesPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15, 20];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private api: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies(1);
  }

  public getMovies(index: number) {

    this.api.getMovies(index).subscribe((data) => {
      this.totalMovies = data.total_results;
      this.movies = data.results;//data['results'];
      console.log(data.total_results);
      return data;
    });
  }

  @Input() deviceXs: boolean;
  topVal = 0;
  onScroll(e) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }

  openDialog(item: any) {

    // let dialogRef = this.dialog.open(DialogComponent, {
    //   height: '400px',
    //   width: '600px',
    // });

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: item.title,
        description: item.overview
      },
    });

    //let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      alert(setPageSizeOptionsInput.split(',').map(str => +str));
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  
  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    //this.moviesPerPage = pageData.pageSize;
    this.getMovies(this.currentPage);
  }

}

