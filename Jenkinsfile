pipeline {
    agent {
        docker {
            image 'maven:3.3.3'
        }
    }
    stages {
        stage('Test') {
            steps {
                git 'https://github.com/EnzoWM02/MeusGastos-API.git'
                sh 'mvn test'
            }
        }
    }
}