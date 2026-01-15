output "cloudwatch_instance_id" {
  description = "the cloudwatch instance id"
  value = var.instance_id
}
output "cloudwatch_alarm_name" {
  description = "the cloudwatch alarm name"
  value       = aws_cloudwatch_metric_alarm.cpu_alarm.alarm_name
  
}
