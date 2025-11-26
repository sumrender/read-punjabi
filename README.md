# Punjabi Reading App

A minimalist web application designed to help beginners learn to read Punjabi (Gurmukhi script). The app runs entirely in the browser, serving static lesson content to guide users through five progressive reading levels.

## 📚 Overview

This Angular-based web application enables users to progress from zero literacy to basic reading comprehension in Punjabi (Gurmukhi script). The app features a clean, mobile-first interface with audio playback, transliteration support, and customizable settings.

### Learning Levels

1. **Alphabet Recognition** - Master the Gurmukhi alphabet (35+ letters)
2. **Words** - Learn common Punjabi words
3. **Short Sentences** - Practice reading simple sentences
4. **Paragraphs** - Read longer text passages
5. **Stories** - Engage with simple stories

## ✨ Features

- **Audio Playback** - Hear correct pronunciation for letters, words, and sentences
- **Transliteration Toggle** - View Latin script transliteration for support
- **Meaning Toggle** - Access English translations on-demand
- **Progressive Learning** - Navigate through 5 difficulty levels
- **Customizable Settings** - Adjust font size and toggle dark/light theme
- **Mobile-First Design** - Responsive interface optimized for all devices
- **Privacy-Focused** - No accounts, no tracking, runs entirely in the browser

## 🛠️ Tech Stack

- **Framework**: Angular 21
- **Language**: TypeScript (Strict Mode)
- **Styling**: SCSS with CSS Variables
- **Font**: Noto Sans Gurmukhi (Google Fonts)
- **State Management**: Angular Signals & Services

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (v11.6.1 or compatible version)
- **Angular CLI** (included as dev dependency)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd punjabi-reading-app
```

2. Install dependencies:
```bash
npm install
```

### Development Server

Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. This build is optimized for production deployment.

### Watch Mode

Build the project in watch mode for development:

```bash
npm run watch
```

## 📁 Project Structure

```
punjabi-reading-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/              # Home page component
│   │   │   ├── lesson-list/       # Lesson list component
│   │   │   ├── lesson-viewer/     # Lesson viewer component
│   │   │   └── settings/          # Settings component
│   │   ├── models/
│   │   │   └── lesson-item.interface.ts
│   │   ├── services/
│   │   │   ├── audio.service.ts   # Audio playback service
│   │   │   ├── lesson.service.ts  # Lesson data service
│   │   │   └── theme.service.ts   # Theme management service
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   ├── assets/                    # Static assets (JSON, images, audio) served by Angular
│   │   └── lessons/               # JSON lesson files
│   │       ├── level-1.json
│   │       ├── level-2.json
│   │       ├── level-3.json
│   │       ├── level-4.json
│   │       └── level-5.json
│   └── index.html
├── angular.json
├── package.json
└── tsconfig.json
```

## 🎯 Key Components

- **Home Component** - Landing page with level selection menu
- **Lesson List Component** - Displays available lessons for a selected level
- **Lesson Viewer Component** - Main learning interface with audio, transliteration, and meaning toggles
- **Settings Component** - Font size and theme customization

## 🔧 Services

- **LessonService** - Fetches JSON data and manages current lesson state
- **AudioService** - Manages HTML5 Audio playback
- **ThemeService** - Handles dark/light mode toggling with LocalStorage persistence

**Note**: This app requires no backend services, user accounts, or authentication. All data is static and served from JSON files, ensuring privacy and simplicity.

