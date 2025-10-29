FROM ruby:3.2-slim

# Install Rails and other dependencies
RUN gem install rails bundler

# Create app directory
WORKDIR /app

# Copy backend code
COPY . .

# Expose port
EXPOSE 3001

# Start the server
CMD ["ruby", "server.rb"]
