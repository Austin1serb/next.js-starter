import { Footer } from "../components/footer"
import { TopBar } from "../components/top-bar/top-bar"

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
