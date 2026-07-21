#!/usr/bin/env node

const { execSync } = require('child_process');

const REPO_URL = 'https://github.com/UplexOs/uplexOS.git';
const BRANCH = 'main';

function getProjectRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return process.cwd();
  }
}

function checkForUpdates() {
  try {
    const root = getProjectRoot();
    process.chdir(root);

    execSync(`git fetch ${REPO_URL} ${BRANCH} --quiet`, { stdio: ['ignore', 'ignore', 'ignore'] });

    const local = execSync('git rev-parse HEAD', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    const remote = execSync('git rev-parse FETCH_HEAD', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

    if (local === remote) {
      console.log('ATUALIZADO');
    } else {
      console.log('DISPONIVEL');
    }
  } catch {
    console.log('ERRO');
  }
}

checkForUpdates();
