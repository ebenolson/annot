#!/usr/bin/env python
import config
from app import app
from app.views import view_one, view_two, view_three
from clize import run


def main(rootdir, labeldir=None, classfile=None):
    """Create image label annotations

    rootdir: path to directory containing images

    labeldir: if specified, alternative directory for labels

    classfile: if specified, alternative file containing class mapping
    """
    app.config.from_object(config)
    app.config['ROOT_DIR'] = rootdir
    app.config['LABEL_DIR'] = rootdir if labeldir is None else labeldir
    if classfile is None:
        app.config['CLASSFILE'] = '{}/classes.json'.format(
            app.config['LABEL_DIR'])
    else:
        app.config['CLASSFILE'] = classfile

    app.register_blueprint(view_one.mod)
    app.register_blueprint(view_two.mod)
    app.register_blueprint(view_three.mod)
    app.run(host="0.0.0.0", port=5000, debug=True)


if __name__ == '__main__':
    run(main)
