'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import {PropsWithChildren} from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always',
    capture_pageview: false // Disable automatic pageview capture, as we capture manually
  })
}


export function PHProvider({ children }: PropsWithChildren) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
