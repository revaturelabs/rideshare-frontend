import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class SessionService {
  sessionEmitter: EventEmitter<Storage>;
  constructor() {
    this.sessionEmitter = new EventEmitter<Storage>();
  }

  loggedIn() {
    this.sessionEmitter.emit(sessionStorage);
  }

  getEmitter() {
    return this.sessionEmitter;
  }
}
