const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
    // path input defined in action metadata file
    const path = core.getInput('path');
    console.log(`Got path to builds index as ${path}!`);
    
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
            
            core.setOutput("version", latestVersion);
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
} catch (error) {
    core.setFailed(error.message);
}