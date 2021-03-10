[10/03/2018 - 11:02]
#DATA MODELLING:
First insight that comes to mind is **WHAT** data am I going to work on and **HOW** should I manipulate it.
I need a data structure that best represent my tournament, a format and a place to save it.

Initially, and in the simplest form, I am using an object to represent my tournament data.
I also choose to persist that data using browser's **localStorage**, and for that I choose **JSON** format which I consider easier to work with.

My tournament object model should look like this:
```javascript
{
    "tournament_title": {
        "competitors": [],
        "date": "",
        "matches": [],
        "winner": {}
    }
}
```

The result of that abstraction gave me the following identities:
* __Tournament__
* __Competitor__
* __Date__
* __Match__

Based on this, since I have the previous definitions available, I am able to treat each piece of data according to its singular identity.
So, my data model should look like this:
```javascript
{
    "tournament_title": Tournament{
        "competitors": Competitors[],
        "date": Date"",
        "matches": Match[],
        "winner": Competitor{}
}
```
