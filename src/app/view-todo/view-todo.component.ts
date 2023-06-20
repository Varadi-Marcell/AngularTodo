import {Component, OnInit} from '@angular/core';
import {Item} from "../model/Item";
import {ActivatedRoute} from "@angular/router";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent  {
  item: Item;
  constructor(public modalRef: BsModalRef) {
  }
}
