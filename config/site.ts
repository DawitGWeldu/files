import { SiteConfig } from "../types"

export const siteConfig: SiteConfig = {
  name: "ITTIHAD",
  description:
    "Internal management application for ITTIHAD FOREIGN EMPLOYMENT AGENCY",
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/dawitgweldu",
    github: "https://github.com/dawitgweldu",
  },
}
