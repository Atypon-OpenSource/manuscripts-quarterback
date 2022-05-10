
node {
    def imageTagBadge = addEmbeddableBadgeConfiguration(id: "dockerImage", subject: "image")
    def versionIdBadge = addEmbeddableBadgeConfiguration(id: "versionId", subject: "version")
    REGISTRY="docker-reg.atypon.com"
    REFSPEC="+refs/pull/*:refs/remotes/origin/pr/*"
    stage("Checkout") {
        // if (params != null && params.ghprbPullId == null) {
        //     echo 'Checking out from main'
        //     // main needs to be substituted with the release branch.
        //     REFSPEC="+refs/heads/main:refs/remotes/origin/main"
        // }
        // VARS = checkout(scm:[$class: 'GitSCM', branches: [[name: "${sha1}"]],
        //     doGenerateSubmoduleConfigurations: false,
        //     submoduleCfg: [],
        //     userRemoteConfigs: [
        //         [credentialsId: '336d4fc3-f420-4a3e-b96c-0d0f36ad12be',
        //         name: 'origin',
        //         refspec: "${REFSPEC}",
        //         url: 'git@github.com:Atypon-OpenSource/manuscripts-quarterback.git']
        //     ]]
        // )
        // DOCKER_IMAGE="man/quarterback"
        // IMG_TAG=sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        checkout scm
    }

    stage("Install dependencies") {
        nodejs(nodeJSInstallationName: 'node_16_14_2') {
            sh (script: "npm install pnpm@latest -g")
            sh (script: "pnpm i --frozen-lockfile --filter ./quarterback-packages", returnStdout: true)
        }
    }

    stage("Build & test") {
        nodejs(nodeJSInstallationName: 'node_16_14_2') {
            sh (script: "pnpm run build --filter @manuscripts/quarterback-db")
            sh (script: "pnpm run build --filter @manuscripts/quarterback-shared")
            sh (script: "pnpm run build --filter @manuscripts/quarterback-api")
            sh (script: "pnpm run test --filter @manuscripts/quarterback-api")
            sh (script: "pnpm run test --filter @manuscripts/track-changes-plugin")
        }
    }

    stage("Build docker image") {
        docker.withServer('unix:///var/run/docker-ci.sock') {
            app = docker.build("${DOCKER_IMAGE}:${IMG_TAG}", "-f quarterback-packages/api/Dockerfile .")
        }
    }

    stage("Push to registry") {
        echo "Pushing ${DOCKER_IMAGE}:${IMG_TAG} to ${REGISTRY}"
        docker.withRegistry("https://${REGISTRY}") {
            app.push();
            app.push('latest');
        }
    }

    if (VARS.GIT_BRANCH == "origin/main") {
        stage("Publish") {
            withCredentials([string(credentialsId: 'NPM_TOKEN_MANUSCRIPTS_OSS', variable: 'NPM_TOKEN')]) {
                sh ("pnpm ci:publish")
            }
        }
    }

}
