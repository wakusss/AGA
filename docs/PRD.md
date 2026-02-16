# PRD: AGA Chat

**Status**: Draft / In Review  
**Data utworzenia**: 2026-02-11  
**Wersja**: 1.0  
**Powiązany projekt**: AGA Chat – Społeczność dla osób mieszkających za granicą

## 1. Wstęp / Przegląd

**Opis funkcjonalności**  
Webowa platforma społecznościowa (web-first) skierowana do ekspatów, migrantów zarobkowych, studentów międzynarodowych, cyfrowych nomadów oraz ich rodzin.  
Główne możliwości w MVP:

- rejestracja i profil z kluczowymi informacjami o lokalizacji i pochodzeniu
- personalizowany feed treści lokalnych
- tworzenie postów (tekst + zdjęcia, ankiety, wydarzenia, pytania, oferty/szukam)
- prywatne wiadomości 1:1
- obserwowanie użytkowników i podstawowe powiadomienia

**Problem do rozwiązania**  
Brak dedykowanej, uporządkowanej i przyjaznej przestrzeni online dla cudzoziemców mieszkających za granicą.  
Istniejące rozwiązania (grupy na FB, Reddit, Telegram, WhatsApp) są chaotyczne, trudne do wyszukiwania, często pełne spamu i toksycznych treści, a wyszukiwanie lokalnych informacji zajmuje dużo czasu.

**Cel**  
Stworzenie szybkiego, bezpiecznego i użytecznego MVP, które pozwoli użytkownikowi w ciągu < 90 sekund:  
zarejestrować się → uzupełnić profil → zobaczyć lokalne posty → opublikować pierwszy post lub wysłać wiadomość.

## 2. Cele

1. Szybki core loop użytkownika: rejestracja → profil → feed → interakcja < 90 s
2. Wysoka lokalność treści: ≥ 75–80% feedu to posty z tego samego miasta/kraju
3. Wielojęzyczność od startu: interfejs + treści w minimum 3 językach (en + 2 lokalne)
4. Prostota i maintainability: czytelny kod, architektura łatwa do rozwijania przez mały zespół
5. Śledzenie i historia: każdy post, każdy komentarz i każda wiadomość musi mieć jasno zapisane kto to napisał, kiedy dokładnie to napisał

## 3. User Stories

**US-1: Szybka rejestracja i profil**  
Jako nowy użytkownik (ekspat)  
Chcę zarejestrować się i uzupełnić kluczowe informacje o sobie w < 2 minuty  
Aby od razu zobaczyć treści z mojego miasta i móc nawiązać kontakt

**US-2: Personalizowany feed**  
Jako zalogowany użytkownik  
Chcę widzieć przede wszystkim posty z mojego obecnego miasta i kraju  
Aby treści były dla mnie praktyczne i angażujące

**US-3: Publikowanie treści**  
Jako użytkownik  
Chcę łatwo stworzyć post (tekst + zdjęcia / ankieta / pytanie / wydarzenie / oferta)  
Aby zadać pytanie, podzielić się doświadczeniem lub zorganizować spotkanie

**US-4: Prywatne wiadomości**  
Jako użytkownik  
Chcę wysłać prywatną wiadomość do innej osoby  
Aby umówić się na kawę, tandem językowy, pomoc w urzędzie itp.

**US-5: Obserwowanie i powiadomienia**  
Jako użytkownik  
Chcę obserwować ciekawe profile i otrzymywać powiadomienia o nowych interakcjach  
Aby nie przegapić ważnych treści i odpowiedzi

## 4. Wymagania Funkcjonalne

**FR-1: Rejestracja & Logowanie**

- Email + hasło
- Pola obowiązkowe: email, kraj pobytu, miasto, narodowość, języki (min. 1)
- Opcjonalne: zdjęcie profilowe, bio (≤ 500 znaków), tagi zainteresowań

**FR-2: Profil użytkownika**

- Wyświetlanie: zdjęcie, bio, lokalizacja (kraj + miasto), narodowość, języki, tagi
- Edycja profilu + możliwość wersji bio w 2–3 językach
- Lista obserwowanych / obserwujących (prosta lista)

**FR-3: Feed / Tablica**

- Sortowanie domyślne: geolokalizacja > podobieństwo tagów > obserwowani > najnowsze
- Filtry szybkie: Najnowsze · Najbliżej mnie · Popularne · Tylko obserwowani
- Infinite scroll

**FR-4: Tworzenie postów**  
Typy treści w MVP:

- Tekst + maksymalnie 10 zdjęć
- Ankieta (1 pytanie, 2–4 opcje)
- Wydarzenie (data, godzina, miejsce + link do mapy)
- Pytanie otwarte
- Oferta / Szukam (usługi, mieszkania, przejazd, tandem językowy)

**FR-5: Interakcje społeczne**

- Like / Serducho
- Komentarze (wielopoziomowe)
- Udostępnianie posta
- Obserwuj / przestań obserwować
- Powiadomienia (web + email): like, komentarz, nowa wiadomość, follow, odpowiedź

**FR-6: Wiadomości prywatne**

- Czaty 1:1
- Obsługiwane formaty: tekst, zdjęcia, emoji-reakcje
- Grupy czatowe – poza MVP

**FR-7: Wielojęzyczność**

- Interfejs: angielski + polski + rosyjski (i18n)
- Treści użytkowników: możliwość dodania wersji językowej do posta

## 5. Non-Goals (Poza zakresem MVP)

- Aplikacja mobilna natywna
- Zaawansowane grupy / kanały tematyczne
- Interaktywna mapa wydarzeń
- Kategorie ogłoszeń z wyszukiwarką
- Weryfikacja tożsamości / badge „verified”
- Monetyzacja / reklamy
- Powiadomienia push (web push, FCM)
- Posty z wideo / nagraniami głosowymi
- Edycja / usuwanie posta po publikacji (tylko admin)
- Zaawansowane AI rekomendacje / moderacja treści
- Raportowanie / Moderacja

## 6. Design Considerations

**6.1 Proponowana architektura**

- Backend: Kotlin + Spring Boot 4
- Frontend: React 18 + TypeScript + Vite
- Baza danych: PostgreSQL

## 7. Technical Considerations

**7.1 Środowiska**

- local (docker-compose)
- staging
- production

**7.2 Bezpieczeństwo (minimum)**

- HTTPS everywhere
- Rate limiting (na rejestrację, logowanie, wysyłanie wiadomości)
- Hasła: bcrypt
- JWT: short-lived access token + refresh token

## 8. Open Questions

1. Maksymalna liczba zdjęć w jednym poście?  
   → 10
2. Czy włączamy dark mode już w MVP?  
   → Tak, jeśli czas pozwoli (łatwo dodać w Tailwind / CSS)
3. Minimalny wiek użytkownika?  
   → 16+ (z potwierdzeniem w regulaminie)

## 10. Implementation Notes

**10.1 Sugerowana kolejność realizacji (MVP)**

1. Autentykacja + profil użytkownika
2. CRUD postów + upload zdjęć
3. Feed read-only + podstawowy algorytm sortowania
4. Tworzenie i wyświetlanie różnych typów postów
5. Wiadomości prywatne 1:1 (WebSocket)
6. Obserwowanie + powiadomienia
7. Deployment, monitoring, podstawowe metryki

**10.2 Minimalny Testing Checklist**

- Rejestracja → uzupełnienie profilu → widoczny w feedzie
- Stworzenie posta → widoczny u innych użytkowników w tym samym mieście
- Wiadomość wysłana → odebrana w czasie rzeczywistym

---

**Dokument przygotowany**: 2026-02-11  
**Ostatnia aktualizacja**: 2026-02-11  
**Autor**: [Grok]
