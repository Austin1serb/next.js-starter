import { Footer } from "../components/global/footer"
import { TopBar } from "../components/global/top-bar"

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
