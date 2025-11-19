#!/bin/bash

# Deployment script for Popova website
# This script automates the deployment process to the Ubuntu server

set -e  # Exit on error

# Configuration
SERVER_IP="185.250.36.158"
SERVER_PATH="/var/www/popova.cinereo.it"
SERVER_USER="root"
PROJECT_NAME="popova-website"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Popova Website Deployment Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Step 1: Build Docker image locally (optional, for testing)
echo -e "${YELLOW}Step 1: Building Docker image locally...${NC}"
docker build -t ${PROJECT_NAME}:latest . || {
    echo -e "${RED}Failed to build Docker image${NC}"
    exit 1
}
echo -e "${GREEN}✓ Docker image built successfully${NC}"
echo ""

# Step 2: Test the build locally (optional)
read -p "Do you want to test the build locally before deploying? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Starting container locally on port 3001...${NC}"
    docker run -d --name ${PROJECT_NAME}-test -p 3001:80 ${PROJECT_NAME}:latest
    echo -e "${GREEN}✓ Container started. Visit http://localhost:3001 to test${NC}"
    echo -e "${YELLOW}Press Enter when you're done testing (container will be removed)${NC}"
    read
    docker stop ${PROJECT_NAME}-test
    docker rm ${PROJECT_NAME}-test
    echo -e "${GREEN}✓ Test container removed${NC}"
fi
echo ""

# Step 3: Sync files to server
echo -e "${YELLOW}Step 2: Syncing files to server...${NC}"
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'dist' \
    ./ ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/ || {
    echo -e "${RED}Failed to sync files to server${NC}"
    exit 1
}
echo -e "${GREEN}✓ Files synced successfully${NC}"
echo ""

# Step 4: Build and start container on server
echo -e "${YELLOW}Step 3: Building and starting container on server...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
cd /var/www/popova.cinereo.it

# Stop and remove existing container if running
docker-compose down 2>/dev/null || true

# Build and start new container
docker-compose up -d --build

# Wait for container to be healthy
echo "Waiting for container to start..."
sleep 5

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo "✓ Container is running"
    
    # Test health endpoint
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        echo "✓ Health check passed"
    else
        echo "⚠ Warning: Health check failed"
    fi
else
    echo "✗ Container failed to start"
    docker-compose logs
    exit 1
fi
ENDSSH

echo -e "${GREEN}✓ Container deployed and running${NC}"
echo ""

# Step 5: Show status
echo -e "${YELLOW}Step 4: Checking deployment status...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "cd ${SERVER_PATH} && docker-compose ps"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Configure nginx reverse proxy (see DEPLOYMENT.md)"
echo "2. Set up SSL certificate"
echo "3. Test the website at https://popova.cinereo.it"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  View logs:    ssh ${SERVER_USER}@${SERVER_IP} 'cd ${SERVER_PATH} && docker-compose logs -f'"
echo "  Restart:      ssh ${SERVER_USER}@${SERVER_IP} 'cd ${SERVER_PATH} && docker-compose restart'"
echo "  Stop:         ssh ${SERVER_USER}@${SERVER_IP} 'cd ${SERVER_PATH} && docker-compose down'"
echo ""
