import React from 'react';
import CompetitorForm from './CompetitorForm';
import { Competitor } from '../models/Competitor';

type TournamentState = {
    competitors: Competitor[];
    openCompetitorForm: boolean;
    competitorForm: any;
};

export class Tournament extends React.Component {
    state: TournamentState;

    constructor(props: any) {
        super(props);
        this.state = {
            competitors: new Array(),
            openCompetitorForm: false,
            competitorForm: undefined
        };
    }

    saveCompetitor = (competitor: Competitor) => {
        const updatedCompetitors = this.state.competitors;
        updatedCompetitors.push(competitor);
        // save to localhost
        this.setState({competitors: updatedCompetitors, openCompetitorForm: false});
    };

    openCompetitorForm = (update: boolean) => {
        if(!update) {
            const competitor = new Competitor("","","");
            const form = new CompetitorForm({ 'competitor': competitor, 'submit': this.saveCompetitor});
            this.setState({
                openCompetitorForm: true,
                competitorForm: form
            });
        }
    }

    render() {
        let { competitors } = this.state;
        console.log(competitors);
        return (
            <section>
                <h1>Meu Torneio</h1>
                <h2>Participantes</h2>
                <button onClick={() => this.openCompetitorForm(false)}>Adicionar Participante</button>
                <ul>
                    {competitors.map((competitor, index) => {
                        return (
                        <li key={index}>
                            {competitor.fullName + ',' + competitor.phone + ',' + competitor.email}
                        </li>
                        )
                    })}
                </ul>
                {this.state.openCompetitorForm && (
                    <aside>
                        <CompetitorForm submit={this.saveCompetitor.bind(this)}/>
                    </aside>
                )}
            </section>
        )
    }
};