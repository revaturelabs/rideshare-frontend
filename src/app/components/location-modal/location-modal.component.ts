import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { OfficeServiceService } from 'src/app/services/office-service.service';
import { Office } from 'src/app/models/office';
import { ConfigServiceService } from 'src/app/services/config-service.service';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {
  street: string;
  city: string;
  state: string;
  zipcode: number;
  address: string;
  modalRef: BsModalRef;
  officeID: boolean = false;
  tempO: Office = new Office(0, "");
  text: string;

  states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS',
    'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WI', 'WV', 'WY'];


  @Input() office: Office;
  constructor(private oss: OfficeServiceService, private cs: ConfigServiceService) { }

  ngOnInit() {
    if (this.office == null) {
      this.office = this.tempO;
      this.text = "ADD";
    }
    else {
      this.text = "UPDATE";
    }
    let address2: Array<any> = this.office.office_address.split(", ");
    this.street = address2[0];
    console.log(this.street);
    this.city = address2[1];
    address2 = address2[2].split(" ");
    this.state = address2[0];
    this.zipcode = address2[1];
  }

  async submit() {

    let uaddress = this.street + ", " + this.city + ", " + this.state + " " + this.zipcode;
    this.office.office_address = uaddress;
    let veri = await this.cs.verifyAddress(this.state, this.city, this.street, this.zipcode);
    let verstat = veri.is_valid;

    if (verstat) {
      let o: Office = await this.oss.updateOffice(this.office);
      if (o.office_id === 0) {
        await this.oss.addOffice(this.office);
      }
    }
    else {
      alert("Address is not validated, Office not created");
    }
  }

}
