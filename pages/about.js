export default function AboutPage() {
  return (
    <main>
      <section>
        <div className="container">
          <h1>About Page</h1>
        </div>
      </section>

      <style jsx>{`
        .container {
          padding: 10rem 10rem;
        }
      `}</style>
    </main>
  );
}


export async function getStaticProps() {
    return {
        props: {
            title: "About us"
        }
    }
}
