import React from 'react';
import CompetitorForm from './CompetitorForm';
import { Competitor } from '../models/Competitor';
import { Tournament } from '../models/Tournament';
import TournamentKeys from './TournamentKeys';

import '../scss/tournament.scss';

type TournamentState = {
    tournament: Tournament;
    openCompetitorForm: boolean;
    competitorFormElement: any;
    tournamentKeysElement?: any;
};

export class MyTournament extends React.Component {
    state: TournamentState;

    constructor(props: any) {
        super(props);
        this.state = {
            tournament: new Tournament(),
            openCompetitorForm: false,
            competitorFormElement: undefined,
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
                competitorFormElement: form
            });
        } else if (competitor && index != undefined) {
            const form = <CompetitorForm 
                            competitor={{'value': competitor, 'index': index}}
                            submit={this.updateCompetitor.bind(this)}
                        />;
            this.setState({
                openCompetitorForm: true,
                competitorFormElement: form
            });
        }
        
    };

    isPowerOfTwo = (value: number) => {
        if (value <= 1) return false;
        const log = Math.log2(value);
        return (Math.ceil(log) == Math.floor(log))
    };

    generateTournamentKeys = (competitors: Competitor[]) => {
        let competitorNames = competitors.map(competitor => competitor.fullName);
        let { tournamentKeysElement } = this.state;
        tournamentKeysElement = <TournamentKeys competitorsList={competitorNames} goBack={this.closeTournamentKeys.bind(this)} />
        this.setState({tournamentKeysElement: tournamentKeysElement});
    };

    closeTournamentKeys = () => {
        this.setState({tournamentKeysElement: null});
    }

    render() {
        const { tournament, tournamentKeysElement } = this.state;
        if (tournamentKeysElement != null) {
            return tournamentKeysElement
        }
        let competitorsNumber = tournament.competitors.length;
        return (
            <section className="tournament">
                <h1>Meu Torneio</h1>
                {this.isPowerOfTwo(competitorsNumber) && (
                    <button 
                        onClick={() => this.generateTournamentKeys(tournament.competitors)}
                        id="go-keys-btn"
                        className="rounded-btn">Iniciar Torneio</button>
                )}
                <h2>Participantes</h2>
                <button
                    className="add-competitor-btn rounded-btn" 
                    onClick={() => this.openCompetitorForm(false)}
                    >Adicionar Participante</button>
                <ul className="competitors">
                    {tournament.competitors.map((competitor, index) => {
                        return (
                        <li key={index}>
                            <span className="competitor-name">{competitor.fullName}</span>
                            <span className="competitor-phone secondary-info">{competitor.phone}</span>
                            <span className="competitor-email secondary-info">{competitor.email}</span>
                            <div className="competitor-actions">
                            <button className="edit-btn" onClick={() => this.openCompetitorForm(true, competitor, index)}>editar</button>
                            <button className="del-btn" onClick={() => this.removeCompetitor(index)}>excluir</button>
                            </div>
                        </li>
                        )
                    })}
                </ul>
                {this.state.openCompetitorForm && (
                    <aside>
                        {this.state.competitorFormElement}
                    </aside>
                )}
            </section>
        )
    }
};