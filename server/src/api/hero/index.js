import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Hero, { schema } from './model'

const router = new Router()
const { name, power } = schema.tree

/**
 * @api {post} /heroes Create hero
 * @apiName CreateHero
 * @apiGroup Hero
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Hero's name.
 * @apiParam power Hero's power.
 * @apiSuccess {Object} hero Hero's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hero not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, power }),
  create)

/**
 * @api {get} /heroes Retrieve heroes
 * @apiName RetrieveHeroes
 * @apiGroup Hero
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of heroes.
 * @apiSuccess {Object[]} rows List of heroes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /heroes/:id Retrieve hero
 * @apiName RetrieveHero
 * @apiGroup Hero
 * @apiSuccess {Object} hero Hero's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hero not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /heroes/:id Update hero
 * @apiName UpdateHero
 * @apiGroup Hero
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Hero's name.
 * @apiParam power Hero's power.
 * @apiSuccess {Object} hero Hero's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hero not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, power }),
  update)

/**
 * @api {delete} /heroes/:id Delete hero
 * @apiName DeleteHero
 * @apiGroup Hero
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Hero not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
