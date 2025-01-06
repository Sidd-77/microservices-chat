
import { redirect } from "next/navigation"
const DocSite = () => {
  redirect("/docs/intro/intro")
  return (
    <div>Useless home page</div>
  )
}

export default DocSite