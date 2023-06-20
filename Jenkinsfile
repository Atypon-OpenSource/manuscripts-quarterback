pipeline {
    agent {
        label 'cisc10'
    }
    parameters {
        string(name: 'GIT_BRANCH', defaultValue: 'master')
        booleanParam(name: 'PUBLISH', defaultValue: false)
    }
    stages {
        stage('NPM') {
            agent {
                dockerfile {
                    reuseNode true
                    filename 'Dockerfile.build'
                    args '--userns=host -v /home/ci/.npm:/.npm'
                }
            }
            stages {
                stage('Build') {
                    steps {
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
            environment {
                NAME = "${env.PRIVATE_ARTIFACT_REGISTRY}/manuscripts/quarterback"
                TAG = getImageTag(params.GIT_BRANCH)
                GROUP_TAG = getImageGroupTag(params.GIT_BRANCH)
            }
            stages {
                stage('Build docker image') {
                    steps {
                        sh 'docker build -t ${NAME}:${TAG} -t ${NAME}:${GROUP_TAG} . -f quarterback-packages/api/Dockerfile .'
                    }
                }
                stage('Publish docker image') {
                    when {
                        expression { params.PUBLISH == true }
                    }
                    steps {
                        sh 'docker push ${NAME}:${TAG}'
                        sh 'docker push ${NAME}:${GROUP_TAG}'
                    }
                }
            }
        }
    }
}

def getImageTag(branch) {
    if ('master'.equals(branch)) {
        return sh(script: 'jq .version < quarterback-packages/api/package.json | tr -d \\"', returnStdout: true).trim();
    } else {
        def commit = env.GIT_COMMIT
        return commit.substring(0, 9);
    }
}

def getImageGroupTag(branch) {
    if ('master'.equals(branch)) {
        return 'latest';
    } else {
        return branch;
    }
}
