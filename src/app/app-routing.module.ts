import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SorteoComponent } from './sorteo/sorteo.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'sorteo/:id', component: SorteoComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}

  // {path: '', redirectTo: '/portafolio', pathMatch:'full'},
  // { path: '**', component: PortafolioComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
