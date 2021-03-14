import React from 'react';
import { BinaryTree } from '../models/BinaryTree';

type TournamentKeysProps = {
    competitorsList: string[];
};

export default class TournamentKeys extends React.Component<TournamentKeysProps> {
    keys: BinaryTree;

    constructor(props: TournamentKeysProps) {
        super(props);
        this.keys = new BinaryTree();
        this.keys.fillTree(props.competitorsList);
    }

    render = () => {
        const { keys } = this;
        console.log(keys);
        return (
            <h1>Chaves</h1>
        );
    }
}