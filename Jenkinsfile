pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ankan2004/static-website-p3"   // DockerHub repo (must be lowercase)
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
                    echo %DOCKER_PASS% > pass.txt
                    docker login -u %DOCKER_USER% --password-stdin < pass.txt
                    del pass.txt

                    docker build -t %DOCKER_IMAGE%:${BUILD_NUMBER} -t %DOCKER_IMAGE%:latest .
                    docker push %DOCKER_IMAGE%:${BUILD_NUMBER}
                    docker push %DOCKER_IMAGE%:latest
                """
            }
        }
    }
}
        stage('Deploy') {
            steps {
                script {
                    echo "Deploy stage (customize if you want to run the container)."
                    // Example for local deployment:
                    // bat "docker rm -f static-website-p3 || exit 0"
                    // bat "docker run -d --name static-website-p3 -p 8081:80 %DOCKER_IMAGE%:latest"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully'
        }
        failure {
            echo '❌ Pipeline failed — check logs'
        }
    }
}
