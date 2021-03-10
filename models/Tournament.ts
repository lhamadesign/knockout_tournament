import 'Competitor';

class Tournament {
        title: String;
        competitors: Competitor[];

        constructor(title: String) 
        /*  It turns that is never be possible to create a new tournament 
            with already existing competitors. */
        {
            this.title = title;
            this.competitors = [];
        }     
};