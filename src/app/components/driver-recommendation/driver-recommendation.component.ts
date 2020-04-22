import { Component, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { element } from 'protractor';

@Component({
  selector: 'app-driver-recommendation',
  templateUrl: './driver-recommendation.component.html',
  styleUrls: ['./driver-recommendation.component.css']
})
export class DriverRecommendationComponent implements OnInit {

  /**
   * Create an array of Drivers
   * Sets userId number variable to select location
   */
  drivers : Array<any> = [];
  userId: number;


  /**
   * 
   * @param userService An user service is instantiated.
   * @param http A HTTP Client is created.
   * 
   */
  constructor(private userService: UserService, private http: HttpClient) {}

  /**
   * Upon startup of this component, the userId i pulled from
   * the sessionStorage to get the userId value.
   * Populate the Drivers Array with the values from the back end
   * through the userService getRecommendedDrivers(). 
   */
  ngOnInit() { 
    this.drivers = [];
    
     this.userId = JSON.parse(sessionStorage.getItem("userid"));
     this.userService.getRecommendedDrivers(this.userId).subscribe(
      res => {
           console.log(res);
           res.forEach(element => {
              this.drivers.push({
                   'id': element.userId,
                 'name': element.firstName+" "+element.lastName,
               'origin':element.hCity+","+element.hState, 
                'email': element.email, 
                'phone':element.phoneNumber
              });
          });
      });


      //You need this sleep function to run the this.displayDriverInfo(stuff);
      this.sleep(2400).then(() => {
      this.displayDriverInfo(this.drivers);
      });
  }

  /**
   * This function is used to sync up the
   * recommended drivers in tandem with driver-list
   * 
   * @param ms 
   * ms is used to insert a wait time for the component
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 
  /**
   * This function is used to display a modal to the user
   * @param drivers 
   */
   displayDriverInfo(drivers){
    var recOutput = document.getElementById('driverrec');
    //console.log(drivers);

        drivers.forEach(element => 
          {
            recOutput.innerHTML += `
            <div class="driver-item">
            <div>
            <img 
              style="
                display: block;
                margin-left: auto;
                margin-right: auto;
                height: 46%;
                width: 46%;"
              ng-if="internImageUrl" src="https://app.revature.com/core/resources/download/default/interns/image?t=1580327501130" alt="" id="user-dropa" class="img-circle profileUpdate ng-scope userimg"
            />	                
            </div>

            <div>
            <h6 
              style="
                text-align: center;
              "
            >${element.name}</h6>
            </div>

            <button type="button" 
              style="
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
              "
            class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCentered${element.id}"> Info</button>
            <div class="col-lg-5">
              <div class="modal" id="exampleModalCentered${element.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenteredLabel">Contact Info:</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <h1>${element.name}</h1>
                      <h3>Email: ${element.email}</h3>         
                      <h3>Phone: ${element.phone}</h3>                 
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
          })
           
          }
          
  }