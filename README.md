# Aplikacja pogodowa

Aplikacja pogodowa pozwala na sprawdzanie aktualnych warunków pogodowych w wybranym mieście oraz zarządzanie listą zapisanych lokalizacji. Użytkownik może dodawać, usuwać oraz przeglądać zapisane lokalizacje i sprawdzać dla nich pogodę za pomocą jednego kliknięcia.

## Funkcje

- **Sprawdzanie pogody:** Użytkownik może wprowadzić nazwę miasta i kliknąć przycisk "Sprawdź pogodę", aby uzyskać aktualne informacje o pogodzie dla tego miasta.
- **Zarządzanie lokalizacjami:** Możliwość zapisywania ulubionych lokalizacji, przeglądania zapisanych lokalizacji oraz ich usuwania.
- **Interfejs użytkownika:** Przejrzysty i responsywny interfejs, który dostosowuje się do różnych rozmiarów ekranu.

## Technologie

- **Frontend:** HTML, CSS, JavaScript (z biblioteką Axios do obsługi zapytań HTTP)
- **Backend:** Node.js (z modułem `http` do obsługi serwera)
- **API pogodowe:** OpenWeatherMap

## Instalacja

1. Sklonuj repozytorium:
    ```bash
    git clone https://github.com/ksenon67/aplikacja-pogodowa.git
    ```
2. Przejdź do katalogu z projektem:
    ```bash
    cd aplikacja-pogodowa
    ```
3. Zainstaluj wymagane zależności:
    ```bash
    npm install
    ```

## Uruchamianie aplikacji

1. Uruchom serwer HTTP:
    ```bash
    node server.js
    ```
2. Otwórz przeglądarkę i przejdź do:
    ```
    http://localhost:3000
    ```

## Struktura plików

- `index.html` - główny plik HTML z interfejsem użytkownika
- `main.js` - plik JavaScript obsługujący logikę aplikacji, w tym interakcje z API pogodowym oraz zarządzanie lokalizacjami
- `main.css` - plik CSS zawierający style aplikacji
- `server.js` - plik Node.js obsługujący serwer HTTP
- `localisation.json` - plik JSON przechowujący zapisane lokalizacje

## Używanie aplikacji

1. **Sprawdzanie pogody:** Wprowadź nazwę miasta w polu tekstowym i kliknij przycisk "Sprawdź pogodę", aby uzyskać aktualne informacje o pogodzie.
2. **Zapisywanie lokalizacji:** Wprowadź nazwę lokalizacji w polu tekstowym w sekcji "Zarządzaj lokalizacjami" i kliknij "Zapisz lokalizację".
3. **Przeglądanie i usuwanie lokalizacji:** Lista zapisanych lokalizacji znajduje się poniżej formularza. Każda lokalizacja ma przycisk "Sprawdź pogodę" oraz "Usuń", aby umożliwić interakcję z zapisanymi danymi.

## Autor

- [Sebastian Wytrążek](https://github.com/ksenon67)

