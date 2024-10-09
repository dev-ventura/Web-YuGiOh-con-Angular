import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  // esto es la llegada de card
  @Input() card!: Card;
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  goToCard(){
    // viendo de forma dinamica la ruta de la card
    this.router.navigate([`card/${this.card.id}`]);
  }
}
