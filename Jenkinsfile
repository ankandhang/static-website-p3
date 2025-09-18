pipeline {
    agent any

    environment {
<<<<<<< HEAD
        DOCKERHUB_USER = 'ankan2004'  // Your DockerHub username
=======
        DOCKER_IMAGE = "ankan2004/static-website-p3"   // DockerHub repo (must be lowercase)
>>>>>>> 06fa86593f94b1b1a5f913b20200f2feec3f79b5
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 06fa86593f94b1b1a5f913b20200f2feec3f79b5
    }
}
