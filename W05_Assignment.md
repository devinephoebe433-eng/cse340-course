# CSE 340: Web Backend Development - W05 Assignment: Authentication and Authorization

## Overview

This assignment requires the addition of a new page to your site that displays all currently registered users. This page will be exclusively accessible to administrative users and will feature a link from the dashboard page, visible only to administrators.

## New Features

*   **User Listing Page:** Implement a page that lists all registered users, including their roles.
*   **Access Restriction:** Restrict access to this new page to admin users only.
*   **Dashboard Link:** Add a link to the users page on the dashboard, ensuring it is only visible to admin users.

## Instructions

Follow these steps to complete the assignment:

1.  **Create the Users Page:** Develop a new route, controller function, and view to display all registered users. The view should present each user's name, email (username), and assigned role.
2.  **Restrict Access:** Modify your authentication middleware to limit access to the users page to administrative users exclusively. Non-admin users attempting to access this page must be redirected to the dashboard with an appropriate informational message.
3.  **Add Link to Dashboard:** Update the dashboard view to include a link to the users page. This link must only be visible to users with administrative privileges.
4.  **Test Your Implementation:** Conduct thorough testing to verify the following:
    *   The users page displays correctly for admin users.
    *   Non-admin users are successfully redirected when attempting to access the users page.
    *   The link to the users page is visible only to admin users on the dashboard.

## Requirements

Your assignment must fulfill the following requirements, incorporating features from both learning and team activities:

*   **Users and Login Functionality:**
    *   The users page must display all registered users with their name, email, and role, with access restricted to admin users.
    *   Users must be able to register, log in, and log out.
    *   Password hashing must be implemented for security.
    *   Login/Logout links must display correctly based on the user's authentication state.
*   **Protected Access:** Pages requiring login or administrative permissions must be protected by `requireLogin` and `requireRole` middleware functions.
*   **Link Visibility:** Links to restricted access pages must only be visible to users possessing the appropriate roles.
*   **Code Organization and Standards:** Files and functions must adhere to the naming conventions and patterns established in the learning activities. All specified code standards must be followed.
*   **Deployment and Professional Style:** The application must be deployed and exhibit a professional appearance.

## Testing Account

Ensure that a dedicated administrative testing account has been created with the username `admin@example.com` and the password `cse340!`. This account is essential for the grader to test your application. Failure to provide this account will result in the assignment being marked as incomplete.

## Score

Your assignment will be evaluated according to the following criteria:

*   **Mastery (100%):** All requirements are met at the Mastery level.
*   **Sufficient (85%):** All requirements are met at the Sufficient or Mastery level.
*   **Incomplete (0%):** One or more requirements are not met at the Sufficient level.

If your assignment is graded as Incomplete, you are required to rectify any issues and resubmit.

## Submission

Upon completion of this assignment:

1.  Return to Canvas to submit your assignment.
2.  You will submit both your GitHub repository URL and the URL of your hosted site (at Render).

## Other Links

*   [Return to: Week Overview](https://example.com/week-overview) (Placeholder)
*   [Course Home](https://example.com/course-home) (Placeholder)
