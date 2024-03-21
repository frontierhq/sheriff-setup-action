#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const os = require('os');
const path = require('path');
const stream = require('stream');
const core = require('@actions/core');
const exec = require('@actions/exec');
const { promisify } = require('util');

const finished = promisify(stream.finished);

async function run() {
  try {
    const version = core.getInput('version', true);

    const agentOS = core.getInput('os') || os.platform();
    const agentOSArchitecture = core.getInput('arch') || os.arch();
    const agentTempDirectory = "/tmp" //core.getInput('Agent.TempDirectory');
    const agentToolsDirectory = "/tmp" //core.getInput('Agent.ToolsDirectory');

    let os;
    if (agentOS === 'Windows_NT') {
      os = 'Windows';
    } else {
      os = agentOS;
    }

    let platform;
    if (agentOSArchitecture === 'X64' || agentOSArchitecture === 'X86') {
      platform = 'x86_64';
    } else {
      platform = agentOSArchitecture;
    }

    let fileExtension;
    if (os === 'Windows') {
      fileExtension = 'zip';
    } else {
      fileExtension = 'tar.gz';
    }

    let downloadUrl;
    if (version === 'latest') {
      downloadUrl = `https://github.com/gofrontier-com/sheriff/releases/latest/download/sheriff_${os}_${platform}.${fileExtension}`;
    } else {
      downloadUrl = `https://github.com/gofrontier-com/sheriff/releases/download/${version}/sheriff_${os}_${platform}.${fileExtension}`;
    }
    const downloadPath = path.join(agentTempDirectory, `sheriff_${os}_${platform}.${fileExtension}`);
    const toolDirPath = `${agentToolsDirectory}/sheriff/${version}/${platform}`;

    core.info(`Download URL: ${downloadUrl}`);
    core.info(`Download path: ${downloadPath}`);
    core.info(`Tool directory path: ${toolDirPath}`);

    const writer = fs.createWriteStream(downloadPath);

    const client = axios.create();
    client.interceptors.request.use((request) => {
      core.info(`Axios request: ${request.method} ${request.url} `);
      return request;
    });
    client.interceptors.response.use((response) => {
      core.info(`Axios response: ${response.status} ${response.statusText}`);
      return response;
    });

    await client({
      url: downloadUrl,
      method: 'get',
      responseType: 'stream',
    }).then((response) => {
      response.data.pipe(writer);
      return finished(writer);
    });

    // tl.mkdirP(toolDirPath);
    await exec.exec('tar', ['-xf', downloadPath, '-C', toolDirPath]);


    await exec.exec(path.join(toolDirPath, 'sheriff'), ['version']);
  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(tl.TaskResult.Failed, err.message);
    } else {
      core.setFailed(tl.TaskResult.Failed, 'Unknown error');
    }
  }
}

run();
