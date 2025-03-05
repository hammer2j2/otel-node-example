FROM node:20-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

# Expose the application port (if your app runs on 3000)
EXPOSE 3000

# Run the Node.js application
CMD ["node", "src/app.js"]`



