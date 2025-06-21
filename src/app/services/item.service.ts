import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // GET all items
  getAllItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  // GET single item by ID
  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/${id}`);
  }

  // POST - Add new item
  addItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, item);
  }

  // PUT - Update item
  updateItem(id: string, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${id}`, item);
  }

  // DELETE - Delete item
  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${id}`);
  }
}
