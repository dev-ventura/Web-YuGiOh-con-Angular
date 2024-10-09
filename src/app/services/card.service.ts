import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
  constructor(private http: HttpClient) { }

  // metodo para devolver la card con scroll infinito
  getCards (name: string | null, offset = 0){
    // definiendo parametros para mostrar cartas de 100 en 100
    const params: any = {
      num: 100,
      offset,
    };
    // fname es un atributo del nombre de la card en la API
    if(name) params.fname = name;
    // retornando las cartas 
    return this.http
      .get<Card[]>(this.API_URL, { params })
      .pipe(map( (res: any) => res.data)
    );
  }
  // funcion para recibir una carta
  getCard(id: string){
    const params  = { id };
    return this.http.get(this.API_URL, {params}).pipe(
      map( (res:any) => res.data[0])
    );
  }
}
