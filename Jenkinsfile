
node {
    REFSPEC="+refs/pull/*:refs/remotes/origin/pr/*"
    stage("Checkout") {
        if (params != null && params.ghprbPullId == null) {
            echo 'Checking out from master'
            // master needs to be substituted with the release branch.
            REFSPEC="+refs/heads/master:refs/remotes/origin/master"
        }
        VARS = checkout(scm:[$class: 'GitSCM', branches: [[name: "${sha1}"]],
            doGenerateSubmoduleConfigurations: false,
            submoduleCfg: [],
            userRemoteConfigs: [
                [credentialsId: '336d4fc3-f420-4a3e-b96c-0d0f36ad12be',
                name: 'origin',
                refspec: "${REFSPEC}",
                url: 'git@github.com:Atypon-OpenSource/manuscripts-quarterback.git']
            ]]
        )
    }

    stage("Install dependencies") {
        nodejs(nodeJSInstallationName: 'node_16_14_2') {
            sh (script: "npm install pnpm@latest -g")
            sh (script: "pnpm install --frozen-lockfile ", returnStdout: true)
        }
    }

    stage("Build") {
        nodejs(nodeJSInstallationName: 'node_16_14_2') {
            sh (script: "pnpm build")
        }
    }

    if (VARS.GIT_BRANCH == "origin/master") {
        stage("Publish") {
            withCredentials([string(credentialsId: 'NPM_TOKEN_MANUSCRIPTS_OSS', variable: 'NPM_TOKEN')]) {
                sh ("pnpm ci:publish")
            }
        }
    }

}
