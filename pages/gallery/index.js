import React from "react";

import Image from "next/image";
import styles from "./index.module.css";

export default function GalleryPage() {
  return (
    <div>
      <h1>GalleryPage</h1>
      <div className="img">
        <Image
          src="/image-3.jpg"
          alt="My love is Wendy"
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>

      <style jsx>{`
        .img {
          position: relative;
          width: 600px;
          height: 600px;
        }
      `}</style>
    </div>
  );
}

// http://localhost:3000/_next/image?url=%2Fimage-3.jpg&w=640&q=75
