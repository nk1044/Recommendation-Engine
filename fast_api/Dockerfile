FROM python:3.10-slim

WORKDIR /app

# Install PostgreSQL client for pg_isready
RUN apt-get update && apt-get clean

COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt


COPY server.py /app/server.py
COPY knn_model.pkl /app/knn_model.pkl
COPY scaler.pkl /app/scaler.pkl
COPY script.sh /app/script.sh
COPY movies_data.csv /app/movies_data.csv

RUN chmod +x /app/script.sh

EXPOSE 8000


CMD ["/app/script.sh"]