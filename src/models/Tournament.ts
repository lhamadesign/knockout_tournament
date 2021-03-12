import { Competitor } from './Competitor';

class Tournament {
        _title: String;
        _competitors: Competitor[];

        constructor(title: String) 
        /*  It turns that is never be possible to create a new tournament 
            with already existing competitors. */
        {
            this._title = title;
            this._competitors = [];
        }; 
        
        get title() {
            return this._title;
        };

        set title(title) {
            this._title = title;
        };

        get competitors() {
            return this._competitors;
        }

        set competitors(competitors) {
            this._competitors = competitors;
        } 

        public addCompetitor(competitor: Competitor) {
            this._competitors.push(competitor);
        }

        public removeCompetitor(index: number) {
            if (this._competitors[index]) {
                return this._competitors.splice(index, 1);
            }
        }

        public updateCompetitor(index: number, competitor: Competitor) {
            if (this._competitors[index]) {
                this._competitors[index] = competitor;
                return true;
            }
            return false;
        }
};