const fs = require('fs');
const path = require('path');

const appsDir = path.join(__dirname, 'apps');

function createEnvFiles() {
  const packages = fs.readdirSync(appsDir).filter((packageName) => {
    const packagePath = path.join(appsDir, packageName);
    return fs.statSync(packagePath).isDirectory();
  });

  packages.forEach((packageName) => {
    const envExamplePath = path.join(appsDir, packageName, '.env.example');
    let envPath = path.join(appsDir, packageName, '.env');

    if (fs.existsSync(envExamplePath)) {
      if (!fs.existsSync(envPath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log(`Created .env for ${packageName}`);
      } else {
        console.log(`.env already exists for ${packageName}`);
      }
    } else {
      console.warn(`No .env.example found for ${packageName}`);
    }
  });
}

createEnvFiles();