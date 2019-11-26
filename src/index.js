// node
const fs = require('fs')

// npm
const core = require('@actions/core')
const github = require('@actions/github')

const context = github.context
const GITHUB_TOKEN = core.getInput('GITHUB_SECRET')
const ghClient = new github.GitHub(GITHUB_TOKEN)

ghClient.repos.getContents({
    ...context.repo,
    path: 'CHANGELOG.md'
  })
  .then(result => result.data.sha)
  .then((sha) => {
    ghClient.repos.createOrUpdateFile({
        ...context.repo,
        sha,
        path: 'CHANGELOG.md',
        message: 'chore(release): update changelog',
        content: fs.readFileSync('CHANGELOG.md').toString('base64')
      })
      .then(() => console.log('Updated/Created'))
      .catch(console.error)
  })
  .catch(console.error)
