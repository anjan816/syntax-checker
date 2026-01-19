pipeline {
    agent any

    environment {
        IMAGE_NAME = "syntax-checker"
        CONTAINER_NAME = "syntax-checker-container"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/anjan816/syntax-checker.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker rm -f $CONTAINER_NAME || true
                docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }
}
