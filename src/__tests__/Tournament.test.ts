import { Tournament } from '../models/Tournament';
import { Competitor } from '../models/Competitor';

describe("competitors actions", () => {
    let competitor: Competitor;
    let tournament: Tournament;

    beforeEach(() => {
        tournament = new Tournament();    
        tournament.competitors = [];
    });

    test("add a new competitor to the tournament", () => {
        competitor = new Competitor("Alice Collins", "(11) 12345-6789", "alice@knock.out");
        tournament.addCompetitor(competitor);
        expect(tournament.competitors.length).toEqual(1);
    });

    test("removing a competitor of the tournament", () => {
        competitor = new Competitor("Alice Collins", "(11) 12345-6789", "alice@knock.out");
        tournament.addCompetitor(competitor);
        tournament.removeCompetitor(0);
        console.log(tournament);
        expect(tournament.competitors[0]).toBeUndefined();
    });

    test("editing a competitor in the tournament should replace older information", () => {
        competitor = new Competitor("Alice Collins", "(11) 12345-6789", "alice@knock.out");
        tournament.addCompetitor(competitor);
        let updatedCompetitor = new Competitor("Alice Collins", "(15) 65748-3921", "alice@knock.out");
        tournament.updateCompetitor(0, updatedCompetitor);
        expect(tournament.competitors[0].phone).toMatch("(15) 65748-3921");
    });

    test("editing a competitor that is NOT in the tournament shouldn't replace older information", () => {
        competitor = new Competitor("Alice Collins", "(11) 12345-6789", "alice@knock.out");
        tournament.addCompetitor(competitor);
        let updatedCompetitor = new Competitor("Alice Collins", "(15) 65748-3921", "alice@knock.out");
        tournament.updateCompetitor(1, updatedCompetitor);
        expect(tournament.competitors[0].phone).toMatch("(11) 12345-6789");
    });

    test("removing a competitor from the tournament should update the position of the others", () => {
        competitor = new Competitor("Alice Collins", "(11) 12345-6789", "alice@knock.out");
        tournament.addCompetitor(competitor);
        
        competitor = new Competitor("Wanessa Wolf", "(77) 97777-7777", "wanessa@fb.gg");
        tournament.addCompetitor(competitor);

        competitor = new Competitor("Samira Close", "(22) 92222-2222", "samira@fb.gg");
        tournament.addCompetitor(competitor);

        tournament.removeCompetitor(1);

        expect(tournament.competitors[1].fullName).toMatch("Samira Close");
    });
});