from app import app
from app.views import view_one, view_two, view_three

if __name__ == '__main__':
    app.register_blueprint(view_one.mod)
    app.register_blueprint(view_two.mod)
    app.register_blueprint(view_three.mod)
    app.run(host="0.0.0.0", port=5000, debug=True)
