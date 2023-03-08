import { notFound } from 'next/navigation';
import React from 'react'
import { Proposition } from '~/src/components/proposition/PropositionLine';
import { prisma } from '~/src/db/prisma';
import NewBoardForm from './new/newBoardForm';

export default async function pageBoard({params, searchParams,
    }: {
        params: {boardId : string};
        searchParams?: { [key: string]: string | string[] | undefined}
    }) {

        const boardId = Number(params.boardId)

        if (isNaN(boardId)) {
            return notFound()
        }
        const propositions = await prisma.proposition.findMany({
            where: {
                boardId: boardId
            },
            select: {
                title:true,
                id:true,
                _count: {
                    select: {
                        vote: true,
                    }
                }
            }
        }) 
        
        return (
            <div>
                <NewBoardForm boardId={boardId}/>
                <ul>
                    {propositions.map(proposition => {
                        <Proposition key={proposition.id} voteCount={proposition._count.vote}
                        {...proposition} />
                    })}
                </ul>
            </div>
        )
    }
