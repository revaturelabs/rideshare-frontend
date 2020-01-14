import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  debug(message: string) {
    let logEntry = this.createLogStatement('debug', message); 
    console.info(logEntry); 
    return logEntry;
  }

  error(message: string) {
    let logEntry = this.createLogStatement('error', message); 
    console.error(logEntry); 
    return logEntry; 
  }

  warn(message: string) {
    let logEntry = this.createLogStatement('warning', message); 
    console.warn(logEntry); 
    return logEntry; 
  }

  info(message: string) {
    let logEntry = this.createLogStatement('info', message); 
    console.info(logEntry); 
    return logEntry; 
  }

  createLogStatement(level, message) {
    return "[" + level + "]" + " " + this.getCurrentDate() + " " + message; 
  }

  getCurrentDate() {
    let date = new Date(); 
    return "[" + date.toLocaleString() + "]"; 
  }

  constructor() { }
}
