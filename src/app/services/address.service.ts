import { Injectable } from '@angular/core';

import { HttpClient,HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Policy } from './../policy';
import {Address} from './../models/Address';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {AuthService} from './../auth.service';
import {Section} from '../models/Section';


@Injectable({
    providedIn: 'root'
})
export class AddressService{

    PHP_API_SERVER = 'http://www.itcodesolutions.com/schoolservices';
    public products  = [];
    constructor(private httpClient: HttpClient, private authService: AuthService) {

    }

    getAllSections( ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);

        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/sections`, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }
    getAllAddress   ( ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);
        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/address`, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    saveAddress(address: Address) {
        const token = this.authService.getToken();
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': address.id ? 'PUT' : 'POST',
            'Access-Control-Allow-Origin': '*'
        };

        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify(address);
        return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/address?token=${token}`, body, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    addAddress(address: Address) {
        const token = this.authService.getToken();
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Origin': '*'
        };

        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify(address);
        return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/saveAddress?token=${token}`, body, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    updateAddress(section: Address) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'PUT',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify(section);
        // @ts-ignore
        // @ts-ignore
        return this.httpClient.put(`${this.PHP_API_SERVER}/api/v1/auth/saveAddress/${section.id}`, body, {headers: httpOptions})
            .toPromise()
            .then(res => <any[]>res);
    }

    getAddressByPage( skip: number, take: number, search: string ) {
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
        return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/AddressesByPage`, {headers: httpOptions, params : myObject})
            .toPromise()
            .then(res => <any[]>res)
        //.then(data => { return data; });
    }

    deleteAddress(id: number) {
        return this.httpClient.delete(`${this.PHP_API_SERVER}/api/v1/auth/address/${id}`);
    }
}
