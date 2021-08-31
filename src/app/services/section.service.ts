import { Injectable } from '@angular/core';

import { HttpClient,HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Policy } from './../policy';
import { Section } from './../models/Section';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService{

  PHP_API_SERVER = 'http://www.itcodesolutions.com/schoolservices';
  public products  = [];
  constructor(private httpClient: HttpClient, private authService: AuthService) {

  }
  addSection(section: Section) {
    const token = this.authService.getToken();
    const header = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*'
    };

    const httpOptions = new HttpHeaders(header);
    const body = JSON.stringify({ name: section.name, description: section.name});
    return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/sections?token=${token}`, body, {headers: httpOptions})
        .toPromise()
        .then(res => <any[]>res);
  }

  updateSection(section: Section) {
    const header = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Origin': '*'
    };
    const httpOptions = new HttpHeaders(header);
    //const body = JSON.stringify({name: newProduct, description: 'default'});
    // @ts-ignore
    // @ts-ignore
    return this.httpClient.put(`${this.PHP_API_SERVER}/api/v1/auth/sections/${section.id}`, section, {headers: httpOptions})
        .toPromise()
        .then(res => <any[]>res);
  }



  getSectionsByPage( skip: number, take: number, search: string ) {
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
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/v1/auth/SeccionesByPage`, {headers: httpOptions, params : myObject})
        .toPromise()
        .then(res => <any[]>res)
        //.then(data => { return data; });
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
        .then(res => <Section[]>res.data)
        .then(data => { return data; });
  }

  getSections(): Observable<any[]>  {
    const header = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    };
    const httpOptions = new HttpHeaders(header);
    return this.httpClient.get<Section[]>(`${this.PHP_API_SERVER}/api/v1/auth/sections`, {headers: httpOptions})
        .pipe(map(
            response => {
              // @ts-ignore
              return response;
            }
            )
        );
  }

  // updateSection(id: number, newProduct: string) {
  //   const header = {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //     'Access-Control-Allow-Methods': 'PUT',
  //     'Access-Control-Allow-Origin': '*'
  //   };
  //   const httpOptions = new HttpHeaders(header);
  //   const body = JSON.stringify({name: newProduct, description: 'default'});
  //   // @ts-ignore
  //   // @ts-ignore
  //   return this.httpClient.put(`${this.PHP_API_SERVER}/api/v1/auth/sections/${id}`, body, {headers: httpOptions})
  //       .pipe(
  //           map(
  //               (response) =>
  //                   // @ts-ignore
  //                   response.data)
  //       )
  //       ;
  // }
  deleteSection(id: number) {
    return this.httpClient.delete(`${this.PHP_API_SERVER}/api/v1/auth/sections/${id}`);
  }
}
