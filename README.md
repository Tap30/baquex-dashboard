# Baquex Dashboard Boilerplate

A modern boilerplate for dashboard web-apps.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 24.10.0
- **pnpm**: 10.22.0
- **sudo access**: Required for development setup (HTTPS certificates and host
  aliases)

### Development Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd baquex-dashboard
   pnpm install
   ```

2. **Configure environment:**

   ```bash
   # Copy sample files and configure for your environment
   cp .env.sample.development .env.development.local
   cp .env.sample.production .env.production.local

   # Edit the .local files with your actual configuration
   # These files are ignored by git and may contain sensitive values
   ```

3. **Setup development environment (requires sudo):**

   ```bash
   # This configures local HTTPS certificates and host aliases
   sudo pnpm toggle-host

   # Start development server
   sudo pnpm dev
   ```

   > **Why sudo?** The development setup uses HTTPS with custom certificates and
   > modifies `/etc/hosts` for local domain aliases (e.g., `admin.baquex.com` →
   > `127.0.0.1`).

4. **Access the application:**
   - Open your browser to the configured hostname (default:
     `https://admin.baquex.com`)
   - The app runs on port 443 with HTTPS enabled

## 📁 Project Structure

### Core Directories

```sh
src/
├── components/         # Reusable UI components
│   ├── blocks/         # Complex component compositions
│   ├── elements/       # Basic UI elements
│   ├── layouts/        # Page layout components
│   └── internals/      # Internal component utilities
├── entities/           # Business logic and data models
│   └── dashboard/      # Dashboard-related logics
├── pages/              # Route components
├── services/           # External service integrations
├── stores/             # State management
└── utils/              # Utility functions and hooks
```

### Services Architecture

- **`grpc/`** - gRPC client setup and interceptors
- **`query-client/`** - React Query configuration and provider
- **`http-client/`** - HTTP client with interceptors and utilities
- **`storage/`** - Storage abstractions (Cookie, Web, Memory)
- **`access-control/`** - Role-based access control with guards and permissions

### Entities

- **`dashboard/`** - Dashboard entity management
  - `Dashboard.ts` - Main entity class with unified API
  - `components/Initializer` - App-level initialization component
  - `types.ts` - TypeScript definitions for dashboard data structures
  - `constants.ts` - Query keys and default state values
  - `stores.ts` - State containers for permissions and user profile
  - `queries.ts` - React Query hooks for dashboard initialization
  - See [Dashboard Entity README](src/entities/dashboard/README.md) for details

### Generic Stores

- **`page-loader.ts`** - Global loading states

## 🛠 Available Scripts

### Development

```bash
pnpm toggle-host      # Toggle host entry in /etc/hosts (requires sudo)
pnpm dev              # Start development server (requires sudo)
```

### Building

```bash
pnpm build           # Build for production
pnpm preview         # Preview production build
```

### Code Quality

```bash
pnpm test            # Run tests
pnpm test:dev        # Run tests in watch mode
pnpm format          # Format code with Prettier
pnpm check:format    # Check code formatting
pnpm check:lint      # Run all linting checks
pnpm check:cycles    # Check for circular dependencies
```

## 🏗 Tech Stack

### Core

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Recharts** - Data visualization

### State Management

- **React Query (TanStack)** - Server state management
- **React Containerized State** - Local state management

### Data & API

- **gRPC-Web** - API communication
- **Protocol Buffers** - Data serialization

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework
- **TypeScript** - Static type checking

## 🔧 Configuration

### Environment Files

The project uses multiple environment files for different scenarios:

- **`.env.sample.development`** - Template for development environment
- **`.env.sample.production`** - Template for production environment
- **`.env.development.local`** - Your local development config (git ignored)
- **`.env.production.local`** - Your local production config (git ignored)

**Setup:**

```bash
# Copy sample files
cp .env.sample.development .env.development.local
cp .env.sample.production .env.production.local

# Edit .local files with your actual values
```

**File Priority (Vite loads in this order):**

1. `.env.development.local` (highest priority, for local development)
2. `.env.development` (committed template)
3. `.env.local` (local overrides for all environments)
4. `.env` (default values)

### Environment Variables

Key environment variables (see sample files):

- `VITE_APP_HOSTNAME` - Application hostname
- `VITE_APP_GRPC_GATEWAY` - gRPC gateway URL

### HTTPS Development

The project uses HTTPS in development with:

- **mkcert** for generating local certificates
- **Custom domain** via `/etc/hosts` modification
- **Port 443** for realistic HTTPS testing

## 📦 Building

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## 🔍 Code Quality

The project enforces code quality through:

- **TypeScript** - Static type checking
- **ESLint** - Code linting with React and accessibility rules
- **Prettier** - Consistent code formatting
- **Circular dependency detection** - Prevents import cycles

## 🚨 Troubleshooting

### Common Issues

1. **Permission denied during development:**

   ```bash
   # Ensure you're using sudo for development commands
   sudo pnpm toggle-host
   sudo pnpm dev
   ```

2. **Certificate issues:**

   ```bash
   # Regenerate certificates
   rm -rf .certs
   sudo pnpm dev
   ```

3. **Host not resolving:**

   ```bash
   # Check /etc/hosts entry
   cat /etc/hosts | grep admin.baquex.com

   # Re-run host toggle
   sudo pnpm toggle-host
   ```

## 🚀 CI/CD Pipeline & Release Management

### GitLab CI Pipeline

The project uses GitLab CI with the following stages:

- **Build & Test** - Runs linting, type checking, and tests
- **Docker Build** - Creates containerized application images
- **Deployment** - Deploys to Kubernetes clusters

Key features:

- **pnpm** workspace support with caching
- **Docker multi-stage builds** for optimized images
- **Kubernetes deployment** with Helm charts
- **Automated releases** with changeset integration

### Changeset Management

The project uses **@changesets/cli** for version management and changelog
generation:

```bash
# Create a new changeset
pnpm changesets:create

# Create empty changeset (for non-user-facing changes)
pnpm changesets:empty

# Apply changesets and bump versions
pnpm changesets:apply

# Check changeset status
pnpm changesets:status

# Tag and push release
pnpm changesets:tag
```

**Changeset Workflow:**

1. Create changesets for your changes using `pnpm changesets:create`
2. Describe the change type (patch/minor/major) and impact
3. Commit changesets with your PR
4. On merge to main, changesets automatically update `CHANGELOG.md` and
   `package.json`
5. Release tags are created and pushed automatically

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Run `pnpm check:lint` before committing
3. Add tests for new features
4. Update documentation as needed
