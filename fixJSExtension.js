import fs from "fs";
import path from "path";

const srcDir = "./src"; // Adjust the path if needed
const distDir = "./dist";

function processFile(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");

    const updatedContents = fileContents.replace(
      /from\s+['"]\.\/([^'"]*)['"]/g,
      (match, importPath) => {
        if (!importPath.endsWith(".js")) {
          return match.replace(importPath, importPath + ".js");
        }
        return match;
      }
    );

    if (updatedContents !== fileContents) {
      fs.writeFileSync(filePath, updatedContents);
      console.log(`Updated import paths in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

function processDirectory(dirPath) {
  fs.readdirSync(dirPath).forEach((entry) => {
    const fullPath = path.join(dirPath, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (path.extname(fullPath) === ".ts") {
      processFile(fullPath);
    }
  });
}

if (process.env.SKIP_INTERVAL) {
  console.log("skip interval. run once");

  processDirectory(srcDir);
  processDirectory(distDir);
} else {
  setInterval(() => {
    processDirectory(srcDir);
    processDirectory(distDir);
  }, 3000);
}
