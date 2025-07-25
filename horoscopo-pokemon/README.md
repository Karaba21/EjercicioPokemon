# 🌟 Horóscopo Pokémon

Una aplicación web desarrollada en Angular que combina el horóscopo con el universo Pokémon. Los usuarios pueden descubrir su Pokémon del destino basado en su signo zodiacal, buscar Pokémon por nombre y tipo, y crear su colección personal de favoritos.

## ✨ Características Implementadas

### 🔮 **Horóscopo Pokémon**
- **Cálculo automático** del signo zodiacal basado en fecha de nacimiento
- **Asociación de signos** con Pokémon específicos (Aries → Charizard, Tauro → Venusaur, etc.)
- **Mensajes personalizados** para cada signo zodiacal
- **Integración con PokéAPI** para obtener datos completos del Pokémon

### 🔍 **Buscador de Pokémon**
- **Búsqueda por nombre** de Pokémon
- **Filtrado por tipo** con lista completa de tipos disponibles
- **Resultados en tiempo real** con tarjetas informativas
- **Integración completa** con la PokéAPI oficial

### ⭐ **Sistema de Favoritos**
- **Marcar/desmarcar** Pokémon como favoritos con estrellas
- **Persistencia local** usando localStorage
- **Página dedicada** para gestionar favoritos
- **Navegación directa** a detalles del Pokémon
- **Eliminación individual** y masiva de favoritos

### 🎨 **Interfaz de Usuario**
- **Diseño responsivo** que se adapta a diferentes dispositivos
- **Tema inspirado en PokéAPI** con colores oficiales
- **Navegación SPA** con Angular Router
- **Componentes reutilizables** (navbar, pokemon-card)

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Angular 19** - Framework principal con componentes standalone
- **TypeScript** - Tipado estático
- **RxJS** - Manejo de observables y programación reactiva
- **CSS3** - Estilos con variables CSS y flexbox/grid

### **APIs y Servicios**
- **PokéAPI** - API oficial de Pokémon para datos completos
- **localStorage** - Persistencia local de favoritos
- **Angular Router** - Navegación SPA

### **Despliegue**
- **Docker** - Containerización completa
- **Nginx** - Servidor web de producción
- **Docker Compose** - Orquestación de servicios

## 🚀 Instalación y Ejecución

### **Requisitos Previos**
- Node.js 18+ y npm
- Angular CLI 19+
- Docker (opcional, para despliegue)

### **Desarrollo Local**

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd horoscopo-pokemon
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm start
   ```

4. **Abrir navegador** en: `http://localhost:4200`

### **Despliegue con Docker**

1. **Construir y ejecutar:**
   ```bash
   docker-compose up --build
   ```

2. **Abrir navegador** en: `http://localhost:8080`

## 📁 Estructura del Proyecto

```
horoscopo-pokemon/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── navbar/         # Barra de navegación
│   │   │   ├── pokemon-card/   # Tarjeta de Pokémon
│   │   │   └── search-form/    # Formulario de búsqueda
│   │   ├── pages/              # Páginas principales
│   │   │   ├── search/         # Búsqueda de Pokémon
│   │   │   ├── horoscope/      # Horóscopo Pokémon
│   │   │   ├── favorites/      # Lista de favoritos
│   │   │   └── pokemon-detail/ # Detalles del Pokémon
│   │   ├── services/           # Servicios de negocio
│   │   │   ├── pokemon.service.ts
│   │   │   ├── horoscope.service.ts
│   │   │   └── favorites.service.ts
│   │   ├── models/             # Interfaces y tipos
│   │   └── app.routes.ts       # Configuración de rutas
│   └── styles.css              # Estilos globales
├── Dockerfile                  # Configuración Docker
├── docker-compose.yml          # Orquestación Docker
├── nginx.conf                  # Configuración Nginx
└── README-DOCKER.md           # Instrucciones Docker
```

## 🎯 Funcionalidades Implementadas

### **1. Horóscopo Pokémon**
- ✅ Cálculo automático de signo zodiacal
- ✅ Mapeo de signos a Pokémon específicos
- ✅ Mensajes personalizados por signo
- ✅ Integración con PokéAPI
- ✅ Interfaz intuitiva con formulario

### **2. Buscador de Pokémon**
- ✅ Búsqueda por nombre
- ✅ Filtrado por tipo
- ✅ Resultados en tiempo real
- ✅ Tarjetas informativas
- ✅ Estados de carga y error

### **3. Sistema de Favoritos**
- ✅ Marcado con estrellas
- ✅ Persistencia en localStorage
- ✅ Página dedicada
- ✅ Eliminación individual y masiva
- ✅ Navegación a detalles

### **4. Navegación y UX**
- ✅ SPA con Angular Router
- ✅ Diseño responsivo
- ✅ Tema PokéAPI
- ✅ Componentes reutilizables

## 🔧 Arquitectura

### **Servicios Implementados**
- **PokemonService** - Manejo de llamadas a PokéAPI
- **HoroscopeService** - Lógica del horóscopo y cálculo de signos
- **FavoritesService** - Gestión de favoritos con localStorage

### **Componentes Principales**
- **NavbarComponent** - Navegación principal
- **PokemonCardComponent** - Tarjeta reutilizable de Pokémon
- **SearchComponent** - Página de búsqueda
- **HoroscopeComponent** - Página del horóscopo
- **FavoritesComponent** - Página de favoritos
- **PokemonDetailComponent** - Página de detalles

## 🌐 URLs de la Aplicación

- **Página principal:** `/` (redirige a `/search`)
- **Búsqueda:** `/search`
- **Horóscopo:** `/horoscope`
- **Favoritos:** `/favorites`
- **Detalles Pokémon:** `/pokemon/{id}`

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎨 Paleta de Colores

Inspirada en la PokéAPI oficial:
- **Rojo Pokémon:** `#DC0A2D`
- **Amarillo Pokémon:** `#FFCC00`
- **Azul Pokémon:** `#3D7DCA`
- **Azul Oscuro:** `#003A70`
- **Gris:** `#7C7C7C`

## 🧪 Testing

La aplicación incluye:
- **Jasmine/Karma** configurado para unit tests
- **TypeScript** para detección temprana de errores

## 📈 Características Técnicas

- **Angular 19** con componentes standalone
- **TypeScript** para tipado fuerte
- **RxJS** para manejo de observables
- **localStorage** para persistencia
- **Docker** para containerización
- **Nginx** para servidor de producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Tu Nombre** - [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

## 🙏 Agradecimientos

- **PokéAPI** por proporcionar datos completos de Pokémon
- **Angular Team** por el excelente framework

---

**¡Disfruta explorando el universo Pokémon a través del horóscopo!** ✨🌟
