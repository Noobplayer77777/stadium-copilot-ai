# 🏟️ Stadium Copilot AI

> **AI-powered smart stadium management platform for the FIFA World Cup 2026** — improving fan experience, operational efficiency, and real-time decision support at scale.

🔗 **Live Demo:** [stadium-copilot-ai.vercel.app](https://stadium-copilot-ai.vercel.app/)  
📦 **Repository:** [github.com/Noobplayer77777/stadium-copilot-ai](https://github.com/Noobplayer77777/stadium-copilot-ai)

---

## 📸 Screenshots

<img width="1918" alt="Fan Dashboard" src="https://github.com/user-attachments/assets/68aa9370-49f8-4d79-b750-0f351f205797" />
<img width="1918" alt="Organizer Command Center" src="https://github.com/user-attachments/assets/d6343030-4ad3-41c3-95d0-f54d1d358ac1" />

---

## 🚨 Problem Statement

Large-scale sporting events like the FIFA World Cup 2026 host **80,000+ fans per match** across multiple stadiums. Today, stadium operations are fragmented:

- Fans have no real-time guidance for navigation, queues, or accessibility routes
- Organizers lack unified situational awareness for crowd density and incident response
- Volunteers and venue staff operate with disconnected tools and no AI assistance
- Multilingual communication across diverse global audiences is manual and inconsistent
- Transportation coordination, weather impact, and sustainability tracking are siloed

The result: **poor fan experience, slow incident response, and operational blind spots** — exactly the conditions that lead to safety risks and reputational damage at premier events.

---

## 💡 Why This Problem Matters

The FIFA World Cup 2026 spans **16 cities across the USA, Canada, and Mexico** — the most geographically distributed World Cup in history. Coordinating operations at this scale with legacy tools is not just inefficient; it is dangerous.

- Over **5 million tickets** are expected to be sold
- Stadium incidents (crushes, medical emergencies, security threats) require **sub-minute** response times
- Fans traveling internationally need **multilingual, real-time support** with zero friction
- Organizers are accountable for sustainability targets, accessibility compliance, and fan NPS

Generative AI is uniquely positioned to unify these workstreams — acting as a real-time intelligence layer that translates raw stadium data into actionable decisions for every stakeholder.

---

## ✅ Solution Overview

**Stadium Copilot AI** is a GenAI-enabled platform that serves as the central intelligence layer for FIFA World Cup 2026 stadium operations. It provides role-specific dashboards for fans, organizers, volunteers, and venue staff — all connected to a shared AI Copilot that delivers real-time guidance, crowd insights, and operational recommendations.

The platform turns noisy stadium data (sensors, weather APIs, incident reports, navigation requests) into clear, contextual guidance — in natural language, in the user's language, at the moment they need it.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Copilot** | GenAI assistant for all roles — answers questions, surfaces alerts, and recommends actions in natural language |
| 🗺️ **Interactive Stadium Navigation** | Real-time wayfinding with crowd-aware routing and accessibility paths |
| 👥 **Fan Dashboard** | Personalized match info, seat directions, food/merchandise queues, and multilingual support |
| 🎯 **Organizer Command Center** | Unified situational awareness with crowd heatmaps, incident tracking, and AI-generated briefings |
| 👷 **Volunteer Dashboard** | Role-based task queue with AI-recommended priorities and real-time comms |
| 🏟️ **Venue Staff Dashboard** | Operational status panels for facilities, gates, and maintenance with AI anomaly detection |
| 📊 **Crowd Monitoring** | Density visualization and predictive congestion alerts by zone |
| 🚨 **Incident Management** | Log, escalate, and track incidents with AI triage and response suggestions |
| 🌦️ **Weather Integration** | Live weather overlays affecting crowd flow, safety protocols, and field conditions |
| 🔐 **JWT Authentication** | Role-based access control with secure session management |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js** — App router, SSR/SSG
- **TypeScript** — Type-safe components and API contracts
- **Tailwind CSS** — Utility-first responsive styling

### Backend
- **FastAPI** — High-performance async REST API
- **PostgreSQL** — Relational data store for events, incidents, users
- **SQLAlchemy** — ORM with relationship management
- **Alembic** — Database migration management

### AI / Integrations
- **Anthropic Claude API** — Core GenAI copilot for all roles
- **Weather API** — Real-time weather data integration
- **JWT** — Stateless authentication

### Deployment
- **Vercel** — Frontend hosting and edge delivery
- **Docker** — Containerized backend services

---

## 🏗️ Architecture

```mermaid
flowchart TD
    subgraph Clients["Client Layer"]
        FAN[🧑‍🤝‍🧑 Fan Dashboard]
        ORG[🎯 Organizer Command Center]
        VOL[👷 Volunteer Dashboard]
        STF[🏟️ Venue Staff Dashboard]
    end

    subgraph Frontend["Frontend — Next.js / TypeScript"]
        UI[UI Components]
        AUTH_UI[Auth & Role Routing]
    end

    subgraph Backend["Backend — FastAPI"]
        API[REST API Routes]
        AUTH[JWT Auth Middleware]
        AI[AI Copilot Service]
        CROWD[Crowd Monitoring Service]
        INCIDENT[Incident Management Service]
        NAV[Navigation Service]
    end

    subgraph DataLayer["Data Layer"]
        PG[(PostgreSQL)]
        CACHE[(Redis Cache)]
    end

    subgraph External["External Services"]
        CLAUDE[Anthropic Claude API]
        WEATHER[Weather API]
    end

    Clients --> Frontend
    Frontend --> Backend
    AUTH --> AUTH_UI
    API --> AI
    API --> CROWD
    API --> INCIDENT
    API --> NAV
    AI --> CLAUDE
    CROWD --> WEATHER
    Backend --> DataLayer
```

---

## 📁 Folder Structure

```
stadium-copilot-ai/
├── frontend/                  # Next.js application
│   ├── app/                   # App router pages
│   │   ├── fan/               # Fan dashboard
│   │   ├── organizer/         # Organizer command center
│   │   ├── volunteer/         # Volunteer dashboard
│   │   ├── staff/             # Venue staff dashboard
│   │   └── auth/              # Login / registration
│   ├── components/            # Shared UI components
│   │   ├── ai-copilot/        # AI chat widget
│   │   ├── maps/              # Stadium navigation
│   │   └── dashboard/         # Role dashboards
│   └── lib/                   # API client, utils, types
│
├── backend/                   # FastAPI application
│   ├── app/
│   │   ├── api/               # Route handlers
│   │   │   ├── auth.py        # JWT authentication
│   │   │   ├── copilot.py     # AI Copilot endpoints
│   │   │   ├── crowd.py       # Crowd monitoring
│   │   │   ├── incidents.py   # Incident management
│   │   │   └── navigation.py  # Wayfinding
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   └── core/              # Config, DB, security
│   ├── alembic/               # Database migrations
│   └── tests/                 # API tests
│
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Overview

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |
| `GET` | `/api/auth/me` | Get current user profile |

### AI Copilot
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/copilot/chat` | Send a message to the AI Copilot |
| `GET` | `/api/copilot/history` | Get conversation history |

### Crowd & Operations
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/crowd/heatmap` | Real-time crowd density by zone |
| `GET` | `/api/crowd/alerts` | Active congestion alerts |
| `POST` | `/api/incidents/` | Log a new incident |
| `GET` | `/api/incidents/` | List all incidents (organizer/staff only) |
| `PATCH` | `/api/incidents/{id}` | Update incident status |

### Navigation
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/navigation/route` | Get route from seat to destination |
| `GET` | `/api/navigation/zones` | Fetch zone occupancy data |

---

## ⚙️ Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Docker (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/Noobplayer77777/stadium-copilot-ai.git
cd stadium-copilot-ai
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000`

### 4. Docker (Alternative)

```bash
docker-compose up --build
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/stadium_copilot
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

ANTHROPIC_API_KEY=your-anthropic-api-key
WEATHER_API_KEY=your-weather-api-key
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🧪 Demo Credentials

Use these credentials on the [live demo](https://stadium-copilot-ai.vercel.app/):

| Role | Email | Password |
|---|---|---|
| 👥 Fan | `fan@demo.com` | `demo1234` |
| 🎯 Organizer | `organizer@demo.com` | `demo1234` |
| 👷 Volunteer | `volunteer@demo.com` | `demo1234` |
| 🏟️ Venue Staff | `staff@demo.com` | `demo1234` |

---

## 🚀 Future Improvements

- **Computer Vision Integration** — Camera feeds for real-time crowd density analysis and anomaly detection
- **Multilingual AI Copilot** — Native support for all FIFA 2026 host-nation languages (English, Spanish, French) plus auto-detection for international fans
- **Predictive Crowd Modeling** — ML-based flow predictions based on match schedule, team popularity, and gate times
- **IoT Sensor Integration** — Direct feeds from turnstiles, food courts, and restroom occupancy sensors
- **Accessibility Routing** — Dedicated wheelchair, visual impairment, and hearing-assistance wayfinding modes
- **Sustainability Dashboard** — Energy consumption, waste metrics, and carbon footprint tracking per event
- **Transportation Sync** — Integration with public transit APIs for last-mile navigation from stadium to transit hubs
- **Offline Mode** — Progressive Web App support so fans retain core features in low-connectivity zones
- **Voice Interface** — Hands-free AI Copilot interaction for venue staff on the move
- **Post-Match Analytics** — Automated debrief reports for organizers covering crowd flow, incidents, and NPS signals

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  Built for the <strong>FIFA World Cup 2026 Hackathon</strong>
</div>
