import os
import cStringIO
from flask import g
from flask import send_from_directory
from flask import send_file
from flask import current_app as app
from flask_restful import Resource
from PIL import Image


def render(name, layer):
    img = Image.open('{}/{}'.format(app.config['IMAGE_DIR'], name))
    if layer:
        img.seek(layer)

    img_io = cStringIO.StringIO()
    img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')


class imagelist(Resource):
    def get(self):
        print(repr(g))
        return [fn for fn in os.listdir(app.config['IMAGE_DIR'])
                if fn.split('.')[-1] in app.config['IMAGE_EXTENSIONS']]


class image(Resource):
    def get(self, name, layer=None):
        ext = name.split('.')[-1]
        if ext in app.config['RENDERED_IMAGE_EXTENSIONS']:
            return render(name, layer)
        elif ext in app.config['IMAGE_EXTENSIONS']:
            return send_from_directory(app.config['IMAGE_DIR'], name)
