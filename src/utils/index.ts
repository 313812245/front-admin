/**
 * 将时间戳（秒或毫秒）转换为指定格式的日期字符串
 * @param format 日期格式，默认为 'Y-m-d H:i:s'
 * @param timeStamp 时间戳（秒或毫秒）
 * @returns 格式化后的日期字符串
 */
export const formatTimestamp = (timeStamp, format: string = 'Y-m-d H:i:s') => {
  const date = new Date(timeStamp < 9999999999 ? timeStamp * 1000 : timeStamp)
  const { Y, m, d, H, i, s } = {
    Y: date.getFullYear(),
    m: String(date.getMonth() + 1).padStart(2, '0'),
    d: String(date.getDate()).padStart(2, '0'),
    H: String(date.getHours()).padStart(2, '0'),
    i: String(date.getMinutes()).padStart(2, '0'),
    s: String(date.getSeconds()).padStart(2, '0')
  }
  return format.replace(/[YmdHis]/g, key => ({ Y, m, d, H, i, s }[key] as string))
}

/**
 * 替换单个URL参数
 * @param url 原始URL
 * @param paramName 要替换或添加的参数名
 * @param paramValue 要设置的参数值
 * @returns 替换或添加参数后的URL字符串
 */
export const replaceUrlParam = (url: string, paramName: string, paramValue: string): string => {
  const re = new RegExp(`([?&])${paramName}=.*?(&|$)`, 'i')
  const separator = url.includes('?') ? '&' : '?'

  if (url.match(re)) {
    return url.replace(re, `$1${paramName}=${paramValue}$2`)
  } else {
    return `${url}${separator}${paramName}=${paramValue}`
  }
}

/**
 * 替换多个URL参数
 * @param url 原始URL
 * @param params 要替换或添加的参数对象
 * @returns 替换或添加参数后的URL字符串
 */
export const replaceUrlParams = (url: string, params: Record<string, string | null | undefined>): string => {
  const urlObj = new URL(url)
  const urlParams = new URLSearchParams(urlObj.search)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      urlParams.set(key, value)
    } else {
      urlParams.delete(key)
    }
  })

  return `${urlObj.origin}${urlObj.pathname}?${urlParams.toString()}${urlObj.hash}`
}

/**
 * 用于配置 ValueEnum 的通用配置
 */
export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  label: string;
  value?: string | number | boolean
  /** @name 是否禁用 */
  disabled?: boolean;
};

/**
 * 支持 Map 和 Object
 */
export type ProSchemaValueEnumObj = Record<
  string,
  ProSchemaValueEnumType
>;

export type ProSchemaValueEnumMap = Map<
  string | number | boolean,
  ProSchemaValueEnumType
>;

export type ProFieldValueEnumType =
  | ProSchemaValueEnumMap
  | ProSchemaValueEnumObj;

/**
 * 获取类型的 type
 * @param obj
 */
function getType (obj: any) {
  // @ts-ignore
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase()
  if (type === 'string' && typeof obj === 'object') return 'object' // Let "new String('')" return 'object'
  if (obj === null) return 'null' // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined' // PhantomJS has type "DOMWindow" for undefined
  return type
}

export const ObjToMap = (
  value: ProFieldValueEnumType | undefined
): ProSchemaValueEnumMap => {
  if (getType(value) === 'map') {
    return value as ProSchemaValueEnumMap
  }
  return new Map(Object.entries(value || {}))
}

/**
 * 把 value 的枚举转化为数组
 * @param valueEnum
 */
type SelectOptionType = Partial<ProSchemaValueEnumType>[];
export const proFieldParsingValueEnumToArray = (
  valueEnumParams: ProFieldValueEnumType
): SelectOptionType => {
  const enumArray: Partial<
    ProSchemaValueEnumType & {
      label: string;
      /** 是否禁用 */
      disabled?: boolean;
    }
  >[] = []
  const valueEnum = ObjToMap(valueEnumParams)

  valueEnum.forEach((_, key) => {
    const value = (valueEnum.get(key) || valueEnum.get(`${key}`)) as {
      label: string;
      disabled?: boolean;
    }
    if (!value) {
      return
    }
    if (typeof value === 'object' && value?.label) {
      enumArray.push({
        label: value?.label as unknown as string,
        value: key,
        disabled: value.disabled
      })
      return
    }
    enumArray.push({
      label: value as unknown as string,
      value: key
    })
  })
  return enumArray
}

/** 如果是个方法执行一下它 */
export const runFunction = <T extends any[]>(valueEnum: any, ...rest: T) => {
  if (typeof valueEnum === 'function') {
    return valueEnum(...rest)
  }
  return valueEnum
}

/**
 * 将句子中每个单词的首字母转换为大写
 * @param {string} sentence - 要转换的句子
 * @returns {string} - 转换后的句子
 */
export const capitalizeFirstLetter = (sentence: string): string => {
  const words = sentence.split(' ')

  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase()
    const restOfWord = word.slice(1)

    return `${firstLetter}${restOfWord}`
  })

  return capitalizedWords.join(' ')
}

/**
 * 获取值的空值
 * @param value 要获取空值的值
 * @param defaultValue 默认值
 * @returns 值的空值
 */
export const getEmptyValue = function <T> (value: T) {
  if (typeof value === 'string') {
    return '' as unknown as T
  } else if (typeof value === 'number') {
    return null as unknown as T
  } else if (typeof value === 'boolean') {
    return false as unknown as T
  } else if (Array.isArray(value)) {
    return [] as unknown as T
  } else if (typeof value === 'object' && value instanceof Date) {
    return '' as unknown as T
  } else if (typeof value === 'object' && value !== null) {
    return resetObject(value)
  }
  return value
}

/**
 * 重置对象内容为初始数据
 * @param {T} obj 要重置的对象
 * @param {Partial<T>} defaults 默认值
 * @returns {T} 重置后的新对象
 */
export function resetObject<T> (obj: T, defaultObj?: Partial<T>): T {
  const resetValue = (value: unknown, defaultValue: unknown): unknown => {
    if (defaultValue) {
      return defaultValue
    } else if (Array.isArray(value)) {
      return []
    } else if (typeof value === 'object' && value !== null) {
      return resetObject(value)
    } else if (typeof value === 'number') {
      return null
    } else if (typeof value === 'string') {
      return ''
    } else {
      return value
    }
  }
  const resetProperties = (target: T, defaults: Partial<T> | undefined) => {
    if (defaults) {
      for (const key in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, key) && !Object.prototype.hasOwnProperty.call(target, key)) {
          target[key as keyof T] = defaults[key] as T[keyof T]
        } else if (Object.prototype.hasOwnProperty.call(target, key) && typeof target[key] === 'object' && typeof defaults[key] === 'object' && target[key] !== null && defaults[key] !== null) {
          target[key] = resetObject(target[key], defaults[key])
        }
      }
    }
  }
  if (defaultObj) {
    resetProperties(obj, defaultObj)
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const defaultValue = defaultObj?.[key]
      obj[key as keyof T] = resetValue(obj[key], defaultValue) as T[keyof T]
    }
  }
  return obj
}

type Path = (string | number)[];
/**
 * 获取对象中指定路径的值
 * @param obj - 要从中获取值的对象
 * @param path - 表示要访问的属性路径的数组或字符串
 * @param defaultValue - 如果无法获取到值，则返回的默认值
 * @returns 对象中指定路径的值，如果无法获取到值，则返回默认值
 */
export function getValue<T> (obj: Record<string, any>, path: Path | string, defaultValue?: T): T | undefined {
  const pathArray = typeof path === 'string' ? path.split('.') : path
  const result = pathArray.reduce((acc, key) => acc?.[key], obj) ?? undefined
  return result !== undefined ? (result as T) : defaultValue
}
