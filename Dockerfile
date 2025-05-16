# Use official Node.js LTS base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (same as used in server.js)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
