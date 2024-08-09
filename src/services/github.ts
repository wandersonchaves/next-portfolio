import axios from 'axios'

import {GITHUB_ACCOUNTS} from '@/common/constant/github'

const GITHUB_USER_ENDPOINT = 'https://api.github.com/graphql'

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`

interface UserData {
  login: string
  name: string
  email: string
}

interface FetchGithubDataResponse {
  status: number
  data: UserData | null
  error?: string
}

export const fetchGithubData = async (
  username: string,
  token: string | undefined,
): Promise<FetchGithubDataResponse> => {
  if (!token) {
    return {status: 401, data: null, error: 'Token is missing'}
  }

  try {
    const response = await axios.post(
      GITHUB_USER_ENDPOINT,
      {
        query: GITHUB_USER_QUERY,
        variables: {
          username: username,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const {status} = response
    const responseJson = response.data

    if (status >= 400) {
      const errorMessage = responseJson.errors
        ? responseJson.errors
            .map((err: unknown) => (err as {message: string}).message)
            .join(', ')
        : 'An error occurred'
      return {status, data: null, error: errorMessage}
    }

    return {status, data: responseJson.data.user as UserData}
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status ?? 500,
        data: null,
        error: error.message,
      }
    }
    return {status: 500, data: null, error: 'An unexpected error occurred'}
  }
}

export const getGithubUser = async (type: string) => {
  const account = GITHUB_ACCOUNTS.find(
    (account) => account?.type === type && account?.is_active,
  )

  if (!account) {
    throw new Error('Invalid user type')
  }

  const {username, token} = account
  return await fetchGithubData(username, token)
}
