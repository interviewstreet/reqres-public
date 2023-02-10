task_defination = {
  cpu                = 256
  memory             = 512
  execution_role_arn = "arn:aws:iam::134148934511:role/ecsTaskExecutionRole"
  container_port     = 5000
}

image = "134148934511.dkr.ecr.us-east-1.amazonaws.com/reqres:latest"

vpc_id = "vpc-ba542bde"

public_subnets  = ["subnet-0c47a76cb1c9d2234", "subnet-06b4c340c1b51bfdc"]
private_subnets = ["subnet-03cbec9d9d314f6e7", "subnet-05fd5169ae36c72fd"]

dns_name = "hackerrank.com"

common_tags = {
  "Owner"                = "Aamir"
  "TeamOwner"            = "Hari"
  "Team"                 = "Devops"
  "AssetProtectionLevel" = 4
  "Contact"              = "devops@hackerrank.com"
  "ManagedBy"            = "Terraform"
  "Project"              = "Reqres"
}

assume_role = "<PLACEHOLDER_FOR_PROD_ROLE>"

autoscaling = {
  min_capacity       = 1
  max_capacity       = 10
  high_cpu_threshold = 40
  low_cpu_threshold  = 10
}
