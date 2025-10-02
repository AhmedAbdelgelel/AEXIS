# AEXIS - AI-Powered Exoplanet Classification System

**A futuristic full-stack machine learning web application for exoplanet classification with glassmorphic design and AI-powered predictions.**

![AEXIS](https://img.shields.io/badge/AEXIS-Exoplanet%20Haunter-00FFFF?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-FF8C00?style=for-the-badge)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-00FFFF?style=for-the-badge)

> **GitHub Description**: AI-powered exoplanet classification system with futuristic glassmorphic UI, real-time ML predictions, and interactive visualizations.

---

## 🌟 Features

### 🌍 The Explorer

- **Interactive Classification Interface**: Guided form with 8+ scientific parameters
- **Real-time AI Predictions**: Instant classification with confidence scores
- **Glassmorphic Design**: Futuristic glass panels with neon cyan/orange accents
- **3D Visualizations**: Plotly scatter plots with glowing markers and dark theme
- **Animated Results**: Scanline overlays and counting animations

### 🔬 The Lab

- **Advanced ML Dashboard**: Full model control and hyperparameter tuning
- **File Upload System**: Drag-and-drop CSV ingestion with progress tracking
- **Live Metrics Display**: SVG circular progress gauges and confusion matrices
- **Feature Importance**: Animated horizontal bars showing feature weights
- **Model Training**: Mock async training with real-time status updates

### 🎨 Design System

- **Base**: True black background (#000000)
- **Primary**: Electric cyan (#00FFFF) for highlights and accents
- **Secondary**: Gamma orange (#FF8C00) for CTAs and warnings
- **Glass Effects**: backdrop-filter blur(20px), rgba overlays
- **Typography**: Inter/Space Grotesk fonts, cyan headings
- **Animations**: Ripple effects, glow transitions, particle systems

---

## 🏗️ Architecture

### Clean Service-Based Architecture

```
AEXIS/
├── 📁 routes/                   # HTTP endpoints only
│   ├── index.js                 # Main router (mounts all routes)
│   ├── api.js                   # API endpoints
│   └── upload.js                # File upload routes
│
├── 📁 services/                 # All business logic & handlers
│   ├── mlService.js             # ML classification, training & handlers
│   ├── metricsService.js        # Metrics, analytics & handlers
│   └── uploadService.js         # File processing & handlers
│
├── 📁 views/                    # HTML pages
│   ├── index.html               # Home/Landing page
│   ├── explore.html             # Explorer interface
│   └── lab.html                 # Lab dashboard
│
├── 📁 public/                   # Static assets
│   ├── css/                     # Stylesheets
│   │   ├── main.css             # Global glassmorphic styles
│   │   ├── home.css             # Home page styles
│   │   ├── explore.css          # Explorer styles
│   │   └── lab.css              # Lab styles
│   ├── js/                      # Client-side JavaScript
│   │   ├── animations.js        # Reusable animations
│   │   ├── home.js              # Home page logic
│   │   ├── explore.js           # Classification logic
│   │   └── lab.js               # Lab controls
│   └── assets/                  # Images, icons, etc.
│
├── 📁 data/
│   └── uploads/                 # User-uploaded datasets
│
├── server.js                    # Express server entry point
├── package.json                 # Dependencies
└── README.md                    # Documentation

```

### Architecture Principles

#### 1️⃣ **Routes** (`routes/`)

- Define HTTP endpoints only
- No business logic or response handling
- Import and call service handlers directly
- Minimal, declarative routing

#### 2️⃣ **Services** (`services/`)

- Contain all business logic
- Handle request validation
- Format all responses
- Export both logic functions AND Express handlers
- Independent, reusable modules

---

## 🚀 Tech Stack

### Frontend

- **React 18** (via CDN with hash routing)
- **Plotly.js** - Interactive data visualizations
- **Framer Motion** - Advanced animations
- **Canvas API** - Particle effects and backgrounds
- **CSS3** - Glassmorphism, gradients, animations
- **Vanilla JavaScript** - ES6+ features

### Backend

- **Node.js** (v14+)
- **Express.js** - Web framework
- **Multer** - File upload handling
- **CORS** - Cross-origin support
- **RESTful API** - JSON responses

### Libraries (CDN)

```html
<!-- React 18 -->
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
></script>

<!-- Plotly.js -->
<script src="https://cdn.plot.ly/plotly-2.26.0.min.js"></script>

<!-- Framer Motion -->
<script src="https://cdn.jsdelivr.net/npm/framer-motion@10/dist/framer-motion.js"></script>
```

---

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/aexis-exoplanet-haunter.git
cd aexis-exoplanet-haunter
```

2. **Install dependencies**

```bash
npm install
```

3. **Create required directories**

```bash
mkdir -p data/uploads
```

4. **Start development server**

```bash
npm run dev
```

5. **Start production server**

```bash
npm start
```

6. **Access the application**

- Home: `http://localhost:3000/`
- Explorer: `http://localhost:3000/explore`
- Lab: `http://localhost:3000/lab`
- API Docs: `http://localhost:3000/api/docs`
- Health Check: `http://localhost:3000/health`

---

## 🔌 API Endpoints

### Classification

```http
POST /api/classify
Content-Type: application/json

{
  "orbitalPeriod": 365.25,
  "planetRadius": 1.0,
  "stellarTemp": 5778,
  "transitDepth": 0.84,
  "impactParam": 0.47
}
```

### Batch Classification

```http
POST /api/classify/batch
Content-Type: application/json

{
  "exoplanets": [
    { "orbitalPeriod": 365.25, ... },
    { "orbitalPeriod": 88.0, ... }
  ]
}
```

### Training

```http
POST /api/train
Content-Type: application/json

{
  "dataPath": "data/uploads/dataset.csv",
  "hyperparameters": {
    "nEstimators": 100,
    "maxDepth": 10
  },
  "features": ["orbitalPeriod", "planetRadius", ...]
}
```

### Metrics

```http
GET /api/metrics
GET /api/metrics/confusion-matrix
GET /api/metrics/history
GET /api/features/importance
```

### File Upload

```http
POST /api/upload
Content-Type: multipart/form-data

datafile: [CSV file]
```

---

## 🎨 Design System

### Color Palette

```css
--true-black: #000000;
--electric-cyan: #00ffff;
--gamma-orange: #ff8c00;
--white: #ffffff;
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(0, 255, 255, 0.2);
```

### Glassmorphism Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.15);
  border-radius: 16px;
}
```

### Animations

- **Ripple Effect**: Button press feedback
- **Glow Transition**: Hover states with increased luminosity
- **Scanline Overlay**: CSS gradient animation on results
- **Particle System**: Canvas-based star field
- **Counting Animation**: Odometer-style number increments

---

## 🧪 Features in Detail

### 1. The Explorer

**Purpose**: User-friendly interface for single exoplanet classification

**Features**:

- 8 input fields with info tooltips
- Floating label animations
- Cyan glow on input focus
- Real-time form validation
- Animated result card with:
  - Scanline overlay effect
  - Confidence counter (0-100%)
  - Color-coded classification badge
- Interactive Plotly scatter plot
- Add classified point with ripple animation

### 2. The Lab

**Purpose**: Advanced ML model control dashboard

**Features**:

- **Data Management**
  - Drag-and-drop file upload
  - Progress bar with gradient animation
  - Feature selection checkboxes (glowing when checked)
- **Metrics Dashboard**
  - SVG circular progress gauge (animated stroke-dashoffset)
  - 2x2 confusion matrix with hover effects
  - Real-time accuracy/precision/recall display
- **Feature Importance**
  - Horizontal bar chart (Plotly)
  - Staggered animation on load
- **Hyperparameter Tuning**
  - Custom range sliders (cyan fill, orange thumb)
  - Algorithm dropdown with glassmorphic options
  - Quick validate button
  - Deploy to production button

### 3. Background Effects

- **Layer 1**: Radial gradient (cyan → transparent) with pulsating opacity
- **Layer 2**: Canvas star field with continuous drift
- **Layer 3**: Mouse parallax (background-position based on cursor)

---

## 📱 Responsive Design

### Mobile (< 768px)

- Stacked single-column layout
- Reduced blur effects for performance
- Simplified animations
- Touch-optimized controls

### Tablet (768px - 1024px)

- 2-column grid for metrics
- Moderate blur effects
- Optimized touch targets

### Desktop (> 1024px)

- Full multi-column layouts
- Maximum blur and parallax effects
- Enhanced particle animations
- Hover effects enabled

---

## 🛠️ Development

### Project Scripts

```bash
npm start       # Start production server
npm run dev     # Start with nodemon (auto-reload)
npm test        # Run tests (to be implemented)
```

### Adding New Routes

1. **Add Logic to Service** (`services/yourService.js`)

```javascript
async function yourBusinessLogic(params) {
  return { result: "data" };
}

async function yourHandler(req, res, next) {
  try {
    const data = await yourBusinessLogic(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = { yourBusinessLogic, yourHandler };
```

2. **Add Route** (`routes/yourRoutes.js`)

```javascript
const express = require("express");
const router = express.Router();
const yourService = require("../services/yourService");

router.get("/endpoint", yourService.yourHandler);

module.exports = router;
```

3. **Mount in Router** (`routes/index.js`)

```javascript
const yourRoutes = require("./yourRoutes");
router.use("/api", yourRoutes);
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**AEXIS Team**

- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- NASA Exoplanet Archive for inspiration
- Plotly.js for amazing visualizations
- The glassmorphism design community

---

## 📸 Screenshots

### Home Page

Futuristic landing with animated particle background and glassmorphic cards.

### The Explorer

Interactive classification interface with real-time AI predictions and data visualization.

### The Lab

Advanced ML dashboard with metrics, confusion matrix, and hyperparameter controls.

---

## 🔮 Future Enhancements

- [ ] Real Python/scikit-learn ML backend
- [ ] User authentication and saved models
- [ ] Real-time collaborative training
- [ ] 3D planet visualizations
- [ ] WebSocket live updates
- [ ] Dark/Light theme toggle
- [ ] Export reports as PDF
- [ ] Integration with NASA Exoplanet API

---

**Made with 💫 by the AEXIS Team | Exploring the cosmos through AI**

npm start

```

4. Open your browser and navigate to:
```

http://localhost:3000

````

## API Endpoints

### Classification
---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/aexis-exoplanet-haunter.git
cd aexis-exoplanet-haunter
````

2. **Install dependencies**

```bash
npm install
```

3. **Create required directories**

```bash
mkdir -p data/uploads
```

4. **Start development server**

```bash
npm run dev
```

5. **Start production server**

```bash
npm start
```

6. **Access the application**

- Home: `http://localhost:3000/`
- Explorer: `http://localhost:3000/explore`
- Lab: `http://localhost:3000/lab`

---

## 🔌 API Endpoints

### Classification

**POST** `/api/classify`

```json
{
  "orbitalPeriod": 365.25,
  "planetRadius": 1.0,
  "stellarTemp": 5778,
  "transitDepth": 0.84,
  "impactParam": 0.47
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "classification": "Confirmed Exoplanet",
    "confidence": 87.42,
    "modelVersion": "2.1",
    "timestamp": "2025-10-02T10:30:00.000Z"
  }
}
```

### Batch Classification

**POST** `/api/classify/batch`

```json
{
  "exoplanets": [
    { "orbitalPeriod": 365.25, "planetRadius": 1.0, ... },
    { "orbitalPeriod": 88.0, "planetRadius": 0.38, ... }
  ]
}
```

### Model Training

**POST** `/api/train`

```json
{
  "dataPath": "data/uploads/dataset.csv",
  "hyperparameters": {
    "nEstimators": 100,
    "maxDepth": 10
  },
  "features": ["orbitalPeriod", "planetRadius", "stellarTemp"]
}
```

### Hyperparameter Validation

**POST** `/api/validate`

```json
{
  "hyperparameters": { "nEstimators": 150, "maxDepth": 15 },
  "features": ["orbitalPeriod", "planetRadius"]
}
```

### Model Deployment

**POST** `/api/deploy`

```json
{
  "modelVersion": "2.2",
  "hyperparameters": { "nEstimators": 100 }
}
```

### Metrics & Analytics

- **GET** `/api/metrics` - Current model performance
- **GET** `/api/metrics/confusion-matrix` - Confusion matrix data
- **GET** `/api/metrics/history` - Model version history
- **GET** `/api/features/importance` - Feature importance scores
- **GET** `/api/data/historical` - Historical classification data

### File Upload with Auto-Evaluation

**POST** `/api/upload`

- Content-Type: `multipart/form-data`
- Field: `datafile` (CSV file)

**Response with Evaluation:**

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "filename": "dataset-123456789.csv",
    "size": 2048,
    "uploadedAt": "2025-10-02T10:30:00.000Z",
    "evaluation": {
      "rowCount": 100,
      "columnCount": 6,
      "completeness": 100,
      "quality": 90,
      "readyForTraining": true,
      "foundFeatures": ["orbital_period", "planet_radius", "stellar_temp"],
      "recommendations": ["Dataset ready for model training"]
    }
  }
}
```

### File Management

**GET** `/api/files` - List all uploaded files

---

## 📤 Upload & Evaluation Feature

### Automatic Dataset Evaluation

When you upload a CSV file in **The Lab**, the system automatically:

1. **Parses the CSV** - Reads all rows and columns
2. **Detects Features** - Finds exoplanet-related columns
3. **Evaluates Quality** - Calculates completeness and quality scores
4. **Determines Readiness** - Checks if data is ready for training
5. **Provides Recommendations** - Suggests improvements

### Required CSV Columns (case-insensitive)

The system looks for these columns:

- `orbital_period` / `orbitalPeriod` / `period`
- `planet_radius` / `planetRadius` / `radius`
- `stellar_temp` / `stellarTemp` / `teff`
- `transit_depth` / `transitDepth` / `depth`
- `impact_param` / `impactParam` (optional)

### Sample CSV Format

```csv
orbital_period,planet_radius,stellar_temp,transit_depth,impact_param,classification
365.25,1.0,5778,0.84,0.47,Confirmed
88.0,0.38,5778,0.12,0.32,Confirmed
224.7,0.95,5778,0.79,0.51,Confirmed
```

### Evaluation Criteria

| Metric                 | Description            | Good Value |
| ---------------------- | ---------------------- | ---------- |
| **Row Count**          | Number of samples      | ≥ 100      |
| **Column Count**       | Number of features     | ≥ 5        |
| **Completeness**       | % of required features | ≥ 80%      |
| **Quality Score**      | Overall data quality   | ≥ 70%      |
| **Ready for Training** | Can train model now?   | true       |

### Test with Sample Data

A sample CSV file is included:

```
data/sample_exoplanets.csv
```

Upload it to see automatic evaluation in action!

---

## 🎨 Design System

### Color Palette

```css
--true-black: #000000;
--electric-cyan: #00ffff;
--gamma-orange: #ff8c00;
--white: #ffffff;
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(0, 255, 255, 0.2);
```

### Glassmorphism Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.15);
  border-radius: 16px;
}
```

### Animations

- **Ripple Effect**: Button press feedback
- **Glow Transition**: Hover states with increased luminosity
- **Scanline Overlay**: CSS gradient animation on results
- **Particle System**: Canvas-based star field
- **Counting Animation**: Odometer-style number increments
- **Flicker**: Subtle text animation on page load

---

## 🧪 Features in Detail

### 1. The Explorer (Novice Interface)

**Purpose**: User-friendly interface for single exoplanet classification

**Features**:

- 8 input fields with info tooltips
- Floating label animations
- Cyan glow on input focus
- Real-time form validation
- Animated result card with:
  - Scanline overlay effect
  - Confidence counter (0-100%)
  - Color-coded classification badge
- Interactive Plotly scatter plot
- Add classified point with ripple animation

### 2. The Lab (Researcher Dashboard)

**Purpose**: Advanced ML model control dashboard

**Features**:

#### Data Management

- Drag-and-drop file upload zone
- Real-time upload progress bar
- Automatic dataset evaluation
- Feature selection checkboxes (glowing when checked)
- Quality metrics display

#### Metrics Dashboard

- SVG circular progress gauge (animated stroke-dashoffset)
- 2x2 confusion matrix with hover effects
- Real-time accuracy/precision/recall display
- Model version history

#### Feature Importance

- Horizontal bar chart (Plotly)
- Staggered animation on load
- Top 5 influential features

#### Hyperparameter Tuning

- Custom range sliders (cyan fill, orange thumb)
- Algorithm dropdown with glassmorphic options
- Real-time value updates
- Quick validate button
- Deploy to production button

### 3. Background Effects

**Layered Atmospheric Design**:

- **Layer 1**: Radial gradient (cyan → transparent) with pulsating opacity
- **Layer 2**: Star field with continuous drift
- **Layer 3**: Mouse parallax (background-position based on cursor)
- **Ambient Glow**: Large pulsating gradient simulating energy source

---

## 📱 Responsive Design

### Mobile (< 768px)

- Stacked single-column layout
- Reduced blur effects for performance
- Simplified animations
- Touch-optimized controls

### Tablet (768px - 1024px)

- 2-column grid for metrics
- Moderate blur effects
- Optimized touch targets

### Desktop (> 1024px)

- Full multi-column layouts
- Maximum blur and parallax effects
- Enhanced particle animations
- Hover effects enabled

---

## 🛠️ Development

### Project Scripts

```bash
npm start       # Start production server
npm run dev     # Start with nodemon (auto-reload)
npm test        # Run tests (to be implemented)
```

### Adding New Endpoints

**Example: Create a new prediction endpoint**

1. **Add logic to service** (`services/mlService.js`)

```javascript
async function predictBatch(features) {
  // Business logic here
  return results;
}

async function predictBatchHandler(req, res, next) {
  try {
    const data = await predictBatch(req.body.features);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  // ...existing exports
  predictBatch,
  predictBatchHandler,
};
```

2. **Add route** (`routes/api.js`)

```javascript
const mlService = require("../services/mlService");
router.post("/predict/batch", mlService.predictBatchHandler);
```

That's it! No controllers needed.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**AEXIS Team**

- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- NASA Exoplanet Archive for inspiration
- Plotly.js for amazing visualizations
- The glassmorphism design community

---

## 🔮 Future Enhancements

- [ ] Real Python/scikit-learn ML backend
- [ ] User authentication and saved models
- [ ] Real-time collaborative training
- [ ] 3D planet visualizations with Three.js
- [ ] WebSocket live updates
- [ ] Dark/Light theme toggle
- [ ] Export reports as PDF
- [ ] Integration with NASA Exoplanet API
- [ ] Model comparison dashboard
- [ ] Advanced data preprocessing
- [ ] Feature engineering wizard
- [ ] Automated hyperparameter optimization

---

**Made with 💫 by the AEXIS Team | Exploring the cosmos through AI**
