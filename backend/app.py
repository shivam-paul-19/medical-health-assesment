from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS
from abc import ABC, abstractmethod

app = Flask(__name__)
CORS(app)

def loadModel(filePath: str) -> object:
    with open(filePath, "rb") as file:
        return pickle.load(file)

heart_model = loadModel('Heart_health_module/heart_disease_predictor.pkl')
sleep_model = loadModel('Sleep_quality_module/sleep_disorder_predictor.pkl')
metabolism_model = loadModel('Metabolism_module/metabolic_syndrome_predictor.pkl')

# Classes for making prediction
class PredictionModel(ABC):
    @abstractmethod
    def predict(self, data: pd.DataFrame) -> int:
        pass

class HeartPredictionModel(PredictionModel):
    def predict(self, data: pd.DataFrame) -> int:
        prediction = heart_model.predict(data)
        return prediction[0]

class SleepPredictionModel(PredictionModel):
    def predict(self, data: pd.DataFrame) -> int:
        prediction = sleep_model.predict(data)
        return prediction[0]

class MetabolismPredictionModel(PredictionModel):
    def predict(self, data: pd.DataFrame) -> int:
        prediction = metabolism_model.predict(data)
        return prediction[0]

# class to preprocess data
class Preprocessor(ABC):
    @abstractmethod
    def process(self, data: dict) -> pd.DataFrame:
        pass

class FeatureProcessor():
    def featureProcess(self, rawData: dict) -> dict:
        data = {}
        values = [
            "Smoking","AlcoholDrinking","Stroke","PhysicalHealth","MentalHealth",
            "DiffWalking","Race","PhysicalActivity","GenHealth",
            "SleepTime","Asthma","KidneyDisease","SkinCancer","Occupation",
            "Sleep Duration","Quality of Sleep","Physical Activity Level","Stress Level",
            "Heart Rate","Daily Steps","HDLCategory", "UricAcidCategory"
        ]

        # calculating Values
        height = rawData['height']
        weight = rawData['weight']
        BMI = weight/(height**2)

        data['BMI'] = BMI
        # make BMI categories (Normal, overweight, Underweight)
        if BMI < 18.5:
            data['BMI Category'] = "Underweight"
        elif 18.5 <= BMI < 25:
            data['BMI Category'] = "Normal"
        else:
            data['BMI Category'] = "Overweight"
        
        # getting age category
        age = rawData['age']
        data["Age"] = age
        if 18 <= age <= 24:
            data['AgeCategory'] = "18-24"
        elif 25 <= age <= 29:
            data['AgeCategory'] = "25-29"
        elif 30 <= age <= 34:
            data['AgeCategory'] = "30-34"
        elif 35 <= age <= 39:
            data['AgeCategory'] = "35-39"
        elif 40 <= age <= 44:
            data['AgeCategory'] = "40-44"
        elif 45 <= age <= 49:
            data['AgeCategory'] = "45-49"
        elif 50 <= age <= 54:
            data['AgeCategory'] = "50-54"
        elif 55 <= age <= 59:
            data['AgeCategory'] = "55-59"
        elif 60 <= age <= 64:
            data['AgeCategory'] = "60-64"
        elif 65 <= age <= 69:
            data['AgeCategory'] = "65-69"
        elif 70 <= age <= 74:
            data['AgeCategory'] = "70-74"
        elif 75 <= age <= 79:
            data['AgeCategory'] = "75-79"
        elif 80 <= age <= 84:
            data['AgeCategory'] = "80-84"
        else:
            data['AgeCategory'] = "85+"
        
        # getting value of sex
        data['Sex'] = data['Gender'] = rawData['gender']

        # blood pressure
        data['Blood Pressure'] = f"{rawData['systolicBP']}/{rawData['diastolicBP']}"

        # blood sugar 
        diab = data['Diabetic'] = rawData['diabetic']
        if diab == 'Yes':
            data['BloodSugarCategory'] = "Diabetic"
        elif diab == 'No':
            data['BloodSugarCategory'] = "Non-Diabetic"
        else:
            data['BloodSugarCategory'] = "Pre-Diabetic"

        # optional fields
        if rawData['urineAlbuminCreatinineRatio'] == "":
            data['UrAlbCr'] = 7.07  # replaced with median
        else:
            data['UrAlbCr'] = rawData['urineAlbuminCreatinineRatio']
        
        if rawData['albuminuria'] == "":
            data['Albuminuria'] = 0
        else:
            data['Albuminuria'] = 0 if rawData['albuminuria'] == "No" else 1

        
        if rawData['trigCategory'] == "":
            data["TrigCategory"] = "Normal"
        else:
            data["TrigCategory"] = rawData['trigCategory']

        
        
        # rest of the mapping
        mapping = {
            "Smoking": "smoking",
            "AlcoholDrinking": "alcoholDrinking",
            "Stroke": "stroke",
            "PhysicalHealth": "physicalHealth",
            "MentalHealth": "mentalHealth",
            "DiffWalking": "diffWalking",
            "Race": "race",
            "PhysicalActivity": "physicalActivity",
            "Physical Activity Level": "physicalActivityDuration",
            "GenHealth": "genHealth",
            "SleepTime": "sleepDuration",
            "Asthma": "asthma",
            "KidneyDisease": "kidneyDisease",
            "SkinCancer": "skinCancer",
            "Occupation": "occupation",
            "Sleep Duration": "sleepDuration",
            "Quality of Sleep": "sleepQuality",
            "Stress Level": "stressLevel",
            "Heart Rate": "heartRate",
            "Daily Steps": "dailySteps",
            "HDLCategory": "goodCholesterol",
            "UricAcidCategory": "uricAcidCategory"
        }

        for key in values:
            source_key = mapping.get(key)
            if source_key and source_key in rawData:
                data[key] = rawData[source_key]
        
        return data

class HeartPreprocessor(Preprocessor):
    def process(self, data: dict) -> pd.DataFrame:
        cols = ["BMI","Smoking","AlcoholDrinking","Stroke","PhysicalHealth","MentalHealth",
            "DiffWalking","Sex","AgeCategory","Race","Diabetic","PhysicalActivity","GenHealth",
            "SleepTime","Asthma","KidneyDisease", "SkinCancer"]
        
        values = []
        for col in cols:
            values.append(data[col])
        
        return pd.DataFrame([values], columns=cols)
    
class SleepPreprocessor(Preprocessor):
    def process(self, data: dict) -> pd.DataFrame:
        cols = ['Gender', 'Age', 'Occupation', 'Sleep Duration', 'Quality of Sleep', 
        'Physical Activity Level', 'Stress Level', 'BMI Category', 
        'Blood Pressure', 'Heart Rate', 'Daily Steps']
        
        values = []
        for col in cols:
            values.append(data[col])
        
        return pd.DataFrame([values], columns=cols)

class MetabolismPreprocessor(Preprocessor):
    def process(self, data: dict) -> pd.DataFrame:
        cols = ['Age', 'Sex', 'Race', 'BMI', 'Albuminuria', 'UrAlbCr', 
        'UricAcidCategory', 'HDLCategory', 'TrigCategory', 'BloodSugarCategory']
        
        values = []
        for col in cols:
            values.append(data[col])
        
        return pd.DataFrame([values], columns=cols)

# class to manage all the flow
class PredictionOrechestrator():
    def __init__(self, models: list, preprocessors: list, names: list):
        self.models = models
        self.preprocessors = preprocessors
        self.names = names
    
    def run(self, data: dict) -> dict:
        output = {}

        F = FeatureProcessor()
        data = F.featureProcess(dict(data))

        for model, preprocessors, module_name in zip(self.models, self.preprocessors, self.names):
            processed_data = preprocessors.process(data)
            prediction = model.predict(processed_data)
            print("PREDICTION: -> ", prediction)
            output[module_name] = prediction

        return output
    
model_list = [HeartPredictionModel(), SleepPredictionModel(), MetabolismPredictionModel()]
preprocessors_list = [HeartPreprocessor(), SleepPreprocessor(), MetabolismPreprocessor()]
names_list = ["Heart", "Sleep", "Metabolism"]

predictor = PredictionOrechestrator(models=model_list, preprocessors=preprocessors_list, names=names_list)

@app.route("/predict", methods=["POST"])
def predict():
    if request.is_json:
        data = request.get_json()
        output = predictor.run(data)
        print(output)
        return jsonify({
            "heart": int(output["Heart"]),
            "sleep": int(output["Sleep"]),
            "metabolism": int(output["Metabolism"])
        }), 200
    else:
        return jsonify("wrong Data")

# routes to test the server only
@app.route("/test", methods=["GET"])
def test():
    return "All ok!"

@app.route("/testpost", methods=["POST"])
def testpost():
    if request.is_json:
        data = request.get_json()
        return jsonify({
            "status": "All good",
            "data": data
        }), 200

    else:
        return jsonify({
            "status": "problem in data",
        }), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)