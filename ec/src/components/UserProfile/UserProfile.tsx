import { useAuth0 } from "@auth0/auth0-react"

export default function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading!</div>
  }

  return isAuthenticated && user ? (
    <div>
      <img src={user.picture} />
      <h2> {user.name} </h2>
      <p> {user.email} </p>
    </div>
  ) : (
    <div>
      <p>Not authenticated</p>
    </div>
  )
}
