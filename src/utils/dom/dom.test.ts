import { after, append, before as insertBefore, Content } from '.'

describe('DOM helpers', () => {
  describe('before', () => {
    it('should update the first child of the parent', () => {
      const parent = new Content()
      const first = new Content()
      const second = new Content()
      const target = new Content()

      append(parent, first)
      append(parent, second)
      insertBefore(first, target)

      expect(parent._first).toBe(target)
      expect(parent._last).toBe(second)
      expect(target._prev).toBeUndefined()
      expect(target._next).toBe(first)
      expect(first._prev).toBe(target)
      expect(second._prev).toBe(first)
    })
  })

  describe('after', () => {
    it('should update the last child of the parent', () => {
      const parent = new Content()
      const first = new Content()
      const second = new Content()
      const target = new Content()

      append(parent, first)
      append(parent, second)
      after(second, target)

      expect(parent._first).toBe(first)
      expect(parent._last).toBe(target)
      expect(target._prev).toBe(second)
      expect(target._next).toBeUndefined()
      expect(first._next).toBe(second)
      expect(second._next).toBe(target)
    })
  })
})
