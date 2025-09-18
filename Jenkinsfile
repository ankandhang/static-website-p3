pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'ankan2004'  // Your DockerHub username
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    def commit = bat(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    echo "Commit: ${commit}"
                }
            }
        }

        stage('Build & Push Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        // Login securely
                        bat """
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        """

                        // Build and tag image
                        bat """
                        docker build -t %DOCKER_USER%/static-website-p3:${BUILD_NUMBER} -t %DOCKER_USER%/static-website-p3:latest .
                        """

                        // Push both tags
                        bat """
                        docker push %DOCKER_USER%/static-website-p3:${BUILD_NUMBER}
                        docker push %DOCKER_USER%/static-website-p3:latest
                        """
                    }
                }
            }
        }
    }
}
