#! groovy
node {
    stage("Checkout") {
        VARS = checkout scm
    }

    stage("Build") {
        nodejs(nodeJSInstallationName: 'node_16_14_2') {
            sh (script: "npm install pnpm@7 -g")
            sh (script: "pnpm --frozen-lockfile --filter \"./quarterback-packages/**\" i", returnStdout: true)
            sh (script: "pnpm --filter @manuscripts/quarterback-db build")
            sh (script: "pnpm --filter @manuscripts/quarterback-types build")
            sh (script: "pnpm --filter @manuscripts/quarterback-api build")
            sh (script: "pnpm --filter @manuscripts/track-changes-plugin build")
            sh (script: "pnpm --filter @manuscripts/quarterback-api test")
            sh (script: "pnpm --filter @manuscripts/track-changes-plugin typecheck")
            sh (script: "pnpm --filter @manuscripts/track-changes-plugin test")
        }
    }

    stage("Build quarterback-api docker image") {
        sh("""
        docker build -f quarterback-packages/api/Dockerfile .
        """)
    }
}
