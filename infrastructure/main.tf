provider "aws" {
  region = "ap-south-1"
}

module "ec2" {
  source        = "./modules/ec2"
  instance_name = "syntax-checker-ec2"
}

module "rds" {
  source      = "./modules/rds"
  db_name     = "syntaxdb"
  db_username = "admin"
  db_password = "Admin123"
}

module "cloudwatch" {
  source       = "./modules/cloudwatch"
  instance_id = module.ec2.instance_id
}
