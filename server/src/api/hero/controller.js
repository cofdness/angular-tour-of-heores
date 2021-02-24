import { success, notFound } from '../../services/response/'
import { Hero } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Hero.create(body)
    .then((hero) => hero.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Hero.count(query)
    .then(count => Hero.find(query, select, cursor)
      .then((heroes) => ({
        count,
        rows: heroes.map((hero) => hero.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Hero.findById(params.id)
    .then(notFound(res))
    .then((hero) => hero ? hero.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Hero.findById(params.id)
    .then(notFound(res))
    .then((hero) => hero ? Object.assign(hero, body).save() : null)
    .then((hero) => hero ? hero.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Hero.findById(params.id)
    .then(notFound(res))
    .then((hero) => hero ? hero.remove() : null)
    .then(success(res, 204))
    .catch(next)
