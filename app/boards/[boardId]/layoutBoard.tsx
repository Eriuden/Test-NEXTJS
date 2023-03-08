import { notFound } from 'next/navigation';
import React from 'react';
import { PropsWithChildren } from "react"
import { prisma } from '~/src/db/prisma';

export default async function layoutBoard({params, children
}: PropsWithChildren<{params: {boardId : string};}>
   
) {

  const boardId = Number(params.boardId)

        if (isNaN(boardId)) {
            return notFound()
        }
        const board = await prisma.board.findUniqueOrThrow({
            where: {
                id: boardId
            },
        });

        //Le findUniqueOrThrow permet d'éviter un problème du board null
        //En temps normal TS proclame une erreur a moins d'écrire board?

  return (
    <div>

      <h2>
        <h2>{board.title}</h2>
        {children}
      </h2>
      
    </div>
  )
}
