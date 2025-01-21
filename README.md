# Home Finder

A comprehensive property management application with mortgage calculator, property tracking, and map visualization.

## Features

- 📊 Mortgage Calculator with affordability analysis
- 🏠 Property tracking and comparison
- 🗺️ Interactive map visualization
- 💾 Local data persistence
- 📱 Responsive design

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kjoyner12/home-finder.git
cd home-finder
```

2. Install dependencies:
```bash
npm install
```

3. Set up map markers:
```bash
mkdir -p public
curl https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png -o public/marker-icon.png
curl https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png -o public/marker-icon-2x.png
curl https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png -o public/marker-shadow.png
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
home-finder/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Home page (Calculator)
│   │   ├── properties/        # Properties page
│   │   └── map/              # Map view page
│   ├── components/            # React components
│   │   ├── calculator/       # Calculator components
│   │   ├── properties/       # Property tracking components
│   │   ├── map/             # Map visualization components
│   │   └── layout/          # Layout components
│   ├── lib/                  # Utilities and helpers
│   └── types/               # TypeScript types
└── public/                   # Static files and images
```

## Dependencies

Main dependencies:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Leaflet/react-leaflet for mapping
- UUID for ID generation
- Radix UI components

Development dependencies:
- ESLint
- TypeScript types
- Tailwind CSS plugins

## Features by Page

### Calculator
- Monthly payment calculation
- Affordability analysis
- Interactive inputs
- Visual affordability indicators

### Properties
- Property listing and management
- Filtering and sorting
- Add/edit/delete properties
- Status tracking

### Map View
- Interactive property map
- Property markers with popups
- Map controls and navigation
- Property filtering

## Local Development

For local development, you can run:
```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## Data Storage

Currently, all data is stored locally in the browser's localStorage. No backend or database is required.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.