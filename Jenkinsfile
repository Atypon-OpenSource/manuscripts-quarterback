
node {
    def imageTagBadge = addEmbeddableBadgeConfiguration(id: "dockerImage", subject: "image")
    def versionIdBadge = addEmbeddableBadgeConfiguration(id: "versionId", subject: "version")
    REGISTRY="docker-reg.atypon.com"
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
        DOCKER_IMAGE="man/quarterback"
        IMG_TAG=sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
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

    stage("Build docker image") {
        docker.withServer('unix:///var/run/docker-ci.sock') {
            app = docker.build("${DOCKER_IMAGE}:${IMG_TAG}", "-f quarterback-packages/Dockerfile ")
        }
    }

    stage("Push to registry") {
        echo "Pushing ${DOCKER_IMAGE}:${IMG_TAG} to ${REGISTRY}"
        docker.withRegistry("https://${REGISTRY}") {
            app.push();
            app.push('latest');
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
