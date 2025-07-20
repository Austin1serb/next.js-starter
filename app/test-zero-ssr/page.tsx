import { TabsSSR } from "../components/tabs/TabsSSR"
import { phases } from "../components/tabs/data"

const Page = () => {
  return (
    <section className="border-y border-gray-200">
      <div className="inside-container-large">
        <TabsSSR phases={phases} />
      </div>
    </section>
  )
}

export default Page
