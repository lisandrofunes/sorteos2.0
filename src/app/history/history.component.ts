import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Sorteo } from '../models/sorteo';
import { TokenDto } from '../models/token';
import { HistoryService } from '../Service/history.service';
import { SorteoService } from '../Service/sorteo.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  sorteos: Sorteo[] = [];
  flag=true;
  email: string;
  tokenGoogle: TokenDto
  
  public userDetails: any;

  constructor(
    private sorteoService: SorteoService,
    private historyService: HistoryService,
    private router: Router,
    private tokenService: TokenService
     
  ){ }

  ngOnInit(){
    this.loadSorteo();
  }

  loadSorteo(){
    this.email = this.tokenService.getEmail();
    console.log("tokenUser: " + this.email);

    this.historyService.getSorteos(this.email).subscribe(
      res=>{this.sorteos=res},
      err=>console.log(err)
    )
  }


  personalizar(){
    if(this.flag){

      const sorteos = document.querySelectorAll('.accordion-button');

      for (let i = 0; i < sorteos.length; i++) {

        var partOfSorteo = document.querySelectorAll('.participante'+i);
        
        for (let j = 0; j < partOfSorteo.length; j++) {
          partOfSorteo[j].innerHTML = j+1 + '° '+ partOfSorteo[j].innerHTML;
        }
      }
    }
    this.flag=false;
  }

  eliminar(id: number){
    this.sorteoService.eliminar(id).subscribe(
      res=>{this.loadSorteo(), console.log("Eliminado Correctamente")},
      err=>{console.log("Error al Eliminar")}
    );
  }

}
