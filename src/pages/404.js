import React, { useEffect, useState } from "react"

export default () => {
  const [isMount, setMount] = useState(false)
  const browser = typeof window !== "undefined" && window

  useEffect(() => {
    setMount(true)
  }, [])

  if (!isMount && browser) {
    return <div>loading...</div>
  }

  return <div>Page Not Found</div>
}
