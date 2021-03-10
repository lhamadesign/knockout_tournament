[10/03/2018 - 11:02]
DATA MODELLING:
First insight that comes to mind is WHAT data am I going to work on and HOW should I manipulate it.
I need a data structure that best represent my tournament, a format and a place to save it.

Initially, and in the simplest form, I am using an object to represent my tournament data.
I also choose to persist that data using browser's LOCALSTORAGE, and for that I choose JSON format which I consider easier to work with.

My tournament object model should look like this:
{
    "tournament_title": {
        "competitors": [],
        "date": "",
        "matches": [],
        "winner": {}
    }
}

By lookinig at that data model, I am able to abstract some concepts and create singular identities which defines each type of data I am going to work on.

The result of that abstraction gave me the following identities:
> Tournament
> Competitor
> Date
> Match

Based on this, since I have the previous definitions available, I am able to treat each piece of data according to its singular identity.
So, my data model should look like this:
{
    "tournament_title": Tournament{
        "competitors": Competitors[],
        "date": Date"",
        "matches": Match[],
        "winner": Competitor{}
    }
}
- where each Capitalized word means the data TYPE that will be used.