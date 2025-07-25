import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  @Input() pokemon!: Pokemon;
  @Input() showFavoriteButton: boolean = true; // Para controlar si mostrar el botón

  isFavorite: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    if (this.showFavoriteButton) {
      this.checkFavoriteStatus();
      this.subscription.add(
        this.favoritesService.favorites$.subscribe(() => {
          this.checkFavoriteStatus();
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkFavoriteStatus() {
    this.isFavorite = this.favoritesService.isFavorite(this.pokemon.id);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation(); // Evitar que se propague el clic
    this.favoritesService.toggleFavorite(this.pokemon);
  }

  getTypeNames(types: any[]): string {
    return types.map(t => t.type.name).join(', ');
  }

  getTypeColor(typeName: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[typeName] || '#A8A878';
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
}
