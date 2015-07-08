from flask import Blueprint, render_template, request


mod = Blueprint('view_three', __name__)

@mod.route('/view_three')
def index():
    return render_template('view_three/index.html')