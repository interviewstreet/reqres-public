[
    {
        "name": "HR-Jsonmock-${WORKSPACE}",
        "image": "${IMAGE_URI}",
        "essential": true,
        "networkMode": "awsvpc",
        "portMappings": [
            {
                "containerPort": ${CONTAINER_PORT},
                "hostPort": ${CONTAINER_PORT},
                "protocol": "tcp"
            }
        ],
        "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
                "awslogs-group": "${CW_LOG_GROUP}",
                "awslogs-region": "us-east-1",
                "awslogs-stream-prefix": "ecs"
            }
        },
        "runtimePlatform": {
            "operatingSystemFamily": "LINUX"
        },
        "cpu": ${CONTAINER_CPU},
        "memory": ${CONTAINER_MEMORY}
    }
]