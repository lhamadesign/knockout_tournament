[10.03.2021 - 11:02]
# DATA MODELLING:
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

[10.03.2021 - 15:00]
# Models
After a reread over the app requirements. I could remove apparently unusual information and create some new clean data models.

```javascript
{
    "tournament_title": Tournament{
        "competitors": Competitors[]
    }
}
```

With that, I can probably display the information required without the need to recur to other models of information.

It was born 2 main classes inside TypeScript files to represent my main data models.

[10.03.2021 - 16:20]
# Getters/Setters and public methods
By requirement, the tournament should allow add, remove or edit every competitor.
So, I think those actions should be represented as methods in the data models.

[11.03.2021 - 13:40]
# Creating views
Since I have my data model defined, it is time to come up with the view that will display the information and, later, handle events to modify and save the updated data.

I choose to use ReactJS as the technology to build visualization.
At this point I'm not thinking of design yet, but I want to have a clean, semantic document to display my data.

[11.03.2021 = 21:00]
I'm trying to modularize my document structure into simple and consistent modules.
At this point I believe that having a greater **Tournament** module would be sufficient to hold my smaller ones.
Then comes the **Competitor** and last, the **CompetitorForm** which will be used to add/update competitors in the tournament.

[12.03.2021 - 13:00]
I need to focus on the main flow the application should follow. Basically, the user input is the most important here. Because if there is no competitors, then we can't have a tournament. Thinking that way, I need to code the CompetitorForm to be able to receive user input.
That form should follow some rules for inputs. which are defined in the document and are as follows:

* Field **nome** is mandatory
* Field **telefone** is mandatory and should have the mask: ***(xx) xxxxx-xxxx*** where 'x' is a digit [0-9]
* Field **e-mail** is mandatory and should have the mask: ***address@domain.com***

[13.03.2021 - 00:00]
I have now a CRUD application working. The basic business rules are being obeyed with the help of Jquery Mask Input, for the phone number mask. Along with client validation. My input fields are able to receive only valid inputs.

I am also persisting the data via localStorage and retrieving that same data when the page is loaded.

Time to check the rules for matching up the competitors and generate tournament keys.

[13.03.2021 - 21:58]
After some time thinking about data structures and how I could represent tournament keys the best form, I came to the conclusion that the matches looks very similar to a **Complete Binary Tree** where only the last level nodes have actual values.
From this point, I am trying to code a Binaty Tree structure and use it to display my tournament keys. That is why I created a new model called **BinaryTree** and the TournamentKeys component to display correctly my tree.

[14.03.2021 - 01:00]
After implementing a rough way to display the keys I am now done with functionality. Next step is to write some tests and possibly refactor code for better readability.
The last but not least part of the development is to prettify with CSS. I am thinking on some ideas...

[14.03.2021 - 17:00]
I picked up some of the basic functions that are present on my models and components in order to write tests over them.
I couldn't cover everything, sadly.