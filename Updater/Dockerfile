FROM python:3.10-alpine

# install postgresql-client
RUN apk update && apk add postgresql gcc musl-dev python3-dev libffi-dev libpq-dev
# Install dependencies from requirements.txt
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the code
COPY . .

# Run the app
CMD ["python", "app.py"]