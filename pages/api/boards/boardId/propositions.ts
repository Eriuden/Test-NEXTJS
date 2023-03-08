import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { Board, Proposition } from '@prisma/client';
import {z} from "zod"
import { prisma } from '~/src/db/prisma';
import { title } from 'process';

//le schéma zod permet de valider les données venant de la présente requète

type Data = {
    proposition: Proposition
}

const bodySchema = z.object({ 
    title: z.string().min(1).max(255),
})

const QueryScheme = z.object({
    boardId: z.string().transform((id) => Number(id)),
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
  const query = QueryScheme.parse(JSON.parse(req.body))

  const proposition = await prisma.proposition.create({
    //On reprend les éléments de données en précisant la const où on les a déclarés
    data:  {
        title: body.title,
        boardId: query.boardId,
        ip: String(Math.random()),
    }     
  })

  res.status(201).json({ proposition })
}