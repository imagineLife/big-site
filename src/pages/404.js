import React, { useEffect, useState } from "react"

export default () => {
  const [isMount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  if (!isMount) {
    return <div>loading...</div>
  }

  return <div>Page Not Found</div>
}
