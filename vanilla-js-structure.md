# Vanilla JavaScript App Structure

## Root Structure
```
sakura-vanilla/
├── index.html                          # Main entry point
├── global.css                          # Global styles (Tailwind-like utility classes)
├── global.js                           # Global JavaScript utilities and router
├── package.json                        # Dependencies for build tools
├── README.md                           # Project documentation
│
├── assets/                             # Static assets
│   ├── icons/                          # SVG icons (Lucide icons converted)
│   │   ├── dashboard.svg
│   │   ├── file-text.svg
│   │   ├── shield.svg
│   │   ├── list.svg
│   │   ├── search.svg
│   │   ├── wand.svg
│   │   ├── settings.svg
│   │   ├── filter.svg
│   │   ├── eye.svg
│   │   ├── users.svg
│   │   ├── smartphone.svg
│   │   ├── trending.svg
│   │   └── bell.svg
│   ├── images/                         # Images and logos
│   │   ├── logo.png
│   │   └── placeholder.svg
│   └── fonts/                          # Custom fonts if needed
│
├── components/                         # Reusable UI components
│   ├── layout/
│   │   ├── header/
│   │   │   ├── header.html             # Header component template
│   │   │   ├── header.css              # Header-specific styles
│   │   │   └── header.js               # Header functionality
│   │   └── sidebar/
│   │       ├── sidebar.html            # Sidebar component template
│   │       ├── sidebar.css             # Sidebar-specific styles
│   │       └── sidebar.js              # Sidebar navigation logic
│   │
│   ├── ui/                             # UI components
│   │   ├── button/
│   │   │   ├── button.html             # Button component template
│   │   │   ├── button.css              # Button variants and styles
│   │   │   └── button.js               # Button component logic
│   │   ├── card/
│   │   │   ├── card.html               # Card component template
│   │   │   ├── card.css                # Card styles
│   │   │   └── card.js                 # Card component logic
│   │   ├── input/
│   │   │   ├── input.html              # Input component template
│   │   │   ├── input.css               # Input styles
│   │   │   └── input.js                # Input validation and logic
│   │   ├── modal/
│   │   │   ├── modal.html              # Modal base template
│   │   │   ├── modal.css               # Modal styles and animations
│   │   │   └── modal.js                # Modal functionality
│   │   ├── badge/
│   │   │   ├── badge.html              # Badge/status component
│   │   │   ├── badge.css               # Badge styles
│   │   │   └── badge.js                # Badge logic
│   │   ├── dropdown/
│   │   │   ├── dropdown.html           # Dropdown component
│   │   │   ├── dropdown.css            # Dropdown styles
│   │   │   └── dropdown.js             # Dropdown functionality
│   │   ├── table/
│   │   │   ├── table.html              # Table component
│   │   │   ├── table.css               # Table styles
│   │   │   └── table.js                # Table sorting/filtering
│   │   ├── pagination/
│   │   │   ├── pagination.html         # Pagination component
│   │   │   ├── pagination.css          # Pagination styles
│   │   │   └── pagination.js           # Pagination logic
│   │   ├── toast/
│   │   │   ├── toast.html              # Toast notification template
│   │   │   ├── toast.css               # Toast styles and animations
│   │   │   └── toast.js                # Toast notification system
│   │   ├── tabs/
│   │   │   ├── tabs.html               # Tabs component
│   │   │   ├── tabs.css                # Tabs styles
│   │   │   └── tabs.js                 # Tabs functionality
│   │   ├── accordion/
│   │   │   ├── accordion.html          # Accordion component
│   │   │   ├── accordion.css           # Accordion styles
│   │   │   └── accordion.js            # Accordion functionality
│   │   ├── progress/
│   │   │   ├── progress.html           # Progress bar component
│   │   │   ├── progress.css            # Progress styles
│   │   │   └── progress.js             # Progress functionality
│   │   └── loading/
│   │       ├── loading.html            # Loading spinner template
│   │       ├── loading.css             # Loading animations
│   │       └── loading.js              # Loading state management
│   │
│   └── dashboard/                      # Dashboard-specific components
│       ├── access-card/
│       │   ├── access-card.html        # Access card template
│       │   ├── access-card.css         # Access card styles
│       │   └── access-card.js          # Access card logic
│       └── notification-card/
│           ├── notification-card.html  # Notification card template
│           ├── notification-card.css   # Notification card styles
│           └── notification-card.js    # Notification card logic
│
├── pages/                              # Individual pages
│   ├── dashboard/
│   │   ├── dashboard.html              # Dashboard page
│   │   ├── dashboard.css               # Dashboard-specific styles
│   │   └── dashboard.js                # Dashboard functionality
│   ├── my-requests/
│   │   ├── my-requests.html            # My Requests page
│   │   ├── my-requests.css             # My Requests styles
│   │   └── my-requests.js              # My Requests functionality
│   ├── my-access/
│   │   ├── my-access.html              # My Access page
│   │   ├── my-access.css               # My Access styles
│   │   └── my-access.js                # My Access functionality
│   ├── report-catalogue/
│   │   ├── report-catalogue.html       # Report Catalogue page
│   │   ├── report-catalogue.css        # Report Catalogue styles
│   │   └── report-catalogue.js         # Report Catalogue functionality
│   ├── request-access-guided/
│   │   ├── request-access-guided.html  # Guided Request page
│   │   ├── request-access-guided.css   # Guided Request styles
│   │   └── request-access-guided.js    # Guided Request multi-step logic
│   ├── request-access-advanced/
│   │   ├── request-access-advanced.html # Advanced Request page
│   │   ├── request-access-advanced.css  # Advanced Request styles
│   │   └── request-access-advanced.js   # Advanced Request functionality
│   ├── request-escalated/
│   │   ├── request-escalated.html      # Escalated Request page
│   │   ├── request-escalated.css       # Escalated Request styles
│   │   └── request-escalated.js        # Escalated Request functionality
│   └── not-found/
│       ├── not-found.html              # 404 page
│       ├── not-found.css               # 404 styles
│       └── not-found.js                # 404 functionality
│
├── modals/                             # Modal components
│   ├── access-details/
│   │   ├── access-details-modal.html   # Access details modal
│   │   ├── access-details-modal.css    # Access details styles
│   │   └── access-details-modal.js     # Access details logic
│   ├── notification-details/
│   │   ├── notification-details-modal.html
│   │   ├── notification-details-modal.css
│   │   └── notification-details-modal.js
│   ├── request-details/
│   │   ├── request-details-modal.html
│   │   ├── request-details-modal.css
│   │   └── request-details-modal.js
│   ├── bulk-actions/
│   │   ├── bulk-actions-modal.html
│   │   ├── bulk-actions-modal.css
│   │   └── bulk-actions-modal.js
│   ├── multiple-apps/
│   │   ├── multiple-apps-modal.html
│   │   ├── multiple-apps-modal.css
│   │   └── multiple-apps-modal.js
│   ├── escalation/
│   │   ├── escalation-modal.html
│   │   ├── escalation-modal.css
│   │   └── escalation-modal.js
│   ├── approval-workflow/
│   │   ├── approval-workflow-modal.html
│   │   ├── approval-workflow-modal.css
│   │   └── approval-workflow-modal.js
│   └── report-details/
│       ├── report-details-modal.html
│       ├── report-details-modal.css
│       └── report-details-modal.js
│
├── utils/                              # Utility functions
│   ├── api.js                          # API calls and data management
│   ├── router.js                       # Client-side routing
│   ├── dom-utils.js                    # DOM manipulation utilities
│   ├── validation.js                   # Form validation utilities
│   ├── date-utils.js                   # Date formatting utilities
│   ├── storage.js                      # Local storage management
│   ├── keyboard-navigation.js          # Keyboard navigation utilities
│   └── constants.js                    # App constants and configurations
│
├── data/                               # Mock data and state management
│   ├── mock-data.js                    # Mock API responses
│   ├── state-manager.js                # Simple state management
│   └── notification-context.js         # Notification system state
│
├── styles/                             # Additional stylesheets
│   ├── variables.css                   # CSS custom properties
│   ├── components.css                  # Component-specific styles
│   ├── utilities.css                   # Utility classes
│   ├── animations.css                  # CSS animations
│   └── responsive.css                  # Responsive design styles
│
└── build/                              # Build configuration (optional)
    ├── build.js                        # Build script
    └── dev-server.js                   # Development server
```

## Key Features Maintained:

### 1. **Routing System** (global.js + utils/router.js)
- Client-side routing matching React Router functionality
- Hash-based or History API routing
- Route guards and navigation

### 2. **Component System** (components/)
- Reusable HTML templates
- Component-specific CSS and JS
- Props-like data passing system
- Event handling and lifecycle management

### 3. **State Management** (data/state-manager.js)
- Simple reactive state management
- Context-like data sharing
- Event-driven updates

### 4. **UI Components** (components/ui/)
- All shadcn/ui components recreated
- Tailwind-like utility classes
- Consistent design system
- Accessibility features

### 5. **Modal System** (modals/)
- Centralized modal management
- Overlay and focus management
- Keyboard navigation support

### 6. **Pages Structure** (pages/)
- Each page as separate HTML/CSS/JS
- Lazy loading capabilities
- SEO-friendly structure

### 7. **Utilities** (utils/)
- API abstraction layer
- Form validation
- Date formatting
- Local storage management
- Keyboard navigation

### 8. **Mock Data** (data/)
- Same data structure as React app
- API simulation
- State persistence

## Build Process:
- Optional build system for concatenation/minification
- CSS preprocessing
- Icon optimization
- Development server with live reload

This structure maintains all the functionality of your React app while using vanilla JavaScript, HTML, and CSS. Each component is self-contained with its own HTML template, CSS styles, and JavaScript logic, making it easy to maintain and extend. 