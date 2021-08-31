import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
//import {GrowlModule} from 'primeng/growl';
import {CardModule} from 'primeng/card';
import  {ScrollingModule}  from  '@angular/cdk/scrolling';
import  {MessagesModule} from 'primeng/messages';
import  {TabViewModule} from 'primeng/tabview';
import  {CodeHighlighterModule} from 'primeng/codehighlighter';
//import { DataGridModule} from 'primeng/dataview'
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import  {MultiSelectModule} from 'primeng/multiselect';
import  {DataViewModule} from 'primeng/dataview';
import {SidebarModule} from 'primeng/sidebar';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { CursoComponent } from './components/curso/curso.component';
import { AlumnoComponent } from './components/pupil/alumno.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import { ConfirmationService, MessageService} from 'primeng/api';


import {GlobalServices} from './services/global.services';
import {AuthService} from './services/auth.service';
import {SectionService} from './services/section.service';
import {CarService} from './services/carservice';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FooterComponent,
    MenuComponent,
    HeaderComponent,
    CursoComponent,
    AlumnoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    ConfirmDialogModule,
    TabViewModule,
    CodeHighlighterModule,
    PanelMenuModule,
    MenubarModule,
    InputTextModule,
    SplitButtonModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    DataViewModule,
    ScrollingModule,
    SidebarModule,
    CalendarModule,
    CardModule,
    SelectButtonModule
    // AngularFontAwesomeModule
  ],
  providers: [ConfirmationService, MessageService,GlobalServices,AuthService,SectionService,CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
