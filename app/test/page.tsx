import React from "react"

const page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <button data-ui="toggle:data-theme(light)" className="theme-dark:bg-black theme-light:bg-white">
        Toggle Theme
      </button>
    </div>
  )
}

export default page
