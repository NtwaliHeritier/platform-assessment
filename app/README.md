# Welcome to your NodeJS project


## Docker setup
Here is a step by step to create a docker image of the app
1. Build the app
```bash
GIT_SHA=$(git rev-parse --short HEAD)
docker build -t <dockerhub_username>/node_app:$GIT_SHA .
```
2.Push the image to the dockerhub registry
- Push the image to the local registry
```bash
docker push <dockerhub_username>/node_app:$GIT_SHA
```
