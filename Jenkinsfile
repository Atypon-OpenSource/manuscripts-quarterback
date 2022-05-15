node {
    def imageTagBadge = addEmbeddableBadgeConfiguration(id: "dockerImage", subject: "image")
    def versionIdBadge = addEmbeddableBadgeConfiguration(id: "versionId", subject: "version")
    REGISTRY="docker-reg.atypon.com"
    stage("Checkout") {
        checkout scm
        DOCKER_IMAGE="man/quarterback"
        IMG_TAG=sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
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

    stage("Build quarterback-api docker image") {
        docker.withServer('unix:///var/run/docker-ci.sock') {
            app = docker.build("${DOCKER_IMAGE}:${IMG_TAG}", "-f quarterback-packages/api/Dockerfile .")
        }
    }

    stage("DB migration") {
        echo 'placeholder stage for now'
        echo 'may be used to run the database migration scripts'
    }
    
    if (VARS.GIT_BRANCH == "origin/main") {
        stage ("Publish quarterback packages") {
            sh (script: "pnpm publish --filter ./quarterback-packages")
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


        stage("Publish") {
            withCredentials([string(credentialsId: 'NPM_TOKEN_MANUSCRIPTS_OSS', variable: 'NPM_TOKEN')]) {
                sh ("pnpm ci:publish")
            }
        }
    }
}
