# DZP Akademie · Login mit Supabase einrichten

Die Akademie hat jetzt ein echtes Login (E-Mail + Passwort, Passwort-vergessen,
Passwort ändern). Die Nutzerverwaltung übernimmt **Supabase** (kostenloser Free-Tier).
Solange die Platzhalter in `dzp-config.js` stehen, läuft alles im **Vorschaumodus
ohne Login** — praktisch zum Ausprobieren.

## In 6 Schritten scharfschalten

**1 · Supabase-Projekt anlegen**
- Auf [supabase.com](https://supabase.com) kostenlos registrieren → *New Project*.
- Projektname, DB-Passwort, Region (z. B. Frankfurt) wählen → erstellen.

**2 · Schlüssel holen**
- Im Projekt: *Project Settings → API*.
- Kopiere **Project URL** und den **anon public**-Schlüssel.
- ⚠️ Nur den `anon public`-Schlüssel verwenden — **niemals** den `service_role`-Schlüssel.

**3 · In `dzp-config.js` eintragen**
```js
window.DZP_SUPABASE_URL      = 'https://deinprojekt.supabase.co';
window.DZP_SUPABASE_ANON_KEY = 'eyJhbGciOi... (dein anon key)';
window.DZP_ALLOW_SIGNUP      = false;  // false = nur eingeladene Nutzer (empfohlen)
```

**4 · E-Mail-Login aktivieren**
- *Authentication → Providers → Email* → aktivieren.
- Für einen internen Berater-Zugang empfehle ich **Einladung statt offener Registrierung**:
  *Authentication → Sign In / Providers* → „Allow new users to sign up" **aus**, und `DZP_ALLOW_SIGNUP=false`.

**5 · Weiterleitungs-URLs setzen** (wichtig fürs Passwort-Zurücksetzen)
- *Authentication → URL Configuration*
- **Site URL:** deine Vercel-Domain, z. B. `https://dzp-akademie.vercel.app`
- **Redirect URLs** hinzufügen:
  - `https://DEINE-DOMAIN/akademie-reset.html`
  - `https://DEINE-DOMAIN/akademie-login.html`

**6 · Berater anlegen**
- *Authentication → Users → Invite user* → E-Mail eingeben.
- Der Berater bekommt eine Mail, setzt sein Passwort und ist drin.
- (Oder, wenn `DZP_ALLOW_SIGNUP=true`: er registriert sich selbst auf der Login-Seite.)

## Deployen auf Vercel
Den kompletten Ordner wie gehabt per Drag & Drop auf [vercel.com/new](https://vercel.com/new)
ziehen (oder das ZIP entpacken und hochladen). Danach:
`https://DEINE-DOMAIN/akademie-login` → anmelden → Akademie.

## Was der Nutzer kann
- **Anmelden** mit E-Mail + Passwort (`akademie-login.html`)
- **Passwort vergessen** → Link per Mail → neues Passwort (`akademie-reset.html`)
- **Passwort ändern** & **Abmelden** im Konto (`akademie-konto.html`, auch über „⚙ Konto" in der Akademie-Sidebar)

## Ehrlich zur Grenze (bitte lesen)
Das Login schützt den **Zugang und die Nutzerverwaltung** sauber. Da die Akademie
aber eine **statische Seite** ist, liegt die Datei `akademie.html` technisch weiterhin
öffentlich auf dem Server — wer die genaue URL kennt, könnte sie theoretisch direkt
öffnen und den JS-Login umgehen. Für ein internes Schulungstool ist das in aller Regel
ausreichend (echte Konten, echtes Passwort-Reset, Zugang entziehbar).

Wenn du **harten** Schutz brauchst (Datei ist ohne gültige Anmeldung gar nicht abrufbar),
ist der nächste Schritt eine **Vercel-Middleware / serverseitige Prüfung** oder Vercel's
eigener Passwortschutz. Sag Bescheid — das kann ich als Ausbaustufe ergänzen.

## Konfig-Referenz
Alle Einstellungen liegen zentral in **`dzp-config.js`** — nur diese eine Datei musst
du anfassen. Der Rest funktioniert automatisch.
