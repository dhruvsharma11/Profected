# Profected

Our project is an online networking platform designed to connect students with industry professionals, providing tailored mentorship experiences and valuable networking opportunities. Inspired by the need to bridge the gap between students' educational journey and real-world industry insights, our platform aims to facilitate meaningful connections and career development.


README updated March 15 2024

## Application Rundown

- The navigation bar at the top of the application redirects the user to different pages - Home - Matching - MainCalendar - Resources - VideoEmbedding - User profile
  Note: The team plans on changing the names of pages in the navigation bar

## Landing Page
- Entry point for a networking platform connecting students and industry professionals.
- Provides essential information, encourages action, and showcases professional profiles.
- Visit landing page to learn about platform and features.
- Explore professional profiles for networking and mentorship.
- Click on a profile to view details and book time. Includes bio and reasons to book time, and allows direct booking.

## Login
- The page serves as both a login and a sign-up page, with the ability to switch between the two modes using a sliding overlay.
- Users can log in using their email and password.
- Upon successful login, the user is redirected to the homepage.
- Error handling for login failures, displaying an error message in the console.
- Users can create a new account by providing their first name, last name, email, password, and confirming their password.
- Includes a dropdown to select the user type (student or professional).
- Passwords are checked for a match before the account is created.
- Upon successful account creation, the user data is stored in Firebase Firestore, and the user is redirected to the homepage.
- Error handling for sign-up failures, displaying an error message in the console.
- Uses Firebase Authentication for handling user authentication.
- Utilizes Firebase Firestore for storing user data upon account creation.
- The page features a modern design with a sliding overlay to switch between login and sign-up modes.
- Responsive design ensures that the page looks good on different screen sizes.

### Matching

- Conditional Rendering is setup based on whether the user is a Student or a Professional
- Student is capable of selecting their information to get matched with an industry professional
- Student can select their study of program
- Student can select their career interests
- Student can enter the list of dates that will work for them for meetings
- Student can enter a range of time that works for them to meet during the dates they have selected
- Professional is capable of selecting Company, JobTitle, University, Skills and dates
- Clicking the submit button will store the values into the MySQL Database under the "StudentTraits" and "ProfessionalTraits" tables
- The Matching Algorithm uses K-Nearest-Neighbours to find the professional that is closest in distance to the Student when they click the GetMatched button
- A User can only submit the form once and once they do, all the information is stored in the database and the informaiton about the professional they are matched with is displayed on the screen. 

### MainCalendar

- Calendar of current month and year currently renders on the page
- User can select "back" to go a month back, user can select "next" to go the next month
- User can view calendar in "Month", "Week", "Day" and "Agenda" form
- User can also enter a new event that will render on calendar (midst of saving data on SQL database)
- Data saved in the SQL database is rendered correctly onto the calenda

### Resources

- Displays a list of resources (e.g., conferences) in a scrollable area, each represented by a card. Each card shows the conference name, location, and date/time.
- Hard coded all the data for local tech conferences
- When user hovers over the conference details, the marker bounces to attract users attention to the map
- Rendered each one on a component card
- Includes a search input to filter resources by name and location.
- Users can toggle between viewing all resources and only saved resources.
- Users can save resources by clicking a bookmark icon on each resource card.
- Added Google Maps frame
- Added markers that correlate to each of the card

### VideoEmbedding

- The user can join a call, turn on their camera, unmute themselves and talk.
- In order to test multiple people on call, the user should open up a private/incognito window with the localhost and they can join in with another username.

[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13352842)

### User Profile
- Retrieves the user's profile information from the server using a fetch request with the user's ID token for authentication.
- The profile information includes both user and details data, which are stored in the userProfile state.
- Users can edit their profile details by clicking the "Edit Details" button, which switches the view to editable text fields.
- Users can save their changes by clicking the "Save" button, which sends a POST request to the server with the updated details.
- If the update is successful, the profile information is refreshed to reflect the changes.
- A "Cancel" button is provided to discard changes and exit editing mode.
- Conditional Rendering is used to find differences between "professional" and "student" user types, displaying relevant details for each.
- Uses Material-UI components and styling for a consistent and modern user interface
