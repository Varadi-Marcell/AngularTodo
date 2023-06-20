import {Component, OnInit} from '@angular/core';
import {Item} from "../model/Item";
import {TodoService} from "../service/todo.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {CreateTodoComponent} from "../create-todo/create-todo.component";
import {UpdateTodoComponent} from "../update-todo/update-todo.component";
import {ViewTodoComponent} from "../view-todo/view-todo.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  items: Item[];
  doneItems = [];
  draggedItem;
  draggedFrom: string;

  isSortedAscending = true;

  viewMode: string = 'list';

  constructor(private todoService: TodoService,
              private activatedRoute: ActivatedRoute,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.todoService.getAllTodo('doneItems').subscribe(items => this.doneItems = items)
    this.todoService.getAllTodo('items').subscribe(items => {
      this.items = items;
      // console.log(this.items);
    }, error => {
      console.log(error);
    });
  }


  onDragStart(event, item) {
    this.draggedItem = item;
    this.draggedFrom = item.status;
    event.dataTransfer.effectAllowed = "move";
  }

  onDragOver(event) {
    event.preventDefault();
  }

  onDrop() {
    if (this.draggedFrom !== 'doneItems') {
      this.items = this.items.filter(item => item.id !== this.draggedItem.id);
      this.draggedItem.status = 'doneItems';
      this.todoService.deleteTodo('items', this.draggedItem.id);
      this.todoService.createTodo('doneItems', this.draggedItem);
      this.draggedItem = null;
    }
  }

  onDropBack() {
    if (this.draggedFrom !== 'items') {
      this.doneItems = this.doneItems.filter(item => item.id !== this.draggedItem.id);
      this.draggedItem.status = 'items';
      this.todoService.deleteTodo('doneItems', this.draggedItem.id);
      this.todoService.createTodo('items', this.draggedItem);
      this.draggedItem = null;
    }
  }
  setViewMode(mode: string) {
    this.viewMode = mode;
  }

  deleteItem(item: Item) {
    if (item.status === 'items') {
      console.log(item.id)
      this.todoService.deleteTodo('items', item.id).subscribe();
    } else {
      this.todoService.deleteTodo('doneItems', item.id).subscribe();
    }
  }

  createTodo() {
    this.modalService.show(CreateTodoComponent)
  }

  updateTodo(item: Item) {
    this.modalService.show(UpdateTodoComponent, {initialState: {item: item}});
  }

  viewTodo(item: Item) {
    this.modalService.show(ViewTodoComponent, {initialState: {item: item}});
  }

  sortItemsByDate(): void {
    if (this.isSortedAscending) {
      this.items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.doneItems.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.isSortedAscending = false;
    } else {
      this.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.doneItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.isSortedAscending = true;
    }
  }


}
