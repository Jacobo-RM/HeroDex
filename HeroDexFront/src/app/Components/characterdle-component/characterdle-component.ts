import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchItem } from '../../Models/SearchItem';
import { ApiService } from '../../Service/app.service';
import { CharacterCompareResult } from '../../Models/CharacterCompareResult';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-characterdle-component',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: './characterdle-component.html',
  styleUrl: './characterdle-component.css',
})
export class CharacterdleComponent implements OnInit {
    private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  searchList: SearchItem[] = [];
  guesses: CharacterCompareResult[] = [];
  
  searchQuery: string = '';
  filteredSearchList: SearchItem[] = [];
  hasWon: boolean = false;

  ngOnInit(): void {
    this.apiService.getSearchList().subscribe({
      next: (res) => {
        this.searchList = res;
        this.filteredSearchList = [];
      },
      error: (err) => console.error(err)
    });
  }

  onSearchChange(): void {
    if (!this.searchQuery.trim()) {
      this.filteredSearchList = [];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredSearchList = this.searchList.filter(item => 
      item.name.toLowerCase().includes(query) && 
      !this.guesses.some(g => g.id === item.id)
    );
  }

  selectCharacter(item: SearchItem): void {
    this.searchQuery = '';
    this.filteredSearchList = [];

    this.apiService.makeGuess(item.id).subscribe({
      next: (res) => {
        this.guesses.unshift(res.results);
        this.hasWon = res.hasWon;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}




  // {
  //   "id": 45,
  //   "name": "Detective Marciano",
  //   "realName": "J'onn J'onzz",
  //   "description": "Último superviviente de Marte, telépata y metamorfo. Es el corazón de la Liga de la Justicia.",
  //   "universe": "DC",
  //   "characterType": "Hero",
  //   "image": "https://i.redd.it/elca4weiz7ce1.jpg",
  //   "video": "",
  //   "logo": "",
  //   "banner": "",
  //   "firstAppearance": "Detective Comics #225 (1955)",
  //   "publisher": "DC Comics",
  //   "isAlive": true,
  //   "occupation": "Detective, héroe",
  //   "baseOfOperations": "Atalaya",
  //   "aliases": [
  //     "Martian Manhunter",
  //     "J'onn J'onzz"
  //   ],
  //   "powers": [
  //     {
  //       "id": 19,
  //       "name": "Telepatía",
  //       "description": "Lee y proyecta pensamientos.",
  //       "icon": ""
  //     },
  //     {
  //       "id": 1,
  //       "name": "Superfuerza",
  //       "description": "Fuerza muy superior a la humana.",
  //       "icon": ""
  //     },
  //     {
  //       "id": 5,
  //       "name": "Vuelo",
  //       "description": "Capacidad de volar a gran velocidad.",
  //       "icon": ""
  //     },
  //     {
  //       "id": 2,
  //       "name": "Factor de curación",
  //       "description": "Regenera heridas casi al instante.",
  //       "icon": ""
  //     }
  //   ],
  //   "teams": [
  //     {
  //       "id": 3,
  //       "name": "Liga de la Justicia",
  //       "description": "Los mayores héroes de DC unidos.",
  //       "universe": "DC",
  //       "logo": "https://logos-world.net/wp-content/uploads/2023/02/Justice-League-Logo.png",
  //       "banner": "",
  //       "headquarters": "Atalaya"
  //     }
  //   ]
  // },