import { ChildProcess, exec, execSync } from 'child_process';

export default async function runExecutor() {
  console.log(`starting storybook's web server`);
  const cp = await startServer();
  if (!cp) {
    console.error('storybook webserver failed to start!');
    return {
      success: false,
    };
  }
  console.log('storybook webserver started!');

  console.log(`running storybook's tests`);
  execSync(`nx test-storybook storybook-interaction-ci`, { stdio: 'inherit' });
  console.log(`tests completed!`);

  console.log(`stopping storybook's web server`);
  cp.kill();
  console.log(`storybook webserver stopped!`);

  return {
    success: true,
  };
}

async function startServer(timeout = 60000): Promise<ChildProcess | false> {
  return new Promise((resolve) => {
    const cp = exec('nx storybook storybook-interaction-ci');
    cp.stdout.on('data', (data) => {
      console.log(data);
      if (
        data.includes(`╰────────────────────────────────────────────────────╯`)
      ) {
        resolve(cp);
      }
    });
    setTimeout(() => {
      resolve(false);
    }, timeout);
  });
}
