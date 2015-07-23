#!/usr/bin/env python
import config
import os
import shutil
from app import app
from clize import run


def main(rootdir, labeldir=None, classfile=None):
    """Create image label annotations

    rootdir: path to directory containing images

    labeldir: if specified, alternative directory for labels

    classfile: if specified, alternative file containing class mapping
    """
    rootdir = os.path.realpath(rootdir)
    labeldir = os.path.realpath(labeldir) if labeldir is not None else rootdir

    app.config.from_object(config)
    app.config['ROOT_DIR'] = rootdir
    app.config['LABEL_DIR'] = labeldir
    if classfile is None:
        app.config['CLASSFILE'] = '{}/classmap.json'.format(
            app.config['LABEL_DIR'])
        if not os.path.exists(app.config['CLASSFILE']):
            shutil.copyfile('defaultclassmap.json', app.config['CLASSFILE'])
    else:
        app.config['CLASSFILE'] = classfile

    app.run(host="0.0.0.0", port=5000, debug=True)


if __name__ == '__main__':
    run(main)
