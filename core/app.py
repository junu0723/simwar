from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/api/game', methods=['GET'])
def get_game_data():
    return jsonify({"message": "Hello from Python server!"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
