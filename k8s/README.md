# Welcome to your k8s project

## How to run the app
1. Get short Git SHA
- To get the image names and get the latest image
```bash
docker images | grep node_app
```
- Save the image name in IMAGE like
```bash
export IMAGE=<IMAGE_NAME>
```
- Run the following three steps
```bash
envsubst < deployment.yaml | kubectl apply -f -
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```
- Forward traffic to the k8s service
```bash
kubectl port-forward svc/node-app 3000:3000
```
- Run the following command and you should see {"status": "ok"}
```bash
curl http://localhost:3000/health
```

## Monitoring

1. Run the following
```bash
helm install monitoring prometheus-community/kube-prometheus-stack \
  -f monitoring/prometheus-values.yaml \
  -f monitoring/grafana-values.yaml \
  -n monitoring --create-namespace
```
2. Verify Prometheus Sees Your App
```bash
kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090 -n monitoring
```
Visit localhost:9090
3. Access grafana
```bash
kubectl port-forward svc/monitoring-grafana 3001:80 -n monitoring
```
Visit localhost:3000, the credentials are username: admin, password: prom-operator