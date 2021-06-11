#!/usr/bin/env node
const { Command } = require('commander')
const create = require('./create/create')
// const pkgDir = require('pkg-dir')
const path = require('path')
const docs = require('./docs')
const git = require('./git')

const program = new Command()

program
  .command('create [name]')
  .description('create a small project.')
  .action((name) => {
    // const root = pkgDir.sync()
    create(name, path.resolve(__dirname, '..'))
  })

program.command('docs <name> <text>')
  .description('create docs for small project')
  .action((name, text) => {
    docs(path.resolve(__dirname, '..'), name, text)
  })

program.command('commit')
  .description('better commit for git')
  .action(() => {
    git.commit()
  })

program.parse(process.argv)