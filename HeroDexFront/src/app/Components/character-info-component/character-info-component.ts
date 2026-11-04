import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../Service/app.service';
import { Character } from '../../Models/Character';
import { CharacterTypeLabel } from '../../Models/CharacterType';
import { UniverseTypeLabel } from '../../Models/UniverseType';

@Component({
  selector: 'app-character-info-component',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './character-info-component.html',
  styleUrl: './character-info-component.css',
})
export class CharacterInfoComponent {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  character?: Character;
  loading = true;
  error = false;
  readonly characterType = CharacterTypeLabel;
  readonly universe = UniverseTypeLabel;

  ngOnInit():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(!id){
      this.error = true;
      this.loading = false;
      return;
    }

    this.apiService.getCharacterById(id).subscribe({
      next: (res)=>{
        this.character = res;
        this.loading = false;
        this.cdr.detectChanges()
      },
      error: (err)=>{
        console.error(err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    })
}
}
