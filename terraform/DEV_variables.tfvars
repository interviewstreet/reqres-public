environment = "development"

task_defination = {
  cpu                = 256
  memory             = 512
  execution_role_arn = "arn:aws:iam::563410562074:role/ecs-task-execution"
  container_port     = 5000
}

image = "563410562074.dkr.ecr.us-east-1.amazonaws.com/reqres:latest"

vpc_id = "vpc-abf605d1"

public_subnets  = ["subnet-0b1bb225", "subnet-04a1acf7c6b41a463"]
private_subnets = ["subnet-0905fbf74683a0b19", "subnet-2869dd74"]

dns_name = "hackerrank.link"

common_tags = {
  "Owner"                = "Aamir"
  "TeamOwner"            = "Hari"
  "Team"                 = "Devops"
  "AssetProtectionLevel" = 4
  "Contact"              = "devops@hackerrank.com"
  "ManagedBy"            = "Terraform"
  "Project"              = "Reqres"
}

assume_role = "arn:aws:iam::563410562074:role/ReqResTerraformRole"

autoscaling = {
  min_capacity       = 1
  max_capacity       = 2
  high_cpu_threshold = 80
  low_cpu_threshold  = 20
}
