const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const semver = require('semver');

try {
    // path input defined in action metadata file
    const path = core.getInput('path');
    console.log(`Got path to builds index as ${path}`);
    
    fs.readFile(path, "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            const buildIndex = JSON.parse(jsonString);
            const builds = buildIndex.AvailableBuilds;
            console.log(`found ${builds.length} builds`);
            
            const latestVersion = builds[builds.length-1];
            console.log(`latest build version is ${latestVersion}`);
            
            const nextPatchVersion = semver.inc(latestVersion, "patch");
            console.log(`next patch version will be ${nextPatchVersion}`);
            
            core.setOutput("version", latestVersion);
            core.setOutput("nextPatchVersion", nextPatchVersion);
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
} catch (error) {
    core.setFailed(error.message);
}