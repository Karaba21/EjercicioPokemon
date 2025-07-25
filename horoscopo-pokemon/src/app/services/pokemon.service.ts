import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, forkJoin, switchMap } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny?: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  // Buscar Pokémon por nombre
  searchPokemonByName(name: string): Observable<Pokemon | null> {
    const url = `${this.baseUrl}/pokemon/${name.toLowerCase()}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        console.error('Error buscando Pokémon:', error);
        return of(null);
      })
    );
  }

  // Obtener lista de Pokémon por tipo (versión simplificada)
  getPokemonByType(type: string): Observable<any[]> {
    const url = `${this.baseUrl}/type/${type}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Respuesta de tipo:', response);
        const pokemonList = response.pokemon.map((p: any) => p.pokemon);
        console.log('Lista de Pokémon del tipo:', pokemonList);
        return pokemonList.slice(0, 10); // Limitar a 10 resultados para pruebas
      }),
      catchError(error => {
        console.error('Error obteniendo Pokémon por tipo:', error);
        return of([]);
      })
    );
  }

  // Obtener detalles completos de un Pokémon por tipo (método separado)
  getPokemonByTypeWithDetails(type: string): Observable<Pokemon[]> {
    return this.getPokemonByType(type).pipe(
      switchMap(pokemonList => {
        if (pokemonList.length === 0) {
          return of([]);
        }
        console.log('Obteniendo detalles de:', pokemonList.length, 'Pokémon');
        const requests = pokemonList.map((pokemon: any) => 
          this.getPokemonDetails(pokemon.url)
        );
        return forkJoin(requests) as Observable<Pokemon[]>;
      }),
      catchError(error => {
        console.error('Error obteniendo Pokémon por tipo:', error);
        return of([]);
      })
    );
  }

  // Obtener detalles de un Pokémon por URL
  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        console.error('Error obteniendo detalles del Pokémon:', error);
        throw error;
      })
    );
  }

  // Obtener lista de todos los tipos de Pokémon
  getPokemonTypes(): Observable<Array<{name: string, url: string}>> {
    const url = `${this.baseUrl}/type`;
    return this.http.get<any>(url).pipe(
      map(response => response.results),
      catchError(error => {
        console.error('Error obteniendo tipos de Pokémon:', error);
        return of([]);
      })
    );
  }
}
