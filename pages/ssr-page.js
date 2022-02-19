

export default function SSRPage({data}) {

    return <main>
        <section>
            <h1>I was rendered on Server :)</h1>
            {JSON.stringify(data)}
        </section>
    </main>

}

export async function getServerSideProps() {


    
    const data = await fetch("https://admin-bestbeauty.venuslab.co/api/products/categories").then(res => res.json())




    return {
        props: {
            data
        } 
    }


}