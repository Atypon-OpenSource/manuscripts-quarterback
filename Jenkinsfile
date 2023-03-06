pipeline {
    agent none
    parameters {
        booleanParam(name: 'PUBLISH', defaultValue: false)
    }
    stages {
        stage('NPM') {
            agent {
                docker {
                    image 'node:18'
                    args '--userns=host \
                          -v /home/ci/.cache/yarn:/.cache/yarn \
                          -v /home/ci/.npm:/.npm'
                }
            }
            stages {
                stage('Build') {
                    steps {
                        sh 'npm install pnpm@7 -g'
                        sh 'pnpm --frozen-lockfile --filter "./quarterback-packages/**" i'
                        sh 'pnpm --filter @manuscripts/quarterback-types build'
                        sh 'pnpm --filter @manuscripts/quarterback-db build'
                        sh 'pnpm --filter @manuscripts/quarterback-api build'
                        sh 'pnpm --filter @manuscripts/quarterback-api test'
                        sh 'pnpm --filter @manuscripts/track-changes-plugin build'
                        sh 'pnpm --filter @manuscripts/track-changes-plugin typecheck'
                        sh 'pnpm --filter @manuscripts/track-changes-plugin test'
                    }
                }
                stage ('Publish') {
                    when {
                        expression { params.PUBLISH == true }
                    }
                    environment {
                        NPM_TOKEN = credentials('NPM_TOKEN_MANUSCRIPTS_OSS')
                    }
                    steps {
                        sh './publish.sh'
                    }
                }
            }
        }
        stage ('Docker') {
            agent any
            environment {
                REGISTRY = "${env.PRIVATE_ARTIFACT_REGISTRY}"
                DOCKER_IMAGE = 'manuscripts/quarterback'
                IMG_TAG = getImgTag(env)
            }
            stages {
                stage('Build') {
                    steps {
                        sh 'docker build -t ${REGISTRY}/${DOCKER_IMAGE}:${IMG_TAG} -f quarterback-packages/api/Dockerfile .'
                    }
                }
                stage('Publish') {
                    when {
                        expression { params.PUBLISH == true }
                    }
                    steps {
                        sh 'docker push ${REGISTRY}/${DOCKER_IMAGE}:${IMG_TAG}'
                        sh 'docker push ${REGISTRY}/${DOCKER_IMAGE}'
                    }
                }
            }
        }
    }
}

def getImgTag(env) {
    def branch = env.GIT_LOCAL_BRANCH;
    def commit = env.GIT_COMMIT;
    if ('master'.equals(branch)) {
        return sh('jq .version < package.json | tr -d \"').trim();
    } else {
        return branch + '-' + commit.substring(0, 6);
    }
}
