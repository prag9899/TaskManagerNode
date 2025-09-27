pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
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
                sh 'npx jest'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint...'
                sh 'npx eslint . --ext .js || true' // Continue even if lint has warnings
            }
        }

        stage('Security') {
            steps {
                echo 'Running security audit...'
                sh 'npm audit || true' // Continue even if audit finds minor issues
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
                // Create tag only if it doesn't already exist
                sh '''
                TAG=v1.0
                if git rev-parse "$TAG" >/dev/null 2>&1; then
                    echo "Tag $TAG already exists, skipping..."
                else
                    git tag -a $TAG -m "Release $TAG"
                    git push origin $TAG
                fi
                '''
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                echo 'Checking app health...'
                sh 'curl -s http://localhost:3000/health || echo "Health check failed"'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
