import React, { useMemo } from "react"
import { useQuery } from "react-query"

export default function useAppRegistration() {
  const useQOpts = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    retry: false,
  }

  const API_HANDSHAKE_START_API = `${process.env.GATSBY_NLP_API_URL}/app/init?id=${process.env.GATSBY_API_APP_NAME}`
  function startApiHandshake() {
    return fetch(API_HANDSHAKE_START_API, { credentials: "include" }).then(d =>
      d.json()
    )
  }

  function finishApiHandshake() {
    return fetch(API_HANDSHAKE_FINISH_API, { credentials: "include" }).then(d =>
      d.json()
    )
  }
  const { data: apiInitKey } = useQuery("apiInit", startApiHandshake, {
    ...useQOpts,
    enabled: true,
  })

  const API_HANDSHAKE_FINISH_API = `${process.env.GATSBY_NLP_API_URL}/app/allow-access?id=${apiInitKey?.id}`
  const { data: apiReadyKey } = useQuery("apiReady", finishApiHandshake, {
    ...useQOpts,
    enabled: apiInitKey?.id !== undefined,
  })

  const initialized = useMemo(() => {
    if (!apiInitKey && !apiReadyKey) {
      return "no"
    }
    if (apiInitKey && !apiReadyKey) {
      return "loading"
    }
    if (apiInitKey && apiReadyKey) {
      return "yes"
    }
  }, [apiInitKey, apiReadyKey])
  return initialized
}
