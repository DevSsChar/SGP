# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 3000

# Step 7: Define the command to run the application
CMD ["npm", "run", "dev"]
