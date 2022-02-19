import Image from "next/image";
import Router from "next/router";
import { useEffect,useState } from "react";
import useSWR from "swr";
import { fetcher } from ".";

export default function ProductDetailsPage({ product }) {

  const {data } = useSWR("https://admin-bestbeauty.venuslab.co/api/products/" + product.slug,fetcher );

  const [myProduct, setMyProduct] = useState(product);

  useEffect(() => {
    if(!data) return;
    if(data.error) {
      Router.push("/product/404");
      return;
    }
    setMyProduct(data.data)
  },[data])

  return (
    <main>
      <section>
        <h1>{myProduct.name}</h1>
        {data &&  <strong>{myProduct.is_wishlist ? "Remove from wish" : "Add to wish"}</strong>}
        <div>
          <div className="images">
            {myProduct.images?.map((img) => {
              return (
                <Image
                key={img.id}
                  src={img.thumbnail}
                  width={120}
                  height={120}
                  objectFit="cover"
                />
              );
            })}
          </div>
        </div>
        <article>
          {JSON.stringify(product)}
        </article>
      </section>

      <style jsx>{`
        main {
          overflow: hidden;
        }
        .images {
          max-width: 600px;
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(120px,1fr));
          grid-gap: 10px;
        }

        article {
          max-width: 600px;
        }
        
        `}</style>
    </main>
  );
}

export async function getStaticPaths() {
  const { data: products } = await fetch(
    "https://admin-bestbeauty.venuslab.co/api/products/categories"
  ).then((res) => res.json());

  const paths = products.map((item) => ({
    params: {
      slug: item.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { data, error } = await fetch(
    `https://admin-bestbeauty.venuslab.co/api/products/${params.slug}`
  ).then((res) => res.json());

  if(error) {
    return {
      redirect :{
        destination: "/product/404",
        permanent: false 
      }
    }
  }
  return {
    props: {
      product: data,
    },
  };
}