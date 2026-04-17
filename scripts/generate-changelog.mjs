import { readFileSync, writeFileSync, existsSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const version = pkg.version;
const date = new Date().toISOString().slice(0, 10);
const line = `## ${version} - ${date}\n- Automated release note placeholder\n`;

const changelogPath = "CHANGELOG.md";
const current = existsSync(changelogPath) ? readFileSync(changelogPath, "utf8") : "# Changelog\n\n";
if (!current.includes(`## ${version} - ${date}`)) {
  writeFileSync(changelogPath, `${current}\n${line}`);
}

console.log(`Updated ${changelogPath} with ${version}`);
