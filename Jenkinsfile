pipeline{
    agent any
    stages{
        stage('Remote SSH') {
            def remote = [:]
            remote.name = "test"
            
            stage('Update project and rebuild'){
                sshCommand remote: remote, command: "cd /home/LineBeaconAdmin/beacon && git fetch && git pull origin master && npm install && npm run test:unit && npm run build"
            }
            
            stage('Restart container'){
                sshCommand remote: remote, command: "cd /home/LineBeaconAdmin/docker && docker-compose up -d node && docker-compose ps"
            }
        }
    }
}