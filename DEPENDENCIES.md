# Detailed Dependency Reference

Complete information about all libraries and packages used in the Sweet Shop Management application.

---

## Backend Dependencies

### API Framework & Server
| Package | Version | Purpose |
|---------|---------|---------|
| **fastapi** | 0.104.1 | Modern web framework for building REST APIs with automatic validation |
| **uvicorn** | 0.24.0 | ASGI web server to run FastAPI application |

### Database & ORM
| Package | Version | Purpose |
|---------|---------|---------|
| **sqlalchemy** | 2.0.23 | SQL toolkit and ORM for database operations |
| **alembic** | 1.12.1 | Database migration tool for schema versioning |

### Data Validation & Serialization
| Package | Version | Purpose |
|---------|---------|---------|
| **pydantic** | 2.5.0 | Data validation using Python type annotations |
| **pydantic-settings** | 2.1.0 | Settings management with Pydantic |
| **pydantic[email]** | 2.5.0 | Email validation support for Pydantic |
| **python-multipart** | 0.0.6 | Multipart form data parsing |

### Authentication & Security
| Package | Version | Purpose |
|---------|---------|---------|
| **PyJWT** | 2.8.1 | JSON Web Token (JWT) encoding and decoding |
| **python-jwt** | 1.7.1 | Alternative JWT implementation |
| **passlib** | 1.7.4 | Password hashing with bcrypt support |

### Testing
| Package | Version | Purpose |
|---------|---------|---------|
| **pytest** | 7.4.3 | Testing framework for writing unit tests |
| **pytest-asyncio** | 0.21.1 | Pytest plugin for async function testing |
| **httpx** | 0.25.2 | Async HTTP client for testing API endpoints |

---

## Frontend Dependencies

### Core React & TypeScript
| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^18.2.0 | UI library for building components |
| **react-dom** | ^18.2.0 | React rendering for DOM |
| **typescript** | ^5.3.0 | Type safety for JavaScript |

### Routing & Navigation
| Package | Version | Purpose |
|---------|---------|---------|
| **react-router-dom** | ^6.20.0 | Client-side routing and navigation |

### HTTP Client
| Package | Version | Purpose |
|---------|---------|---------|
| **axios** | ^1.6.0 | Promise-based HTTP client for API calls |

### Build & Development
| Package | Version | Purpose |
|---------|---------|---------|
| **vite** | ^5.0.0 | Fast build tool and dev server |
| **@vitejs/plugin-react** | ^4.2.0 | Vite plugin for React support |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| **tailwindcss** | ^3.3.0 | Utility-first CSS framework |
| **postcss** | ^8.4.0 | CSS transformation tool (required by Tailwind) |
| **autoprefixer** | ^10.4.0 | PostCSS plugin for CSS vendor prefixes |

### Testing
| Package | Version | Purpose |
|---------|---------|---------|
| **vitest** | ^1.0.0 | Unit testing framework (Vite-native) |
| **@testing-library/react** | ^14.0.0 | React component testing utilities |
| **@testing-library/jest-dom** | ^6.1.0 | Custom Jest matchers for DOM testing |
| **@vitest/ui** | ^1.0.0 | UI for Vitest results |

### Type Definitions
| Package | Version | Purpose |
|---------|---------|---------|
| **@types/react** | ^18.2.0 | TypeScript types for React |
| **@types/react-dom** | ^18.2.0 | TypeScript types for React DOM |
| **@types/node** | ^20.0.0 | TypeScript types for Node.js (build tools) |

### Development Tools
| Package | Version | Purpose |
|---------|---------|---------|
| **@typescript-eslint/eslint-plugin** | ^6.0.0 | ESLint rules for TypeScript |
| **@typescript-eslint/parser** | ^6.0.0 | ESLint parser for TypeScript |
| **eslint** | ^8.0.0 | JavaScript code linter |
| **prettier** | ^3.0.0 | Code formatter |

---

## What Each Package Does

### Backend Packages Explained

**FastAPI & Uvicorn**
- Build REST APIs with automatic request/response validation
- Automatic API documentation generation (Swagger UI at `/docs`)
- AsyncIO support for high performance

**SQLAlchemy**
- Object-relational mapping (ORM) - map Python classes to database tables
- Support for multiple databases (SQLite, PostgreSQL, MySQL, etc.)
- Query building and transaction management

**Pydantic**
- Validate incoming API request data
- Serialize database models to JSON responses
- Type hints for better IDE support

**PyJWT & passlib**
- Create and verify JWT tokens for user authentication
- Hash passwords securely with bcrypt algorithm
- Token expiration and claims validation

**Pytest**
- Write and run unit tests
- Test fixtures for database setup/teardown
- Code coverage reporting

---

### Frontend Packages Explained

**React & TypeScript**
- React: Build reusable UI components with state management
- TypeScript: Catch type errors during development (not runtime)

**React Router**
- Client-side navigation between pages
- URL parameter extraction
- Nested routes and layouts

**Axios**
- Make HTTP requests to backend API
- Automatic JSON serialization
- Request/response interceptors for auth headers

**Vite**
- Ultra-fast build tool with instant dev server startup
- Hot module replacement (HMR) for instant feedback
- Optimized production bundles

**Tailwind CSS**
- Utility-first CSS classes for rapid UI development
- Responsive design with breakpoints
- Dark mode support (optional)

**Vitest & Testing Library**
- Run tests with `npm test`
- Test React components without DOM
- Assertions and mocking utilities

---

## Installation Size Reference

| Component | Approx. Size |
|-----------|-------------|
| Python venv (with deps) | ~200-300 MB |
| Backend node_modules | Minimal (not used) |
| Frontend node_modules | ~500-700 MB |
| Database (fresh) | ~1-2 MB |
| **Total** | **~700-1 GB** |

---

## Version Compatibility Notes

### Python Version
- **Minimum**: Python 3.8
- **Recommended**: Python 3.9+
- **Latest Tested**: Python 3.11

### Node.js Version
- **Minimum**: Node.js 16
- **Recommended**: Node.js 18+
- **Latest Tested**: Node.js 20

### Database
- **SQLite**: 3.35+
- No separate database server needed (file-based)

---

## Common Installation Issues & Fixes

### "psycopg2" or "PyMySQL" not found
- Only needed if using PostgreSQL/MySQL
- SQLite is built-in to Python, no installation needed

### "bcrypt" import error in passlib
```powershell
# Install the cryptography backend
pip install cryptography

# Or reinstall passlib with extras
pip install passlib[bcrypt]
```

### Node modules import issues
```powershell
# Clear npm cache and reinstall
npm cache clean --force
rm -r node_modules
npm install
```

### TypeScript compilation errors
```powershell
# Install type definitions globally (rarely needed)
npm install --save-dev @types/node
npm install --save-dev @types/react
```

---

## Updating Dependencies

### Backend
```powershell
# Check for outdated packages
pip list --outdated

# Update a specific package
pip install --upgrade fastapi

# Update all packages (careful!)
pip install --upgrade pip -r requirements.txt
```

### Frontend
```powershell
# Check for outdated packages
npm outdated

# Update a specific package
npm install react@latest

# Update all packages (careful!)
npm update
```

---

## Optional Dependencies

These packages can be added for additional features:

### Backend Optional
```powershell
# For PostgreSQL support
pip install psycopg2-binary

# For email sending
pip install python-multipart

# For API rate limiting
pip install slowapi

# For CORS (should be in FastAPI)
pip install fastapi-cors

# For environment variable management
pip install python-dotenv
```

### Frontend Optional
```powershell
# For state management beyond Context API
npm install zustand
# or
npm install redux @reduxjs/toolkit

# For form handling
npm install react-hook-form

# For HTTP caching
npm install swr
# or
npm install react-query

# For UI component library
npm install @mui/material @emotion/react @emotion/styled
# or
npm install shadcn-ui
```

---

## Lock Files

### Backend
- **requirements.txt** - Pinned versions for reproducibility
- No lock file needed for pip (requirements.txt serves this purpose)

### Frontend
- **package-lock.json** - Auto-generated, locks exact versions
- Ensures consistent installations across machines
- Commit to version control

---

## Production Dependencies

### Backend Production
```powershell
# For production server (replace uvicorn dev server)
pip install gunicorn

# For production database (switch from SQLite)
pip install psycopg2-binary  # For PostgreSQL

# For environment variables
pip install python-dotenv
```

### Frontend Production
```powershell
# Build the frontend (no additional deps needed)
npm run build

# To serve locally (optional)
npm install -g serve
serve -s dist
```

---

## Verification Commands

After installation, run these to verify everything is working:

**Backend:**
```powershell
# Check all packages
pip list

# Verify imports
python -c "import fastapi; import sqlalchemy; import pydantic; print('All backend dependencies OK')"

# Run tests
pytest

# Start server
uvicorn app.main:app --reload
```

**Frontend:**
```powershell
# Check all packages
npm list

# Check TypeScript
npx tsc --version

# Run tests
npm test

# Start dev server
npm run dev
```

---

## Summary

- **Backend**: 14 core dependencies for API, database, auth, and testing
- **Frontend**: 20+ dependencies for React, routing, HTTP, styling, and testing
- **Total**: ~35 packages to manage
- **Installation Time**: 10-15 minutes per environment
- **Disk Space**: ~700 MB - 1 GB total

All dependencies are production-tested and maintained by active communities.
