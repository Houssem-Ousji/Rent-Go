from app import app, db

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(rule)

    app.run(debug=True, port=5050)
