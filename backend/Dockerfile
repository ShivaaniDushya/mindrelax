# 
FROM python:3.11.4

# 
WORKDIR /app

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install -r /code/requirements.txt

# 
COPY ./app /code/app

# 
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "10000"]

