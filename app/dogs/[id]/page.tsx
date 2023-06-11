import { kv } from "@vercel/kv"
import styles from "./page.module.scss"
import Likes from "./Likes"
import LikesOptimistic from "./LikesOptimistic"
import Link from "next/link"

interface Dog {
  name: string
  image: string
  breed: string
}

export default async function Dog({ params }: { params: { id: string } }) {
  let key = `dogs:${params.id}`
  const dog = await kv.get<Dog>(key)
  key = `likes:${params.id}`
  const likes = await kv.get(key)

  return (
    <>
      <h1>Welcome to my website!</h1>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardImg}>
            <img src={dog?.image} />
          </div>
          <h2>Doug Profile</h2>
          <h3>{dog?.name}</h3>
          <Link href={`/dogs/${params.id}/edit`} prefetch={false}>
            Edit
          </Link>
          <p>{`Total Likes: ${likes}`}</p>
          <Likes id={params.id} />
          <LikesOptimistic id={params.id} likeCount={likes} />
        </div>
      </div>
    </>
  )
}
