import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Character } from "../Models/Character";
import { Observable } from "rxjs";
import { SearchItem } from "../Models/SearchItem";
import { GuessResponse } from "../Models/GuessResponse";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    public api: string | undefined;
    constructor(public http: HttpClient) {
    this.api = 'http://localhost:5127/api';
  }

  public getCharacters(){
    return this.http.get<Character[]>(`${this.api}/character`);
  }

  public getCharacterById(id : number){
    return this.http.get<Character>(`${this.api}/character/${id}`);
  }

   public makeGuess(characterId: number): Observable<GuessResponse> {
    return this.http.post<GuessResponse>(`${this.api}/character/guess`, { characterId });
  }

 
  public getSearchList(): Observable<SearchItem[]> {
    return this.http.get<SearchItem[]>(`${this.api}/character/search-list`);
  }
}