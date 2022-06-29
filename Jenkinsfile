pipeline {
    agent {
        docker {
            image 'maven:3.3.3'
            args "-u root"
            alwaysPull true
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}