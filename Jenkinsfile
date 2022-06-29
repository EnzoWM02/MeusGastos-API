pipeline {
    agent {
        docker {
            image 'maven'
        }
    }
    stages {
        stage('Test') {
            steps {
                'mvn test'
            }
        }
    }
}