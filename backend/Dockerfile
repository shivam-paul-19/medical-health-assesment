# Use a lightweight Python image
FROM python:3.10

# Set working directory inside container
WORKDIR /app

# Copy all backend files into container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose Flask port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]