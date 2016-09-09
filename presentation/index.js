// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  Code,
  CodePane,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  primary: "#4a90e2"
}, {
  primary: "Helvetica",
  tertiary: 'Fira Code'
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["slide"]} transitionDuration={500}>
          <Slide>
            <Heading><Code>undefined is not an option</Code></Heading>
            <Text italic textSize={20}>— or —</Text>
            <Text textSize={30}>How I Am Learning to Stop Making the Same Dumb Mistakes and Love Immutability and Pure Functions</Text>
          </Slide>
          <Slide>
            <Text>Browsers constantly remind us what <Undefined /> is NOT.</Text>
          </Slide>
          <Slide transition={['fade']} bgImage='http://i.stack.imgur.com/PpQe2.gif'>
          </Slide>
          <Slide transition={['fade']} bgImage='http://i.stack.imgur.com/PpQe2.gif' bgDarken={0.2}>
            <Appear>
              <Text><Markdown>Can we say what `undefined` _is?_</Markdown></Text>
            </Appear>
          </Slide>
          <Slide>
            <Text><Undefined /> is...</Text>
            <List>
              <ClickListItem>A hard-to-find bug</ClickListItem>
              <ClickListItem>A late night hotfix</ClickListItem>
              <ClickListItem>An angry customer</ClickListItem>
            </List>
          </Slide>
          <Slide>
            <Text>Where does <Undefined /> come from?</Text>
            <Appear>
              <Text>Some dumb mistakes I make:</Text>
            </Appear>
            <List>
              <ClickListItem>Trying to access data that isn't there</ClickListItem>
              <ClickListItem>Trying to call a function that I think is there but isn't</ClickListItem>
              <ClickListItem>Modifying data without realizing it</ClickListItem>
              <ClickListItem>Relying on globals that aren't there</ClickListItem>
              <ClickListItem>Failing to account for every possible state</ClickListItem>
              <ClickListItem>Avoiding writing tests because it's a lot of work for the seeming payoff</ClickListItem>
            </List>
          </Slide>
          <Slide>
            <Text>An example</Text>
            <CodePane lang='js' source={require('raw!./examples/01-react-component.example')} />
          </Slide>
          <Slide>
            <Text>Problems</Text>
            <List>
              <ListItem><Markdown>`componentDidMount` is called _after_ initial render, so the program will have already tried to map 'undefined' and will fail</Markdown></ListItem>
              <ListItem>Network timeout</ListItem>
              <ListItem>Auth error</ListItem>
              <ListItem>FOIT</ListItem>
            </List>
          </Slide>
          <Slide>
            <Text>Testing our code</Text>
            <CodePane lang='js' source={require('raw!./examples/01-react-component.test.example')} />
          </Slide>
          <Slide>
            <Text>Shortcomings of our test</Text>
            <List>
              <ClickListItem>`componentDidMount` is not _really_ covered. Functionality is assumed by setting state directly.</ClickListItem>
              <ClickListItem>`vFetch` is not covered at all, but it is coupled to `componentDidMount` which in turn is coupled to `ListOfThings`. To test one method, the whole class is needed.</ClickListItem>
              <ClickListItem>How do we test `vFetch`? Hit a real API server? Hit a mock server? Mock out `vFetch` itself and force it to return the data we want?</ClickListItem>
            </List>
          </Slide>
          <Slide>
            <Text>A different approach</Text>
            <CodePane lang='js' source={require('raw!./examples/02-react-component.example')} />
          </Slide>
          <Slide>
            <Text>The action creator</Text>
            <CodePane lang='js' source={require('raw!./examples/02-action.example')} />
          </Slide>
          <Slide>
            <Text>The reducer</Text>
            <CodePane lang='js' source={require('raw!./examples/02-reducer.example')} />
          </Slide>
          <Slide>
            <Text>Observations</Text>
            <List>
              <ClickListItem>We have an initial state (`state === []`) so we won't have any errors from mapping `undefined`, even when no data has been fetched yet. An empty array is mappable.</ClickListItem>
              <ClickListItem>We're mutating the `state` param in-place, which means that it can now be changed in multiple ways. Yay, multiple sources of truth!</ClickListItem>
            </List>
          </Slide>
          <Slide>
            <Text>But Ben, ain't nobody write code like that. We all know that you're just supposed to return a new state object, not modify it in-place!</Text>
          </Slide>
          <Slide>
            <Text>This is how we'd actually write that reducer</Text>
            <CodePane lang="js" source={require('raw!./examples/03-reducer.example')} />
          </Slide>
          <Slide>
            <Text>But the crazy thing is I've written code like that elsewhere</Text>
            <CodePane lang="js" source={require('raw!./examples/03-bad-code.example')} />
          </Slide>
          <Slide>
            <Text>It's actually easier to just not mutate our data.</Text>
            <CodePane lang="js" source={require('raw!./examples/03-good-code.example')} />
          </Slide>
          <Slide>
            <Text>Since we've separated our concerns out, testing this is crazy easy now.</Text>
            <List>
              <ClickListItem>Component: if I give you _this_ array of things, do you produce _that_ DOM tree?</ClickListItem>
              <ClickListItem>Reducer: if I pass you _this_ action object, do you return _that_ state tree?</ClickListItem>
              <ClickListItem>Action creator: if I call you, do you fetch data and then dispatch _this_ action?</ClickListItem>
              <ClickListItem>^^ rats, this one still is a little complicated</ClickListItem>
            </List>
          </Slide>
          <Slide>
            <Text>Reducer test</Text>
            <CodePane lang="js" source={require('raw!./examples/03-reducer.test.example')} />
          </Slide>
          <Slide>
            <Text>Component test</Text>
            <CodePane lang="js" source={require('raw!./examples/03-react-component.test.example')} />
          </Slide>
          <Slide>
            <Markdown>Easy-to-test code is also _better_ code.</Markdown>
            <List>
              <ClickListItem>Testing _computation_ is easy; testing _mutation_ is harder.</ClickListItem>
              <ClickListItem>Separate out your computations from your mutations.</ClickListItem>
              <ClickListItem>Immutable data means fewer guards, and accidental mutation is impossible.</ClickListItem>
              <ClickListItem>Immutability opens up performance optimizations that are impossible with mutability.</ClickListItem>
            </List>
          </Slide>
          <Slide>
            <Markdown>You barely have to be awake to test pure functions.</Markdown>
            <List>
              <ClickListItem>Imagine if `2 + 2` tried to mutate `2` in place?</ClickListItem>
              <ClickListItem>Imagine if the implemenation of `2 + 2` was `(a, b) => Google(a + '+' + b)[0]`.</ClickListItem>
              <ClickListItem>With pure functions, the data you have at your disposal are params. That's it. The only way to assign your computations to a variable is through `return`.</ClickListItem>
            </List>
          </Slide>
          <Slide>
            <Markdown>Functional purity allows us to do neat things like currying, partial application, and composition.</Markdown>
          </Slide>
          <Slide>
            <Text>Sanitize and sort an array of people procedurally:</Text>
            <CodePane lang="js" source={require('raw!./examples/04-sort-people.example')} />
          </Slide>
          <Slide>
            <Text>Sanitize and sort an array of people OOP-ly:</Text>
            <CodePane lang="js" source={require('raw!./examples/04-sort-people-oop.example')} />
          </Slide>
          <Slide>
            <Text>Sanitize and sort an array of people functionally:</Text>
            <CodePane lang="js" source={require('raw!./examples/04-sort-people-fp.example')} />
          </Slide>
          <Slide>
            <Text>Suggestions</Text>
            <List>
              <ClickListItem>Read Dr. Boolean's [Mostly Adequate Guide to Functional Programming in Javascript](https://drboolean.gitbooks.io/mostly-adequate-guide)</ClickListItem>
              <ClickListItem>Subscribe to the [Deterministic Newsletter](https://deterministic.curated.co/).</ClickListItem>
              <ClickListItem>Work through the Knowthen [Elm for Beginners](http://courses.knowthen.com/courses/elm-for-beginners) course</ClickListItem>
              <ClickListItem>Read through [Elm in Action](https://www.manning.com/books/elm-in-action) with us.</ClickListItem>
            </List>
          </Slide>
          <Slide>
            <Text>Questions?</Text>
          </Slide>
        </Deck>
      </Spectacle>
    )
  }
}

const Undefined = () => <Code>Undefined</Code>

const ClickListItem = ({ children }) => <Appear>
  <ListItem><Markdown>{children}</Markdown></ListItem>
</Appear>
