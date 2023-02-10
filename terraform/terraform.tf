provider "aws" {
  assume_role {
    role_arn     = var.assume_role
    session_name = "${terraform.workspace}-session"
  }
}

terraform {
  backend "s3" {
    bucket               = "hackerrank-admin-terraform-state"
    key                  = "aws/terraform.tfstate"
    region               = "us-east-1"
    role_arn             = "arn:aws:iam::320899441770:role/terraform_editor"
    workspace_key_prefix = "reqres"
  }
}
