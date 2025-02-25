# Use Node.js as base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port your NestJS app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]
