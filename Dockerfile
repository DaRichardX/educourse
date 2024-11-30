# Base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the pre-built Next.js app
COPY .next ./.next
COPY public ./public

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
