import { Component, OnInit } from '@angular/core';
import {GlobalServices} from './../../services/global.services';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LazyLoadEvent} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
//import {} from 'primeng/api';
// @ts-ignore
import Any = jasmine.Any;
import {Curso} from './../../models/Curso';

@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html'
})
export class CursoComponent implements OnInit {

    cursos : Curso[];

    cursoSeleccionado: Curso;

    curso: Curso = {};

    cursoNuevo: boolean;

    loading: boolean = false;

    display: boolean = false;

    displayModalCurso: boolean;

    headerText : string = "Agregar nuevo curso";

    tituloCatalogo : string = "Catálogo de Cursos";

    datasource: Curso[];

    totalRegistros: number;

    paginaActual :number =1;

    parameters = {
        method: 'GET',
        urlMethod: 'curso',
        callBack: null,
        params: {}
    }
    yearRange : Date[];

    es: any;
    minDate: Date;

    maxDate: Date;

    constructor(private  _service: GlobalServices,
                private confirmationService: ConfirmationService,
                private messageService: MessageService
    ) {

    }

    ngOnInit() {
        this.loading = false;
        this.parameters = {
            method: 'GET',
            urlMethod: 'curso',
            params: {
                skip: 0,
                take: 10,
                search: ''
            },
            callBack :null
        };

        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic" ],
            today: 'Hoy',
            clear: 'Borrar',
            dateFormat: 'yy-mm-dd',
        };
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();

        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        this.yearRange =[today, today];


        //this.getSalones(this.parameters);
    }

    showDialogToAdd() {
        this.headerText = 'Agregar nuevo curso';
        this.cursoNuevo = true;
        this.cursoSeleccionado = null;
        this.curso = {};
        this.displayModalCurso = true;
    }
    dateCurrentFormat(value){
        let today = new Date(value);
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        let day = dd < 10 ? '0' + dd.toString(): dd.toString();

        return day + ' ' + this.es.monthNamesShort[mm] + ', ' + yyyy;
    }
    fixDateToService(fecha) {
        let today = new Date(fecha);
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        let day ='', month ='';

        day = dd < 10 ? '0' + dd.toString(): dd.toString();

        if (mm < 10) {
            month = '0' + mm;
        }

        return yyyy + '/' + month + '/' + day;
    }
    hideModal(){
        this.cursoSeleccionado = null;
        this.displayModalCurso = false;
    }
    save() {
debugger;
        this.curso.fechaInicio = this.fixDateToService(this.curso.fechaInicio);

        this.curso.fechaFin = this.fixDateToService(this.curso.fechaFin);
        this.parameters = {
            method: this.curso.id ? 'PUT':'POST',
            urlMethod: 'curso' + (this.curso.id ? `/${this.curso.id}`:''),
            params: this.curso,
            callBack :null
        };
debugger;
        this._service.fetchApiRest(this.parameters).then(response => {
            // @ts-ignore
            if (response && response.success && response.success === 'OK') {
                let options = {severity: 'success', summary: 'Exito', detail: 'Datos guardados correctamente'};
                this.messageService.add(options);
                this.hideModal();
                let params = {
                    mensaje : 'Datos guardados correctamente',
                    method: 'GET',
                    urlMethod: 'curso',
                    params: {
                        skip: 0,
                        take: 10,
                        search: ''
                    },
                    callBack: () => {


                    }
                };

                this.muestraMensajeYCargaInfo(params);
            }
            this.loading = false;
        }).catch(error => {
            console.log(error);
            this.loading = false;
        });
    }

    muestraMensajeYCargaInfo(datos){
        this.getSalones(datos);
    }

    deleteRowSelected(curso: Curso) {
        this.confirmationService.confirm({
            message: `Estas seguro  que deseas eliminar ${curso.nombre}?`,
            accept: () => {
                this.parameters = {
                    method: 'DELETE',
                    urlMethod: `curso/${curso.id}`,
                    params: {},
                    callBack :null
                };

                this._service.fetchApiRest(this.parameters).then(
                    data => {

                        // @ts-ignore
                        if (data && data.success && data.success === 'OK') {

                            let options = {severity: 'success', summary: 'Exito', detail: 'Registro eliminado correctamente'};
                            this.messageService.add(options);
                            let params = {
                                mensaje : 'Datos guardados correctamente',
                                method: 'GET',
                                urlMethod: 'curso',
                                params: {
                                    skip: 0,
                                    take: 10,
                                    search: ''
                                },
                                callBack: ()=>{
                                }
                            };
                            this.muestraMensajeYCargaInfo(params);
                        }
                        // @ts-ignore
                        else  if (data.success === 'ERROR') {
                            // @ts-ignore
                            let options = {severity: 'error', summary: 'Error', detail: data.msg};
                            this.messageService.add(options);
                        }
                    }
                );
            }
        });
    }

    delete() {
        let index = this.cursos.indexOf(this.cursoSeleccionado);
        this.cursos = this.cursos.filter((val, i) => i != index);
        this.curso = null;
        this.cursoSeleccionado = null;
        this.displayModalCurso = false;
    }

    onRowSelect(curso: Curso) {
        this.headerText = 'Actualizar Curso';
        this.cursoNuevo = false;
        this.curso = curso;
        this.cursoSeleccionado = curso;
        this.displayModalCurso = true;
    }

    consumeApi(event: LazyLoadEvent){
        this.parameters = {
            method: 'GET',
            urlMethod: 'curso',
            callBack: null,
            params: {
                skip: event.first,
                take: event.rows,
                search: event.globalFilter
            }
        };
        this.getSalones(this.parameters);
    }

    getSalones(parameters){
        if(this.parameters.callBack){
            this.parameters.callBack();
        }
        this._service.fetchApiRest(parameters).then(records => {

            //this.parameters.callBack();

            // @ts-ignore
            this.datasource = records.data;
            // @ts-ignore
            this.totalRegistros = records.total;

            this.cursos = this.datasource;

        }).catch((error: any) => {

        });
    }

    // customSort(event: SortEvent) {
    //     event.data.sort((data1, data2) => {
    //         let value1 = data1[event.field];
    //         let value2 = data2[event.field];
    //         let result = null;
    //
    //         if (value1 == null && value2 != null)
    //             result = -1;
    //         else if (value1 != null && value2 == null)
    //             result = 1;
    //         else if (value1 == null && value2 == null)
    //             result = 0;
    //         else if (typeof value1 === 'string' && typeof value2 === 'string')
    //             result = value1.localeCompare(value2);
    //         else
    //             result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
    //
    //         return (event.order * result);
    //     });
    // }
}
