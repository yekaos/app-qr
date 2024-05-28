import * as React from "react"
import { Link } from "gatsby"
import Header from "../components/header"
import Seo from "../components/seo"
const IndexPage = () => (
<>
<Header></Header>
<Link></Link>
<p>Paquita te quiero</p>
</>
)
export const Head = () => <Seo title="Landing Page" />
export default IndexPage