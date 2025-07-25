import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavoritesService, FavoritePokemon } from '../../services/favorites.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: FavoritePokemon[] = [];
  isLoading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();
    
    // Suscribirse a cambios en favoritos
    this.subscription.add(
      this.favoritesService.favorites$.subscribe(favorites => {
        this.favorites = favorites;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadFavorites() {
    this.isLoading = true;
    
    // Simular carga (opcional, para mostrar estado de carga)
    setTimeout(() => {
      this.favorites = this.favoritesService.getFavoritesSortedByDate();
      this.isLoading = false;
    }, 300);
  }

  removeFavorite(pokemonId: number) {
    this.favoritesService.removeFavorite(pokemonId);
  }

  clearAllFavorites() {
    if (confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      this.favoritesService.clearAllFavorites();
    }
  }

  goToPokemonDetail(pokemonId: number) {
    this.router.navigate(['/pokemon', pokemonId]);
  }

  getFavoritesCount(): number {
    return this.favorites.length;
  }

  // Convertir FavoritePokemon a Pokemon para el componente pokemon-card
  convertToPokemon(favorite: FavoritePokemon): any {
    return {
      id: favorite.id,
      name: favorite.name,
      sprites: favorite.sprites,
      types: favorite.types,
      height: favorite.height,
      weight: favorite.weight,
      abilities: favorite.abilities
    };
  }

  getAddedDate(favorite: FavoritePokemon): string {
    return favorite.addedAt.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
