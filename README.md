# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Notes

This is a basic web app to consume data from the webpt interview endpoint. The endpoint randomly returns a 500 with an error message, an empty array, or a normal game data response including

```
damage
method
region
source_character
source_player_id
target_character
target_player_id
```

I started by just trying to hit the endpoint so that I could see the data that was being returned. I determined a way to display this on the page in the most basic way possible. 

I started by installing axios, and used a `useState` with the `gameData` and `setGameData`. I console logged the output to see the structure of the data. I saw that two types of responses were being returned, but I focused on the happy path first, which was some type of 200 response and some normal looking game data. Down in the return statement, I map over the gameData and use some basic JSX to render this out to the page. 

Subsequently, I dealt with the other case. Intermittently, the API would return a 500 with a separate error message. I used another `useState` to handle `error` and `setError`

I conditionally rendered in the return statement so that if there was a 500 returning from the API, a different output would be rendered, namely that there was an error and its specific message. 

There seemed to be a third scenario. Sometimes, neither the game data nor the error message would render. Upon some tedious logging to the console, sometimes the payload returned an empty array. 

I accounted for this third condition by checking that if the data that was returned was empty, I set an appropriate error message that will display to the page. 

Instead of hitting refresh everytime I wanted to see a new result from the feed, I added a button whose text is controlled by `fetching` and `setFetching`. When the `try` part of the `try catch` block is being run, or when the get request is being sent, `fetching` is set to true. When the block is complete, `fetching` is false. When this button is clicked, the `fetchData` function is run. 

The `fetchData` function is also run inside a `useEffect` with an empty dependency array, which runs the function once when the page loads. 

Adding data into the dependency array triggers the effect whenever data changes, meaning the effect will be triggered initially when the component mounts, and then again every time the data state is updated using the setKillData function. The useEffect itself modifies the data state, resulting in an infinite loop of re-renders if it is added to the dependency array. 



#### Issues Encountered

1. There seemed to be a third scenario that I didn't catch at first. Sometimes, neither the game data nor the error message would render. Upon some tedious logging to the console, sometimes the payload returned an empty array. I added an if statement that would check if the data was an empty array and show a message to the user accordingly. 

2. The app seemed to be rendering twice. After some searching, I saw that I had to disable strict mode in the index file. Here is some more information about strict mode: https://react.dev/reference/react/StrictMode

```
Strict Mode enables the following development-only behaviors:

Your components will re-render an extra time to find bugs caused by impure rendering.

Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.

```

That information is from react.dev



#### Future Improvements

1. Add some more comprehensive styling

2. Error handling: this code checks for an error response from the API and sets the error state "manually" which may be fine for a couple of response types. 

However, it would be beneficial to handle different types of errors more explicitly. For example, if there were more responses, the specific error codes or error messages could be checked, allowing the user to see what's going on more clearly. 

3. Caching and data updates: this code fetches the data on component mount and refreshes it on button click. If the data doesn't change frequently, caching could be implemented to avoid unnecessary API requests. Additionally, you can consider implementing data updates using techniques like long-polling or WebSocket connections to keep the feed updated in real-time.

4. Tighter typing of the error object in the try catch block. I'd try to use the `AxiosError` type but didn't have time to investigate that further. 

5. I'd also begin to separate concerns into separate files or components as the application gets bigger, and refactor if-statements to ternaries, only if it helps with readability. Sometimes, it does not.



