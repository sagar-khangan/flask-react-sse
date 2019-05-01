FROM python:2.7
ADD ./api /api
WORKDIR /api
EXPOSE 5000
RUN pip install -r requirements.txt
ENTRYPOINT ["python","api.py"]
