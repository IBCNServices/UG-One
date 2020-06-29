# No longer used, wsgi.py is used instead
from flask import Flask
from apis import api

app = Flask(__name__)
api.init_app(app)
#     app.config.from_object('config.ProductionConfig')

if __name__ == "__main__":
    app.run(host='::', port=14500, debug=False)
