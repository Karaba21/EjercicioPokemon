import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from './pokemon.service';

export interface FavoritePokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  addedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'pokemon_favorites';
  private favoritesSubject = new BehaviorSubject<FavoritePokemon[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavoritesFromStorage();
  }

  // Cargar favoritos desde localStorage
  private loadFavoritesFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const favorites = JSON.parse(stored);
        // Convertir las fechas de string a Date
        const favoritesWithDates = favorites.map((fav: any) => ({
          ...fav,
          addedAt: new Date(fav.addedAt)
        }));
        this.favoritesSubject.next(favoritesWithDates);
      }
    } catch (error) {
      console.error('Error cargando favoritos desde localStorage:', error);
      this.favoritesSubject.next([]);
    }
  }

  // Guardar favoritos en localStorage
  private saveFavoritesToStorage(favorites: FavoritePokemon[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error guardando favoritos en localStorage:', error);
    }
  }

  // Obtener todos los favoritos
  getFavorites(): FavoritePokemon[] {
    return this.favoritesSubject.value;
  }

  // Verificar si un Pokémon es favorito
  isFavorite(pokemonId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === pokemonId);
  }

  // Agregar Pokémon a favoritos
  addFavorite(pokemon: Pokemon): void {
    const favorites = this.getFavorites();
    
    // Verificar si ya existe
    if (this.isFavorite(pokemon.id)) {
      console.log(`Pokémon ${pokemon.name} ya está en favoritos`);
      return;
    }

    // Crear objeto de favorito
    const favoritePokemon: FavoritePokemon = {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites,
      types: pokemon.types,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities,
      addedAt: new Date()
    };

    // Agregar al inicio de la lista (más reciente primero)
    const updatedFavorites = [favoritePokemon, ...favorites];
    
    // Actualizar estado y localStorage
    this.favoritesSubject.next(updatedFavorites);
    this.saveFavoritesToStorage(updatedFavorites);
    
    console.log(`Pokémon ${pokemon.name} agregado a favoritos`);
  }

  // Remover Pokémon de favoritos
  removeFavorite(pokemonId: number): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== pokemonId);
    
    // Actualizar estado y localStorage
    this.favoritesSubject.next(updatedFavorites);
    this.saveFavoritesToStorage(updatedFavorites);
    
    console.log(`Pokémon con ID ${pokemonId} removido de favoritos`);
  }

  // Toggle favorito (agregar si no existe, remover si existe)
  toggleFavorite(pokemon: Pokemon): void {
    if (this.isFavorite(pokemon.id)) {
      this.removeFavorite(pokemon.id);
    } else {
      this.addFavorite(pokemon);
    }
  }

  // Obtener cantidad de favoritos
  getFavoritesCount(): number {
    return this.getFavorites().length;
  }

  // Limpiar todos los favoritos
  clearAllFavorites(): void {
    this.favoritesSubject.next([]);
    this.saveFavoritesToStorage([]);
    console.log('Todos los favoritos han sido eliminados');
  }

  // Obtener favorito por ID
  getFavoriteById(pokemonId: number): FavoritePokemon | undefined {
    const favorites = this.getFavorites();
    return favorites.find(fav => fav.id === pokemonId);
  }

  // Ordenar favoritos por fecha (más reciente primero)
  getFavoritesSortedByDate(): FavoritePokemon[] {
    const favorites = this.getFavorites();
    return favorites.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  }

  // Ordenar favoritos por nombre
  getFavoritesSortedByName(): FavoritePokemon[] {
    const favorites = this.getFavorites();
    return favorites.sort((a, b) => a.name.localeCompare(b.name));
  }
}
