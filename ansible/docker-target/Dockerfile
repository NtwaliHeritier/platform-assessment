FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    openssh-server sudo python3 python3-apt ca-certificates curl \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/run/sshd

# Create a default user for SSH (Ansible will later create deploy user)
RUN useradd -m -s /bin/bash ansible && echo "ansible:ansible" | chpasswd \
  && usermod -aG sudo ansible \
  && printf "ansible ALL=(ALL) NOPASSWD:ALL\n" > /etc/sudoers.d/ansible

# Enable password auth for local demo (keys are better, but this is simplest locally)
RUN sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config \
 && sed -i 's/^#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D", "-e"]