
output "db_name" {
    value = module.rds.db_name
}
output "db_username" {
    value = module.rds.db_username
  
}
output "db_password" {
  value = module.rds.db_password
}



output "instance_id" {
    description = "the ec2 instance id"
  value = module.ec2.instance_id
}
output "cloudwatch_instance_id" {
  description = "the cloudwatch instance id"
  value = module.cloudwatch.cloudwatch_instance_id
}
output "cloudwatch_alarm_name" {
  description = "the cloudwatch alarm name"
  value       = module.cloudwatch.cloudwatch_alarm_name
  
}