# Implementation Guide for Vanilla JavaScript Version

## 1. Global Files

### `index.html` - Main Entry Point
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sakura Access Management</title>
    <link rel="stylesheet" href="global.css">
    <link rel="stylesheet" href="styles/variables.css">
    <link rel="stylesheet" href="styles/components.css">
    <link rel="stylesheet" href="styles/utilities.css">
    <link rel="stylesheet" href="styles/animations.css">
    <link rel="stylesheet" href="styles/responsive.css">
</head>
<body>
    <div id="app">
        <!-- Dynamic content loaded here -->
    </div>
    
    <!-- Toast container -->
    <div id="toast-container"></div>
    
    <!-- Modal container -->
    <div id="modal-container"></div>
    
    <script src="utils/constants.js"></script>
    <script src="utils/dom-utils.js"></script>
    <script src="utils/storage.js"></script>
    <script src="utils/validation.js"></script>
    <script src="utils/date-utils.js"></script>
    <script src="utils/keyboard-navigation.js"></script>
    <script src="utils/api.js"></script>
    <script src="data/mock-data.js"></script>
    <script src="data/state-manager.js"></script>
    <script src="data/notification-context.js"></script>
    <script src="utils/router.js"></script>
    <script src="global.js"></script>
</body>
</html>
```

### `global.css` - Tailwind-like Utility Framework
```css
/* Reset and base styles */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }

/* Color system (matching your current theme) */
:root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
}

/* Utility classes */
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }

.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.flex-col { flex-direction: column; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }

.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }

.m-2 { margin: 0.5rem; }
.m-4 { margin: 1rem; }
.mx-auto { margin-left: auto; margin-right: auto; }

.w-full { width: 100%; }
.h-full { height: 100%; }
.min-h-screen { min-height: 100vh; }

.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }

.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }

.rounded { border-radius: 0.25rem; }
.rounded-md { border-radius: 0.375rem; }
.rounded-lg { border-radius: 0.5rem; }

.border { border-width: 1px; }
.border-input { border-color: hsl(var(--input)); }

.bg-background { background-color: hsl(var(--background)); }
.bg-card { background-color: hsl(var(--card)); }
.bg-primary { background-color: hsl(var(--primary)); }
.bg-secondary { background-color: hsl(var(--secondary)); }

.text-foreground { color: hsl(var(--foreground)); }
.text-primary { color: hsl(var(--primary)); }
.text-muted-foreground { color: hsl(var(--muted-foreground)); }

.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }

.transition-colors { transition-property: color, background-color, border-color; transition-duration: 150ms; }
.hover\:bg-accent:hover { background-color: hsl(var(--accent)); }

/* Component base classes */
.btn { 
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    gap: 0.5rem; 
    white-space: nowrap; 
    border-radius: 0.375rem; 
    font-size: 0.875rem; 
    font-weight: 500; 
    transition: color 150ms, background-color 150ms, border-color 150ms; 
    cursor: pointer; 
    border: none;
    height: 2.5rem; 
    padding: 0.5rem 1rem;
}

.btn:focus-visible { 
    outline: 2px solid hsl(var(--ring)); 
    outline-offset: 2px; 
}

.btn:disabled { 
    pointer-events: none; 
    opacity: 0.5; 
}

.btn-primary { 
    background-color: hsl(var(--primary)); 
    color: hsl(var(--primary-foreground)); 
}

.btn-primary:hover { 
    background-color: hsl(var(--primary) / 0.9); 
}

.btn-secondary { 
    background-color: hsl(var(--secondary)); 
    color: hsl(var(--secondary-foreground)); 
}

.btn-secondary:hover { 
    background-color: hsl(var(--secondary) / 0.8); 
}

.card { 
    border-radius: 0.5rem; 
    border: 1px solid hsl(var(--border)); 
    background-color: hsl(var(--card)); 
    color: hsl(var(--card-foreground)); 
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); 
}

.input { 
    display: flex; 
    height: 2.5rem; 
    width: 100%; 
    border-radius: 0.375rem; 
    border: 1px solid hsl(var(--input)); 
    background-color: hsl(var(--background)); 
    padding: 0.5rem 0.75rem; 
    font-size: 0.875rem; 
    transition: border-color 150ms; 
}

.input:focus-visible { 
    outline: 2px solid hsl(var(--ring)); 
    outline-offset: 2px; 
}

.input::placeholder { 
    color: hsl(var(--muted-foreground)); 
}

.input:disabled { 
    cursor: not-allowed; 
    opacity: 0.5; 
}
```

### `global.js` - Main Application Controller
```javascript
// Global application state and initialization
class SakuraApp {
    constructor() {
        this.router = new Router();
        this.stateManager = new StateManager();
        this.notificationContext = new NotificationContext();
        this.currentPage = null;
        this.components = new Map();
        
        this.init();
    }
    
    async init() {
        // Initialize router
        this.setupRoutes();
        
        // Initialize global event listeners
        this.setupGlobalEvents();
        
        // Load initial page
        await this.router.navigate(window.location.pathname || '/');
        
        // Initialize keyboard navigation
        KeyboardNavigation.init();
        
        console.log('Sakura App initialized');
    }
    
    setupRoutes() {
        this.router.addRoute('/', () => this.loadPage('dashboard'));
        this.router.addRoute('/requests', () => this.loadPage('my-requests'));
        this.router.addRoute('/access', () => this.loadPage('my-access'));
        this.router.addRoute('/catalogue', () => this.loadPage('report-catalogue'));
        this.router.addRoute('/request-access-guided', () => this.loadPage('request-access-guided'));
        this.router.addRoute('/request-access-advanced', () => this.loadPage('request-access-advanced'));
        this.router.addRoute('/request-escalated', () => this.loadPage('request-escalated'));
        this.router.addRoute('*', () => this.loadPage('not-found'));
    }
    
    async loadPage(pageName) {
        try {
            // Show loading state
            this.showLoading();
            
            // Cleanup current page
            if (this.currentPage && this.currentPage.cleanup) {
                this.currentPage.cleanup();
            }
            
            // Load page HTML
            const html = await this.loadHTML(`pages/${pageName}/${pageName}.html`);
            
            // Load page CSS
            await this.loadCSS(`pages/${pageName}/${pageName}.css`);
            
            // Load page JS
            const PageClass = await this.loadJS(`pages/${pageName}/${pageName}.js`);
            
            // Render page
            document.getElementById('app').innerHTML = html;
            
            // Initialize page
            this.currentPage = new PageClass();
            
            // Hide loading state
            this.hideLoading();
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.showError('Failed to load page');
        }
    }
    
    async loadHTML(path) {
        const response = await fetch(path);
        return await response.text();
    }
    
    async loadCSS(path) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = path;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }
    
    async loadJS(path) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = path;
            script.onload = () => {
                // Assume the script exports a class with the same name as the file
                const className = path.split('/').pop().replace('.js', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                resolve(window[className] || window[className.charAt(0).toUpperCase() + className.slice(1)]);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    setupGlobalEvents() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-navigate]')) {
                e.preventDefault();
                const path = e.target.getAttribute('data-navigate');
                this.router.navigate(path);
            }
        });
        
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('[data-form]')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
        
        // Handle modal triggers
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-modal]')) {
                const modalName = e.target.getAttribute('data-modal');
                const modalData = JSON.parse(e.target.getAttribute('data-modal-data') || '{}');
                this.openModal(modalName, modalData);
            }
        });
    }
    
    async openModal(modalName, data = {}) {
        try {
            const html = await this.loadHTML(`modals/${modalName}/${modalName}-modal.html`);
            await this.loadCSS(`modals/${modalName}/${modalName}-modal.css`);
            const ModalClass = await this.loadJS(`modals/${modalName}/${modalName}-modal.js`);
            
            const modalContainer = document.getElementById('modal-container');
            modalContainer.innerHTML = html;
            
            const modal = new ModalClass(data);
            modal.show();
            
        } catch (error) {
            console.error('Error loading modal:', error);
        }
    }
    
    showLoading() {
        const app = document.getElementById('app');
        app.innerHTML = '<div class="flex items-center justify-center min-h-screen"><div class="loading-spinner"></div></div>';
    }
    
    hideLoading() {
        // Loading is hidden when new content is loaded
    }
    
    showError(message) {
        this.notificationContext.addNotification({
            type: 'error',
            message: message,
            duration: 5000
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.sakuraApp = new SakuraApp();
});
```

## 2. Component System Implementation

### Component Base Class (`utils/component-base.js`)
```javascript
class Component {
    constructor(element, props = {}) {
        this.element = element;
        this.props = props;
        this.state = {};
        this.eventListeners = [];
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        // Override in subclasses
    }
    
    bindEvents() {
        // Override in subclasses
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
    
    addEventListener(element, event, handler) {
        element.addEventListener(event, handler);
        this.eventListeners.push({ element, event, handler });
    }
    
    cleanup() {
        this.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventListeners = [];
    }
}
```

### Example Button Component (`components/ui/button/button.js`)
```javascript
class Button extends Component {
    constructor(element, props = {}) {
        super(element, props);
    }
    
    render() {
        const { variant = 'primary', size = 'default', disabled = false } = this.props;
        
        this.element.className = `btn btn-${variant} btn-${size}`;
        
        if (disabled) {
            this.element.disabled = true;
        }
        
        if (this.props.children) {
            this.element.innerHTML = this.props.children;
        }
    }
    
    bindEvents() {
        if (this.props.onClick) {
            this.addEventListener(this.element, 'click', this.props.onClick);
        }
    }
}

// Register component globally
window.Button = Button;
```

## 3. Router Implementation (`utils/router.js`)

```javascript
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        
        // Listen for browser navigation
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }
    
    addRoute(path, handler) {
        this.routes.set(path, handler);
    }
    
    async navigate(path) {
        if (path !== window.location.pathname) {
            window.history.pushState({}, '', path);
        }
        
        await this.handleRoute(path);
    }
    
    async handleRoute(path) {
        let handler = this.routes.get(path);
        
        // Handle wildcard routes
        if (!handler) {
            handler = this.routes.get('*');
        }
        
        if (handler) {
            this.currentRoute = path;
            await handler();
        } else {
            console.error('No route handler found for:', path);
        }
    }
}

window.Router = Router;
```

## 4. State Management (`data/state-manager.js`)

```javascript
class StateManager {
    constructor() {
        this.state = {};
        this.subscribers = new Map();
    }
    
    setState(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        
        // Notify subscribers
        if (this.subscribers.has(key)) {
            this.subscribers.get(key).forEach(callback => {
                callback(value, oldValue);
            });
        }
    }
    
    getState(key) {
        return this.state[key];
    }
    
    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, []);
        }
        
        this.subscribers.get(key).push(callback);
        
        // Return unsubscribe function
        return () => {
            const callbacks = this.subscribers.get(key);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }
}

window.StateManager = StateManager;
```

## 5. Page Implementation Example

### Dashboard Page (`pages/dashboard/dashboard.js`)
```javascript
class Dashboard {
    constructor() {
        this.searchQuery = '';
        this.selectedAccess = null;
        this.selectedNotification = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadData();
        this.renderComponents();
    }
    
    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.filterResults();
            });
        }
        
        // Access card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.access-card')) {
                const accessId = e.target.closest('.access-card').dataset.accessId;
                this.handleAccessClick(accessId);
            }
        });
    }
    
    async loadData() {
        // Load mock data
        this.olsAccess = MockData.getOLSAccess();
        this.rlsAccess = MockData.getRLSAccess();
        this.notifications = MockData.getNotifications();
        
        this.renderAccessCards();
        this.renderNotifications();
    }
    
    renderComponents() {
        // Initialize header
        const headerElement = document.querySelector('.header');
        if (headerElement) {
            new Header(headerElement, {
                title: 'Dashboard',
                description: 'Overview of your access and recent activity'
            });
        }
        
        // Initialize sidebar
        const sidebarElement = document.querySelector('.sidebar');
        if (sidebarElement) {
            new Sidebar(sidebarElement);
        }
    }
    
    renderAccessCards() {
        const olsContainer = document.getElementById('ols-access-container');
        const rlsContainer = document.getElementById('rls-access-container');
        
        if (olsContainer) {
            olsContainer.innerHTML = this.olsAccess.map(access => 
                this.createAccessCardHTML(access)
            ).join('');
        }
        
        if (rlsContainer) {
            rlsContainer.innerHTML = this.rlsAccess.map(access => 
                this.createRLSCardHTML(access)
            ).join('');
        }
    }
    
    createAccessCardHTML(access) {
        return `
            <div class="access-card card p-4" data-access-id="${access.id}">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-semibold">${access.name}</h3>
                    <span class="badge badge-${access.status}">${access.status}</span>
                </div>
                <p class="text-sm text-muted-foreground mb-2">${access.workspace}</p>
                <p class="text-sm">${access.description || ''}</p>
            </div>
        `;
    }
    
    handleAccessClick(accessId) {
        const access = [...this.olsAccess, ...this.rlsAccess].find(a => a.id === accessId);
        if (access) {
            window.sakuraApp.openModal('access-details', { access });
        }
    }
    
    filterResults() {
        // Implement search filtering
        const filteredOLS = this.olsAccess.filter(access => 
            access.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            access.workspace.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        
        const filteredRLS = this.rlsAccess.filter(access => 
            access.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            access.workspace.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        
        // Re-render with filtered results
        this.renderFilteredResults(filteredOLS, filteredRLS);
    }
    
    cleanup() {
        // Cleanup event listeners and components
        console.log('Dashboard cleanup');
    }
}

window.Dashboard = Dashboard;
```

This implementation approach provides:

1. **Modular Architecture**: Each component is self-contained
2. **State Management**: Simple reactive state system
3. **Routing**: Client-side routing with history API
4. **Component System**: Reusable components with props and lifecycle
5. **Event Handling**: Centralized event management
6. **Lazy Loading**: Pages and components loaded on demand
7. **Cleanup**: Proper memory management and event cleanup

The structure maintains all the functionality of your React app while using vanilla JavaScript, making it easy to understand and maintain. 