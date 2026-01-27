import { RouterProvider } from "react-router"
import { appRouter } from "./app.routes"

export const App = () => {
  return (
    <RouterProvider router={appRouter} />
  )
}
