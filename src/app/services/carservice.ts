import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from './../models/Car';

@Injectable()
export class CarService {

    constructor(private http: HttpClient) { }

    getCarsSmall() {

        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);

        return this.http.get<any>('https://www.primefaces.org/primeng/assets/showcase/data/cars-small.json', {headers: httpOptions})
            .toPromise()
            .then(res => <Car[]>res.data)
            .then(data => { return data; });
    }

    // getCarsMedium() {
    //     return this.http.get<any>('https://www.primefaces.org/primeng/assets/showcase/data/cars-medium.json')
    //         .toPromise()
    //         .then(res => <Car[]>res.data)
    //         .then(data => { return data; });
    // }
    //
    // getCarsLarge() {
    //     return this.http.get<any>('https://www.primefaces.org/primeng/assets/showcase/data/cars-large.json')
    //         .toPromise()
    //         .then(res => <Car[]>res.data)
    //         .then(data => { return data; });
    // }
    //
    // getCarsHuge() {
    //     return this.http.get<any>('https://www.primefaces.org/primeng/assets/showcase/data/cars-huge.json')
    //         .toPromise()
    //         .then(res => <Car[]>res.data)
    //         .then(data => { return data; });
    // }
}
