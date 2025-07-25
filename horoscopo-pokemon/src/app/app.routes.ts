// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { SearchComponent } from './pages/search/search.component';
import { HoroscopeComponent } from './pages/horoscope/horoscope.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'horoscope', component: HoroscopeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: '**', redirectTo: 'search' } // Fallback para rutas no válidas
];