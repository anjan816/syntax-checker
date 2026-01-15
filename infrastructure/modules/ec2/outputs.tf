output "instance_id" {
  value = aws_instance.this.id
}
output "availability_zone" {
  description = "AZ of EC2 instance"
  value       = aws_instance.this.availability_zone
}