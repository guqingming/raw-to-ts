export function setJson(json: any): any {
  if (Object.prototype.toString.call(json) === '[object Object]') {
    let obj: any = {}
    if (json.properties) {
      for (const key in json.properties) {
        const thisObj = json.properties[key]
        let type = thisObj.type
        if (thisObj.type === 'integer') {
          type = 'number'
        }
        if (type === 'string') {
          obj[key] = `string`
        } else if (type === 'number') {
          obj[key] = 1
        }if (type === 'boolean') {
          obj[key] = false
        } else if (type === 'array' && thisObj.items) {
          obj[key] = setJson(thisObj)
        } else if (type === 'object' && thisObj.properties) {
          obj[key] = setJson(thisObj)
        }
      }
      return obj
    } else if (json.items) {
      if (json.items.properties) {
        for (const key in json.items.properties) {
          const thisObj = json.items.properties[key]
          let type = thisObj.type
          if (thisObj.type === 'integer') {
            type = 'number'
          }
          if (type === 'string') {
            obj[key] = `string`
          } else if (type === 'number') {
            obj[key] = 1
          }if (type === 'boolean') {
            obj[key] = false
          } else if (type === 'array' && thisObj.items) {
            obj[key] = setJson(thisObj)
          } else if (type === 'object' && thisObj.properties) {
            obj[key] = setJson(thisObj)
          }
        }
      } else {
        obj = []
        if (json.items.type === 'string') {
          obj.push('string')
        } else if (json.items.type === 'number' || json.items.type === 'integer') {
          obj.push(0)
        } else if (json.items.type === 'boolean') {
          obj.push(false)
        }
      }
      return obj
    } else {
      return json
    }
  }
}

function isSameObj(obj1, obj2) {
  for (const key in obj1) {
    if (!Reflect.has(obj2, key)) {
      return false
    }
  }
  for (const key in obj2) {
    if (!Reflect.has(obj1, key)) {
      return false
    }
  }
  return true
}

function findSameObj(json: any, typeMap: object, returnObj: any = {}) {
  for (let key in json.properties) {
    const obj = json.properties[key]
    if (obj.type === 'string' || obj.type === 'number' || obj.type === 'boolean' || obj.type === 'integer') {
      if (isSameObj(json.properties, typeMap)) {
        returnObj = json.properties
        return json.properties
      }
    } else if (obj.type === 'object' && obj.properties) {
      returnObj = findSameObj(obj, typeMap, returnObj)
    } else if (obj.items) {
      returnObj = findSameObj(obj.items, typeMap, returnObj)
    }
  }
  return returnObj
}

export function findDesc(json: any, typeMap: object, key: string, name: string) {
  const obj = findSameObj(json, typeMap)
  return obj && obj[key] ? obj[key].description : '注释'
}
