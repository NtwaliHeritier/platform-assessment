# K8S

## How to run the app
1. Get short Git SHA
- To get the image names and get the latest image
```bash
docker images | grep node_app
```
- Save the image name with its tag in IMAGE like
```bash
export IMAGE=<IMAGE_NAME>:<IMAGE_TAG>
```
- Create a cluster
```bash
kind create cluster --name platform
```
- Load the image to kind cluster
```bash
kind load docker-image <IMAGE_NAME>:<IMAGE_TAG> --name platform
```
- Run the following three steps
```bash
envsubst < app/deployment.yaml | kubectl apply -f -
kubectl apply -f app/service.yaml
kubectl apply -f app/ingress.yaml
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

1. Add prometheus community repo
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```
2. Install Prometheus + Grafana (Helm)
```bash
helm install monitoring prometheus-community/kube-prometheus-stack \
  -f monitoring/prometheus-values.yaml \
  -f monitoring/grafana-values.yaml \
  -n monitoring --create-namespace
```
3. Create grafana username and password as secrets
```bash
kubectl create secret generic grafana-admin-credentials \
  --from-literal=admin-user="<username_you_want_to_use>" \
  --from-literal=admin-password="<password_you_want_to_use>" \
  -n monitoring
```
4. Run Loki (Docker)
```bash
docker run -d --name loki -p 3100:3100 grafana/loki:3.6.5
```
and verify that it is running (It takes a few seconds)
```bash
curl http://localhost:3100/ready
```
it should return ready
4. Add the grafana helm repo
```bash
helm repo add grafana https://grafana.github.io/helm-charts
```
5. Install Promtail(Helm) to ship logs to loki
```bash
helm install promtail grafana/promtail \
  -n monitoring \
  --set config.clients[0].url=http://host.docker.internal:3100/loki/api/v1/push
```
If on zsh, run
```bash
helm install promtail grafana/promtail \
  -n monitoring \
  --set config.clients[0\].url=http://host.docker.internal:3100/loki/api/v1/push
```
6. Verify Prometheus Sees Your App
```bash
kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090 -n monitoring
```
Visit localhost:9090
7. Access grafana
```bash
kubectl port-forward svc/monitoring-grafana 3001:80 -n monitoring
```
Visit localhost:3001, the credentials are the username and password you specified.