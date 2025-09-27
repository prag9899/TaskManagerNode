pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                sh 'npx eslint . --ext .js || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying app (demo)...'
                sh 'echo "Deployment completed."'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
