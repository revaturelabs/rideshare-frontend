import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { LogService } from "../log.service"
import { environment } from '../../../environments/environment';



@Injectable({
  	providedIn: 'root'
})




export class UserService {
    

	/**
	 * This is an user service
	 */
	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

	// http headers
	private headers = new HttpHeaders({'Content-Type': 'application/json'});
	


	/**
	 * Set up the url string to the env var
	 * Creates a new user object
	 */
    url: string = environment.userUri;
    googleBaseUrl: string = environment.googleBaseUri;
    googleApiKey: string = environment.googleMapKey;
	user: User = new User();

	/**
	 * Constructor
	 * @param http An HTTP client object
	 * @param router A router
	 * @param log A log service
	 * @param authService An authorization service
	 */

	constructor(private http: HttpClient, private router: Router, private log: LogService, private authService: AuthService) { }
  
	/**
	 * A GET method for all users
	 */

	getAllUsers() {
		return this.http.get<User[]>(this.url);
	}
	
	/**
	 * A GET method for one user
	 * @param idParam 
	 */
	getUserById(idParam: number) {
		
		console.log(this.url)
		return this.http.get<User>(this.url+idParam).toPromise();


	}

	 
	getUserById2(idParam2: String): Observable<User> {
		
		//console.log(this.url)
		return this.http.get<User>(this.url+idParam2);


	}

	/**
	 * A POST method that switch an Rider to a Driver
	 * @param user 
	 * @param role 
	 */
	createDriver(user: User, role) {

		user.active = true;
		user.isDriver = false;
		user.isAcceptingRides = false;
		console.log(user);

		this.http.post(this.url, user, {observe: 'response'}).subscribe(
			(response) => {
				this.authService.user = response.body;
				this.fireIsLoggedIn.emit(response.body);

				if (role === 'driver') {
					this.router.navigate(['new/car']);
				} else {
					this.router.navigate(['home/drivers']);
				}
			},
			(error) => {
				this.log.error(error)
			}
		);

	}

	// add user method
	addUser(user :User) :Observable<User> {

       // validate address through googleapi. If invalid, set the location string to ''
       // in order to conform to behavior of back-end api setting of status codes on modular form
    
    const numAndStreetName = user.hAddress.split(' '); // ensures user placed a space between the street number and street name
    let InvalidateLocation = false;
    if ( isNaN(Number(numAndStreetName[0]))){
        console.log("first part of haddress is not a number!")
        InvalidateLocation = true;
        

    }else{
        console.log("Number of parts in haddress is: " + numAndStreetName.length);
        //construct url with needed number of +'s based on length of numAndStreetName...
        let googleConstructedUrl = `${this.googleBaseUrl}`;
        numAndStreetName.forEach(numAndStreetNamePart => {//for each element concatenate + and the element itself to original googleConstructedUrl
            if (numAndStreetNamePart === numAndStreetName[0]){
                googleConstructedUrl += `${numAndStreetNamePart}`;
            }
            else{
                googleConstructedUrl += `+${numAndStreetNamePart}`;
            }
            console.log("num and street name part value is " + numAndStreetNamePart);

            
               
            
        });
    
       
        //leverage google api
        // const googleConstructedUrl = `${this.googleBaseUrl}${user.hAddress}+${user.hCity},+${user.hState}&key=${this.googleApiKey}`;
        

        // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBdRzOTbQmvOKTWPFeKHsam7URoNpxKtxc

        googleConstructedUrl += `,+${user.hCity},+${user.hState}&key=${this.googleApiKey}`;
        console.log("the google constructed url is: " + googleConstructedUrl);
<<<<<<< HEAD
        this.getGoogleMapsResponse(googleConstructedUrl).subscribe(result => {
            console.log(result);
            const anObject: object = result;
            console.log(`attempt at getting results 0 ${anObject.results}`);
            console.log(o)


          }, error =>
          console.log(error));
=======



        let googleGeoResult: any;

        this.getGoogleMapsResponse(googleConstructedUrl).subscribe(data => {
            console.log(data);


            try {//throws an error if we try to access data/compare data that isn't there
                
                if(data.results[0].partial_match == true){
                    throw Error("Only partial match");
                }
                //The api will always return a particular format for an address if it makes a best effort delivery; therefore, we can parse and compare to user input
                googleGeoResult = data.results[0].formatted_address;
                console.log(googleGeoResult);//prints formatted address
                let googleGeoArrv1 = googleGeoResult.split(',');//splits into address, city, state with zip, and country portions respectively
                console.log(googleGeoArrv1);
                let gStateandZip = googleGeoArrv1[2].split(' ');//array of state and zip
                let gStreetNameAndNumber = googleGeoArrv1[0].split(' ');
                //Breaking the formatted address into the strings required to compare to user input
                console.log(gStateandZip);
                let gCity = googleGeoArrv1[1].toString().trim();
                let gState = gStateandZip[1].toString();
                let gZip = gStateandZip[2].toString();
                let gStreetNumber = gStreetNameAndNumber[0].toString();
                console.log(`length of gStreetNameAndNumbwer is: ${gStreetNameAndNumber.length}`);
                let gStreetName = gStreetNameAndNumber.slice(1, gStreetNameAndNumber.length-1);//removes suffix, which every street has
                console.log(`length of gStreet name is: ${gStreetName.length}`);
                console.log("Length of gstreetName array is" + gStreetName.length);
                if(gStreetName.length > 1){//google api seperates multi-length street names with commas, we must remove them
                    //convert it to a string
                    gStreetName = gStreetName.toString();
                    gStreetName =  gStreetName.split(',').join(' ');

                }

                console.log(`gStreetNumber:${gStreetNumber}`);
                console.log(`gStreetNameWithoutSuffix:${gStreetName}`);
                console.log(`gCity:${gCity}`);
                console.log(`gState:${gState}`);
                console.log(`gZip:${gZip}`);
                console.log(`user.hAddress:${user.hAddress}`);
                console.log(`user.hCity:${user.hCity}`);
                console.log(`user.hState:${user.hState}`);
                console.log(`user.hZip:${user.hZip}`);
                let lastIndex = user.hAddress.lastIndexOf(" ");//ensures that the user added the suffix, if not will fail
                let tempUserHaddress = user.hAddress.substring(0, lastIndex);

                console.log(`tempUserHaddress: ${tempUserHaddress}`);
                //temporarily remove suffix from user supplied address
                if(tempUserHaddress.toUpperCase() === (gStreetNumber + ' ' + gStreetName).toUpperCase()){
                    console.log("Street name + number confirmed")
                }
                else{
                    console.log("Stree name and number DENIED")
                    console.log(`user num and name: ${tempUserHaddress} and google's: ${gStreetNumber + ' ' + gStreetName} don't match`);
                }
                if(user.hCity.toUpperCase() === gCity.toUpperCase()){
                    console.log("City confirmed");
                }
                if(user.hState.toUpperCase() === gState.toUpperCase()){
                    console.log("State confirmed");
                }
                if(user.hZip == gZip){
                    console.log("Zip confirmed");
                }

                //set all to uppercase before submitting for uniform data representation on database


               } catch (error) {//will catch anything from unresolved response to comparing undefined values which results in invalidation
                console.log(error);
                InvalidateLocation = true;
            }


          }, error =>
          InvalidateLocation = true);//the api always returns something, so the api connection itself had an issue


        
>>>>>>> e7bf5a683c87efbbac72881bc60649d063943f73

    }

    


    //if any part of the above invalidates the location, let the server know

    if (InvalidateLocation === true){
        user.hAddress = '';//allows front-end to render appropriate response
    }

    return this.http.post<User>(this.url, user, {headers: this.headers});
    }

	/**
	 * This function returns the fireIsLoggedIn variable
	 */

	getEmitter() {
		return this.fireIsLoggedIn;
	}

	/**
	 * A PUT method that updates the user information
	 * @param isDriver 
	 * @param userId 
	 */

	updateIsDriver(isDriver, userId) {

		this.getUserById(userId)
			.then((response) => {
				this.user = response;
				this.user.isDriver = isDriver;
				this.user.isAcceptingRides = (this.user.active && isDriver);

				this.http.put(this.url+userId, this.user).subscribe(
					(response) => {
						this.authService.user = response;
						this.log.info(JSON.stringify(response));
					},
					(error) => this.log.error(error)
				);
			})
			.catch(e => {
				this.log.error(e)
			})
	}

	/**
	 * A PUT method that updates the preference of the user
	 * @param property 
	 * @param bool 
	 * @param userId 
	 */

	updatePreference(property, bool, userId) {

		this.getUserById(userId)
			.then((response) => {
				this.user = response;
				this.user[property] = bool;
				if (property === 'active' && bool === false) {
					this.user.isAcceptingRides = false;
				}

				this.http.put(this.url+userId, this.user).subscribe(
					(response) => {
						this.authService.user = response;
					},
					(error) => console.warn(error)
				);
			})
			.catch(e => {
				this.log.error(e);
			})
	}

	/**
	 * A PUT method that updates user's information
	 * @param user 
	 */

	updateUserInfo(user: User) {
		//console.log(user);
		return this.http.put(this.url, user).toPromise();
	}
	/**
	 * A GET method that retrieves a driver by Id
	 * @param id 
	 */

	getDriverById(id: number): Observable <any> {
		return this.http.get(this.url + id);
	}
	
	/**
	 * A PUT method that changes the isAcceptingRide variable
	 * @param data 
	 */

	changeDriverIsAccepting(data) {
		let id=data.userId;
		return this.http.put(this.url+id, data).toPromise()
		
	  }
	  
	  getRidersForLocation(location: string): Observable <any> {
		return this.http.get(this.url + '?is-driver=false&location='+ location)
	  }
    /**
     * A GET method that shows all users
     */
		showAllUser(): Observable<any> {
		  return this.http.get(this.url);
		}

    /**
     * body to send update data
     */
      private body: string;

      private httpOptions = {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        observe: "response" as "body"
      }
  
    /**
     * A function that bans users.
     */
    banUser(user: User) {
      this.body = JSON.stringify(user);
      this.http.put(`${this.url + user.userId}`,this.body,this.httpOptions).subscribe();
	}
	
	getRidersForLocation1(location: string): Observable <any> {
		return this.http.get(this.url + 'driver/'+ location)
	}

/**
 * This function returns the contents of googlemaps api request for a location
 */
    // googleLocationValidation(address: string): boolean {
    //     let addressMatch = false;

    //     // attempt to find the address
    //     this.returnGoogleMapsResponse.subscribe(response => {
    //         console.log(response);
	// 		// parse the madness and compare
	// 		const foundAddress = "ok";
	// 		if(foundAddress = address) {
    //         }

    //         }, error =>
    //         console.log(error));


    //     return addressMatch;

    // }

    // grabs user-supplied home address and compares case-insensitively with google api response result
    private getGoogleMapsResponse(googleApiUrl: string): Observable<any> {
        // split string into number portion and street name portion at the space character
        return this.http.get<any>(`${googleApiUrl}`);
	}
}