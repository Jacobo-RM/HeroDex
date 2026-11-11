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