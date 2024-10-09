import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cards: Card[] = [];
  offset = 0;
  cardTextFC = new FormControl('');

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    // tomar la respuesta y obtenerla en la caja de texto
    this.cardTextFC.valueChanges
    .pipe(
      // tomando los datos de la caja de texto a partir del primer segundo
      debounceTime(1000)
    )
    .subscribe(res => {
      //console.log(res);
      this.cards = [];
      // buscando la carta 
      this.searchCards(res);
    })
    //llamado de las cards desde la funcion searchCards
    this.searchCards();
  }

  onScroll(){
    //console.log('scrolled!');
    this.offset += 100;
    this.searchCards();
  }

  searchCards(cardName: string | null = null){
    this.cardService.getCards(cardName, this.offset).subscribe((res) => {
      //console.log(res);
      // llamando a las cards, fusionando scroll infinito 
      this.cards = [...this.cards, ...res];
    })
  }
}
