variable "task_defination" {
  type = object({
    memory             = number
    cpu                = number
    execution_role_arn = string
    container_port     = number
  })
}

variable "image" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "private_subnets" {
  type = list(string)
}

variable "public_subnets" {
  type = list(string)
}

variable "dns_name" {
  type = string
}

variable "common_tags" {
  type = object({
    Owner                = string
    TeamOwner            = string
    Team                 = string
    AssetProtectionLevel = number
    Contact              = string
    ManagedBy            = string
    Project              = string
    }
  )
}

variable "assume_role" {
  type = string
}

variable "autoscaling" {
  type = object({
    min_capacity       = number
    max_capacity       = number
    high_cpu_threshold = number
    low_cpu_threshold  = number
  })
}
