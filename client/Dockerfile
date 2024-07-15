# Stage 1: Build the React app
FROM  node:20.13.1 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Copy other files to my current directory
COPY . .

# Open the port for the express server
EXPOSE 3001

# Run express rum in the foreground
CMD ["npm", "run", "dev"]
