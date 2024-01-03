import { useCallback, useState, useEffect } from "react"

/*
  abstractions: useLocalStorage & useSessionStorage
*/
export function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window?.localStorage)
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window?.sessionStorage)
}

//
// "base" function
//
function useStorage(key, defaultValue, storageObject) {
  const [localValue, setLocalValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (localValue === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(localValue))
  }, [key, localValue, storageObject])

  const remove = useCallback(() => {
    setLocalValue(undefined)
  }, [])

  return [localValue, setLocalValue, remove]
}
