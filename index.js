const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
    // path input defined in action metadata file
    const pathToBuildsIndex = core.getInput('pathToBuildsIndex');
    console.log(`Got path to builds index as ${pathToBuildsIndex}!`);
    
    fs.readFile(pathToBuildsIndex, "utf8", (err, jsonString) => {
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
    
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    
    
} catch (error) {
    core.setFailed(error.message);
}