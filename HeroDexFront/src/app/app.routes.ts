import { Routes } from '@angular/router';
import { CharactersComponent } from './Components/characters-component/characters-component';
import { CharacterInfoComponent } from './Components/character-info-component/character-info-component';

export const routes: Routes = [
    { path: '', redirectTo: 'characters', pathMatch: 'full'},
    { path: 'characters', component: CharactersComponent},
    { path: 'characters/:id', component: CharacterInfoComponent}

];
