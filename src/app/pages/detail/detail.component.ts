import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id!: string;
  card$! : Observable<Card>;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
  ) { }

  ngOnInit(): void {
    // captura de la ruta del atributo id de card
    this.id = this.route.snapshot.paramMap.get('id') || '';
    //console.log(this.id);
    // igualando nuestra variable observable card con el id
    this.card$ = this.cardService.getCard(this.id).pipe(tap(console.log));
  }
}
