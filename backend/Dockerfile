# Use Node.js as base image
FROM node:20-slim

# Install Ruby for code execution
RUN apt-get update && apt-get install -y \
    ruby-full \
    && rm -rf /var/lib/apt/lists/*

# Verify installations
RUN node --version && npm --version && ruby --version

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy backend code
COPY . .

# Expose port
EXPOSE 3001

# Start the Node.js server
CMD ["node", "server.js"]
