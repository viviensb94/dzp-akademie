/* ============================================================
   DZP Akademie · Zentrale Konfiguration (Supabase Auth)
   ------------------------------------------------------------
   HIER trägst du die Werte aus deinem Supabase-Projekt ein:
   Supabase Dashboard → Project Settings → API
     • "Project URL"      -> DZP_SUPABASE_URL
     • "anon public" key   -> DZP_SUPABASE_ANON_KEY

   Der "anon"-Schlüssel ist ÖFFENTLICH und gehört bewusst ins
   Frontend — das ist bei Supabase so vorgesehen und sicher
   (die eigentliche Absicherung macht Supabase Auth + RLS).
   Trage NIE den "service_role"-Schlüssel hier ein.

   Solange die Platzhalter (YOUR-...) stehen, läuft die Akademie
   im Vorschaumodus OHNE Login (praktisch zum Testen).
   ============================================================ */
window.DZP_SUPABASE_URL      = 'https://YOUR-PROJECT.supabase.co';
window.DZP_SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY';

/* Optional: erlaubst du Selbst-Registrierung auf der Login-Seite?
   true  = Berater können sich selbst mit E-Mail+Passwort registrieren
   false = nur eingeladene Nutzer (Einladung über Supabase-Dashboard) — empfohlen */
window.DZP_ALLOW_SIGNUP = false;

/* ---- interne Helfer (nicht ändern) ---- */
window.dzpConfigured = function(){
  var u=window.DZP_SUPABASE_URL, k=window.DZP_SUPABASE_ANON_KEY;
  return !!(u && k && u.indexOf('YOUR-')<0 && k.indexOf('YOUR-')<0);
};
window.dzpClient = function(){
  if(!window.dzpConfigured() || !window.supabase) return null;
  if(!window.__dzpClient){
    window.__dzpClient = window.supabase.createClient(window.DZP_SUPABASE_URL, window.DZP_SUPABASE_ANON_KEY);
  }
  return window.__dzpClient;
};
