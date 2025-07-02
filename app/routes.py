print("Routes module loaded")

from app import app, db
from app.models import Vehicle
from flask import request

@app.route('/')
def root():
    return "HELLO ROOT"
@app.route('/home', methods=['GET'])
def home():
    return 'Welcome to your rental car system'

@app.route('/ping')
def ping():
    return "pong"

@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()  # Fetch all vehicles from the database
    return {
        "vehicles": [
            {
                "id": vehicle.id,
                "name": vehicle.name,
                "model": vehicle.model,
                "year": vehicle.year,
                "category": vehicle.category,
                "availability":vehicle.availability
            }
            for vehicle in vehicles
        ]
    }
@app.route('/vehicles', methods=['POST'])
def add_vehicle():
    data = request.get_json()

    valid_categories = ['SUV', 'Economy', 'Luxury', 'Other']
    valid_availability = ['free', 'booked', 'maintenance']

    category = data.get('category')
    availability = data.get('availability')

    if not category or category not in valid_categories:
        return {"error": "Invalid or missing category"}, 400

    if not availability or availability not in valid_availability:
        return {"error": "Invalid or missing availability status"}, 400

    new_vehicle = Vehicle(
        name=data.get('name'),
        model=data.get('model'),
        year=data.get('year'),
        category=category,
        availability=availability
    )

    db.session.add(new_vehicle)
    db.session.commit()

    return {"message": "Vehicle added successfully!"}, 201

@app.route('/vehicles/<int:id>', methods=['GET'])
def get_vehicle(id):
    vehicle = Vehicle.query.get(id)
    if vehicle:
        return {
            "id": vehicle.id,
            "name": vehicle.name,
            "model": vehicle.model,
            "year": vehicle.year,
            "category": vehicle.category,
            "availability": vehicle.availability
        }
    else:
        return {"error": "Vehicle not found"}, 404

@app.route('/vehicles/<int:id>', methods=['PUT'])
def update_vehicle(id):
    vehicle = Vehicle.query.get(id)
    if not vehicle:
        return {"error": "Vehicle not found"}, 404

    data = request.get_json()

    valid_categories = ['SUV', 'Economy', 'Luxury', 'Other']
    valid_availability = ['free', 'booked', 'maintenance']

    if 'category' in data and data['category'] not in valid_categories:
        return {"error": "Invalid category"}, 400

    if 'availability' in data and data['availability'] not in valid_availability:
        return {"error": "Invalid availability status"}, 400

    vehicle.name = data.get('name', vehicle.name)
    vehicle.model = data.get('model', vehicle.model)
    vehicle.year = data.get('year', vehicle.year)
    vehicle.category = data.get('category', vehicle.category)
    vehicle.availability = data.get('availability', vehicle.availability)

    db.session.commit()

    return {"message": "Vehicle updated successfully!"}

@app.route('/vehicles/<int:id>', methods=['DELETE'])
def delete_vehicle(id):
    vehicle = Vehicle.query.get(id)
    if not vehicle:
        return {"error": "Vehicle not found"}, 404

    db.session.delete(vehicle)
    db.session.commit()

    return {"message": "Vehicle deleted successfully!"}



