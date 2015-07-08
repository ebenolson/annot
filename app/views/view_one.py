from flask import Blueprint, render_template, request


mod = Blueprint('view_one', __name__)

@mod.route('/view_one')
def index():
    return render_template('view_one/index.html')