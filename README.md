# TTV Landing Page - Technical Documentation

Technisches Repository der "Taktisches Totalversagen" Community Web-Applikation.

## Tech-Stack
- **Frontend Core**: React 19.0 (TypeScript)
- **Styling**: Tailwind CSS (JIT Engine)
- **Runtime**: Browser Native ESM (via Importmaps)
- **Services**: Google Generative AI SDK (Recruitment Bot Integration)
- **Deployment**: Statisches Hosting (Vercel/Netlify/S3)

## Architektur-Übersicht
Das Projekt ist als Single Page Application (SPA) konzipiert. Die Auflösung der Abhängigkeiten erfolgt zur Laufzeit über `esm.sh`, was einen klassischen Build-Step hinfällig macht und die Ladezeiten optimiert.

### Kern-Module
- `App.tsx`: Zentraler State-Handler und Layout-Manager.
- `services/geminiService.ts`: Abstraktionslayer für die LLM-Schnittstelle.
- `components/`: Modulare UI-Einheiten (Server-Status via REST-Widget, Recruitment Bot via Stream-API).

## Konfiguration
Die Applikation benötigt folgende Umgebungsvariablen für den vollen Funktionsumfang:
- `process.env.API_KEY`: Google Gemini API Key für den Recruitment-Service.

## Lokale Ausführung
1. Repository klonen.
2. Lokalen Server starten (z.B. `npx serve` oder Vite).
3. API-Key in der Systemumgebung hinterlegen.

---
**Build-Status:** Stable | **Environment:** Production ready