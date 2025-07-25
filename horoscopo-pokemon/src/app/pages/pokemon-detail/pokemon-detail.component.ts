import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService, Pokemon } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.isLoading = true;
    this.errorMessage = '';

    this.route.params.subscribe(params => {
      const pokemonId = params['id'];
      
      if (pokemonId) {
        this.pokemonService.searchPokemonByName(pokemonId).subscribe({
          next: (pokemon) => {
            this.isLoading = false;
            if (pokemon) {
              this.pokemon = pokemon;
            } else {
              this.errorMessage = `No se encontró ningún Pokémon con el ID ${pokemonId}`;
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Error al cargar el Pokémon. Intenta de nuevo.';
            console.error('Error cargando Pokémon:', error);
          }
        });
      } else {
        this.isLoading = false;
        this.errorMessage = 'ID de Pokémon no válido';
      }
    });
  }

  goBack() {
    this.router.navigate(['/search']);
  }
}
