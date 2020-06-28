import { Component, OnInit, Output, EventEmitter, Type } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../table/table.component';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  panelOpenState = false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  mensaje: string;

  @Output() valueChange = new EventEmitter<Type<any>>();

  constructor() { }

  ngOnInit(): void {
  }

  valueChanged(current: number) {
    this.valueChange.emit(current == 1 ? ContentComponent : TableComponent);
  }



}
