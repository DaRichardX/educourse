# Base image for production
FROM node:18 AS runner
WORKDIR /app

# Copy pre-built files from the GitHub Actions build
COPY ./.next ./.next
COPY ./public ./public
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

# Install production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
