import EditProductForm from "@/components/EditProductForm"
import prisma from "@/lib/prismadb";

type Props = {
  params: {
    id: string
  }
}


export default async function EditProduct({params}: Props) {
  const {id} = params
  let product;
  try {
    product = await prisma.product.findUnique({
     where: {id},
    })
  } catch (error) {
    console.log(error);
  }

  if (!product) {
    return <>Product Not Found</>
  }

  return <div>
    <h1>Product ID: {id}</h1>
    <div>
      <EditProductForm product={product}/>
    </div>
  </div>
}