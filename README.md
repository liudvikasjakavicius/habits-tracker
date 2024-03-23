# habit-tracking
Habit Tracking App

# Main View Requirements:
1. The main view must have two sections: navigation between days and a habit list.
2. Navigation between days: Users should be able to navigate between days to view the
habits they completed on any specific day. Consider using a navigation method that is
more intuitive than a date picker, especially for the past 7 days.
3. Users should be able to mark or unmark their habit completion on any previous day,
but not on future days. You may choose to either disable navigation to future days or
display a message indicating that users cannot mark habits for future days.
4. Habit List: This section should display the daily habits that a user is tracking.
5. Habit List Items: Users should be able to mark or unmark a habit as completed for the
day. You can use a checkbox, toggle button, or any other method to indicate that the
habit was completed.
6. As users navigate between days, their URL should change to a unique URL pointing
to that specific day. Users should be able to navigate to the same date by visiting the
same URL in the browser. For example, /day/2023-07-29 should display the same view that
the user would see if they navigated to that day using the navigation buttons/calendar.

## Adding New Habits Requirements:
1 Users should be able to add new habits by entering the habit's name. This can be
accomplished on a separate page linked from the main view, through a popup modal
activated with a button, or directly in the habit list.

## User Experience Requirements:
1. The application should be responsive and compatible with mobile, tablet, and desktop
resolutions, with a primary focus on mobile view.
2. The application should handle and display errors in a user-friendly manner.
3. The application should be intuitive and easy to use. Bonus points for beautiful design
and animations.
4 Feel free to deviate from the provided requirements if it enhances the user
experience. Though you might need to justify your decisions during the review.

## Selected Feature:
In this app, you need to implement the following feature:
1. Data modeling (Habit Categories): Users should be able to categorize their habits into
categories such as "Health", "Work", "Hobbies", etc. Users should be able to select a
category when adding a new habit, and these categories should be used to visually
group habits in the habit list. Users should be able to add new categories and edit
existing categories. The precise implementation of this feature is up to you.

## Technical Requirements:
1. Use Vite as a build tool.
2. Use Vue 3 with the Composition API.
3. Use Vue Router for client-side routing. Navigation should not cause a page to reload.
4. Use localStorage to store user's habit records so they persist when the user refreshes
the page.
5. Design your app using a component-based architecture.
6. You may choose to use a UI framework or additional JavaScript packages to assist
with the project. These packages should be managed using npm and imported into your
project instead of linking them directly in your HTML file.
7. Consider aspects like page layout, colors, typography, use of icons, illustrations,
photos, etc. You can find some inspiration on Dribbble.
8. Use ESLint, Prettier, and Stylelint for code quality enforcement. Your code should not
have any errors or warnings according to your rule configuration.
9. Try to use code colocation by organizing related code into components or modules
when it reasonably makes sense.
10. The application will be viewed in the production mode (npm run build and npm run preview).
Ensure that your application works in the production mode.