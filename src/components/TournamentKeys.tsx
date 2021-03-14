import React from 'react';
import { isWhiteSpaceLike } from 'typescript';
import { BinaryTree } from '../models/BinaryTree';

type TournamentKeysProps = {
    competitorsList: string[];
    goBack: () => void;
};

export default class TournamentKeys extends React.Component<TournamentKeysProps> {
    keys: BinaryTree;

    constructor(props: TournamentKeysProps) {
        super(props);
        this.keys = new BinaryTree();
        this.keys.fillTree(props.competitorsList);
    }

    render = () => {
        let { keys } = this;
        let competitors: string[] = [];
        let matches: any[] = [];
        keys.preOrder(keys.root, competitors);
        
        let level = 0;
        let maxLevel = competitors.length;
        
        matches[level] = [];
        for(let index = 0; index < maxLevel; index++) {
            matches[level].push(<li key={index}>{competitors[index]}</li>);
        };
        while(level < Math.log2(competitors.length)) {
            level++;
            maxLevel /= 2;
            matches[level] = [];
            for(let index = 0; index < maxLevel; index++) {
                matches[level].push(<li key={index}></li>);
            }
        }

        return (
            <section>
                <h1>Chaves</h1>
                {matches.map(level => {
                    return <ul>{level}</ul>
                })}
                <button onClick={() => this.props.goBack()}>Voltar</button>
            </section>
        );
    }
}