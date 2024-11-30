# Stage 1: Build
FROM node:18 AS builder

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production
FROM node:18 AS runner

# Set the working directory
WORKDIR /

# Copy only the necessary files from the builder stage
COPY --from=builder /package*.json ./
COPY --from=builder /.next ./.next
COPY --from=builder /public ./public
COPY --from=builder /node_modules ./node_modules

# Expose the Next.js default port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
