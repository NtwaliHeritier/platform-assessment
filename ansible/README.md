## Ansible

### Running the project

1. Install community modules used in the playbooks
```bash
ansible-galaxy collection install community.general
```
2. Build docker target
```bash
docker build -t ansible-target docker-target/
```
3. Run the target container
```bash
docker run -d \
--name ansible-target \
--cap-add=NET_ADMIN \
--cap-add=NET_RAW \
-p 2222:22 \
ansible-target
```

The container is now reachable via ssh
The default credentials are
```bash
user: ansible
password: ansible
port: 2222
```
and you can check connectivity by
```bash
ssh ansible@127.0.0.1 -p 2222
```
4. Run the ansible playbook
```bash
ansible-playbook site.yaml
```
5. Verify firewall and node exporter
```bash
ssh ansible@127.0.0.1 -p 2222
sudo ufw status verbose
curl localhost:9100/metrics
```
you should see prometheus metrics