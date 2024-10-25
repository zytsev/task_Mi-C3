Your task is to create a one-page application that shows a list of peoples and the details about their vehicles. The data to display are available using the following APIs:

GEThttps://swapi.dev/api/people

GET http://swapi.co/api/vehicles/{vehicleId}/

● the candidate has to implement a view that contains a list of users
○ for each user we need to display the following information:
■ name
■ height
■ mass
■ gender
■ edited
■ Show vehicles (button)
○ the user must be able to filter the users by name and the filtering must happen server side (use the search parameter, e.g. https://swapi.co/api/people/?search=lu)
● when the user clicks the “Show vehicles” button a popup is displayed:
○ the popup must contains a list vehicles
○ for each vehicle we need to display the following information:
■ name
■ model
■ manufacturer
■ vehicle_class

● Javascript ES6 (no CoffeeScript, no TypeScript, …)
● React.js
● Redux
● build tool of your choice
● the usage of any NPM module is allowed (UI Component Library, utilities, ...)
● the usage of CSS framework, CSS/HTML preprocessors is allowed
● the candidate has to publish his work on GitHub

Optional
● usage of a linter tool and/or a type checker
● usage of Styled Components (or similar framework)
● usage of a responsive design
● implementation of tests
● Usage of Material UI library for implementation https://mui.com/
