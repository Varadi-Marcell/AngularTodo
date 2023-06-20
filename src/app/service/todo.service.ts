import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Item} from "../model/Item";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(null);
  private doneList: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(null);

  constructor() {
  }

  init() {
    this.todoList.next(this._readItems('items'));
    this.doneList.next(this._readItems('doneItems'));
  }

  getAllTodo(key: string): Observable<Item[]> {
    return key === 'items' ? this.todoList.asObservable() : this.doneList.asObservable();
  }

  createTodo(key: string, item: Item): Observable<Item> {
    let items = this._readItems(key);

    let maxId = 0;
    if (items.length > 0) {
      maxId = Math.max(...items.map(item => item.id));
    }
    item.id = maxId + 1;

    items = [...items, item];
    this._writeItems(key, items);
    this.updateArraySubject(key, items);

    return of(item);
  }


  updateTodo(key: string, id: number, item: Item): Observable<Item> {
    const items = this._readItems(key);
    const index = items.findIndex(existingItem => existingItem.id === id);
    if (index !== -1) {
      items[index] = item;
      this._writeItems(key, items);
      this.updateArraySubject(key, items);
    }
    return of(item);
  }

  deleteTodo(key: string, id: number): Observable<number> {
    const items = this._readItems(key);
    const filteredItems = items.filter(item => item.id !== id);
    this._writeItems(key, filteredItems);
    this.updateArraySubject(key, filteredItems);
    return of(id);
  }

  private _readItems(key: string): Item[] {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  }

  private _writeItems(key: string, items: Item[]): void {
    localStorage.setItem(key, JSON.stringify(items));
  }

  private updateArraySubject(key: string, items: Item[]): void {
    if (key === 'items') {
      this.todoList.next(items);
    } else if (key === 'doneItems') {
      this.doneList.next(items);
    }
  }
}
