# Home Finder

A comprehensive mortgage calculator and property tracking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 Mortgage Calculator with affordability analysis
- 🏠 Property tracking and comparison
- 🗺️ Interactive map view
- 💾 Data persistence
- 📱 Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- React Hooks

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kjoyner12/home-finder.git
cd home-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
home-finder/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Home page (Calculator)
│   │   ├── properties/        # Properties page
│   │   └── map/              # Map view page
│   ├── components/            # Reusable components
│   │   ├── calculator/       # Calculator components
│   │   ├── properties/       # Property tracking components
│   │   ├── map/             # Map visualization components
│   │   └── layout/          # Layout components
│   └── lib/                  # Utilities and helpers
└── public/                   # Static files
```

## Development Roadmap

- [x] Project setup
- [x] Basic navigation
- [ ] Mortgage calculator implementation
- [ ] Property tracking
- [ ] Map integration
- [ ] Data persistence
- [ ] Deployment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.