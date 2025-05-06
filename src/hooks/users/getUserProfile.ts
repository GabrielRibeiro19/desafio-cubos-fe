'use client'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../services/apiClient'
import { IResponseGetUser } from '../../types/user'

const fetchGetUserProfile = async (): Promise<IResponseGetUser> => {
  const { data } = await api.get<IResponseGetUser>('/users/me')

  return data
}

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ['get-user-profile'],
    queryFn: fetchGetUserProfile,
  })
}
