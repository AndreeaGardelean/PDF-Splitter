from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from splitPdf import splitPdf

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-type'

"""
Flask application for splitting PDF files into individual pages and returning them as a ZIP file.

POST /split: 
  Expect a file to be passed from the client as form data.
        
  Returns:
    - zip file containing the split Pdf files. 
    - JSON response containing an error message if no file has been sent from the client.
"""
@app.route('/split', methods=["POST"])
def split():
  if request.method == "POST":
    if 'pdfFile' not in request.files:
      return jsonify({'error': 'No file attached'})
    
    file = request.files['pdfFile']
    if file.filename == '':
      return jsonify({'error': 'No file attached'})
    
    result = splitPdf(file)
    
    return send_file(result, as_attachment=True, download_name=f'payslips.zip', mimetype='application/zip')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)