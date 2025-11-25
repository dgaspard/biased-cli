from flask import Flask, jsonify
import os

app = Flask(__name__)

PROJECT_NAME = os.getenv('PROJECT_NAME', '{{PROJECT_NAME}}')
PROJECT_PROBLEM = '{{PROJECT_PROBLEM}}'
USER_PERSONAS = '{{USER_PERSONAS}}'

@app.route('/')
def index():
    return jsonify({
        'message': f'Welcome to {PROJECT_NAME}',
        'problem': PROJECT_PROBLEM,
        'personas': USER_PERSONAS
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'service': PROJECT_NAME
    })

if __name__ == '__main__':
    print(f'🚀 {PROJECT_NAME} running on http://localhost:5000')
    print(f'📋 Problem: {PROJECT_PROBLEM}')
    print(f'👥 Personas: {USER_PERSONAS}')
    app.run(host='0.0.0.0', port=5000, debug=True)
