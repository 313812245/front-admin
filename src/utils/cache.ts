import CryptoJS from 'crypto-js'

const _key = 'baolian_ygcx_'
const CRYPTO_SECRET = _key + '88888888' // 加密的密钥
const isBuild = import.meta.env.PROD

type StorageType = 'localStorage' | 'sessionStorage'

const getValue = (value, isEncrypt) => {
  return isEncrypt ? decrypto(value).data : JSON.parse(value).data
}

const strValue = (value, isEncrypt) => {
  return isEncrypt ? encrypto(value) : JSON.stringify(value)
}

const getKey = (name: string) => {
  return _key.toString() + name
}

/**
 * AES加密数据
 * @param data 需要加密的数据
 * @returns 返回AES加密后的数据
 */
export function encrypto (data) {
  const newData = JSON.stringify(data)
  return CryptoJS.AES.encrypt(newData, CRYPTO_SECRET).toString()
}

/**
 * AES解密数据
 * @param encryptedData 加密后的数据
 * @returns 解密的数据
 */
export function decrypto (encryptedData: any) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_SECRET)
  const originText = bytes.toString(CryptoJS.enc.Utf8)
  if (originText) {
    return JSON.parse(originText)
  }
  return '解密失败'
}

export const useStorage = ($storageName: StorageType) => {
  const $storage = window[$storageName]

  /**
   * 根据 name 值获取储存在 storage 中的值
   * @param name storage key
   * @param isEncrypt 是否加密
   */
  const get = (name: string, isEncrypt = isBuild) => {
    const key = getKey(name)
    const value = $storage.getItem(key)
    return value ? getValue(value, isEncrypt) : value
  }

  /**
   * 根据 name 值向 storage 中储存值
   * @param name storage key
   * @param value 需要储存在 storage 中的值
   * @param isEncrypt 是否加密
   */
  const set = (name: string, value, isEncrypt = isBuild) => {
    const key = getKey(name)
    const obj = {
      data: value,
      time: new Date().getTime()
    }
    return $storage.setItem(key, strValue(obj, isEncrypt))
  }

  /**
   * 根据 name 值移除储存在 storage 中的值
   * @param name storage key
   */
  const remove = (name: string) => {
    const key = getKey(name)
    return $storage.removeItem(key)
  }

  /**
   * 移除除了 name 之外的所有储存在 storage 中的值
   * @param name storage key
   */
  const clearExcept = (name: string) => {
    const key = getKey(name)
    for (const itemKey of Object.keys($storage)) {
      if (itemKey && itemKey !== key) {
        $storage.removeItem(itemKey)
      }
    }
  }

  /**
   * 移除包括了 name 之外的所有储存在 storage 中的值
   * @param name storage key
   */
  const clearInclude = (name: string | string[]) => {
    const names = Array.isArray(name) ? name : [name]
    for (const name of names) {
      const key = getKey(name)
      if (key && key in $storage) {
        $storage.removeItem(key)
      }
    }
  }

  /**
   * 移除所有储存在 storage 中的值
   */
  const clearAll = () => {
    $storage.clear()
  }

  return {
    get,
    set,
    remove,
    clearExcept,
    clearInclude,
    clearAll
  }
}

export const localCache = useStorage('localStorage')
export const sessionCache = useStorage('sessionStorage')
