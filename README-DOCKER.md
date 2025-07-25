# 🐳 Horóscopo Pokémon - Instrucciones Docker

## 📋 Requisitos Previos
- Docker instalado en tu sistema
- Docker Compose (incluido con Docker Desktop)

## 🚀 Ejecutar la Aplicación

### Opción 1: Usando Docker Compose (Recomendado)

1. **Abrir terminal** en la carpeta del proyecto
2. **Construir y ejecutar:**
   ```bash
   docker-compose up --build
   ```
3. **Abrir navegador** en: `http://localhost:8080`

### Opción 2: Usando Docker directamente

1. **Construir la imagen:**
   ```bash
   docker build -t horoscopo-pokemon .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -p 8080:80 horoscopo-pokemon
   ```

3. **Abrir navegador** en: `http://localhost:8080`

## 🛑 Detener la Aplicación

### Con Docker Compose:
```bash
docker-compose down
```

### Con Docker:
```bash
docker stop <container_id>
```

## 📁 Estructura de Archivos Docker

- `Dockerfile` - Configuración de construcción de la imagen
- `nginx.conf` - Configuración del servidor web
- `docker-compose.yml` - Orquestación de servicios
- `.dockerignore` - Archivos a ignorar en la construcción

## 🔧 Funcionalidades de la Aplicación

### ✅ Implementadas:
- **Búsqueda de Pokémon** por nombre y tipo
- **Horóscopo Pokémon** con cálculo de signo zodiacal
- **Sistema de Favoritos** con localStorage
- **Navegación SPA** con Angular Router
- **Diseño responsivo** y tema PokéAPI
- **Integración completa** con PokéAPI

### 🎯 Características Técnicas:
- **Angular 17** con componentes standalone
- **TypeScript** para tipado fuerte
- **RxJS** para manejo de observables
- **localStorage** para persistencia de favoritos
- **Nginx** para servidor de producción
- **Docker** para containerización

## 🌐 URLs de la Aplicación

- **Página principal:** `http://localhost:8080`
- **Búsqueda:** `http://localhost:8080/search`
- **Horóscopo:** `http://localhost:8080/horoscope`
- **Favoritos:** `http://localhost:8080/favorites`
- **Detalles Pokémon:** `http://localhost:8080/pokemon/{id}`

## 🐛 Solución de Problemas

### Si el puerto 8080 está ocupado:
Modifica el archivo `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Cambiar 8080 por otro puerto
```

### Si hay problemas de construcción:
```bash
docker-compose down
docker system prune -f
docker-compose up --build
```

## 📞 Soporte

Si encuentras algún problema, verifica:
1. Docker está ejecutándose
2. El puerto 8080 está disponible
3. Tienes permisos de administrador (en algunos sistemas)

---

**¡Disfruta explorando el Horóscopo Pokémon!** ✨ 