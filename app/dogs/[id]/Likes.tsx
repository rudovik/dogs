"use client"

import { like, dislike } from "./actions"
import { useTransition } from "react"

export default function Likes({ id }: any) {
  let [isPending, startTransition] = useTransition()
  return (
    <div>
      <button onClick={() => startTransition(() => like(id))}>+</button>
      <button onClick={() => startTransition(() => dislike(id))}>-</button>
    </div>
  )
}
