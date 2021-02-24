import { Hero } from '.'

let hero

beforeEach(async () => {
  hero = await Hero.create({ name: 'test', power: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = hero.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(hero.id)
    expect(view.name).toBe(hero.name)
    expect(view.power).toBe(hero.power)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = hero.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(hero.id)
    expect(view.name).toBe(hero.name)
    expect(view.power).toBe(hero.power)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
