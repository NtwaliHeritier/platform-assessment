# NodeJS

## Docker setup
Here is a step by step to create a docker image of the app
1. Build the app
```bash
GIT_SHA=$(git rev-parse --short HEAD)
docker build -t <dockerhub_username>/node_app:$GIT_SHA .
```
2.Push the image to the dockerhub registry
```bash
docker push <dockerhub_username>/node_app:$GIT_SHA
```

## Running the app
To run the app, run the following commands:
```bash
npm run build
npm run start
```
After checking, stop the app, since kubernetes will be in charge of starting the image

To run the test
```bash
npm test
```
