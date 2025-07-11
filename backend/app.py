from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load the model
model = pickle.load(open("diabetes_model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    input_data = [list(data.values())]
    prediction = model.predict(input_data)[0]
    result = "Diabetic" if prediction == 1 else "Not Diabetic"
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)

