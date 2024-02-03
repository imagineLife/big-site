import { useCallback, useState, useEffect } from "react"

const mockStorageForSSR = {
  getItem: key => {},
}
const isBrowser = () => typeof window !== "undefined"
/*
  abstractions: useLocalStorage & useSessionStorage
*/
export function useLocalStorage(key, defaultValue) {
  return useStorage(
    key,
    defaultValue,
    isBrowser() ? window?.localStorage : mockStorageForSSR
  )
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(
    key,
    defaultValue,
    isBrowser() ? window?.sessionStorage : mockStorageForSSR
  )
}

//
// "base" function
//
function useStorage(key, defaultValue, storageObject) {
  // console.log("%c useStorage", "background-color: white; color: black;")
  const [localValue, setLocalValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    // console.log("jsonValue")
    // console.log(jsonValue)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      // console.log("no 1")

      return defaultValue()
    } else {
      // console.log("no 2")
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
