import { useAuth0 } from "@auth0/auth0-react"

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  return (
    <div>
      <button onClick={() => loginWithRedirect()}> Log in </button>
    </div>
  )
}
