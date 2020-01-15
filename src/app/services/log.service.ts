import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  /**
   * A function that logs a debug message
   * @param message 
   */
  debug(message: string) {
    let logEntry = this.createLogStatement('debug', message); 
    console.info(logEntry); 
    return logEntry;
  }

  /**
   * A function that logs an error message
   * @param message 
   */

  error(message: string) {
    let logEntry = this.createLogStatement('error', message); 
    console.error(logEntry); 
    return logEntry; 
  }

  /**
   * A function that logs a warn message
   * @param message 
   */

  warn(message: string) {
    let logEntry = this.createLogStatement('warning', message); 
    console.warn(logEntry); 
    return logEntry; 
  }

  /**
   * A function that logs a message as an info
   * @param message 
   */

  info(message: string) {
    let logEntry = this.createLogStatement('info', message); 
    console.info(logEntry); 
    return logEntry; 
  }

  /**
   * This function creates the log statement
   * @param level 
   * @param message 
   */

  createLogStatement(level, message) {
    return "[" + level + "]" + " " + this.getCurrentDate() + " " + message; 
  }

  /**
   * This function get the current date.
   */
  getCurrentDate() {
    let date = new Date(); 
    return "[" + date.toLocaleString() + "]"; 
  }

  /**
   * A constructor
   */
  constructor() { }
}
