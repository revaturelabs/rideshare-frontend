import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { LogService } from '../log.service'
import { environment } from '../../../environments/environment';



@Injectable({
  	providedIn: 'root'
})
//ok



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
		
		// console.log(this.url)
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

	// adds user if form is filled out and user input matches a real address
	addUser(user :User) :Observable<User> {
        console.log(`User location info log(location modifying to '' on failure) happens first: ${user.hAddress}, ${user.hCity}, ${user.hState}, ${user.hZip}`)
        return this.http.post<User>(this.url, user, {headers: this.headers});
    }

    addressValidation(user:User): Subject<any> {
        const numAndStreetName = user.hAddress.split(' '); // ensures user placed a space between the street number and street name
        const sub = new Subject();
        if ( isNaN(Number(numAndStreetName[0]))){
            console.log('first part of haddress is not a number!')
            this.setInvalidAddress(user);
            sub.next(user.hAddress);
            return sub;
        } else{
            console.log('Number of parts in haddress is: ' + numAndStreetName.length);
            // construct url with needed number of +'s based on length of numAndStreetName...
            let googleConstructedUrl = `${this.googleBaseUrl}`;
            numAndStreetName.forEach(numAndStreetNamePart => {
                // for each element concatenate + and the element itself to original googleConstructedUrl
                if (numAndStreetNamePart === numAndStreetName[0]){
                    googleConstructedUrl += `${numAndStreetNamePart}`;
                } else{
                    googleConstructedUrl += `+${numAndStreetNamePart}`;
                }
            });
            googleConstructedUrl += `,+${user.hCity},+${user.hState}&key=${this.googleApiKey}`;
            console.log('the google constructed url is: ' + googleConstructedUrl);
            let googleGeoResult: any;
            this.getGoogleMapsResponse(googleConstructedUrl).subscribe(data => {
                console.log(data);
                try {// throws an error if we try to access data/compare data that isn't there
                    if(data.results[0].partial_match == true){
                        throw Error('Only partial match');
                    }
                    // The api will always return a particular format for an 
                    // address if it makes a best effort delivery; therefore, we can parse and compare to user input
                    googleGeoResult = data.results[0].formatted_address;
                    console.log(googleGeoResult);// prints formatted address
                    // splits into address, city, state with zip, and country portions respectively
                    let googleGeoArrv1 = googleGeoResult.split(',');
                    console.log(googleGeoArrv1);
                    let gStateandZip = googleGeoArrv1[2].split(' ');// array of state and zip
                    let gStreetNameAndNumber = googleGeoArrv1[0].split(' ');
                    // Breaking the formatted address into the strings required to compare to user input
                    let gCity = googleGeoArrv1[1].toString().trim();
                    let gState = gStateandZip[1].toString();
                    let gZip = gStateandZip[2].toString();
                    let gStreetNumber = gStreetNameAndNumber[0].toString();
                    let gStreetName = gStreetNameAndNumber.slice(1, gStreetNameAndNumber.length-1);// removes suffix, which every street has
                    if(gStreetName.length > 1){// google api seperates multi-length street names with commas, we must remove them
                        // convert it to a string
                        gStreetName = gStreetName.toString();
                        gStreetName =  gStreetName.split(',').join(' ');

                    }
                    let gFormattedStrtNameAndNum = gStreetNumber + ' ' + gStreetName;
                    console.log(`gFormattedStrtNameAndNum:${gFormattedStrtNameAndNum}`);
                    console.log(`gCity:${gCity}`);
                    console.log(`gState:${gState}`);
                    console.log(`gZip:${gZip}`);
                    console.log(`user.hAddress:${user.hAddress}`);
                    console.log(`user.hCity:${user.hCity}`);
                    console.log(`user.hState:${user.hState}`);
                    console.log(`user.hZip:${user.hZip}`);
                    let lastIndex = user.hAddress.lastIndexOf(' ');// ensures that the user added the suffix, if not will fail
                    let tempUserHaddress = user.hAddress.substring(0, lastIndex);
                    console.log(`tempUserHaddress: ${tempUserHaddress}`);
                    // temporarily remove suffix from user supplied address and confirm all parts of address with response from google
                    if((tempUserHaddress.toUpperCase() === gFormattedStrtNameAndNum.toUpperCase())
                        && (user.hCity.toUpperCase() === gCity.toUpperCase())
                        && (user.hState.toUpperCase() === gState.toUpperCase())
                        && (user.hZip == gZip)){
                        console.log('User input confirmed with a google location');
                        // add suffix back in for accurate address stored in db, as well as capitalizing every8thing
                        user.hAddress = gStreetNameAndNumber.join(' ').toUpperCase();
                        user.hCity = gCity.toUpperCase();
                        user.hState = gState.toUpperCase();
                        sub.next(user.hAddress);
                        return sub;
                    }
                    else{// Another invalid pathway in the case a user's input doens't match the google best-effort response
                        console.log('else condition regarding failed comparisons to google output trigger')
                        this.setInvalidAddress(user);
                        sub.next(user.hAddress);
                        return sub;

                    }
                } catch (error) {// Another invalid pathway in the case that google api is not set up properly
                    console.log(error);
                    console.log("error caught when trying to send api google request")
                    sub.next(user.hAddress);
                    return sub;
                }
            }, error =>{
            console.log(error);
            sub.next(user.hAddress);
            return sub;
            });

        }
        //return truthy/falsey
        // let sub = new Subject();
        // sub.next(user.hAddress);
        // return sub;

        }

        
        googleApiResult() {
            throw new Error("Method not implemented.");
        }
	/**
	 * This function sets the location to empty string for back-end invalidation response
	 */
    private setInvalidAddress(user: User) {
        console.log('invalidated...');
        user.hAddress = '';
        user.hState = '';
        user.hCity = '';
        user.hZip = null;

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
		// console.log(user);
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
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response' as 'body'
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
    //TODO change this function, or remove it and find approach to address validation before post that leverages google api asynch call first
    private getGoogleMapsResponse(googleApiUrl: string): Observable<any> {
        // split string into number portion and street name portion at the space character
        return this.http.get<any>(`${googleApiUrl}`);
	}
}
