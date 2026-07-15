import { Metadata } from "next"

export const createMetadata = (
  { title, description } = { title: "", description: "" }
): Metadata => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL!),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
})
