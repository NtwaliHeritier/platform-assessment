# Welcome to your NodeJS project

## Docker setup
Here is a step by step to create a docker image of the app
1. Build the app
```bash
GIT_SHA=$(git rev-parse --short HEAD)
docker build -t node_app:$GIT_SHA .
```
2.Push the image to the local registry
- Run local registry
```bash
docker run -d -p 5000:5000 --name local-registry registry:2
```
- Tag the image for local registry
```bash
docker tag node_app:$GIT_SHA localhost:5000/node_app:$GIT_SHA
```
- Push the image to the local registry
```bash
docker push localhost:5000/node_app:$GIT_SHA
```
- Check for the image on the local registry
Type 
```bash
curl http://localhost:5000/v2/node_app/tags/list
```
You should see something like:
```bash
{"name":"node_app","tags":["47121b1"]}
```