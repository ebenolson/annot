from flask import Flask, render_template
from flask_restful import Api
from flask.ext.bower import Bower

from .views import filelist
from .views import classmap
from .resources.files import image
from .resources.files import label

app = Flask(__name__)

Bower(app)

api = Api(app)

api.add_resource(image,
                 '/image/<name>',
                 '/image/<name>/<int:layer>')

api.add_resource(label,
                 '/label/<path>',
                 '/image/<path>/<int:layer>')

app.register_blueprint(filelist.mod)
app.register_blueprint(classmap.mod)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/static/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(path)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
