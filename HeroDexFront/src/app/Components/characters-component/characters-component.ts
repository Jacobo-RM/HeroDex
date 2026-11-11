import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../Service/app.service';
import { CharacterTypeLabel } from '../../Models/CharacterType';
import { UniverseType, UniverseTypeLabel } from '../../Models/UniverseType';
import { Character } from '../../Models/Character';
import { UniverseLogo } from '../../Models/UniverseLogo';

type SortMode = 'default' | 'az' | 'alive';

interface CharacterGroup {
  universe: UniverseType;
  characters: Character[];
}

@Component({
  selector: 'app-characters-component',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './characters-component.html',
  styleUrl: './characters-component.css',
})
export class CharactersComponent implements OnInit {
  private apiService = inject(ApiService);

  readonly characterType = CharacterTypeLabel;
  readonly universe = UniverseTypeLabel;
  readonly universeLogo = UniverseLogo;
  readonly characters = signal<Character[]>([]);
  readonly loading = signal(true);
  readonly selectedUniverse = signal<UniverseType | null>(null);
  readonly searchQuery = signal('');
  readonly sortBy = signal<SortMode>('default');
  readonly brokenLogos = signal<ReadonlySet<UniverseType>>(new Set());

  // Derivados (se recalculan solo cuando cambia algo de lo que leen)
  readonly availableUniverses = computed(() => {
    const present = new Set(this.characters().map((c) => c.universe));
    return Object.values(UniverseType).filter(
      (v): v is UniverseType => typeof v === 'number' && present.has(v),
    );
  });

  readonly universeCounts = computed(() => {
    const counts = new Map<UniverseType, number>();
    for (const c of this.characters()) {
      counts.set(c.universe, (counts.get(c.universe) ?? 0) + 1);
    }
    return counts;
  });

  readonly filteredCharacters = computed(() => {
    const universe = this.selectedUniverse();
    const query = this.normalize(this.searchQuery());

    const list = this.characters().filter(
      (c) =>
        (universe === null || c.universe === universe) &&
        (!query ||
          this.normalize(c.name).includes(query) ||
          this.normalize(c.realName ?? '').includes(query)),
    );

    switch (this.sortBy()) {
      case 'az':
        return list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      case 'alive':
        return list.sort(
          (a, b) => Number(b.isAlive) - Number(a.isAlive) || a.name.localeCompare(b.name, 'es'),
        );
      default:
        return list;
    }
  });

  readonly groupedCharacters = computed<CharacterGroup[]>(() => {
    const list = this.filteredCharacters();
    return this.availableUniverses()
      .map((universe) => ({
        universe,
        characters: list.filter((c) => c.universe === universe),
      }))
      .filter((group) => group.characters.length > 0);
  });

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe({
      next: (res) => {
        this.characters.set([...res]);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  selectUniverse(u: UniverseType): void {
    this.selectedUniverse.update((current) => (current === u ? null : u));
  }

  clearUniverse(): void {
    this.selectedUniverse.set(null);
  }

  markLogoBroken(u: UniverseType): void {
    this.brokenLogos.update((s) => new Set(s).add(u));
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onSort(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value as SortMode);
  }

  private normalize(text: string): string {
    return text
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim();
  }
}