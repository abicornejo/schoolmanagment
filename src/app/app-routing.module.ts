import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './components/curso/curso.component';
import { AlumnoComponent } from './components/pupil/alumno.component';

const routes: Routes = [
  { path: '', component: CursoComponent},
  { path: 'course', component: CursoComponent},
  { path: 'pupil', component: AlumnoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
