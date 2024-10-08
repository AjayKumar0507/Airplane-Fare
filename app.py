from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)


# Load the pickled model
with open('randomForest.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the request
    data = request.get_json(force=True)

    # Convert the input data (array of arrays) to a DataFrame
    input_data = pd.DataFrame(data)

    # Make predictions
    predictions = model.predict(input_data)

    # Return the predictions as a JSON response
    return jsonify({'predictions': predictions.tolist()})

