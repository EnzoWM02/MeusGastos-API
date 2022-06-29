#!/usr/bin/env groovy
pipeline {
    agent none
    stages {
        stage('Build') {
            agent {
                docker { image 'maven' alwaysPull true }
            }
            steps {
                sh 'mvn test'
            }
        }
    }
}