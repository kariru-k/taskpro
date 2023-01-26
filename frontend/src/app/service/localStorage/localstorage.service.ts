import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  // setItem(key: string, value: any): void {
  //   localStorage.setItem(key, JSON.stringify(value));
  // }

  getItem(key: string){
    return JSON.parse(localStorage.getItem(key)!);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
