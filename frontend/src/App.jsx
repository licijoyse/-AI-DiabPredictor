import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data.prediction === 1 ? "Diabetic" : "Not Diabetic");
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const resetForm = () => {
    setResult("");
    setFormData({
      Pregnancies: "",
      Glucose: "",
      BloodPressure: "",
      SkinThickness: "",
      Insulin: "",
      BMI: "",
      DiabetesPedigreeFunction: "",
      Age: "",
    });
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <h1 className="display-5 fw-bold text-primary">🩺AI DiabPredictor</h1>
        <p className="lead mt-3">Get fast and accurate diabetes predictions using Machine Learning</p>
        <button
          onClick={() => formRef.current.scrollIntoView({ behavior: "smooth" })}
          className="btn btn-primary mt-4"
        >
          Start Prediction
        </button>
      </section>

      {/* Features */}
      <section className="features-section bk py-5  text-center">
        <div className="container">
          <h3 className="mb-4 text-success">Why Choose This App?</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>⚡ Instant Prediction</h5>
              <p>Get your result in seconds with ML-backed precision.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>🎯 Trained on Real Data</h5>
              <p>Dataset from real-world medical research.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>📊 User Friendly</h5>
              <p>Clean and modern UI with responsive design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 Prediction Form Section with Background Image */}
      <div className="form-section" ref={formRef}>
        <div className="container my-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4 text-primary">Enter Details to Predict</h2>

            {!result ? (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {Object.keys(formData).map((field, idx) => (
                    <div className="col-md-6 mb-3" key={idx}>
                      <label className="form-label">{field}</label>
                      <input
                        type="number"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button className="btn btn-success mt-3">Predict</button>
                </div>
              </form>
            ) : (
              <div className="text-center mt-4">
                <div className="alert alert-info">
                  Prediction Result: <strong>{result}</strong>
                </div>
                <button className="btn btn-secondary mt-3" onClick={resetForm}>
                  🔙 Back to Form
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark text-white">
        <p className="mb-0">© 2025 AI DiabPredictor</p>
      </footer>
    </div>
  );
}

export default App;
