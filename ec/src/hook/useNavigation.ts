import { useNavigate } from "react-router-dom"

export function useNavigation() {
  const navigate = useNavigate()

  const navigateBack = () => {
    navigate(-1)
  }

  return { navigateBack }
}
