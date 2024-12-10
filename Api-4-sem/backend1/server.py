from flask import Flask, request, jsonify
from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient("mongodb+srv://neocodeapi:fatec@cluster0.l4elctr.mongodb.net/?retryWrites=true&w=majority", serverSelectionTimeoutMS=2000)

db = client['mongodb']
collection = db['dadosEstacao']

@app.route('/v0/dados', methods=['POST'])
def cadastrar_dados():
    data = request.json
    if data:
        result = collection.insert_one(data)
        return jsonify({"message": "Dados cadastrados com sucesso", "id": str(result.inserted_id)})
    else:
        return jsonify({"error": "Dados ausentes no corpo da solicitação"}, 400)

if __name__ == '__main__':
    app.run(debug=True)

