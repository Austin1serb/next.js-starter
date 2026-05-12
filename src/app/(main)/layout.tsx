import { Footer } from "../components/ui/footer"
import { TopBar } from "../components/ui/top-bar"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopBar />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
