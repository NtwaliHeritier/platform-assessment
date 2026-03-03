# Welcome to your k8s project

## How to run the app
1. Get short Git SHA
- To get the image name
```bash
docker images | grep node_app
```
- Save the image name in IMAGE like
```bash
export IMAGE=<IMAGE_NAME>
```
- Run the following three steps
```bash
envsubst < k8s/app/deployment.yaml | kubectl apply -f -
kubectl apply -f k8s/app/service.yaml
kubectl apply -f k8s/app/service.yaml
```
- Forward traffic to the k8s service
```bash
kubectl port-forward svc/node-app 3000:3000
```
- Run the following command and you should see {"status": "ok"}
```bash
curl http://localhost:3000/health
```
