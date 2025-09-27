pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        APP_NAME = 'taskmanagernode'
        PORT = '3000'
        TAG = 'v1.0'
    }

    stages {

        stage('Checkout SCM') {
            steps {
                echo 'Checking out code...'
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
                sh 'npx jest --ci --coverage'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint...'
                sh 'npx eslint . --ext .js'
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
                echo 'Deploying app...'
                sh '''
                npx pm2 stop $APP_NAME || true
                npx pm2 start app.js --name $APP_NAME --watch
                '''
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing app...'
                sh '''
                git rev-parse $TAG || git tag -a $TAG -m "Release $TAG"
                git push origin $TAG || echo "Tag already exists"
                '''
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                echo 'Checking app health...'
                sh '''
                RESPONSE=$(curl -s http://localhost:$PORT/health)
                if [ "$RESPONSE" != "Server is healthy" ]; then
                    echo "ALERT: Server health check failed!"
                    exit 1
                fi
                echo "Server is healthy"
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
