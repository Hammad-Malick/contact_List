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

- **GET** `/contacts` - Fetch all contacts
- **GET** `/contacts/{id}` - Fetch a specific contact
- **GET** `/contacts/{id}/email_addresses` - Fetch email addresses for a contact

Base URL: `https://66f2bae571c84d805877e53f.mockapi.io/api/v1`

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

## Testing

To run unit tests (if implemented):

```bash
ng test
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues

- The MockAPI might have rate limiting
- Some contact data is mocked/hardcoded for demo purposes

## Future Enhancements

- Add pagination for large contact lists
- Implement real-time search with debouncing
- Add unit and integration tests
- Implement contact editing functionality
- Add offline support with service workers

## Demo Video

[Add Loom video link here showing the application functionality]

