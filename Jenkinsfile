#!/usr/bin/env groovy
pipeline {
    stages {
        stage('Build') {
            agent {
                docker { 
                    image 'maven'
                    args "-u root"    
                    alwaysPull true
                 }
            }
            steps {
                sh 'mvn test'
            }
        }
    }
}