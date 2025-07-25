import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokemonService, Pokemon } from './pokemon.service';

export interface HoroscopeResult {
  name: string;
  birthDate: string;
  zodiacSign: string;
  pokemon: Pokemon;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {
  
  // Mapeo de signos zodiacales a Pokémon
  private zodiacPokemonMap: { [key: string]: string } = {
    'aries': 'charizard',      // Fuego - Aries es de fuego
    'tauro': 'venusaur',       // Tierra - Tauro es de tierra
    'geminis': 'alakazam',     // Psíquico - Géminis es de aire
    'cancer': 'blastoise',     // Agua - Cáncer es de agua
    'leo': 'arcanine',         // Fuego - Leo es de fuego
    'virgo': 'ninetales',      // Fuego - Virgo es de tierra pero elegimos uno elegante
    'libra': 'gardevoir',      // Psíquico - Libra es de aire
    'escorpio': 'gengar',      // Fantasma - Escorpio es de agua pero elegimos uno misterioso
    'sagitario': 'rapidash',   // Fuego - Sagitario es de fuego
    'capricornio': 'steelix',  // Acero - Capricornio es de tierra
    'acuario': 'jolteon',      // Eléctrico - Acuario es de aire
    'piscis': 'vaporeon'       // Agua - Piscis es de agua
  };

  constructor(private pokemonService: PokemonService) {}

  // Calcular signo zodiacal basado en fecha de nacimiento
  calculateZodiacSign(birthDate: string): string {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1; // getMonth() devuelve 0-11
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'tauro';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'geminis';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'escorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagitario';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricornio';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'acuario';
    return 'piscis'; // (month === 2 && day >= 19) || (month === 3 && day <= 20)
  }

  // Generar mensaje personalizado basado en el signo y Pokémon
  generateMessage(name: string, zodiacSign: string, pokemonName: string): string {
    const messages = {
      'aries': `${name}, como Aries, tu espíritu ardiente y valiente se refleja en ${pokemonName}. Eres naturalmente líder y siempre buscas nuevos desafíos. ¡Tu energía es contagiosa!`,
      'tauro': `${name}, como Tauro, tu determinación y paciencia te conectan con ${pokemonName}. Eres confiable y valoras la estabilidad. ¡Tu fuerza interior es admirable!`,
      'geminis': `${name}, como Géminis, tu curiosidad y adaptabilidad te unen a ${pokemonName}. Eres comunicativo y versátil. ¡Tu mente ágil te lleva lejos!`,
      'cancer': `${name}, como Cáncer, tu intuición y sensibilidad te conectan con ${pokemonName}. Eres protector y empático. ¡Tu corazón guía tu camino!`,
      'leo': `${name}, como Leo, tu carisma y nobleza te reflejan en ${pokemonName}. Eres naturalmente magnético y generoso. ¡Tu luz ilumina a otros!`,
      'virgo': `${name}, como Virgo, tu precisión y dedicación te unen a ${pokemonName}. Eres analítico y perfeccionista. ¡Tu atención al detalle es tu superpoder!`,
      'libra': `${name}, como Libra, tu equilibrio y justicia te conectan con ${pokemonName}. Eres diplomático y buscas la armonía. ¡Tu sentido de justicia es admirable!`,
      'escorpio': `${name}, como Escorpio, tu intensidad y misterio te reflejan en ${pokemonName}. Eres apasionado y perceptivo. ¡Tu profundidad emocional es única!`,
      'sagitario': `${name}, como Sagitario, tu optimismo y aventura te unen a ${pokemonName}. Eres explorador y filosófico. ¡Tu espíritu libre te lleva a grandes lugares!`,
      'capricornio': `${name}, como Capricornio, tu ambición y disciplina te conectan con ${pokemonName}. Eres responsable y perseverante. ¡Tu determinación es inquebrantable!`,
      'acuario': `${name}, como Acuario, tu originalidad e innovación te reflejan en ${pokemonName}. Eres visionario y humanitario. ¡Tu creatividad rompe barreras!`,
      'piscis': `${name}, como Piscis, tu compasión y creatividad te unen a ${pokemonName}. Eres intuitivo y artístico. ¡Tu imaginación no tiene límites!`
    };
    
    return messages[zodiacSign as keyof typeof messages] || `${name}, tu conexión con ${pokemonName} es única y especial. ¡Descubre tu potencial!`;
  }

  // Obtener horóscopo completo
  getHoroscope(name: string, birthDate: string): Observable<HoroscopeResult | null> {
    const zodiacSign = this.calculateZodiacSign(birthDate);
    const pokemonName = this.zodiacPokemonMap[zodiacSign];

    if (!pokemonName) {
      return of(null);
    }

    return new Observable(observer => {
      this.pokemonService.searchPokemonByName(pokemonName).subscribe({
        next: (pokemon) => {
          if (pokemon) {
            const message = this.generateMessage(name, zodiacSign, pokemon.name);
            const result: HoroscopeResult = {
              name,
              birthDate,
              zodiacSign,
              pokemon,
              message
            };
            observer.next(result);
          } else {
            observer.next(null);
          }
          observer.complete();
        },
        error: (error) => {
          console.error('Error obteniendo Pokémon del horóscopo:', error);
          observer.next(null);
          observer.complete();
        }
      });
    });
  }
}
