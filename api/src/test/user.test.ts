import t from 'tap';
import { build } from '@/app';
import config from '@/config';

t.test('GET `/` route', t => {
  t.plan(4)
  
  const fastify = build()
  
  // At the end of your tests it is highly recommended to call `.close()`
  // to ensure that all connections to external services get closed.
  t.teardown(() => fastify.close())

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, response) => {
    t.error(err)
    t.strictEqual(response.statusCode, 200)
    t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8')
    t.deepEqual(JSON.parse(response.payload), { hello: 'world' })
  })
})

