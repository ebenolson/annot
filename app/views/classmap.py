import json
from flask import current_app as app
from flask import Blueprint, render_template


mod = Blueprint('classmap', __name__)


@mod.route('/classmap/')
def classmap():
    d = json.load(open(app.config['CLASSFILE']))
    return render_template('classmap.html', classmap=d)
