from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)



@app.route('/')
def index():
    return render_template('index.html')



@app.route('/predict', methods=['POST', 'GET'])
def predict():

    with open('randomForest.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    # Get the data from the request
    data = request.get_json(force=True)

    # Convert the input data (array of arrays) to a DataFrame
    input_data = pd.DataFrame(data)

    # Make predictions
    predictions = model.predict(input_data)

    # Return the predictions as a JSON response
    return jsonify({'predictions': predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True)