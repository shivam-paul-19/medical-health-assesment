
# Medical Health Assessment Tool using ML

A comprehensive machine learning-powered web application designed to assess various aspects of a user's health. This tool integrates multiple predictive models to provide insights into Heart Health, Sleep Quality, and Metabolic Syndrome risks based on user-provided clinical and lifestyle data.

## 🚀 Features

-   **Multi-Model Assessment**: Simultaneously runs predictions for three key health areas:
    -   **Heart Disease**: Assesses the risk of heart-related issues.
    -   **Sleep Disorder**: Predicts the likelihood of sleep patterns and disorders.
    -   **Metabolic Syndrome**: Evaluates metabolic health indicators.
-   **Comprehensive Health Form**: Collects detailed user data including BMI, physical activity, sleep habits, and clinical metrics like blood pressure and cholesterol levels.
-   **Real-time Analysis**: sophisticated preprocessing pipeline transforms raw input into model-ready features for instant predictions.
-   **Modern UI/UX**: Built with React and Tailwind CSS, featuring a clean, responsive design using Shadcn UI components.
-   **RESTful API**: Flask-based backend orchestrating multiple ML models and handling data preprocessing.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React (Vite)
-   **Styling**: Tailwind CSS, Shadcn UI
-   **Icons**: Lucide React
-   **HTTP Client**: Axios
-   **State Management**: React Hooks

### Backend
-   **Framework**: Flask
-   **Language**: Python
-   **Data Processing**: Pandas, NumPy
-   **Machine Learning**: Scikit-learn, XGBoost, LightGBM, Imbalanced-learn
-   **Serialization**: Pickle

## 📂 Project Structure

```
medical-health-assessment/
├── backend/                 # Flask API and ML Models
│   ├── Heart_health_module/ # Heart disease model
│   ├── Metabolism_module/   # Metabolic syndrome model
│   ├── Sleep_quality_module/# Sleep disorder model
│   ├── app.py              # Main application entry point
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Container configuration
├── frontend/                # React Application
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── Form.jsx        # Main data collection form
│   │   └── ...
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
└── README.md               # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18+ recommended)
-   Python (v3.10+ recommended)

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install the required Python packages:
```bash
pip install -r requirements.txt
```

Start the Flask server:
```bash
python app.py
```
*The server will start at `http://localhost:5000`*

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install Node dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
*The application will optionally run at `http://localhost:5173` (or the port shown in your terminal)*

## 📝 Usage

1.  Open the frontend application in your browser.
2.  Fill out the health assessment form with accurate details (Age, Gender, BMI, Sleep patterns, Clinical data, etc.).
3.  Submit the form.
4.  View the prediction results for Heart Health, Sleep Quality, and Metabolic Syndrome.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
