pipeline {
    agent any

    environment {
        IMAGE_NAME = "static-website-p3"
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
                    withCredentials([usernamePassword(
                        credentialsId: 'docker-hub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        bat """
                            docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                            docker build -t %DOCKER_USER%/${IMAGE_NAME}:${BUILD_NUMBER} .
                            docker push %DOCKER_USER%/${IMAGE_NAME}:${BUILD_NUMBER}
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploy stage (you can run Docker run command here or update server)."
                    // Example (if deploying locally):
                    // bat "docker run -d -p 8081:80 %DOCKER_USER%/${IMAGE_NAME}:${BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully ✅'
        }
        failure {
            echo 'Pipeline failed ❌ — check logs.'
        }
    }
}
