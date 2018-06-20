module.exports = {
  title: 'Simple flibook example:',
  scenes: [
    {
      describe: 'Get one user and validate response:',
      request: {
        options: {
          host: 'reqres.in',
          protocol: 'https:',
          method: 'GET',
          path: '/api/users/2',
          port: 443,
          agent: false,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }
      },
      validation: {
        statusCode: 200,
        headerSchema: {
          'access-control-allow-origin': '*'
        },
        bodySchema: {
          data: {
            _type: 'object',
            _keys: {
              id: {
                _type: 'integer'
              },
              first_name: {
                _type: 'string',
                should: async (title) => { return title.length >= 2 }
              },
              last_name: {
                _type: 'string'
              }
            }
          }
        }
      }
    }
  ]
}
