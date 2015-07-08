from flask import Blueprint, render_template, request


mod = Blueprint('view_two', __name__)

@mod.route('/view_two')
def index():
    return render_template('view_two/index.html')