FROM node:latest AS build-stage
WORKDIR /app
COPY . . 

RUN npm install
RUN npm run build --prod

# Step 2: Serve the Angular app with Nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist/formini/browser /usr/share/nginx/html

