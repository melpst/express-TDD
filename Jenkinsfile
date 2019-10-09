pipeline{
    agent any
    stage('Remote SSH') {
        def remote = [:]
        remote.name = "test"
        remote.host = "linebeacon-test.southeastasia.cloudapp.azure.com"
        remote.allowAnyHosts = true
        remote.user = 'LineBeaconAdmin'
        remote.password = 'P@ssw9rd123!'
        
        stage('Update project and rebuild'){
            sshCommand remote: remote, command: "cd /home/LineBeaconAdmin/beacon && git fetch && git pull origin master && npm install && npm run test:unit && npm run build"
        }
        
        stage('Restart container'){
            sshCommand remote: remote, command: "cd /home/LineBeaconAdmin/docker && docker-compose up -d node && docker-compose ps"
        }
    }
}