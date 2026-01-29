# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application files
COPY . .

# Build the Next.js application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3006

# Copy necessary files from builder
# Next.js standalone build copies only the necessary files for production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port 3006
EXPOSE 3006

# Set hostname to 0.0.0.0 for Docker
ENV HOSTNAME="0.0.0.0"

# Start the application using server.js from standalone output
CMD ["node", "server.js"]

