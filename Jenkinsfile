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
                script {
                    System.setProperty("org.jenkinsci.plugins.durabletask.BourneShellScript.LAUNCH_DIAGNOSTICS", true);
                }
                sh 'mvn test'                
            }
        }
    }
}