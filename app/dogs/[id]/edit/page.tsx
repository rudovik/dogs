import { revalidatePath } from "next/cache"
import styles from "./page.module.scss"
import { kv } from "@vercel/kv"
import { redirect } from "next/navigation"
import Link from "next/link"

interface Dog {
  name: string
  image: string
  breed: string
}

export default async function DogEditPage({
  params,
}: {
  params: { id: string }
}) {
  const key = `dogs:${params.id}`
  // await kv.set<Dog>(key, {
  //   name: "Misha",
  //   image: "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_310.jpg",
  //   breed: "schnauzer-giant",
  // })
  const dog = await kv.get<Dog>(key)
  // console.log(dog?.name)

  async function upDog(formData: FormData) {
    "use server"
    await kv.set(key, {
      name: formData.get("title"),
      image: formData.get("image"),
      breed: formData.get("breed"),
    })
    revalidatePath(`/dogs/${params.id}/edit`)
  }

  async function upDogDeuce(formData: FormData) {
    "use server"
    await kv.set(key, {
      name: formData.get("title"),
      image: formData.get("image"),
      breed: formData.get("breed"),
    })

    redirect(`/dogs/${params.id}`)
  }

  function submitForm(e: any) {
    e.preventDefault()
  }

  // return true

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h2>Edit {dog?.name}</h2>
        <Link href={`/dogs/${params.id}`}>Go to {dog?.name}</Link>

        <form onSubmit={submitForm}>
          <label>Name</label>
          <input name="title" type="text" defaultValue={dog?.name} />
          <label>Image</label>
          <input name="image" type="text" defaultValue={dog?.image} />
          <label>Breed</label>
          <input name="breed" type="text" defaultValue={dog?.breed} />
          <button formAction={upDog}>Save and Continue</button>
          <button formAction={upDogDeuce}>Save and Quit</button>
        </form>
      </div>
    </div>
  )
}
