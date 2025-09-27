pipeline {
    agent any
    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

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

        stage('Code Quality') {
            steps {
                echo 'Running ESLint...'
                sh 'npx eslint . --ext .js || true'
            }
        }

        stage('Security') {
            steps {
                echo 'Running security audit...'
                sh 'npm audit || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying app (demo)...'
                sh 'echo Deployment completed.'
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing app...'
                sh 'git tag -a v1.0 -m "Release v1.0" || echo "Tag exists"'
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                echo 'Checking app health...'
                sh 'curl -s http://localhost:3000 || echo "App not running"'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
