# consumer.py

import pika
import json
from models import db, Customer, Order
from app import app

def save_customer(ch, method, properties, body):
    data = json.loads(body)
    with app.app_context():
        new_customer = Customer(name=data['name'], email=data['email'], phone=data['phone'])
        db.session.add(new_customer)
        db.session.commit()
    ch.basic_ack(delivery_tag=method.delivery_tag)

def save_order(ch, method, properties, body):
    data = json.loads(body)
    with app.app_context():
        new_order = Order(product_name=data['product_name'], amount=data['amount'], customer_id=data['customer_id'])
        db.session.add(new_order)
        db.session.commit()
    ch.basic_ack(delivery_tag=method.delivery_tag)

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='customer_queue')
channel.basic_consume(queue='customer_queue', on_message_callback=save_customer)

channel.queue_declare(queue='order_queue')
channel.basic_consume(queue='order_queue', on_message_callback=save_order)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
