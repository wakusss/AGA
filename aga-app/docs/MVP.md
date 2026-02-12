# PRD_MVP: AGA Chat – Minimum Viable Product

**Kod dokumentu** : PRD_MVP  
**Status** : Wstępny / Do akceptacji  
**Data utworzenia** : 12 lutego 2026  
**Wersja** : 1.0  
**Zakres** : wyłącznie funkcje, które MUSZĄ być zrealizowane w pierwszej wersji produkcyjnej (MVP)  
**Cel MVP** : szybka walidacja koncepcji, pozyskanie pierwszych 500–1500 realnych użytkowników, zebranie feedbacku i danych o zachowaniach

## 1. Core loop użytkownika

1. Rejestracja / logowanie
2. Uzupełnienie obowiązkowych informacji o lokalizacji (kraj + miasto)
3. Przejście do feedu → zobaczenie lokalnych postów
4. Stworzenie pierwszego posta LUB wysłanie prywatnej wiadomości
5. Otrzymanie pierwszej interakcji (powiadomienie)

## 2. Funkcjonalności MUST-HAVE w MVP

### 2.1 Rejestracja i logowanie

- email + hasło (bcrypt)
- Po rejestracji:startowy ekran uzupełnienia profilu
  - kraj pobytu (select)
  - miasto (select / text z autocomplete)
  - narodowość / kraj pochodzenia
  - języki (multi-select, min. 1)

### 2.2 Profil użytkownika (bardzo prosty)

- zdjęcie profilowe (upload, max 5 MB, kompresja)
- bio – max 350 znaków (możliwość wersji w 2 językach)
- wyświetlane: kraj, miasto, narodowość, języki, tagi (5–10 popularnych hashtagów do wyboru)
- lista obserwowanych / obserwujących (tylko liczby + podstawowa lista)

### 2.3 Feed / Tablica (główna strona po logowaniu)

- Domyślne sortowanie: najpierw posty z tego samego miasta → kraj → reszta
- Dodatkowe filtry (3 przyciski):
  - Najnowsze
  - Najbliżej mnie
  - Tylko obserwowani
- Infinite scroll / lazy loading
- Każdy post pokazuje: autora, miasto, czas, treść, zdjęcia (do 4 widocznych miniatur), liczbę like’ów i komentarzy

### 2.4 Tworzenie postów – dokładnie 5 typów

1. Zwykły post: tekst (max 2000 znaków) + zdjęcia (max 10, kompresja do WebP)
2. Ankieta: 1 pytanie + 2–4 opcje odpowiedzi
3. Wydarzenie: data, godzina, miejsce (tekst + opcjonalny link Google Maps)
4. Pytanie otwarte („Czy ktoś wie…?” – wyróżniony format)

### 2.5 Interakcje podstawowe

- Like (serducho)
- Komentarze – płaskie (bez zagnieżdżeń w MVP)
- Obserwuj / przestań obserwować
- Powiadomienia (w aplikacji + email):
  - nowa wiadomość
  - komentarz pod moim postem
  - like
  - ktoś mnie obserwuje

### 2.6 Wiadomości prywatne

- wyłącznie 1:1
- tekst + wysyłanie zdjęć
- szybkie reakcje emoji
- brak grup, voice messages, video calls

## 3. Co ABSOLUTNIE JEST POZA MVP (nawet jeśli bardzo się chce)

- aplikacja mobilna (native / PWA na później)
- grupy tematyczne / kanały
- interaktywna mapa wydarzeń
- rozbudowane ogłoszenia (wyszukiwarka, kategorie, filtry)
- weryfikacja profilu / badge „verified expat”
- powiadomienia push (web push / FCM)
- posty z wideo / nagrania głosowe
- edycja / usuwanie własnego posta po publikacji (tylko admin)
- automatyczne tłumaczenie postów (DeepL / Google)
- dark mode
- zaawansowane wyszukiwanie / filtry
- rekomendacje oparte na AI / ML
- moderacja kontentu

## 4. Założenia techniczne MVP

- Backend: Kotlin + Spring Boot 3
- Frontend: React 18 + TypeScript + Vite
- Baza: PostgreSQL
- Deployment: Docker

## 5. Kolejność realizacji

1. Autentykacja + obowiązkowy profil po rejestracji
2. CRUD postów + upload i wyświetlanie zdjęć
3. Feed read-only
4. Tworzenie wszystkich 4 typów postów
5. Komentarze + like + obserwowanie
6. Wiadomości 1:1 (WebSocket lub polling)
7. Powiadomienia
8. Podstawowe metryki + deployment + monitoring
