import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Faena} from './../models/Faena';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalServices{

    PHP_API_SERVER = 'http://www.itcodesolutions.com/schoolservices';
    public products  = [];
    constructor(private httpClient: HttpClient, private authService: AuthService) {

    }

    async fetchApiRest2( parameters : any ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': parameters.method,
            'Access-Control-Allow-Origin': '*'
        };
        const token = this.authService.getToken();
        const httpOptions = new HttpHeaders(header);

        if(parameters.method === 'GET'){

            return await this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}`, {headers: httpOptions, params : parameters.params})
                .toPromise();
        } else if(parameters.method === 'POST'){
            const body = JSON.stringify(parameters.params);
            return await this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}?token=${token}`, body, {headers: httpOptions})
                .toPromise();
        }
        else if(parameters.method === 'PUT'){
            const body = JSON.stringify(parameters.params);
            return await this.httpClient.put(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}?token=${token}`, body, {headers: httpOptions})
                .toPromise();
        }else if(parameters.method === 'DELETE'){
            return await this.httpClient.delete(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}`).toPromise();
        }

    }

    fetchApiRest( parameters : any ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': parameters.method,
            'Access-Control-Allow-Origin': '*'
        };
        const token = this.authService.getToken();
        const httpOptions = new HttpHeaders(header);

        if(parameters.method === 'GET'){

            return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}`, {headers: httpOptions, params : parameters.params})
                .toPromise()
                .then(res => <any[]>res);
        } else if(parameters.method === 'POST'){debugger;
            const body = JSON.stringify(parameters.params);

            if(parameters.type){
                return this.httpClient.post(`${parameters.urlMethod}`, body, {headers: httpOptions})
                    .toPromise()
                    .then(res => <any[]>res);
            }
            return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}?token=${token}`, body, {headers: httpOptions})
                .toPromise()
                .then(res => <any[]>res);
        }
        else if(parameters.method === 'PUT'){
            const body = JSON.stringify(parameters.params);
            return this.httpClient.put(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}?token=${token}`, body, {headers: httpOptions})
                .toPromise()
                .then(res => <any[]>res);
        }else if(parameters.method === 'DELETE'){
            return this.httpClient.delete(`${this.PHP_API_SERVER}/api/v1/auth/${parameters.urlMethod}`).toPromise().then(res => <any[]>res);
        }

    }
}
