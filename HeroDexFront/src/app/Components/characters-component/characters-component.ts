import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ApiService } from '../../Service/app.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CharacterType, CharacterTypeLabel } from '../../Models/CharacterType';
import { UniverseType, UniverseTypeLabel } from '../../Models/UniverseType';
import { Character } from '../../Models/Character';
import { UniverseLogo } from '../../Models/UniverseLogo';

@Component({
  selector: 'app-characters-component',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './characters-component.html',
  styleUrl: './characters-component.css',
})
export class CharactersComponent {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  readonly characterType = CharacterTypeLabel;
  readonly universe = UniverseTypeLabel;
  readonly universeLogo = UniverseLogo;

  selectedUniverse: UniverseType | null = null;
  brokenLogos = new Set<UniverseType>();

  characters: Character[] = [];

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe({
      next: (res) => {
        this.characters = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.cdr.detectChanges();
      },
    });
  }
  get availableUniverses(): UniverseType[] {
    const present = new Set(this.characters.map((c) => c.universe));
    return Object.values(UniverseType).filter(
      (v): v is UniverseType => typeof v === 'number' && present.has(v),
    );
  }

  get filteredCharacters(): Character[] {
    return this.selectedUniverse === null
      ? this.characters
      : this.characters.filter((c) => c.universe === this.selectedUniverse);
  }

  countOf(u: UniverseType): number {
    return this.characters.filter((c) => c.universe === u).length;
  }

  selectUniverse(u: UniverseType | null): void {
    this.selectedUniverse = this.selectedUniverse === u ? null : u;
  }
}
