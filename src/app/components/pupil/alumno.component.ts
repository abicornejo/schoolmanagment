import { Component, OnInit } from '@angular/core';
import {GlobalServices} from './../../services/global.services';
import {ConfirmationService, MessageService} from 'primeng/api';
import { LazyLoadEvent, SortEvent  } from 'primeng/api';
// @ts-ignore
import Any = jasmine.Any;
import {Alumno} from './../../models/Alumno';
import {last, min} from 'rxjs/operators';

@Component({
    selector: 'app-alumno',
    templateUrl: './alumno.component.html',
    styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

    urlMethod = 'alumno';

    registros : Alumno[];

    registroSeleccionado: Alumno;

    registro: Alumno = {};

    registroNuevo: boolean;

    loading: boolean = false;

    display: boolean = false;

    displayDialog: boolean;

    headerText : string = "Agregar nuevo Alumno";

    tituloCatalogo : string = "Catálogo de Alumnos";

    datasource: Alumno[];

    totalRegistros: number;

    paginaActual :number =1;

    parameters = {
        type: null,
        method: 'GET',
        urlMethod: `${this.urlMethod}`,
        callBack: null,
        params: {}
    }

    montOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    yearRange : Date[];

    es: any;
    minDate: Date;

    maxDate: Date;

    sexoList: any[];
    sexoSeleccionado: any;
    cols: any[];

    selectedColumns: any[];


    constructor(private  _service: GlobalServices,
                private confirmationService: ConfirmationService,
                private messageService: MessageService
    ) {

    }

    ngOnInit() {
        this.urlMethod = 'alumno';
        this.sexoList = [
            {name: 'Masculino', avatar: 'boy.png'},
            {name: 'Femenino', avatar: 'girl.png'}
        ];

        this.cols = [
            { field: 'curp', header: 'CURP' },
            { field: 'segurosocial', header: 'Seguro Social' },
            { field: 'beca', header: 'Beca' }
        ];

        this.selectedColumns = this.cols;

        this.loading = false;
        this.parameters = {
            type: null,
            method: 'GET',
            urlMethod: `${this.urlMethod}`,
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
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
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


        this.getSalones(this.parameters);
        this.getToken();
    }

    // generoImage(){
    //     return '<span><image  [ttSelectableRowDblClick]="" /></span>';
    // }

    showDialogToAdd() {
        this.headerText = 'Agregar nuevo Alumno';
        this.registroNuevo = true;
        this.registroSeleccionado = null;
        this.registro = {};
        this.displayDialog = true;
    }
    dateCurrentFormat(value){
        let today = new Date(value);
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
    save() {
        if(this.sexoSeleccionado.name) {
            this.registro.sexo = this.sexoSeleccionado.name;
        }
        this.registro.fechaNacimiento = this.dateCurrentFormat(this.registro.fechaNacimiento);
        this.parameters = {
            type: null,
            method: this.registro.id ? 'PUT':'POST',
            urlMethod: this.urlMethod + (this.registro.id ? `/${this.registro.id}`:''),
            params: this.registro,
            callBack :null
        };
        this._service.fetchApiRest(this.parameters).then(response => {
            // @ts-ignore
            if (response && response.success && response.success === 'OK') {
                let params = {
                    mensaje : 'Datos guardados correctamente'
                };
                //this.registro = null;
                this.displayDialog = false;
                let options = {severity: 'success', sticky: true, summary: 'Exito', detail:'Datos guardados correctamente'};
                this.messageService.add(options);
                this.muestraMensajeYCargaInfo(params);
            }
            this.loading = false;
        }).catch(error => {
            console.log(error);
            this.loading = false;
        });
    }
    forMatCustomDate(fecha) {
        if(fecha) {
            let hora = fecha.split(' ')[1];
            fecha = fecha.split(' ')[0];

            let dd = fecha.split('-')[2];
            let mm = this.montOfYear[parseInt(fecha.split('-')[1]) - 1];
            let yyyy = fecha.split('-')[0];

            if (parseInt(dd) < 10) {
                dd = '0' + dd;
            }

            return dd + '-' + mm + '-' + yyyy;
        }
        return "";
    }
    muestraMensajeYCargaInfo(datos){
        this.parameters = {
            type: null,
            method: 'GET',
            urlMethod: `${this.urlMethod}`,
            params: {
                skip: 0,
                take: 10,
                search: ''
            },
            callBack :() => {
                // this.registro = null;
                // this.displayDialog = false;
                // let options = {severity: 'success', sticky: true, summary: 'Exito', detail:datos.mensaje};
                // this.messageService.add(options);
            }
        };
        this.getSalones(this.parameters);
    }
    getToken(){
        this.parameters = {
            type :'test',
            method: 'POST',
            urlMethod: `https://birza20210518212942.azurewebsites.net/api/Token`,
            params: {	"Email": "admin@gmail.com", "Password": "admin"	},
            callBack :null
        };
debugger;
        this._service.fetchApiRest(this.parameters).then(
            data => {
                debugger;
            }
        );
    }

    deleteRowSelected(registroActual: Alumno) {
        this.confirmationService.confirm({
            message: `Estas seguro  que deseas eliminar ${registroActual.nombre}?`,
            accept: () => {
                this.parameters = {
                    type: null,
                    method: 'DELETE',
                    urlMethod: `${this.urlMethod}/${registroActual.id}`,
                    params: {},
                    callBack :null
                };

                this._service.fetchApiRest(this.parameters).then(
                    data => {
                        let params = {
                            mensaje : 'Registro eliminado correctamente'
                        };
                        // @ts-ignore
                        if (data && data.success && data.success === 'OK') {
                            this.muestraMensajeYCargaInfo(params);
                        }
                        // @ts-ignore
                        else  if (data.success === 'ERROR') {

                        }
                    }
                );
            }
        });
    }

    delete() {
        let index = this.registros.indexOf(this.registroSeleccionado);
        this.registros = this.registros.filter((val, i) => i != index);
        this.registro = null;
        this.registroSeleccionado = null;
        this.displayDialog = false;
    }

    onRowSelect(registroActual: Alumno) {
        this.headerText = 'Actualizar Profesor';
        this.registroNuevo = false;
        this.registro = registroActual;
       // this.sexoSeleccionado.name = registroActual.sexo;
        this.registroSeleccionado = registroActual;
        this.displayDialog = true;
    }

    consumeApi(event: LazyLoadEvent){
        this.parameters = {
            type: null,
            method: 'GET',
            urlMethod: `${this.urlMethod}`,
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
        this._service.fetchApiRest(parameters).then(records => {
            // @ts-ignore
            this.datasource = records.data;
            // @ts-ignore
            this.totalRegistros = records.total;

            this.registros = this.datasource;

            if(this.parameters.callBack){
                this.parameters.callBack();
            }
        }).catch((error: any) => {

        });
    }

    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }
}
