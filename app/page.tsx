import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1>Hello There!</h1>
      <Link href={`/dogs/my`}>To dog</Link>
    </>
  )
}
