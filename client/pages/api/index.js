import axios from 'axios'


// export const superHeroInstance = axios.create({
//   baseURL: 'https://akabab.github.io/superhero-api/api',
//   responseType: 'json',
// })

export const serverInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  responseType: 'json',
})

// export const getRandomSuperHero = async () => {
//   const chooseFrom = 200
//   const random = Math.floor(Math.random() * (chooseFrom - 1 + 1) + 1)
//   const { data } = await superHeroInstance.get(`/id/${random}.json`)
//   return data 
// }

// export const joinGroupVideoRoom = async (payload: {
//   fullname
//   email
//   roomCode
// }) => {
//   const { data } = await serverInstance.post('/room/join', payload)
//   return data as { id; token }
// }
