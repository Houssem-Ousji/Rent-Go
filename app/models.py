from app import db

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    model = db.Column(db.String(50))
    year = db.Column(db.Integer)
    category = db.Column(db.String(20))
    availability = db.Column(db.String(20))

    def __repr__(self):
        return f"<Vehicle {self.name} ({self.model})>"
