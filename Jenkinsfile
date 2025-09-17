pipeline {
  agent any

  environment {
    IMAGE_NAME = 'static-website'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          // get short commit hash
          COMMIT = env.GIT_COMMIT ?: sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          echo "Commit: ${COMMIT}"
        }
      }
    }

    stage('Build & Push Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh "docker build -t ${DOCKER_USER}/${IMAGE_NAME}:${COMMIT} ."
          sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
          sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:${COMMIT}"
          // also update "latest"
          sh "docker tag ${DOCKER_USER}/${IMAGE_NAME}:${COMMIT} ${DOCKER_USER}/${IMAGE_NAME}:latest || true"
          sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:latest || true"
        }
      }
    }

    stage('Deploy') {
      steps {
        // stop and remove any old container, then run the new one
        sh "docker rm -f static-site || true"
        sh "docker run -d --name static-site -p 8080:80 ${DOCKER_USER}/${IMAGE_NAME}:latest"
      }
    }
  }

  post {
    failure {
      echo "Pipeline failed — check logs."
    }
  }
}
