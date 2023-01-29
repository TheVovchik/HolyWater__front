# SPA "YOUR PERSONAL CALENDAR"

[DEMO-LINK](https://thevovchik.github.io/HolyWater__front)

> To start project
- `Fork` the repository
- `Clone` the forked repo
- Run `npm install` to install the dependencies
- Run `npm start` to run a development server at http://localhost:3000 (If you need to stop the server press `ctrl + c` in the terminal window)

> To develop changes in project
- `Fork` the repository
- `Clone` the forked repo
- Run `npm install` to install the dependencies
- Create a branch for you solution (e.g. `git checkout -b develop`)
- Run `npm start` to run a development server at http://localhost:3000 (If you need to stop the server press `ctrl + c` in the terminal window)
- Write the code inside the `src/` folder
- `add`, `commit` and `push` all the recent changes
- Put your `Github username` to `homepage` (`https://<username>.github.io/HolyWater__front`) in `package.json`
- Run `npm run deploy` to publish your solution to `Github pages`
- Create a `Pull Request` (`PR`) from `the-forked-repo/develop` to `the-original-repo/master`

# API DATA

[API DOCS](https://holy-water.onrender.com/swagger)

DataBase: ```MySQL (PlanetScale.com)```

Server: ```render.com``` (need ~1 minutes to wake up if have no action on last 30 minutes)

# APP FUNCTIONALITY

> Auth form
- Email - custom validation (!required)
- Password - at list 4 symbols (!required)
- Login - button used to sent validation request and check user input (if user email exist, if password is correct)
- Register - button used to register new user (return an error if user with such email already exist)

> Calendar
- Blue round plus button.
  * to close/open new event popup with form
- Data filter with arrows.
  * to navigate through years with step of 1 month.
- Date button.
  * to open/close date select popup.
- Log out button
  * to leave current calendar session.
- calendar grid of selected month (by default current). 

> Form
- card name ```Add new idea item``` if opened with create button and ```Edit idea item``` if open by click on event to update it.
- close button ```x```.
- created at (if wasn't update before) / updated at for updated modal.
- title input field (!required).
- description (optional).
- date / time selection section:
  * date field (!required).
  * begin time optional.
- delete buttom (when existed event was opened) and confirm/submit button become active when required fields are filed.

> Date popup
- month drop down selector.
- year drop down selector (+/- 10 years range from current).
- confirm button appears if both are selected.

> Calendar Cell
- day number in top left corner.
- day name in top right corner.
- events list sorted by start time. No start time are always on top. List is scrollable.

# MIGRATION
- DataStorage class corresponds for the structure of methods that can be used with storage.
- APIStorage extends and implement DataStorage methods using RESTapi as place to store data.
- LSStorage extends and implement DataStorage methods using LocalStorage as place to store data;
- Storage methods and places can be simply extended.
- Start the project on your PC, change in ./src/Storage/Storage.ts in line 15 StorageType.RESTApi on StorageType.localStorage;
