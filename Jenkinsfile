#!/usr/bin/env groovy
pipeline {
    agent none
    stages {
        stage('Build') {
            agent {
                docker { image 'maven' }
            }
            steps {
                sh 'mvn test'
            }
        }
    }
}