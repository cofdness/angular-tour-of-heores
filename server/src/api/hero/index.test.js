import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Hero } from '.'

const app = () => express(apiRoot, routes)

let hero

beforeEach(async () => {
  hero = await Hero.create({})
})

test('POST /heroes 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', power: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.power).toEqual('test')
})

test('POST /heroes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /heroes 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /heroes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${hero.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(hero.id)
})

test('GET /heroes/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /heroes/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${hero.id}`)
    .send({ access_token: masterKey, name: 'test', power: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(hero.id)
  expect(body.name).toEqual('test')
  expect(body.power).toEqual('test')
})

test('PUT /heroes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${hero.id}`)
  expect(status).toBe(401)
})

test('PUT /heroes/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', power: 'test' })
  expect(status).toBe(404)
})

test('DELETE /heroes/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hero.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /heroes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hero.id}`)
  expect(status).toBe(401)
})

test('DELETE /heroes/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
