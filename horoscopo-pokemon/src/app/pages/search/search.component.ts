import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService, Pokemon } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  selectedType: string = '';
  pokemonTypes: string[] = [];
  searchResults: Pokemon[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  hasSearched: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemonTypes();
  }

  loadPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe(types => {
      this.pokemonTypes = types.map(type => type.name);
    });
  }

  onSearch() {
    if (!this.searchTerm.trim() && !this.selectedType) {
      this.errorMessage = 'Por favor ingresa un nombre o selecciona un tipo';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.hasSearched = true;

    if (this.searchTerm.trim()) {
      // Búsqueda por nombre
      this.pokemonService.searchPokemonByName(this.searchTerm.trim()).subscribe({
        next: (pokemon) => {
          this.isLoading = false;
          if (pokemon) {
            this.searchResults = [pokemon];
          } else {
            this.searchResults = [];
            this.errorMessage = `No se encontró ningún Pokémon con el nombre "${this.searchTerm}"`;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.searchResults = [];
          this.errorMessage = 'Error al buscar el Pokémon. Intenta de nuevo.';
        }
      });
    } else if (this.selectedType) {
      // Búsqueda por tipo
      this.pokemonService.getPokemonByTypeWithDetails(this.selectedType).subscribe({
        next: (pokemonList) => {
          this.isLoading = false;
          if (pokemonList && pokemonList.length > 0) {
            this.searchResults = pokemonList;
          } else {
            this.searchResults = [];
            this.errorMessage = `No se encontraron Pokémon del tipo "${this.selectedType}"`;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.searchResults = [];
          this.errorMessage = 'Error al buscar Pokémon por tipo. Intenta de nuevo.';
        }
      });
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.selectedType = '';
    this.searchResults = [];
    this.errorMessage = '';
    this.hasSearched = false;
  }
}
