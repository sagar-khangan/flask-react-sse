from flask import Flask,jsonify
from flask_sse import sse
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from flask_cors import CORS
import datetime
from helper import get_data,get_schd_time

app = Flask(__name__)
CORS(app)
app.config["REDIS_URL"] = "redis://redis"
app.register_blueprint(sse, url_prefix='/events')
log = logging.getLogger('apscheduler.executors.default')
log.setLevel(logging.INFO)
fmt = logging.Formatter('%(levelname)s:%(name)s:%(message)s')
h = logging.StreamHandler()
h.setFormatter(fmt)
log.addHandler(h)


def server_side_event():
    """ Function to publish server side event """
    with app.app_context():
        sse.publish(get_data(), type='dataUpdate')
        print("Event Scheduled at ",datetime.datetime.now())


sched = BackgroundScheduler(daemon=True)
sched.add_job(server_side_event,'interval',seconds=get_schd_time())
sched.start()


@app.route('/')
def index():
    return jsonify(get_data())


if __name__ == '__main__':
   app.run(debug=True,host='0.0.0.0',port=5000)