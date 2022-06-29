pipeline {
    agent {
        docker {
            image 'maven:3.3.3'
        }
    }
    triggers {
        githubPush()
    }
    stages {
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}