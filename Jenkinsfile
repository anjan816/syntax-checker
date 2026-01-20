// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = "syntax-checker"
//         CONTAINER_NAME = "syntax-checker-container"
//     }
//     stages{
//         stage(install mysql client){
//             steps{
//                 sh 'apt-get update && apt-get install -y mysql-client'
//             }
//         }
//     }
//     stages {

//         stage('Build Docker Image') {
//             steps {
//                 sh 'docker build --no-cache -t $IMAGE_NAME .'
//             }
//         }

//         stage('Run Docker Container') {
//             steps {
//                 sh '''
//                   docker rm -f $CONTAINER_NAME || true
//                   docker run -d -p 3000:3000 \
//                     --name $CONTAINER_NAME \
//                     $IMAGE_NAME
//                 '''
//             }
//         }
//     }
// }



pipeline {
    agent any

    environment {
        DB_HOST     = credentials('db-host')
        DB_USER     = credentials('db-user')
        DB_PASSWORD = credentials('db-password')
        DB_NAME     = 'syntaxdb'
    }
    environment{
        IMAGE_NAME = "syntax-checker"
        CONTAINER_NAME = "syntax-checker-container"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/<your-username>/syntax-checker.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build \
                --build-arg DB_HOST=$DB_HOST \
                --build-arg DB_USER=$DB_USER \
                --build-arg DB_PASSWORD=$DB_PASSWORD \
                --build-arg DB_NAME=$DB_NAME \
                -t $IMAGE_NAME .
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f $CONTAINER_NAME || true
                docker run -d -p 3000:3000 \
                -e DB_HOST=$DB_HOST \
                -e DB_USER=$DB_USER \
                -e DB_PASSWORD=$DB_PASSWORD \
                -e DB_NAME=$DB_NAME \
                $IMAGE_NAME
                '''
            }
        }
    }
}
