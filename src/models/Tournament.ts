import { Competitor } from './Competitor';

export class Tournament {
        _competitors: Competitor[];

        constructor() 
        /*  It turns that is never be possible to create a new tournament 
            with already existing competitors. */
        {
            this._competitors = [];
            const competitorsStorage = localStorage.getItem('@knockout_tournament/competitors');
            if (competitorsStorage) {
                let parsedCompetitors = JSON.parse(competitorsStorage);
                for (let parsedCompetitor of parsedCompetitors) {
                    console.log(parsedCompetitor);
                    this._competitors.push(
                        new Competitor(
                            parsedCompetitor._fullName,
                            parsedCompetitor._phone,
                            parsedCompetitor._email
                        )
                    );
                }
            }
        };
        
        get competitors() {
            return this._competitors;
        }

        set competitors(competitors) {
            this._competitors = competitors;
            this.persistData(competitors);
        }

        private persistData = (competitors: Competitor[]) => {
            if (localStorage) {
                localStorage.setItem('@knockout_tournament/competitors', JSON.stringify(competitors));
            }
        }

        public addCompetitor = (competitor: Competitor) => {
            this._competitors.push(competitor);
            this.persistData(this._competitors);
        }

        public updateCompetitor = (index: number, competitor: Competitor) => {
            if (this._competitors[index]) {
                this._competitors[index] = competitor;
                this.persistData(this._competitors);
            }
        }

        public removeCompetitor = (index: number) => {
            if (this._competitors[index]) {
                this._competitors.splice(index, 1);
                this.persistData(this._competitors);
            }
        }

        
};