FROM node:18

# Set working directory
WORKDIR /app

# Copy and install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Set environment variable for production
ENV NODE_ENV=production

# Copy backend and frontend code
COPY server/ ./server/
COPY client/ ./client/

# Expose backend port
EXPOSE 3000

# Run backend server
WORKDIR /app/server
CMD ["node", "server.js"]
