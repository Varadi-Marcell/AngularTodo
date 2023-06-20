import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoService} from "./service/todo.service";

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    resolve: {
      init: () => inject(TodoService).init()
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
