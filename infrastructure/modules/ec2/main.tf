resource "aws_instance" "this" {
  ami           = "ami-02b8269d5e85954ef"
  instance_type = "t3.micro"

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              sudo apt install docker.io -y
                sudo systemctl start docker
                sudo systemctl enable docker
                
              EOF

  tags = {
    Name = var.instance_name
  }
}
