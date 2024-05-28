import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      alignItems: `center`,
      justifyContent: `space-between`,
      background: `#282828`,
      class: `juas`
    }}
  >
    <Link
      to=""
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
    >
      {siteTitle}
    </Link>
    <StaticImage
      src="../images/logogeneradorqr.png"
      alt="patrimonio"
      width={350}
      height={60}
      />
  </header>
)
export default Header