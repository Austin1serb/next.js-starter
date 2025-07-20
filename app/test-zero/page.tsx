import { TabsZeroUI } from "../components/tabs/TabsZeroUI"
import { phases } from "../components/tabs/data"

const Page = () => {
  return (
    <section className="border-y border-gray-200">
      <div className="inside-container-large">
        <TabsZeroUI phases={phases} />
      </div>
    </section>
  )
}

export default Page
