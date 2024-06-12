from flask import Flask, request, jsonify
from models import db, Customer, Order
import pika
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crm.db'
db.init_app(app)

# Create tables if they don't exist
with app.app_context():
    db.create_all()

@app.route('/customer', methods=['POST'])
def add_customer():
    data = request.get_json()
    if 'name' not in data or 'email' not in data or 'phone' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    # Publish to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='customer_queue')
    channel.basic_publish(exchange='', routing_key='customer_queue', body=json.dumps(data))
    connection.close()
    
    return jsonify({'status': 'Customer data sent to queue'}), 202

@app.route('/order', methods=['POST'])
def add_order():
    data = request.get_json()
    if 'product_name' not in data or 'amount' not in data or 'customer_id' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    # Publish to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='order_queue')
    channel.basic_publish(exchange='', routing_key='order_queue', body=json.dumps(data))
    connection.close()
    
    return jsonify({'status': 'Order data sent to queue'}), 202

if __name__ == '__main__':
    app.run(debug=True)
