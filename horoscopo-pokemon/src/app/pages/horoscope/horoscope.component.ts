import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HoroscopeService, HoroscopeResult } from '../../services/horoscope.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-horoscope',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent],
  templateUrl: './horoscope.component.html',
  styleUrl: './horoscope.component.css'
})
export class HoroscopeComponent {
  name: string = '';
  birthDate: string = '';
  horoscopeResult: HoroscopeResult | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  hasSearched: boolean = false;

  constructor(private horoscopeService: HoroscopeService) {}

  onSubmit() {
    if (!this.name.trim() || !this.birthDate) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.hasSearched = true;

    this.horoscopeService.getHoroscope(this.name.trim(), this.birthDate).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result) {
          this.horoscopeResult = result;
        } else {
          this.errorMessage = 'No se pudo generar tu horóscopo. Intenta de nuevo.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al generar el horóscopo. Intenta de nuevo.';
        console.error('Error en horóscopo:', error);
      }
    });
  }

  clearForm() {
    this.name = '';
    this.birthDate = '';
    this.horoscopeResult = null;
    this.errorMessage = '';
    this.hasSearched = false;
  }

  getZodiacSignDisplay(sign: string): string {
    const zodiacNames: { [key: string]: string } = {
      'aries': 'Aries',
      'tauro': 'Tauro',
      'geminis': 'Géminis',
      'cancer': 'Cáncer',
      'leo': 'Leo',
      'virgo': 'Virgo',
      'libra': 'Libra',
      'escorpio': 'Escorpio',
      'sagitario': 'Sagitario',
      'capricornio': 'Capricornio',
      'acuario': 'Acuario',
      'piscis': 'Piscis'
    };
    return zodiacNames[sign] || sign;
  }
}
