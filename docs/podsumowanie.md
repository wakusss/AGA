# AGA Chat – Podsumowanie praktyk

**Okres**: 9 lutego – 6 marca 2026  
**Osoby odpowiedzialne**: Gleb Sinkevich (Backend), Oleksandr Hereha (Frontend), Arsenii Semenyako (Frontend)   
**Cel miesiąca**: efektywnie współpracować w 3-osobowym zespole, opanować nowe technologie i stworzyć działający testowy projekt. 

## 1. Co było zaplanowane na miesiąc (z PRD_MVP i poprzedniego planu)

- [ ] Autoryzacja (rejestracja, logowanie, JWT, podstawowy profil po rejestracji)
- [ ] Obowiązkowe pola profilu (kraj, miasto, języki)
- [ ] Wgrywanie i wyświetlanie zdjęcia profilowego
- [ ] Tworzenie i wyświetlanie zwykłych postów tekstowych + zdjęć
- [ ] Tablica (feed) z podstawową sortowaniem według miasta/kraju
- [ ] Polubienia i komentarze pod postami
- [ ] Usuwanie własnego posta
- [ ] Deployment na Render + PostgreSQL
- [ ] Podstawowa dokumentacja API (Swagger)

## 2. Co udało się zrobić w rzeczywistości (zielone – w pełni, żółte – częściowo)

### W pełni zrealizowane i działające
- Rejestracja i logowanie przez email + hasło (JWT access)
- Podstawowy profil po rejestracji (username, bio, upload avatara) oraz zmiana danych w profilu
- Tworzenie i wyświetlanie postów (tekst + zdjęcie)
- Polubienia postów (toggle)
- Usuwanie własnego posta (z weryfikacją autora)
- Feed - wyświetlenie wszystkich postów na platformie
- Deployment Backend aplikacji na Render (Spring boot + PostgreSQL)
- Dokumentacja OpenAPI / Swagger
- Docker + docker-compose do lokalnego developmentu

### Częściowo zrealizowane (jest, ale surowe / nie dokończone)
- Komentarze pod postami (można utworzyć, ale nie można zmieniać oraz brak powiadomień)
- Wyszukiwanie po treści, czasu utworzenia, ilości Like'ów/Komentarzy w Feed (zrobione po stronie backendu, ale nie ma na frontend)
- Infinite scroll na froncie (zrobione po stronie backendu, ale nie ma na frontend)
- Wyszukanie konkretnego postu/komentarza (zrobione po stronie backendu, ale nie ma na frontend)

### Nie udało się zrealizować / odłożone
- Typy postów: ankieta, wydarzenie, pytanie (tylko zwykły tekst + zdjęcie)
- Wiadomości prywatne 1:1 (WebSocket / chat)
- Wielojęzyczne posty (ręczne dodawanie tłumaczenia)
- Powiadomienia e-mail
- Rate limiting na logowanie / tworzenie postów

## 3. Najważniejsze osiągnięcia miesiąca (3–5 kluczowych punktów)

1. Pełna działająca autoryzacja + profil + wgrywanie avatara
2. Zrealizowane tworzenie, polubienie, komentowanie postów
3. Udany deployment na Render (backend + PostgreSQL) 
4. Przygotowana podstawowa dokumentacja OpenAPI (Swagger)
5. Użycie api Cloudinary do przechowywania zdjęć profilu i postów 

## 4. Największe trudności / blokery

- Mała znajomość frameworków (React na Front oraz Spring Boot na Back) - dużo czasu na naukę



**Data**: 5 marca 2026  
**Podpis**: Gleb Sinkevich  
**Status**: Gotowy do omówienia / do review
