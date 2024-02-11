import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createReduxStore } from "../../store/index.ts"
import AppRouter from "../../components/router/AppRouter"
import AppHeader from "../../components/appHeader/AppHeader.tsx"

export const renderTestApp = (options) => {
  const store = createReduxStore(options?.initialState)

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[options?.route]}>
      <AppHeader />
      <main>
        <AppRouter />
      </main>
      </MemoryRouter>
    </Provider>
  )
}