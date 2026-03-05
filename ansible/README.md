## Ansible

### Running the project

1. Generate ssh key
Check if you already have an SSH key:
```bash
ls ~/.ssh/id_rsa
```
If the file does not exist, generate one:
```bash
ssh-keygen -t rsa -b 4096 -C "ansible-local"
```
2. Build the docker target
```bash
docker build -t ansible-target ./docker-target
```
3. Start the container
```bash
docker run -d --name ansible-target -p 2222:22 ansible-target
```
4. Add Your SSH Key to the Container
```bash
docker cp ~/.ssh/id_rsa.pub ansible-target:/home/ubuntu/.ssh/authorized_keys
```
Fix permissions by running the following commands:
```bash
docker exec -it ansible-target bash 
chown -R ubuntu:ubuntu /home/ubuntu/.ssh 
chmod 600 /home/ubuntu/.ssh/authorized_keys 
exit
```
5. Verify SSH Access
```bash
ssh -p 2222 ubuntu@127.0.0.1
```
6. Test Ansible Connectivity
```bash
ansible all -m ping
```
Expected output:

docker-target | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
7. Run the Playbook
```bash
ansible-playbook -i inventory/hosts.yaml site.yaml
```

### Verifying Node Exporter
Check by running the following commands
```bash
docker exec -it ansible-target bash
ps aux | grep node_exporter
```