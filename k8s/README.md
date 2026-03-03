# Get short Git SHA
export IMAGE=localhost:5000/node_app:$(git rev-parse --short HEAD)

# Apply the deployment
envsubst < deployment.yaml | kubectl apply -f -