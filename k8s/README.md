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

1. Create grafana username and password as secrets
```bash
kubectl create secret generic grafana-admin-credentials \
  --from-literal=admin-user="<username_you_want_to_use>" \
  --from-literal=admin-password="<password_you_want_to_use>" \
  -n monitoring
```
2. Run the following
```bash
helm install monitoring prometheus-community/kube-prometheus-stack \
  -f monitoring/prometheus-values.yaml \
  -f monitoring/grafana-values.yaml \
  -n monitoring --create-namespace
```
3. Verify Prometheus Sees Your App
```bash
kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090 -n monitoring
```
Visit localhost:9090
4. Access grafana
```bash
kubectl port-forward svc/monitoring-grafana 3001:80 -n monitoring
```
Visit localhost:3000, the credentials are the username and password you specified.