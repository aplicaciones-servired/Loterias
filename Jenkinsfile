pipeline {
  agent any
    
  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV_CLIENT_LOTERIAS = credentials('ENV_CLIENT_LOTERIAS')
    ENV_SERVER_LOTERIAS = credentials('ENV_SERVER_LOTERIAS')
  }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
          def env_server = readFile(ENV_SERVER_LOTERIAS)
          def env_client = readFile(ENV_CLIENT_LOTERIAS)
          writeFile file: './server/.env', text: env_server
          writeFile file: './client/.env', text: env_client
        }
      }
    }

    stage('install dependencies server') {
      steps {
        script {
          sh 'cd ./server && npm install'
        }
      }
    }

    stage('install dependencies client') {
      steps {
        script {
          sh 'cd ./client && npm install --legacy-peer-deps'
          sh 'chmod +x ./client/node_modules/.bin/tsc'
          sh 'cd ./client && node --run build'
        }
      }
    }


    stage('down docker compose') {
      steps {
        script {
          sh 'docker compose down'
        }
      }
    }

    stage('delete images server') {
      steps {
        script {
          def images = 'loteria-server:v1'
          if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
            sh "docker rmi ${images}"
          } else {
            echo "Image ${images} does not exist."
            echo "continuing... executing next steps"
          }
        }
      }
    }
    
    stage('run docker compose') {
      steps {
        script {
          sh 'docker compose up -d'
        }
      }
    }
  }
}