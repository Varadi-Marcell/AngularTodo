import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TodoService} from "../service/todo.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  todoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private todoService: TodoService,
              public modalRef: BsModalRef) {
  }

  onSubmit() {
    this.todoForm.markAllAsTouched();
    if (this.todoForm.valid) {
      this.todoService.createTodo('items', this.todoForm.value).subscribe();
      console.log(this.todoForm.value);
      this.modalRef.hide();
    }
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      status: 'items',
      date: new Date()
    })

  }
}
