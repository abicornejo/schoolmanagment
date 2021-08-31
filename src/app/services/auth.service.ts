import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map,  catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthService{
    PHP_API_SERVER = 'http://school.itcodesolutions.com';
    constructor(private httpClient: HttpClient) {

    }

    signup(username: string, email: string, password: string){
        const header = {
            'X-Requested-With':'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify({ name: username, email: email, password: password, password_confirmation: password});
        return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/register`, body, {headers: httpOptions});
    }

    signin(email: string, password: string){
        const header = {
            'X-Requested-With':'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Origin': '*'
        };
        const httpOptions = new HttpHeaders(header);
        const body = JSON.stringify({  email: email, password: password});
        return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/login`, body, {headers: httpOptions})
            .pipe(
                map(
                    (response) =>  {

                            // @ts-ignore
                        const token = response.data.token;
                            const base64Url = token.split('.')[1];
                            const base64 = base64Url.replace('-','+').replace('_','/');
                            return {token: token, decoded : JSON.parse(window.atob(base64))};
                    }),
                tap(
                    tokenData => {
                        localStorage.setItem('token', tokenData.token);
                    }
                )
            );

    }
    getToken() {
        return localStorage.getItem('token');
    }
}
