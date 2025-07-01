# Dimensio

Eine interaktive 3D-Galerie, die verschiedene Umgebungen in einer webbasierten Virtual Reality Erfahrung vereint.

## 🌟 Überblick

Dimensio ist eine webbasierte 3D-Anwendung, die Nutzer*innen durch drei unterschiedliche interaktive Umgebungen führt: einen naturnahen Park, eine lebendige Stadt und den weiten Weltraum. Jede Szene bietet einzigartige Interaktionsmöglichkeiten und wurde entwickelt, um die Möglichkeiten moderner WebXR-Technologien zu demonstrieren.

## 🎯 Features

### Drei immersive Umgebungen
- **🌳 Park:** Naturszene mit interaktiven Büschen, an denen Beeren wachsen können
- **🏙️ Stadt:** Urbane Umgebung mit Gebäuden, Autos und einer steuerbaren Ampel
- **🚀 Weltraum:** Kosmische Szene mit rotierbaren Planeten, Kristallen und Partikeleffekten

### Interaktive Elemente
- Klick- und Hover-basierte Interaktionen
- Objekt-spezifische Animationen und Effekte
- Dynamische Statusanzeigen für Interaktionen
- Flexible Navigation zwischen Szenen

### Benutzerfreundliche Navigation
- Intuitive Button-Navigation
- Tastaturkürzel für schnelle Szenenwechsel
- Responsive UI-Elemente

## 🛠️ Technischer Stack

- **A-Frame** - WebXR Framework für 3D/VR-Entwicklung
- **JavaScript** - Interaktionslogik und Animationen
- **HTML5/CSS3** - UI und Styling
- **WebXR** - VR-Unterstützung für kompatible Geräte

## 🚀 Installation & Start

```bash
# Repository klonen
git clone [repository-url]
cd dimensio

# Lokalen Server starten (empfohlen)
python -m http.server 8000
# oder
npx serve

# Browser öffnen
open http://localhost:8000
```

## 🎮 Bedienung

### Navigation
- **Maus/Touch:** Szene erkunden und mit Objekten interagieren
- **Buttons:** Zwischen Szenen wechseln
- **Tastatur:** Schnelle Navigation (falls implementiert)

### Interaktionen
- **Park:** Auf Büsche klicken, um Beeren wachsen zu lassen
- **Stadt:** Ampel-Licht durch Klick verändern
- **Weltraum:** Planeten anklicken für Rotationsanimationen

## 📁 Projektstruktur

```
dimensio/
├── index.html          # Haupt-HTML-Datei
├── script.js           # JavaScript-Logik
├── style.css           # Styling
├── assets/             # 3D-Modelle und Texturen
└── README.md           # Diese Datei
```

## 🔧 Entwicklungsprozess

### Planung
Die Entwicklung begann mit der Konzeption drei distinkter Umgebungen, die jeweils spezifische Interaktionsmöglichkeiten bieten sollten. Ziel war es, eine Balance zwischen visueller Attraktivität und benutzerfreundlicher Interaktion zu schaffen.

### Technische Entscheidungen
A-Frame wurde als Framework gewählt aufgrund seiner:
- Einfachen Erlernbarkeit und schnellen Prototyping-Möglichkeiten
- Nativen WebXR-Unterstützung
- Guten Integration mit JavaScript für komplexe Interaktionen
- Aktiven Community und umfangreichen Dokumentation

### Herausforderungen & Lösungen
- **Event-Management:** Zentrale `handleClick`-Funktion für übersichtliche Objektinteraktionen
- **Szenenwechsel:** Implementierung einer Logik zum Zurücksetzen temporärer Objekte
- **Performance:** Optimierung durch effiziente Objektverwaltung

### Technische Erweiterungen
- Optimierte Performance für mobile Geräte
- Multiplayer-Funktionalität
- Audio-Integration für immersivere Erfahrungen


## 👥 Credits

Entwickelt als Teil eines WebXR-Workshops zur Exploration interaktiver 3D-Webanwendungen.

---

**Live Demo:** https://heutelaune.github.io/Dimensio/


