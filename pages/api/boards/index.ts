import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { Board } from '@prisma/client';
import {z} from "zod"
import { prisma } from '~/src/db/prisma';
import { title } from 'process';

//le schéma zod permet de valider les données venant de la présente requète

type Data = {
    board: Board
}

const bodySchema = z.object({ 
    title: z.string().min(1).max(255),
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse <Data>
) {
  
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const body = bodySchema.parse(JSON.parse(req.body))

  const board = await prisma.board.create({
    data:  {
        title: body.title
    }     
  })

  res.status(201).json({ board })
}
