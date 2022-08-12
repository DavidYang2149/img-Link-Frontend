const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { log } = console;

const { errorStartLine, errorEndLine } = require('./constants');


const setupFolder = (projectPath) => {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      log('\x1b[31m%s\x1b[0m', errorStartLine);
      log(projectPath);
      log('\x1b[31m%s\x1b[0m',
      `🚨 The folder ${projectPath} already exist in the current directory, please give it another name.`
      );
    } else {
      log('\x1b[31m%s\x1b[0m', errorStartLine);
      log(error);
      log('\x1b[31m%s\x1b[0m', errorEndLine);
    }

    process.exit(1);
  }
};

const setupPackage = (projectName, projectPath, version) => {
  log('========================= 🚀 S T A R T 🚀 =========================');
  log('Using npm...');
  log('');
  log('Installing dependencies:');
  log('\x1b[32m%s\x1b[0m', '- Next.js');
  log('\x1b[32m%s\x1b[0m', '- React');
  log('\x1b[32m%s\x1b[0m', '- React-DOM');
  log('');
  log('Installing devDependencies:');
  log('\x1b[32m%s\x1b[0m', '- TypeScript');
  log('\x1b[32m%s\x1b[0m', '- ESLint');
  log('\x1b[32m%s\x1b[0m', '- Jest');
  log('\x1b[32m%s\x1b[0m', '- Testing-Library');
  log('\x1b[32m%s\x1b[0m', '- Cypress');
  log('');
  log('⭐ Next.js Starter Kit ⭐');
  log('🥰 Create by davidyang2149');
  log('🚀 From https://github.com/DavidYang2149/nextjs-starter');
  log('');
  log(`🚀 Creating project ${projectName}...`);
  log('');
  log('🚚 Downloading files:');
  execSync(`git clone --depth 1 https://github.com/DavidYang2149/nextjs-starter ${projectName}`);

  if (projectName !== '.') {
    process.chdir(projectPath);
  }
  
  log('🥰 Download completed!');
  log('');

  let version = '';
  fs.readFile('./package.json', 'utf8', (err, data) => {
    version = JSON.parse(data).version;
  });

  log(`🏷️ Version: ${version}`);
  log('');

  log('📦 Installing dependencies:');
  execSync('npm install');
  log('');
  log('🔥 Removing useless files:');
  fs.unlinkSync(path.join(projectPath, 'SECURITY.md'));
  fs.unlinkSync(path.join(projectPath, 'LICENSE'));

  fs.rmdirSync('./.git', { recursive: true });
  fs.rmdirSync('./bin', { recursive: true });
  fs.rmdirSync('./github', { recursive: true });
  log('');
  log('\x1b[36m%s\x1b[0m', 'Successfully installed!');
  log('');
  log('\x1b[35m%s\x1b[0m', '🎉 The installation is done, ready to use. Happy coding!');
  log('========================= 🎉 E N D 🎉 =========================');
  log('');
};

module.exports = { setupFolder, setupPackage };
