"use client"

import { experimental_useOptimistic as useOptimistic } from "react"
import { like, dislike } from "./actions"

export default function LikesOptimistic({ likeCount, id }: any) {
  const [optimisticLikes, addOptimistikLike] = useOptimistic(
    {
      likeCount,
      sending: false,
    },
    (state, newLikeCount) => ({
      ...state,
      likeCount: newLikeCount,
      sending: true,
    })
  )

  return (
    <div>
      <div>
        OptimisticLikes: {optimisticLikes.likeCount}
        {optimisticLikes.sending ? " Sending..." : ""}
      </div>
      <button
        onClick={async () => {
          addOptimistikLike(optimisticLikes.likeCount + 1)
          await like(id)
        }}
      >
        +
      </button>

      <button
        onClick={async () => {
          addOptimistikLike(optimisticLikes.likeCount - 1)
          await dislike(id)
        }}
      >
        -
      </button>
    </div>
  )
}
