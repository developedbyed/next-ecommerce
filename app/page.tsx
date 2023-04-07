import Product from "./components/Product"
import getProducts from "@/util/getProducts"

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  )
}
