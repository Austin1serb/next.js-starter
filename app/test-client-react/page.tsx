import { Tabs } from "../components/tabs/TabsReact"
import { phases } from "../components/tabs/data"

const Page = () => {
  return (
    <section className="border-y border-gray-200">
      <div className="inside-container-large">
        <Tabs phases={phases} />
      </div>
    </section>
  )
}

export default Page
