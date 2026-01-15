output "volume_id" {
  description = "EBS Volume ID"
  value       = aws_ebs_volume.this.id
}

output "volume_name" {
  description = "EBS Volume Name tag"
  value       = aws_ebs_volume.this.tags["Name"]
}