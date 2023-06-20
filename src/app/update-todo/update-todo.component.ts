import {Component,  OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoService} from "../service/todo.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Item} from "../model/Item";

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {

  updateTodoForm: FormGroup;
  item: Item;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private todoService: TodoService,
              public modalRef: BsModalRef
  ) {
  }

  ngOnInit(): void {
    this.updateTodoForm = this.fb.group({
      title: new FormControl(this.item.title),
      description: new FormControl(this.item.description)
    })
  }

  onSubmit() {
    this.updateTodoForm.markAllAsTouched();
    if (this.updateTodoForm.valid) {
      const updatedItem: Item = {
        id : this.item.id,
        title: this.updateTodoForm.value.title,
        description: this.updateTodoForm.value.description,
        status: this.item.status,
        date: this.item.date
      };
      this.todoService.updateTodo(this.item.status, this.item.id, updatedItem).subscribe(() => {
        this.modalRef.hide();
      })
    }
  }

}
