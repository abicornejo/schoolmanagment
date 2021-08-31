import { Injectable } from '@angular/core';

import { HttpClient,HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Policy } from './../policy';
import {Address} from './../models/Address';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {AuthService} from './../auth.service';
import {Section} from '../models/Section';
import {People} from '../models/People';


@Injectable({
    providedIn: 'root'
})
export class PeopleService{

    PHP_API_SERVER = 'http://www.itcodesolutions.com/schoolservices';
    public products  = [];
    constructor(private httpClient: HttpClient, private authService: AuthService) {

    }

    getAllPeople( ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);

        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/people`, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    savePeople(people: People) {
        const token = this.authService.getToken();
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': people.id ? 'PUT' : 'POST',
            'Access-Control-Allow-Origin': '*'
        };

        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify(people);
        return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/people?token=${token}`, body, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    people(address: Address) {
        const token = this.authService.getToken();
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Origin': '*'
        };

        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify(address);
        return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/savePeople?token=${token}`, body, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    updatePeople(people: People) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'PUT',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify(people);
        // @ts-ignore
        // @ts-ignore
        return this.httpClient.put(`${this.PHP_API_SERVER}/api/v1/auth/savePeople/${people.id}`, body, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    getPeopleByPage( skip: number, take: number, search: string ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };

        let myParams = new URLSearchParams();
        myParams.append('id', '1');

        const httpOptions = new HttpHeaders(header);

        const myObject: any = { search : search, skip: skip, take: take};
        //const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
        //const options = { params: new HttpParams(httpParams), headers: httpOptions };
        //let options = new RequestOptions({ headers: myHeaders, params: myParams });
        const body = JSON.stringify({name: '', description: 'default'});
        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/PeopleByPage`, {headers: httpOptions, params : myObject})
            .toPromise()
            .then(res => <any[]>res)
        //.then(data => { return data; });
    }
    getPeopleByFaenaId( skip: number, take: number, search: string , faenaId: number) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };

        let myParams = new URLSearchParams();
        myParams.append('id', '1');

        const httpOptions = new HttpHeaders(header);

        const myObject: any = { search : search, skip: skip, take: take, faenaId: faenaId};
        //const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
        //const options = { params: new HttpParams(httpParams), headers: httpOptions };
        //let options = new RequestOptions({ headers: myHeaders, params: myParams });
        const body = JSON.stringify({name: '', description: 'default'});
        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/PeopleByFaenaId`, {headers: httpOptions, params : myObject})
            .toPromise()
            .then(res => <any[]>res)
        //.then(data => { return data; });
    }

    getPeopleNotInFaenaByFaenaId( skip: number, take: number, search: string , faenaId: number) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };

        let myParams = new URLSearchParams();
        myParams.append('id', '1');

        const httpOptions = new HttpHeaders(header);

        const myObject: any = { search : search, skip: skip, take: take, faenaId: faenaId};
        //const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
        //const options = { params: new HttpParams(httpParams), headers: httpOptions };
        //let options = new RequestOptions({ headers: myHeaders, params: myParams });
        const body = JSON.stringify({name: '', description: 'default'});
        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/ListPeopleNotInByFaenaId`, {headers: httpOptions, params : myObject})
            .toPromise()
            .then(res => <any[]>res)
        //.then(data => { return data; });
    }

    deletePeople(id: number) {
        return this.httpClient.delete(`${this.PHP_API_SERVER}/api/v1/auth/people/${id}`);
    }
}
