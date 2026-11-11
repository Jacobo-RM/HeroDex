import { Routes } from '@angular/router';
import { CharactersComponent } from './Components/characters-component/characters-component';
import { CharacterInfoComponent } from './Components/character-info-component/character-info-component';
import { CharacterdleComponent } from './Components/characterdle-component/characterdle-component';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/Herodle', component: CharacterdleComponent }, 
  { path: 'characters/:id', component: CharacterInfoComponent },
];