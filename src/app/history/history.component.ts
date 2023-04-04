import { Component } from '@angular/core';
import { Sorteo } from '../models/sorteo';
import { SorteoService } from '../Service/sorteo.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  sorteos: Sorteo[] = [];
  flag=true;

  constructor(
    private sorteoService: SorteoService
  ){ }

  ngOnInit(){
    this.loadSorteo();
  }

  loadSorteo(){
    this.sorteoService.getSorteos().subscribe(
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
