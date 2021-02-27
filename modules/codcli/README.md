# Code on Demand CLI

This is a cli tool to help with the [Code On Demand project](https://www.npmjs.com/package/@focuson/codeondemand). 
It transpiles normal react components suitable for use as code on demand components

# Installing
```shell
npm i --global  @focuson/cod
```

To validate it worked: the following should give a 'usage message'
```shell
cod
```

# Commands
Currently there is only `cod build`

## cod build

```shell
Options:
  -src, --source <source>             directory having components to build (default: "src/render")
  -dsrc, --datasource <datasource>    directory having JSON data (default: "src/json")
  -dest, --destination <destination>  directory for saving files after build (default: "public/created")
  -d, --debug                         If specified some commands output more information about how they are working
                                      (default: false)
  -f, --force                         To create destination directory if not found
```
* The components to be transpiled should be in the `--source` directory.
* Any json files that will be used to load and display the componets are in the `--datasource` directory
* The created files are put in the `--destination directory`

## json syntax

If you have a file in src/render called 'Game.tsx' then the following will be replaced by the correct details for the Game component
```json
{
  "_links":  {
    "game1": {"href": "created/gameJson1.json"}
  },
  "_render": {"_self": "#Game/render#"}
}
```

