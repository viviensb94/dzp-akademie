# FörderDigital · Vertriebs-CRM — Kundenreisen

Statisches, interaktives HTML-Mockup des FörderDigital Vertriebs-CRM für die
Fördermittelberatung (§82 SGB III / QCG). Kein Backend, keine Build-Schritte —
reines HTML/CSS/JS, direkt deploybar. Alle Skripte sind vollständig und in sich
geschlossen (jede Datei läuft eigenständig).

## Struktur

```
index.html                 Hub-Seite mit Links zu allen Kundenreisen
gespraech-1.html           Gespräch 1 · Erstgespräch (Beratung & Zusage) — 9 Phasen
gespraech-2.html           Gespräch 2 · Update-Call (5 Werktage später) — 4 Szenarien
abschluss-ba-upload.html   Abschluss · Begleiteter BA-Upload / Einreichung — 4 Schritte
akademie.html               DZP Akademie · 6 Module (inkl. Strategien) + Abschlusstest
vercel.json                Clean-URL-Konfiguration (z. B. /gespraech-1 statt .html)
```

## Der Prozess-Bogen

1. **Gespräch 1 — Beratung & Zusage:** Eröffnung, Förderprogramm, Live-Förderrechner,
   Mitarbeiter-Qualifizierung, Kosten & Zusage mit Zeit-Check (Standard vs. Express),
   Portal-Einladung, Mitarbeiter einladen, BA-Portal-Zugang (mit Schritt-für-Schritt-
   Registrierung), Übergabe & Rückruftermin (Faustregel: Express 3 Werktage / Standard 5).
2. **Gespräch 2 — Update-Call:** Live-Cockpit liest den Portal-Stand; der Leitfaden passt
   sich an (Nichts getan / Läuft an / Fast fertig / Alles fertig). Zoom-Beratung nur, wenn
   nichts getan wurde; iPad-Motivation; sauberer Ausstieg; 48-Stunden-Antrag nach Check-Up.
3. **Abschluss — Begleiteter BA-Upload:** Fertige, unterschriebene Unterlagen gemeinsam ins
   BA-Portal hochladen und den Antrag einreichen. Abschluss-Status-Panel.

## Deployen auf Vercel

**Option A — Drag & Drop (am schnellsten):**
1. Ordner entpacken.
2. Auf [vercel.com/new](https://vercel.com/new) gehen, eingeloggt sein.
3. Den entpackten Ordner per Drag & Drop auf die Seite ziehen.
4. Fertig — Vercel erkennt es automatisch als statisches Projekt.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
cd dzp-vercel
vercel            # Vorschau
vercel --prod     # Produktion
```

**Option C — GitHub-Import:**
1. Ordnerinhalt in ein neues GitHub-Repo pushen.
2. vercel.com → „Add New… → Project" → Repo auswählen → Import.
3. Framework Preset „Other" (kein Build-Step nötig).

## Hinweise für die Entwicklung

- Die zentralen Geschäftsregeln in Gespräch 1 liegen gebündelt im `REGELN`-Objekt am
  Anfang des `<script>` (Fördersätze, Teilzeit-Gewichtung, Erste-Runde-Regel, Rückruf-
  Werktage Express/Standard, Tippgeber-Honorarvarianten) — dort zentral anpassbar.
- Das Kostenmodell wird automatisch aus dem hinterlegten Tippgeber abgeleitet
  (`variantForTippgeber` + `REGELN.tippgeberVarianten`): Rüdiger → 10 %, FMI → 15 %,
  sonst kostenlos.
- Der begleitete BA-Upload ist bewusst als leichte Orientierung gehalten; die exakten
  Portal-Schritte werden im echten System / manuell abgebildet.

## Aktualisieren

Bei gleichem Vercel-Projekt bleibt der Link stabil. Neue Version: Datei ersetzen und
erneut deployen.


## Login (Supabase)

Die Akademie ist jetzt durch ein echtes Login geschützt (E-Mail + Passwort,
Passwort-vergessen, Passwort ändern) auf Basis von Supabase.

- `akademie-login.html` — Anmeldung
- `akademie-reset.html` — neues Passwort per E-Mail-Link
- `akademie-konto.html` — Passwort ändern / abmelden
- `dzp-config.js` — **hier** Supabase-URL + anon key eintragen (eine Datei)
- Einrichtung Schritt für Schritt: **SETUP-SUPABASE.md**

Ohne eingetragene Keys läuft die Akademie im Vorschaumodus (ohne Login).
Der Hub verlinkt die Akademie-Kachel auf `/akademie-login`.
