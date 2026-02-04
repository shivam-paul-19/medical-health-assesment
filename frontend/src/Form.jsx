import { useState } from 'react';
import './Form.css';
import axios from "axios";

const Form = ({getOutput}) => {
  const [formData, setFormData] = useState({
    // Personal Details
    age: '',
    gender: '',
    race: '',
    occupation: '',
    
    // Body & Basic Measurements
    height: '',
    weight: '',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    
    // Sleep & Daily Routine
    sleepDuration: '',
    sleepQuality: '',
    dailySteps: '',
    physicalActivity: '',
    physicalActivityDuration: '',
    
    // Habits & Lifestyle Choices
    smoking: '',
    alcoholDrinking: '',
    
    // Mental & Physical Well-being
    physicalHealth: '',
    mentalHealth: '',
    stressLevel: '',
    genHealth: '',
    diffWalking: '',
    
    // Past Diseases / Health Conditions
    stroke: '',
    diabetic: '',
    asthma: '',
    kidneyDisease: '',
    skinCancer: '',
    
    // Clinical & Lab-related Indicators (optional)
    albuminuria: '',
    urineAlbuminCreatinineRatio: '',
    uricAcidCategory: '',
    goodCholesterol: '',
    trigCategory: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Personal Details
    if (!formData.age || formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.race) newErrors.race = 'Race is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    
    // Body & Basic Measurements
    if (!formData.height || formData.height < 100 || formData.height > 200) {
      newErrors.height = 'Height must be between 100 and 200 cm';
    }
    if (!formData.weight || formData.weight < 30 || formData.weight > 150) {
      newErrors.weight = 'Weight must be between 30 and 150 kg';
    }
    if (!formData.systolicBP || formData.systolicBP < 90 || formData.systolicBP > 200) {
      newErrors.systolicBP = 'Systolic BP must be between 90 and 200 mmHg';
    }
    if (!formData.diastolicBP || formData.diastolicBP < 60 || formData.diastolicBP > 130) {
      newErrors.diastolicBP = 'Diastolic BP must be between 60 and 130 mmHg';
    }
    if (!formData.heartRate || formData.heartRate < 40 || formData.heartRate > 200) {
      newErrors.heartRate = 'Heart Rate must be between 40 and 200 bpm';
    }
    
    // Sleep & Daily Routine
    if (!formData.sleepDuration || formData.sleepDuration < 0 || formData.sleepDuration > 24) {
      newErrors.sleepDuration = 'Sleep Duration must be between 0 and 24 hours';
    }
    if (!formData.sleepQuality || formData.sleepQuality < 1 || formData.sleepQuality > 10) {
      newErrors.sleepQuality = 'Sleep Quality must be between 1 and 10';
    }
    if (!formData.dailySteps || formData.dailySteps < 0 || formData.dailySteps > 50000) {
      newErrors.dailySteps = 'Daily Steps must be between 0 and 50,000';
    }
    if (!formData.physicalActivity) newErrors.physicalActivity = 'Physical Activity is required';
    if (formData.physicalActivity === 'Yes' && (!formData.physicalActivityDuration || formData.physicalActivityDuration < 0 || formData.physicalActivityDuration > 300)) {
      newErrors.physicalActivityDuration = 'Duration must be between 0 and 300 minutes';
    }
    
    // Habits & Lifestyle Choices
    if (!formData.smoking) newErrors.smoking = 'Smoking status is required';
    if (!formData.alcoholDrinking) newErrors.alcoholDrinking = 'Alcohol drinking status is required';
    
    // Mental & Physical Well-being
    if (!formData.physicalHealth || formData.physicalHealth < 1 || formData.physicalHealth > 30) {
      newErrors.physicalHealth = 'Physical Health must be between 1 and 30';
    }
    if (!formData.mentalHealth || formData.mentalHealth < 1 || formData.mentalHealth > 30) {
      newErrors.mentalHealth = 'Mental Health must be between 1 and 30';
    }
    if (!formData.stressLevel || formData.stressLevel < 1 || formData.stressLevel > 10) {
      newErrors.stressLevel = 'Stress Level must be between 1 and 10';
    }
    if (!formData.genHealth) newErrors.genHealth = 'General Health is required';
    if (!formData.diffWalking) newErrors.diffWalking = 'Difficulty Walking status is required';
    
    // Past Diseases / Health Conditions
    if (!formData.stroke) newErrors.stroke = 'Stroke status is required';
    if (!formData.diabetic) newErrors.diabetic = 'Diabetic status is required';
    if (!formData.asthma) newErrors.asthma = 'Asthma status is required';
    if (!formData.kidneyDisease) newErrors.kidneyDisease = 'Kidney Disease status is required';
    if (!formData.skinCancer) newErrors.skinCancer = 'Skin Cancer status is required';
    
    // Clinical & Lab-related Indicators (Required)
    if (!formData.goodCholesterol) newErrors.goodCholesterol = 'Good Cholesterol is required';
    if (!formData.uricAcidCategory) newErrors.uricAcidCategory = 'Uric Acid Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Typecast numeric fields to numbers before logging
      const processedData = {
        ...formData,
        // Personal Details
        age: formData.age ? Number(formData.age) : '',
        
        // Body & Basic Measurements
        height: formData.height ? Number(formData.height) : '',
        weight: formData.weight ? Number(formData.weight) : '',
        systolicBP: formData.systolicBP ? Number(formData.systolicBP) : '',
        diastolicBP: formData.diastolicBP ? Number(formData.diastolicBP) : '',
        heartRate: formData.heartRate ? Number(formData.heartRate) : '',
        
        // Sleep & Daily Routine
        sleepDuration: formData.sleepDuration ? Number(formData.sleepDuration) : '',
        sleepQuality: formData.sleepQuality ? Number(formData.sleepQuality) : '',
        dailySteps: formData.dailySteps ? Number(formData.dailySteps) : '',
        physicalActivityDuration: formData.physicalActivityDuration ? Number(formData.physicalActivityDuration) : '',
        
        // Mental & Physical Well-being
        physicalHealth: formData.physicalHealth ? Number(formData.physicalHealth) : '',
        mentalHealth: formData.mentalHealth ? Number(formData.mentalHealth) : '',
        stressLevel: formData.stressLevel ? Number(formData.stressLevel) : '',
        
        // Clinical & Lab-related Indicators (optional)
        urineAlbuminCreatinineRatio: formData.urineAlbuminCreatinineRatio ? Number(formData.urineAlbuminCreatinineRatio) : ''
      };
      
      console.log(processedData);
      let response = await axios.post("http://localhost:5000/predict", processedData);
      console.log(response)
      getOutput(response.data)
    } else {
      alert('Please fix the errors in the form');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Medical Health Assessment</h1>
        <p>Please fill out all required fields to complete your health profile</p>
      </div>

      <form onSubmit={handleSubmit} className="medical-form">
        
        {/* Personal Details Section */}
        <section className="form-section">
          <h2>🧑 Personal Details</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="100"
                placeholder="18-100"
              />
              {errors.age && <span className="error">{errors.age}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="race">Race *</label>
              <select
                id="race"
                name="race"
                value={formData.race}
                onChange={handleChange}
              >
                <option value="">Select Race</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Asian">Asian</option>
                <option value="Hispanic">Hispanic</option>
                <option value="American Indian/Alaskan Native">American Indian/Alaskan Native</option>
                <option value="MexAmerican">MexAmerican</option>
              </select>
              {errors.race && <span className="error">{errors.race}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="occupation">Occupation *</label>
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              >
                <option value="">Select Occupation</option>
                <option value="Teacher">Teacher</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Scientist">Scientist</option>
                <option value="Salesperson">Salesperson</option>
                <option value="Nurse">Nurse</option>
                <option value="Manager">Manager</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Engineer">Engineer</option>
                <option value="Doctor">Doctor</option>
                <option value="Accountant">Accountant</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
              {errors.occupation && <span className="error">{errors.occupation}</span>}
            </div>
          </div>
        </section>

        {/* Body & Basic Measurements Section */}
        <section className="form-section">
          <h2>📏 Body & Basic Measurements</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="height">Height (cm) *</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="100"
                max="200"
                placeholder="100-200"
              />
              {errors.height && <span className="error">{errors.height}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="weight">Weight (kg) *</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="30"
                max="150"
                placeholder="30-150"
              />
              {errors.weight && <span className="error">{errors.weight}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="systolicBP">Systolic BP (mmHg) *</label>
              <input
                type="number"
                id="systolicBP"
                name="systolicBP"
                value={formData.systolicBP}
                onChange={handleChange}
                min="90"
                max="200"
                placeholder="90-200"
              />
              {errors.systolicBP && <span className="error">{errors.systolicBP}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="diastolicBP">Diastolic BP (mmHg) *</label>
              <input
                type="number"
                id="diastolicBP"
                name="diastolicBP"
                value={formData.diastolicBP}
                onChange={handleChange}
                min="60"
                max="130"
                placeholder="60-130"
              />
              {errors.diastolicBP && <span className="error">{errors.diastolicBP}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="heartRate">Heart Rate (bpm) *</label>
              <input
                type="number"
                id="heartRate"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                min="40"
                max="200"
                placeholder="40-200"
              />
              {errors.heartRate && <span className="error">{errors.heartRate}</span>}
            </div>
          </div>
        </section>

        {/* Sleep & Daily Routine Section */}
        <section className="form-section">
          <h2>🛌 Sleep & Daily Routine</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="sleepDuration">Sleep Duration (hrs) *</label>
              <input
                type="number"
                id="sleepDuration"
                name="sleepDuration"
                value={formData.sleepDuration}
                onChange={handleChange}
                min="0"
                max="24"
                step="0.5"
                placeholder="0-24"
              />
              {errors.sleepDuration && <span className="error">{errors.sleepDuration}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="sleepQuality">Sleep Quality (1-10) *</label>
              <input
                type="number"
                id="sleepQuality"
                name="sleepQuality"
                value={formData.sleepQuality}
                onChange={handleChange}
                min="1"
                max="10"
                placeholder="1 (poor) - 10 (excellent)"
              />
              {errors.sleepQuality && <span className="error">{errors.sleepQuality}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="dailySteps">Daily Steps *</label>
              <input
                type="number"
                id="dailySteps"
                name="dailySteps"
                value={formData.dailySteps}
                onChange={handleChange}
                min="0"
                max="50000"
                placeholder="0-50,000"
              />
              {errors.dailySteps && <span className="error">{errors.dailySteps}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="physicalActivity">Physical Activity *</label>
              <select
                id="physicalActivity"
                name="physicalActivity"
                value={formData.physicalActivity}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.physicalActivity && <span className="error">{errors.physicalActivity}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="physicalActivityDuration">Physical Activity Duration (min/day) *</label>
              <input
                type="number"
                id="physicalActivityDuration"
                name="physicalActivityDuration"
                value={formData.physicalActivityDuration}
                onChange={handleChange}
                min="0"
                max="300"
                placeholder="0-300"
                disabled={formData.physicalActivity !== 'Yes'}
              />
              {errors.physicalActivityDuration && <span className="error">{errors.physicalActivityDuration}</span>}
            </div>
          </div>
        </section>

        {/* Habits & Lifestyle Choices Section */}
        <section className="form-section">
          <h2>🚬 Habits & Lifestyle Choices</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="smoking">Smoking *</label>
              <select
                id="smoking"
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.smoking && <span className="error">{errors.smoking}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="alcoholDrinking">Alcohol Drinking *</label>
              <select
                id="alcoholDrinking"
                name="alcoholDrinking"
                value={formData.alcoholDrinking}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.alcoholDrinking && <span className="error">{errors.alcoholDrinking}</span>}
            </div>
          </div>
        </section>

        {/* Mental & Physical Well-being Section */}
        <section className="form-section">
          <h2>🧠 Mental & Physical Well-being</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="physicalHealth">Physical Health (days) *</label>
              <input
                type="number"
                id="physicalHealth"
                name="physicalHealth"
                value={formData.physicalHealth}
                onChange={handleChange}
                min="1"
                max="30"
                placeholder="1-30 days"
              />
              {errors.physicalHealth && <span className="error">{errors.physicalHealth}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="mentalHealth">Mental Health (days) *</label>
              <input
                type="number"
                id="mentalHealth"
                name="mentalHealth"
                value={formData.mentalHealth}
                onChange={handleChange}
                min="1"
                max="30"
                placeholder="1-30 days"
              />
              {errors.mentalHealth && <span className="error">{errors.mentalHealth}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="stressLevel">Stress Level (1-10) *</label>
              <input
                type="number"
                id="stressLevel"
                name="stressLevel"
                value={formData.stressLevel}
                onChange={handleChange}
                min="1"
                max="10"
                placeholder="1 (no stress) - 10 (extreme)"
              />
              {errors.stressLevel && <span className="error">{errors.stressLevel}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="genHealth">General Health *</label>
              <select
                id="genHealth"
                name="genHealth"
                value={formData.genHealth}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Excellent">Excellent</option>
                <option value="Very good">Very good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
              {errors.genHealth && <span className="error">{errors.genHealth}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="diffWalking">Difficulty Walking *</label>
              <select
                id="diffWalking"
                name="diffWalking"
                value={formData.diffWalking}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.diffWalking && <span className="error">{errors.diffWalking}</span>}
            </div>
          </div>
        </section>

        {/* Past Diseases / Health Conditions Section */}
        <section className="form-section">
          <h2>🧬 Past Diseases / Health Conditions</h2>
          <div className="form-grid radio-grid">
            <div className="form-field radio-field">
              <label>Stroke *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="stroke"
                    value="Yes"
                    checked={formData.stroke === 'Yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="stroke"
                    value="No"
                    checked={formData.stroke === 'No'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.stroke && <span className="error">{errors.stroke}</span>}
            </div>

            <div className="form-field radio-field">
              <label>Diabetic *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="diabetic"
                    value="Yes"
                    checked={formData.diabetic === 'Yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="diabetic"
                    value="Pre-diabetic"
                    checked={formData.diabetic === 'Pre-diabetic'}
                    onChange={handleChange}
                  />
                  <span>Pre-diabetic</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="diabetic"
                    value="No"
                    checked={formData.diabetic === 'No'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.diabetic && <span className="error">{errors.diabetic}</span>}
            </div>

            <div className="form-field radio-field">
              <label>Asthma *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="asthma"
                    value="Yes"
                    checked={formData.asthma === 'Yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="asthma"
                    value="No"
                    checked={formData.asthma === 'No'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.asthma && <span className="error">{errors.asthma}</span>}
            </div>

            <div className="form-field radio-field">
              <label>Kidney Disease *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="kidneyDisease"
                    value="Yes"
                    checked={formData.kidneyDisease === 'Yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="kidneyDisease"
                    value="No"
                    checked={formData.kidneyDisease === 'No'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.kidneyDisease && <span className="error">{errors.kidneyDisease}</span>}
            </div>

            <div className="form-field radio-field">
              <label>Skin Cancer *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="skinCancer"
                    value="Yes"
                    checked={formData.skinCancer === 'Yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="skinCancer"
                    value="No"
                    checked={formData.skinCancer === 'No'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.skinCancer && <span className="error">{errors.skinCancer}</span>}
            </div>
          </div>
        </section>

        {/* Clinical & Lab-related Indicators Section (Required) */}
        <section className="form-section">
          <h2>🧪 Clinical & Lab-related Indicators (Required)</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="goodCholesterol">Good Cholesterol *</label>
              <select
                id="goodCholesterol"
                name="goodCholesterol"
                value={formData.goodCholesterol}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
              {errors.goodCholesterol && <span className="error">{errors.goodCholesterol}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="uricAcidCategory">Uric Acid Category *</label>
              <select
                id="uricAcidCategory"
                name="uricAcidCategory"
                value={formData.uricAcidCategory}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
              {errors.uricAcidCategory && <span className="error">{errors.uricAcidCategory}</span>}
            </div>
          </div>
        </section>

        {/* Clinical & Lab-related Indicators Section (Optional) */}
        <section className="form-section optional-section">
          <h2>🧪 Clinical & Lab-related Indicators <span className="optional-badge">Optional</span></h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="albuminuria">Albuminuria</label>
              <select
                id="albuminuria"
                name="albuminuria"
                value={formData.albuminuria}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="urineAlbuminCreatinineRatio">Urine Albumin-Creatinine Ratio (mg/g)</label>
              <input
                type="number"
                id="urineAlbuminCreatinineRatio"
                name="urineAlbuminCreatinineRatio"
                value={formData.urineAlbuminCreatinineRatio}
                onChange={handleChange}
                min="0"
                max="3000"
                placeholder="0-3000"
              />
            </div>

            <div className="form-field">
              <label htmlFor="trigCategory">Triglyceride Category</label>
              <select
                id="trigCategory"
                name="trigCategory"
                value={formData.trigCategory}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit Assessment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;