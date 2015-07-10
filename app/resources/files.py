import os
import cStringIO
from flask import g
from flask import request
from flask import send_from_directory
from flask import send_file
from flask import jsonify
from flask import current_app as app
from flask_restful import Resource
from PIL import Image


def render(name, layer):
    img = Image.open('{}/{}'.format(app.config['ROOT_DIR'], name))
    if layer:
        img.seek(layer)

    img_io = cStringIO.StringIO()
    img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')


class image(Resource):
    def get(self, name, layer=None):
        ext = name.split('.')[-1]
        if ext in app.config['RENDERED_IMAGE_EXTENSIONS']:
            return render(name, layer)
        elif ext in app.config['IMAGE_EXTENSIONS']:
            return send_from_directory(app.config['ROOT_DIR'], name)


class label(Resource):
    def put(self, path, layer=None):
        if layer is not None:
            labelfn = path + '_layer{}'.format(layer) + '.svg'
        else:
            labelfn = path + '.svg'
        labelfn = os.path.join(app.config['ROOT_DIR'], labelfn)
        print(request.form)
        with open(labelfn, 'w') as file:
            file.write(request.form['data'])
        return True
