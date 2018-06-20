# api-flipbooks

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
> Handcrafted tool for strict API testing

## what for

Run synchronous interdependent api analysis based on configurable files. This approach results handy for mimicking user behaviour and analyse API endpoint behaviours in real life cases.

## usage

### cli

```
$ npm i -g api-flipbooks
$ api-flipbooks ./flibooks-config-file.js
```

You can also pass a folder, `api-flipbooks` will then look for all files matching `*.flipbook.js`

```
$ api-flipbooks ./folder-with-confifgs
```

### api

Install as dev dependency
```
$ npm i api-flipbooks -D
```

Anywhere:

```javascript
const ApiFlipbooks = require('api-flipbooks')
let myApiFlipboks = new ApiFlipbooks({ target: './target-folder' })
```


## flibook file

Every flipbook file is expected to export an Object with the following properties:

```javascript
module.exports = {

  // title of the flipbook (!) required
  title: 'Title of my flipbook'

  // array of api calls/test to be performed (!) required
  scenes: [
    {

      // http request config  (!) required
      request: {  // 
        // options for node 'http' : 'https' (!) required
        options: {}
        // request body (?) optional
        body: {}
      },

      // validation schemas (!) required
      validation: {
        // expected status code (?) optional
        statusCode: 200,

        // validation schema for response headers as 'key': 'value' (?) optional
        headerSchema: {
          'access-control-allow-credentials': 'true'
        },

        // validation schema for body (?) optional
        bodySchema: {
          // expected body key (?) optional
          schemaKey: {
            // expected variable type for the key as string (?) optional
            _type: 'integer',
            // custom validation as async function should return true or false (?) optional
            should:  async (schemaKey) => { return schemaKey === 10 }
          }
        }
      }
    },

    // lifecycle hooks for this scene (?optional)
    lifecycle: {

      // before the scene is run, access history and scene needs to return the scene (?) optional
      async before (history, scene) {
        return scene
      },

      // adter the scene is run, access history and responseBody needs to return history (?) optional
      async after (responseBody, history) {
        return history
      }
    }
  ]
}
```

## current status

Under really heavy development

