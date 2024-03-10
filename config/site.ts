import { SiteConfig } from "../types"

export const siteConfig: SiteConfig = {
  name: "LMS",
  description:
    "Unlock Your Potential, Master Your Skills: Empowering Education for the Future.",
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/dawitgweldu",
    github: "https://github.com/dawitgweldu",
  },
}
