import React from 'react';
import { isWhiteSpaceLike } from 'typescript';
import { BinaryTree } from '../models/BinaryTree';

import '../scss/tournamentKeys.scss';

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
        let dinamicFlexValue = [25];
        
        matches[level] = [];
        for(let index = 0; index < maxLevel; index++) {
            let style = {
                height: dinamicFlexValue[level] * 2,
            };
            matches[level].push(<li className="level-competitor" style={style} key={index}><span className="level-competitor-name">{competitors[index]}</span></li>);
        };
        dinamicFlexValue.push(dinamicFlexValue[level] * 2);
        while(level < Math.log2(competitors.length)) {
            level++;
            let flexHeight = dinamicFlexValue.reduce((previous, next) => previous + next);
            let flexPadding = flexHeight - (dinamicFlexValue[level]);
            if (level > 1) {
                flexHeight -= dinamicFlexValue[0];
            }
            dinamicFlexValue.push(flexHeight);
            maxLevel /= 2;
            matches[level] = [];
            for(let index = 0; index < maxLevel; index++) {
                let style = {
                    height: (index >0) ? flexHeight  + "px" : "50px",
                    paddingBottom: (index > 0) ? flexPadding + "px" : '0px'
                };
                matches[level].push(<li className="level-competitor" style={style} key={index}></li>);
            }
        }

        return (
            <section className="tournament-keys">
                <h1>Chaves</h1>
                <section className="keys">
                    {matches.map(level => {
                        return <ul className="level">{level}</ul>
                    })}
                </section>
                <button 
                    onClick={() => this.props.goBack()}
                    className="go-back-btn">Voltar</button>
            </section>
        );
    }
}