// base
const baseRequest = {
  options: {
    host: 'reqres.in',
    protocol: 'https:',
    method: 'GET',
    port: 443,
    agent: false,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
}

// deep clone
const firstRequest = JSON.parse(JSON.stringify(baseRequest))
const secondRequest = JSON.parse(JSON.stringify(baseRequest))

// assing paths
firstRequest.options.path = '/api/users'
secondRequest.options.path = '/api/colors'

module.exports = {
  title: 'Share request flipbook example:',
  scenes: [
    {
      describe: 'Get list of users:',
      request: firstRequest,
      validation: {
        statusCode: 200,
        headerSchema: {
          'access-control-allow-origin': '*'
        },
        bodySchema: {
          data: {
            _type: 'array',
            _sample: {
              index: 0,
              _keys: {
                id: {
                  _type: 'integer'
                },
                first_name: {
                  _type: 'string',
                  should: async (first_name) => first_name === 'George'
                }
              }
            }
          }
        }
      }
    },
    {
      describe: 'Get some colors:',
      request: secondRequest,
      validation: {
        statusCode: 200,
        headerSchema: {
          'access-control-allow-origin': '*'
        },
        bodySchema: {
          data: {
            _type: 'array',
            _sample: {
              index: 1,
              _keys: {
                id: {
                  _type: 'integer'
                },
                color: {
                  _type: 'string',
                  should: async (color) => typeof color.match(/^#[0-9a-f]{3,6}$/i) === 'object'
                }
              }
            }
          }
        }
      }
    }
  ]
}
