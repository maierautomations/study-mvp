# PRD – KI-Lernapp für Studierende (MVP)

## 1. Ziel & Vision

**Ziel**  
Studierenden eine interaktive WebApp bieten, um sich mit ihren eigenen Unterlagen fokussiert auf Prüfungen vorzubereiten – mit KI-generierten Quizfragen und einem Chat, der die Inhalte erklärt.

**Vision (1–2 Jahre)**  
Der Standard-Lernmodus für Studierende, bevor sie in eine Klausur gehen: Skript hochladen, Fragen beantworten, Verständnis checken, Fortschritt sehen.

---

## 2. Zielgruppe & Use Cases

### Primäre Zielgruppe

- Bachelor- & Masterstudierende an Uni/FH
- Typischerweise 19–28 Jahre
- Tech-affin, aber überfordert mit Infos und Unterlagen

### Personas

**1. Lena, 21, BWL**

- 5 Module parallel, viele PDFs, Notizen in Notion.
- Nutzt das Tool, um pro Modul schnell 20–30 Fragen durchzugehen und „Prüfungsreife“ zu fühlen.

**2. Max, 24, Informatik**

- Viele Folien, Skripte, wenig Struktur.
- Nutzt vor allem den Chat, um Konzepte erklärt zu bekommen und sich Fragen dazu zu generieren.

**3. Sara, 27, berufsbegleitendes Studium**

- Wenig Zeit, lernt abends kurz.
- Nutzt 15–30 Minuten pro Tag, spielt Quizze, checkt Fortschritt pro Modul.

### Haupt-Use-Cases

- **UC1: Schnellstart vor der Prüfung**  
  Upload → 10–20 Fragen generieren → prüfen, wie fit man ist.

- **UC2: Lücken erkennen**  
  Anhand falscher Antworten erkennen, welche Themen unklar sind → Chat für Erklärungen nutzen.

- **UC3: Kontinuierliches Lernen**  
  Regelmäßig ein paar Fragen beantworten, Fortschrittsbalken pro Modul füllt sich.

---

## 3. Problemstatement

Studierende haben:

- verstreute Unterlagen (PDFs, Notizen, Plattformen),
- zu wenig Zeit,
- keine gute Möglichkeit, aus ihren eigenen Materialien strukturierte, aktive Lernroutinen (Quiz, Fragen) zu generieren.

Aktuelle Tools:

- sind nur Dateiablagen,
- oder generische KI-Chats ohne Lernstruktur,
- oder zu komplex in der Bedienung.

---

## 4. Value Proposition

**Produktversprechen**

> „Lade deine Skripte hoch und lerne in wenigen Minuten mit smarten Quizfragen und einem Erklär-Chat – inklusive sichtbarem Lernfortschritt pro Modul.“

Kernelemente:

- Minimaler Setup-Aufwand (Modul + Upload).
- Aktives Lernen (Quiz) statt passives Lesen.
- Klarer Fortschritt pro Modul (Gamification).

---

## 5. MVP-Scope

### 5.1 Core Features (MUST-HAVE)

1. **User Management**

   - Auth/Signup/Login via Clerk (Email + ggf. Google OAuth).

2. **Module / Kurse**

   - Module anlegen, umbenennen, löschen.
   - Felder: Titel, optional Prüfungsdatum.

3. **Dokumenten-Upload**

   - Upload von **PDFs** pro Modul (Drag & Drop).
   - Speicherung in z.B. Supabase Storage.
   - Hintergrundverarbeitung:
     - Text-Extraktion
     - Chunking
     - Embedding
     - Speicherung im Vektor-Store (pro Modul).

4. **KI-Chat (RAG)**

   - Chat-UI auf Modul-Detailseite (oder global, aber modulgebunden).
   - Kontext: relevante Chunks aus Dokumenten des gewählten Moduls.
   - Typische Fragen: „Erkläre X“, „Fasse Kapitel Y zusammen“.

5. **Quizgenerator**

   - Flow:
     1. Modul wählen.
     2. Anzahl Fragen wählen (5 / 10 / 20).
     3. System generiert Multiple-Choice-Fragen basierend auf Modul-Inhalten:
        - Frage
        - 3–4 Antwortoptionen
        - richtige Lösung
        - (optional) Erklärungstext
   - Quiz-UI:
     - Eine Frage nach der anderen.
     - Antwort wählen, Feedback erhalten.
     - Punkte-Anzeige.

6. **Gamification (MVP)**

   - Punkte-System:
     - +10 Punkte pro richtiger Antwort.
   - Fortschrittsbalken pro Modul:
     - z.B. 0–100% basierend auf Anzahl beantworteter Fragen (Zielwert z.B. 100 Fragen).

7. **Dashboard**

   - Übersicht über alle Module:
     - Fortschrittsbalken pro Modul.
     - Punkte pro Modul.
     - „Zuletzt gelernt“.
   - CTA: „Neues Quiz starten“.

8. **Payments (Stripe – simpel)**
   - Free-Tier:
     - z.B. 1 Modul, begrenzte Anzahl Fragen/Monat.
   - Pro-Tier:
     - mehrere Module, höhere Limits.
   - Stripe-Checkout; Abo-Status im Userprofil gespeichert.

### 5.2 Nice-to-Have / out-of-scope für MVP

- Karteikarten-Generator.
- Freitext-Fragen (offene Fragen).
- Badges, Level, Streaks, Leaderboards.
- Unterstützung weiterer Dateiformate (DOCX, PPTX, Notion-Import).
- Großes Analytics-Dashboard.
- Native Mobile Apps.

---

## 6. User Flows

### Flow 1: Onboarding

1. Landing Page → CTA „Jetzt starten“.
2. Signup/Login via Clerk.
3. Onboarding-Schritte:
   - Erstes Modul anlegen.
   - Erstes Skript (PDF) hochladen.
   - CTA „Erzeuge dein erstes Quiz“.

### Flow 2: Modul anlegen

1. Klick auf „Neues Modul“.
2. Formular: Name, optional Prüfungsdatum.
3. Modul erscheint in der Übersicht.

### Flow 3: Dokument hochladen

1. Auf Modul-Detailseite → Bereich „Dokumente“.
2. Drag & Drop PDF.
3. Status „Wird verarbeitet…“.
4. Nach Indexierung: Status „Bereit zum Lernen“.

### Flow 4: Quiz starten

1. Auf Modul-Detailseite → Button „Quiz starten“.
2. Anzahl Fragen wählen.
3. Fragen werden generiert.
4. Quiz-Ansicht mit:
   - Frage
   - Antwortoptionen
   - Feedback (richtig/falsch)
   - Punktestand
5. Abschlussansicht mit:
   - % richtige Antworten
   - Punkte
   - CTA „Noch ein Quiz“ oder „Fragen im Chat klären“.

### Flow 5: Chat nutzen

1. Auf Modul-Detailseite → Tab „Chat“.
2. User stellt Frage zum Modul.
3. System zieht relevante Chunks (RAG) und generiert Antwort.
4. Optional: Verweis auf Dokumentstellen in der Antwort.

---

## 7. UX/UI-Anforderungen (High-Level)

- Cleanes, modernes UI (Next.js + Tailwind + shadcn/ui).
- Dashboard mit Modul-Karten (Fortschrittsbalken, Punkte).
- Modul-Detailseite mit Tabs:
  - Übersicht
  - Dokumente
  - Quiz
  - Chat
- Gamification sichtbar:
  - Punkte im Header oder in der Sidebar.
  - Fortschrittsbalken prominent pro Modul.
- Klarer Status:
  - „Noch keine Dokumente hochgeladen.“
  - „Dokument wird verarbeitet.“
  - „Bereit zum Lernen.“

---

## 8. Technische Anforderungen

### Architektur (grob)

- **Framework:** Next.js (App Router), TypeScript.
- **Hosting:** Vercel.
- **Auth:** Clerk.
- **Datenbank & Storage:** Supabase (Postgres + Storage + Vector).
- **AI / RAG:**
  - Vercel AI SDK (`ai`) für Chat & Quiz-Generierung.
  - Embeddings (z.B. OpenAI) + Vektor-Store (pgvector / Supabase Vector).
- **Styling:** Tailwind CSS + shadcn/ui.

### Datenmodelle (grob)

- **User**

  - id
  - clerk_user_id
  - email
  - subscription_status (free/pro)
  - created_at

- **Module**

  - id
  - user_id
  - name
  - exam_date (optional)
  - total_points
  - total_questions_answered
  - created_at

- **Document**

  - id
  - module_id
  - storage_path
  - name
  - status (uploaded/processing/ready/error)
  - created_at

- **Chunk / Embedding**

  - id
  - module_id
  - document_id
  - chunk_text
  - embedding (vector)

- **QuizSession**

  - id
  - module_id
  - user_id
  - num_questions
  - num_correct
  - total_points_earned
  - created_at

- **Question**

  - id
  - quiz_session_id
  - module_id
  - question_text
  - options (JSON)
  - correct_option_index
  - explanation (optional)

- **Answer**
  - id
  - question_id
  - user_choice_index
  - is_correct
  - points_earned
  - answered_at

### RAG-Verhalten

- **Dateiformate (MVP):** PDF (textbasiert).
- **Indexierung:**
  - PDF → Text → Chunking (z.B. 500–1.000 Tokens) → Embeddings → Speicherung.
- **Abfragen:**
  - Chat & Quizgenerator ziehen relevante Chunks pro Modul (Top-k) und bauen Antworten/Fragen ausschließlich auf dieser Basis.

---

## 9. Gamification-Konzept (MVP)

- Punkte:
  - +10 Punkte pro richtiger Antwort.
- Fortschrittsbalken pro Modul:
  - Ziel: z.B. 100 beantwortete Fragen = 100%.
- Feedback-Texte nach Quiz:
  - „Du bist auf gutem Weg!“
  - „Noch X Fragen bis 100% in diesem Modul.“

---

## 10. Nicht-Ziele (MVP)

- Kein Karteikarten-/Spaced-Repetition-System.
- Keine Social/Community-Funktionen.
- Keine Unterstützung vieler Dateiformate (DOCX, PPTX, Bilder mit OCR).
- Keine institutionellen Accounts (Dozenten, Universitäten).
- Keine native Mobile Apps.
- Kein komplexer Lernplaner.

---

## 11. Erfolgsmetriken (MVP)

- Activation:
  - % neuer User, die in 24h:
    - ein Modul anlegen,
    - ein Dokument hochladen,
    - ein Quiz starten.
- Engagement:
  - Quizsessions pro Woche pro aktivem User.
  - Beantwortete Fragen pro Woche.
- Retention:
  - D7- und D30-Retention (User, die wiederkommen und Quizze spielen).
- Monetarisierung:
  - Conversion Free → Paid.
  - Paid Churn.

---

## 12. Risiken & offene Fragen

### Risiken

- Qualität der Quizfragen (zu trivial/falsch).
- Performance bei großen PDFs.
- AI-API-Kosten bei hoher Nutzung.
- Konkurrenz durch ähnliche Tools.

### Offene Fragen

- Wie restriktiv soll das Free-Tier sein?
- Wird Prüfungsdatum aktiv genutzt oder nur nice-to-have?
- Brauchen Nutzer früh schon Themen-Unterteilung (Kapitel) oder reicht Modul-Ebene?
