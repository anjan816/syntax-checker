pipeline {
    agent any

    environment {
        // Database credentials
        DB_HOST     = credentials('db-host')
        DB_USER     = credentials('db-user')
        DB_PASSWORD = credentials('db-password')
        DB_NAME     = 'syntaxdb'

        // Docker configuration
        DOCKERHUB_USER = 'anjan03'
        IMAGE_NAME     = 'syntax-checker'
        IMAGE_TAG      = 'v1'
        CONTAINER_NAME = 'syntax-checker-container'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/anjan816/syntax-checker.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh '''
                docker tag $IMAGE_NAME $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh '''
                docker push $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f $CONTAINER_NAME || true

                docker run -d -p 3000:3000 \
                  --name $CONTAINER_NAME \
                  -e DB_HOST=$DB_HOST \
                  -e DB_USER=$DB_USER \
                  -e DB_PASSWORD=$DB_PASSWORD \
                  -e DB_NAME=$DB_NAME \
                  $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }
}
