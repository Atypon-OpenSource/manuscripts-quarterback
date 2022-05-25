node("cisanta && !cisc03") {
    def imageTagBadge = addEmbeddableBadgeConfiguration(id: "dockerImage", subject: "image")
    def versionIdBadge = addEmbeddableBadgeConfiguration(id: "versionId", subject: "version")
    REGISTRY="docker-reg.atypon.com"
    stage("Checkout") {
        VARS = checkout scm
        DOCKER_IMAGE="man/quarterback"
        IMG_TAG=sh(script: " jq .version < quarterback-packages/api/package.json | tr -d '\"' ", returnStdout: true).trim()
    }

    stage("Install dependencies") {
        nodejs(nodeJSInstallationName: 'node_16_14_2') {
            sh (script: "npm install pnpm@7 -g")
            sh (script: "pnpm --frozen-lockfile --filter \"./quarterback-packages/**\" i", returnStdout: true)
        }
    }

    stage("Build & test") {
        nodejs(nodeJSInstallationName: 'node_16_14_2') {
            sh (script: "pnpm --filter @manuscripts/quarterback-db build")
            sh (script: "pnpm --filter @manuscripts/quarterback-types build")
            sh (script: "pnpm --filter @manuscripts/quarterback-api build")
            sh (script: "pnpm --filter @manuscripts/track-changes-plugin build")
            sh (script: "pnpm --filter @manuscripts/quarterback-api test")
            sh (script: "pnpm --filter @manuscripts/track-changes-plugin test")
        }
    }

    stage("Build quarterback-api docker image") {
        docker.withServer('unix:///var/run/docker-ci.sock') {
            app = docker.build("${DOCKER_IMAGE}:${IMG_TAG}", "-f quarterback-packages/api/Dockerfile .")
        }
    }

    if (VARS.GIT_BRANCH == "origin/main") {
        stage("Push Docker image to registry") {
            echo "Pushing ${DOCKER_IMAGE}:${IMG_TAG} to ${REGISTRY}"
            docker.withRegistry("https://${REGISTRY}") {
                app.push();
                app.push('latest');
            }
        }

        stage("Publish") {
            withCredentials([string(credentialsId: 'NPM_TOKEN_MANUSCRIPTS_OSS', variable: 'NPM_TOKEN')]) {
                nodejs(nodeJSInstallationName: 'node_16_14_2') {
                    sh ("./publish.sh")
                }
            }
        }
    }
}
