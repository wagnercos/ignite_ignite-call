import { prisma } from '@/lib/prisma'
import { setCookie } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  // pegando o dados do usuários de dentro do banco de dados
  const { name, username } = req.body

  // verificando se já existe um mesmo usuário
  const usersExists = await prisma.user.findUnique({
    where: { username },
  })

  if (usersExists) {
    return res.status(400).json({
      message: 'Username already taken.',
    })
  }

  // criando um novo usuário a partir do prisma
  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  // criando um cookie do usuário
  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  })

  // 201 = recurso criado
  return res.status(201).json(user)
}
