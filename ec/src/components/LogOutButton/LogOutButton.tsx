import { useAuth0 } from "@auth0/auth0-react"

export default function LogOutButton() {
  const { logout } = useAuth0()

  return (
    <div>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    </div>
  )
}
