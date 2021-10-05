# Get PATCH Build Version Action

This action returns the latest version in a Builds Index file as a string when using [PATCH](https://github.com/emanzione/PATCH)

## Inputs

## `path`

The path to the actual builds_index.json file, defaults to "PATCHWorkspace/Builds/builds_index.json"

## Outputs

## `version`

The latest version found, as a string

## `nextPatchVersion`

The next patch version that will be generated, as a string

## Example usage
```
- name: get versions
  id: get-versions
  uses: momo-the-monster/PATCH-get-build-version@v0.3
  with:
    path: 'PATCHWorkspace/Builds/builds_index.json'
    
 - name: set version env vars from build index
   run: |
     echo PREVIOUS_VERSION=${{steps.get-versions.outputs.version}} >> $GITHUB_ENV
     echo LATEST_VERSION=${{steps.get-versions.outputs.nextPatchVersion}} >> $GITHUB_ENV
```
