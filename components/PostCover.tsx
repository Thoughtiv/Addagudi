import Image from "next/image";

/** Cover image for a post. Uploaded images are already resized, so they skip the optimizer. */
export function PostCover({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return (
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={src.startsWith("/api/")} style={{ objectFit: "cover" }} />
  );
}
