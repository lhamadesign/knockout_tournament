import React from 'react';
import CompetitorForm from './CompetitorForm';
import { Competitor } from '../models/Competitor';
import { Tournament } from '../models/Tournament';
import TournamentKeys from './TournamentKeys';
import { BinaryTree } from '../models/BinaryTree';

type TournamentState = {
    tournament: Tournament;
    openCompetitorForm: boolean;
    competitorForm: any;
    tournamentKeys?: any;
};

export class MyTournament extends React.Component {
    state: TournamentState;

    constructor(props: any) {
        super(props);
        this.state = {
            tournament: new Tournament(),
            openCompetitorForm: false,
            competitorForm: undefined,
        };
    }

    saveCompetitor = (competitor: Competitor) => {
        const { tournament } = this.state;
        if (competitor) {
            tournament.addCompetitor(competitor);
            this.setState({tournament: tournament, openCompetitorForm: false});
        }
    };

    updateCompetitor = (competitor: Competitor, index?: number) => {
        if (competitor && index != undefined) {
            const { tournament } = this.state;
            if (tournament.competitors[index]) {
                tournament.updateCompetitor(index, competitor);
                this.setState({tournament: tournament, openCompetitorForm: false});
            }
        }
    };

    removeCompetitor = (index: number) => {
        if (index != undefined) {
            const { tournament } = this.state;
            if(tournament.competitors[index]) {
                tournament.removeCompetitor(index);
                this.setState({tournament: tournament});
            }
        }
    };

    openCompetitorForm = (update: boolean, competitor?: Competitor, index?: number) => {
        if(!update) {
            const form = <CompetitorForm submit={this.saveCompetitor.bind(this)} />;
            this.setState({
                openCompetitorForm: true,
                competitorForm: form
            });
        } else if (competitor && index != undefined) {
            const form = <CompetitorForm 
                            competitor={{'value': competitor, 'index': index}}
                            submit={this.updateCompetitor.bind(this)}
                        />;
            this.setState({
                openCompetitorForm: true,
                competitorForm: form
            });
        }
        
    };

    isPowerOfTwo = (value: number) => {
        const log = Math.log2(value);
        return (Math.ceil(log) == Math.floor(log))
    };

    generateTournamentKeys = (competitors: Competitor[]) => {
        let competitorNames = competitors.map(competitor => competitor.fullName);
        let { tournamentKeys } = this.state;
        tournamentKeys = <TournamentKeys competitorsList={competitorNames} />
        this.setState({tournamentKeys: tournamentKeys});
    };

    render() {
        const { tournament, tournamentKeys } = this.state;
        if (tournamentKeys) {
            console.log(tournamentKeys);
            return tournamentKeys
        }
        let competitorsNumber = tournament.competitors.length;
        return (
            <section>
                <h1>Meu Torneio</h1>
                {this.isPowerOfTwo(competitorsNumber) && (
                    <button onClick={() => this.generateTournamentKeys(tournament.competitors)}>Iniciar Torneio</button>
                )}
                <h2>Participantes</h2>
                <button onClick={() => this.openCompetitorForm(false)}>Adicionar Participante</button>
                <ul>
                    {tournament.competitors.map((competitor, index) => {
                        return (
                        <li key={index}>
                            {competitor.fullName + ',' + competitor.phone + ',' + competitor.email}
                            <button onClick={() => this.openCompetitorForm(true, competitor, index)}>Editar informações</button>
                            <button onClick={() => this.removeCompetitor(index)}>Excluir</button>
                        </li>
                        )
                    })}
                </ul>
                {this.state.openCompetitorForm && (
                    <aside>
                        {this.state.competitorForm}
                    </aside>
                )}
            </section>
        )
    }
};