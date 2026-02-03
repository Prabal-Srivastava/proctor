pipeline {
    agent any

    // Define tools if you have them configured in Jenkins -> Global Tool Configuration
    // Otherwise, we will use the Maven Wrapper (mvnw) included in the project
    tools { 
        jdk 'jdk-21'
        // maven 'Maven4' // Commented out to prefer ./mvnw for portability
    }

    triggers {
        // Poll SCM every minute
        // This ensures Jenkins checks GitHub for changes without needing a Webhook
        pollSCM('* * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out from GitHub (master branch)...'
                // Explicitly pull from the specific repository and branch
                git branch: 'master', 
                    url: 'https://github.com/Prabal-Srivastava/proctor.git'
            }
        }

        stage('Backend: Build & Test') {
            steps {
                dir('server') {
                    script {
                        // Check if running on Unix/Linux to set permissions
                        if (isUnix()) {
                            sh 'chmod +x mvnw'
                            sh './mvnw clean install'
                        } else {
                            // Windows support
                            bat 'mvnw.cmd clean install'
                        }
                    }
                }
            }
        }

        stage('Frontend: Build') {
            steps {
                dir('client') {
                    script {
                        if (isUnix()) {
                            sh 'npm install'
                            sh 'npm run build'
                        } else {
                            bat 'npm install'
                            bat 'npm run build'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Build pipeline completed.'
        }
        success {
            echo 'SUCCESS: The application is verified and built.'
        }
        failure {
            echo 'FAILURE: Issues detected. Please fix the code and push changes.'
        }
    }
}
