import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service'; 

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  logStatement  = "no logs";
  constructor(private logService: LogService) { }

  debugClicked(message) {
    this.logStatement = this.logService.debug(message);
  }
  warnClicked(message) {
    this.logStatement = this.logService.warn(message); 
  }
  errorClicked(message) {
    this.logStatement = this.logService.error(message); 
  }
  infoClicked(message) {
    this.logStatement = this.logService.info(message); 
  }

  ngOnInit() {
    this.logStatement = "start logger"; 
    this.logService.info(this.logStatement); 
  }

}
