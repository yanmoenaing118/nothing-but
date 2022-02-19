import Link from "next/link";

import useSWR from "swr";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductsItemsPage() {
  const { data, error } = useSWR(
    "https://admin-bestbeauty.venuslab.co/api/products/categories",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (!data) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error occured :(</div>;
  }

  return (
    <main>
      <section>
        <ul>
          {data.data.map((item) => {
            return (
              <li key={item.slug}>
                <div>
                  <Link href={`/product/${item.slug}`}>
                    <a>{item.name}</a>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const { data: categories } = await fetch(
    "https://admin-bestbeauty.venuslab.co/api/products/categories"
  ).then((res) => res.json());

  return {
    props: {
      categories,
    },
  };
}
