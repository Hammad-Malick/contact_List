# Contact Management Application

A responsive single-page Angular application for customer service representatives to easily view and interact with customer contact data. Built with Angular 19, TypeScript, and SCSS.

## Features

- **Contact List**: Browse through all contacts with search functionality
- **Contact Details**: View detailed information for selected contacts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data**: Fetches contact data from MockAPI.io
- **Modern UI**: Clean and minimal interface matching the Figma design

## Tech Stack

- **Angular 19** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Styling with variables and nesting
- **RxJS** - Reactive programming for data handling
- **MockAPI.io** - REST API for contact data

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd contact-management
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
ng serve
```

2. Open your browser and navigate to:
```
http://localhost:4200
```

The application will automatically reload if you make any changes to the source files.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── contact-list/       # List of all contacts
│   │   └── contact-details/    # Detailed view of selected contact
│   ├── models/
│   │   └── contact.model.ts    # TypeScript interfaces
│   ├── services/
│   │   └── contact.ts          # API service for fetching data
│   ├── app.ts                  # Main app component
│   ├── app.html                # Main app template
│   └── app.scss                # Main app styles
├── styles.scss                 # Global styles
└── index.html                  # Main HTML file
```

## API Endpoints

The application uses MockAPI.io with the following endpoints:

- **GET** `/contact` - Fetch all contacts
- **GET** `/contact/{id}` - Fetch a specific contact
- **GET** `/contact/{id}/email_addresses` - Fetch email addresses for a contact

Base URL: `https://688e68f2a459d5566b14df19.mockapi.io/api/v1`

## Component Details

### ContactListComponent
- Displays a searchable list of contacts
- Shows contact avatar, name, title, and online status
- Includes action buttons for chat, call, and more options
- Emits selected contact to parent component

### ContactDetailsComponent
- Shows detailed information for the selected contact
- Displays bio, emails, phone numbers, meeting link, and social media
- Fetches additional email data from the API
- Responsive layout for mobile devices

## Styling

The application uses custom SCSS without any component libraries. Key features:
- Flexbox and CSS Grid for responsive layouts
- Custom scrollbars
- Smooth transitions and hover effects
- Mobile-first responsive design
- Color scheme matching the Figma design

## Build for Production

To build the application for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Demo Video

https://www.loom.com/share/bfa24d193550459f91b2fc3523302d89

