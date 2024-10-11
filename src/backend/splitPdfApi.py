from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from splitPdf import downloadSelected
import os
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-type'

"""
API for transforming an uploaded PDF file to a new PDF file that contains only the selected pages, 
as specified by the client.

POST /download: 
  Expect a file to be passed from the client as form data and an array containing the selected pages.
        
  Returns:
    - zip file containing the split Pdf files. 
    - JSON response containing an error message if no file has been sent from the client.
"""
@app.route('/download', methods=["POST"])
def split():
    if request.method == "POST":
        if 'pdfFile' not in request.files:
            return jsonify({'error': 'No file attached'})

        file = request.files['pdfFile']
        pages = json.loads(request.form['selectedPages'])

        if file.filename == '':
            return jsonify({'error': 'No file attached'})

        result = downloadSelected(file, pages)

        return send_file(result, as_attachment=True, download_name=f'payslips.zip', mimetype='application/zip')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)