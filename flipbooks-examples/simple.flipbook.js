module.exports = {
  title: 'Test jsonplaceholder api:',
  scenes: [
    {
      describe: 'Get one post:',
      request: {
        options: {
          host: 'jsonplaceholder.typicode.com',
          protocol: 'https:',
          method: 'GET',
          path: '/posts/1',
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
          'access-control-allow-credentials': 'true'
        },
        bodySchema: {
          userId: {
            _type: 'integer'
          },
          title: {
            _type: 'string',
            should: async (title) => { return title.length >= 10 }
          }
        }
      },
      lifecicle: {}
    }
  ]
}
