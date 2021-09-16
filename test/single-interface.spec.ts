import * as assert from 'assert'
import { removeWhiteSpace } from './util/index'
import RawToTs from '../src/index'

describe('Single interface', function() {
  it('should work with empty objects', function() {
    const json = {}

    const expected = `
      interface Request {
      }
    `
    const actual = RawToTs(json).pop()
    const [a, b] = [expected, actual].map(removeWhiteSpace)
    assert.strictEqual(a, b)
  })

  it('should not quote underscore key names', function() {
    const json = {
      _marius: 'marius'
    }

    const expected = `
      interface Request {
        _marius: string;
      }
    `
    const actual = RawToTs(json).pop()
    const [a, b] = [expected, actual].map(removeWhiteSpace)
    assert.strictEqual(a, b)
  })

  it('should convert Date to Date type', function() {
    const json = {
      _marius: new Date()
    }

    const expected = `
      interface Request {
        _marius: Date;
      }
    `
    const actual = RawToTs(json).pop()
    const [a, b] = [expected, actual].map(removeWhiteSpace)
    assert.strictEqual(a, b)
  })

  it('should work with multiple key words', function() {
    const json = {
      'hello world': 42
    }

    const expected = `
interface Request {
  'hello world': number;
}`
    const actual = RawToTs(json).pop()
    assert.strictEqual(expected.trim(), actual.trim())
  })

  it('should work with multiple key words and optional fields', function() {
    const json = {
      'hello world': null
    }

    const expected = `
interface Request {
  'hello world'?: any;
}`
    const actual = RawToTs(json).pop()
    assert.strictEqual(expected.trim(), actual.trim())
  })

  it('should work with primitive types', function() {
    const json = {
      str: 'this is string',
      num: 42,
      bool: true
    }

    const expected = `
      interface Request {
        str: string;
        num: number;
        bool: boolean;
      }
    `
    const interfaceStr = RawToTs(json).pop()
    const [expect, actual] = [expected, interfaceStr].map(removeWhiteSpace)
    assert.strictEqual(expect, actual)
  })

  it('should keep field order', function() {
    const json = {
      c: 'this is string',
      a: 42,
      b: true
    }

    const expected = `
      interface Request {
        c: string;
        a: number;
        b: boolean;
      }
    `
    const interfaceStr = RawToTs(json).pop()
    const [expect, actual] = [expected, interfaceStr].map(removeWhiteSpace)
    assert.strictEqual(expect, actual)
  })

  it('should add optional field modifier on null values', function() {
    const json = {
      field: null
    }

    const expected = `
      interface Request {
        field?: any;
      }
    `
    const actual = RawToTs(json).pop()
    const [a, b] = [expected, actual].map(removeWhiteSpace)
    assert.strictEqual(a, b)
  })

  it('should name root object interface "Request"', function() {
    const json = {}

    const expected = `
      interface Request {
      }
    `
    const actual = RawToTs(json).pop()
    const [a, b] = [expected, actual].map(removeWhiteSpace)
    assert.strictEqual(a, b)
  })

  it('should empty array should be any[]', function() {
    const json = {
      arr: []
    }

    const expected = `
      interface Request {
        arr: any[];
      }
    `
    const actual = RawToTs(json).pop()
    const [a, b] = [expected, actual].map(removeWhiteSpace)
    assert.strictEqual(a, b)
  })
})
