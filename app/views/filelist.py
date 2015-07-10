import os
from flask import g
from flask import current_app as app
from flask import Blueprint, render_template, request


mod = Blueprint('filelist', __name__)


def _shortfn(fn):
    if len(fn) > 24:
        return fn[:10] + '...' + fn[-10:]
    else:
        return fn


def _labeled(fn, path):
    labelfn = os.path.join(app.config['ROOT_DIR'],
                           path,
                           fn + '.svg')
    print(labelfn)
    return os.path.exists(labelfn)


@mod.route('/dirlist/')
@mod.route('/dirlist/<path>')
def index(path=''):
    fullpath = os.path.join(app.config['ROOT_DIR'], path)
    files = os.listdir(fullpath)
    dirs = [fn for fn in files if os.path.isdir(os.path.join(fullpath, fn))]
    dirs = [os.path.join(path, fn) for fn in dirs]
    images = [fn for fn in files
              if fn.split('.')[-1] in app.config['IMAGE_EXTENSIONS']]
    images = [(_shortfn(fn),
               os.path.join(path, fn),
               _labeled(fn, path),
               ) for fn in images]

    print(images)
    return render_template('files/list.html', images=images, dirs=dirs)
