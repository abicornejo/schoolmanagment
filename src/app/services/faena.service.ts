import { Injectable } from '@angular/core';

import { HttpClient,HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Policy } from './../policy';
import {Faena} from './../models/Faena';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {AuthService} from './../auth.service';



@Injectable({
    providedIn: 'root'
})
export class FaenaService{

    PHP_API_SERVER = 'http://www.itcodesolutions.com/schoolservices';
    public products  = [];
    constructor(private httpClient: HttpClient, private authService: AuthService) {

    }

    listFaenas( ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);

        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/faena`, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }
    listFaenasPersonas( ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);

        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/faenapersona`, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }
    saveFaena(faena: Faena) {
        const token = this.authService.getToken();
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': faena.id ? 'PUT' : 'POST',
            'Access-Control-Allow-Origin': '*'
        };

        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify(faena);
        return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/saveFaena?token=${token}`, body, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    savePersonToFaena(faena: any) {
        const token = this.authService.getToken();
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods':  'POST',
            'Access-Control-Allow-Origin': '*'
        };

        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify(faena);
        return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/faenapersona?token=${token}`, body, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    getFaenasByPerson( parameters : any ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': parameters.method,
            'Access-Control-Allow-Origin': '*'
        };

        const httpOptions = new HttpHeaders(header);
        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}`, {headers: httpOptions, params : parameters.params})
            .toPromise()
            .then(res => <any[]>res)
    }

    getFaenaByPage( skip: number, take: number, search: string ) {
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
        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/FaenaByPage`, {headers: httpOptions, params : myObject})
            .toPromise()
            .then(res => <any[]>res)
        //.then(data => { return data; });
    }

    getFaenaPersonaByPage( skip: number, take: number, search: string ) {
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
        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/FaenaPersonaByPage`, {headers: httpOptions, params : myObject})
            .toPromise()
            .then(res => <any[]>res)
        //.then(data => { return data; });
    }

    deleteFaena(id: number) {
        return this.httpClient.delete(`${this.PHP_API_SERVER}/api/v1/auth/faena/${id}`);
    }
}
