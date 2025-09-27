pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
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
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint...'
                sh 'npx eslint . --ext .js || true' // don't fail pipeline on lint warnings
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
                script {
                    // Use Jenkins build number to create unique tag
                    def version = "v1.${env.BUILD_NUMBER}"
                    echo "Releasing ${version}..."
                    sh """
                    git tag -f ${version}
                    git push origin ${version} -f
                    """
                }
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                echo 'Checking app health...'
                script {
                    def response = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/health", returnStdout: true).trim()
                    if (response != '200') {
                        error "Health check failed! Response code: ${response}"
                    } else {
                        echo 'Server is healthy ✅'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'All stages completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
