import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Office } from 'src/app/models/office';
import { OfficeServiceService } from 'src/app/services/office-service.service';

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.css']
})
export class EditOfficeComponent implements OnInit {
  offices:Array<Office>= [];
  manager:Employee;
  count: Number = 5;
  p: Number = 1;

  street:string;
  city:string;
  state:string;
  zip:number;
  address :string;

  constructor(private oss:OfficeServiceService) { }

  ngOnInit() {
    this.populateOfficeTable();
  }

  async populateOfficeTable(){
    let offray:Office[] = await this.oss.getAllOffices(); 
    this.offices = offray;
  }

  async deleteOffice(office) {
    this.oss.deleteOffice(office.office_id);
    this.offices = [];
    this.populateOfficeTable();
  }

}
