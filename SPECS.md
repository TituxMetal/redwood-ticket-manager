# Specs

1. Home Page for Unauthenticated Users (/)
  - Purpose: Landing page for users who are not logged in.
  - Features:
    - Welcome message introducing the app and its benefits.
    - Prominent call-to-action buttons:
      - "Log In" → Navigates to the Login Page.
      - "Sign Up" → Navigates to the Sign Up Page.
    - Key highlights of the app's features (e.g., "Track tickets," "Assign tasks," "Collaborate with your team").
    - Clean, minimal design focused on user conversion.
    - Example Content:
       "Welcome to Ticket Manager!
       The simplest way to manage, track, and assign tickets.
       Sign up now to get started!"

2. Dashboard for Authenticated Regular Users (/dashboard)
  - Purpose: Home page for regular users after they log in.
  - Features:
    - Quick summary of tickets created by the user or assigned to the user:
      - Total tickets.
      - Tickets grouped by status (OPEN, IN_PROGRESS, CLOSED).
      - Tickets grouped by priority (LOW, MEDIUM, HIGH).
    - Action buttons:
      - "View My Tickets" → Navigates to the Tickets List Page.
      - "Create New Ticket" → Navigates to the New Ticket Page.
    - Simple, filtered view:
      - Highlight tickets requiring attention (e.g., OPEN or HIGH-priority tickets).
    - Navigation links to other pages:
      - "Profile"
      - "Log Out"

3. Tickets List Page (/tickets)
  - Purpose: Provide a list of all tickets the user can access.
  - Features:
    - Display tickets in a paginated list/table.
    - Show key ticket information:
      - Title
      - Status (e.g., "OPEN", "CLOSED")
      - Priority (e.g., "HIGH", "LOW")
      - Created Date
      - Assigned User (if applicable)
    - Filters:
      - Filter tickets by status (OPEN, IN_PROGRESS, CLOSED).
      - Filter tickets by priority.
      - If the user is an Admin, display all tickets.
      - If the user is a regular User, display:
        - Tickets created by the user.
        - Tickets assigned to the user.
    - Provide a "View" button for each ticket to navigate to the Ticket Detail Page.

4. New Ticket Page (/tickets/new)
  - Purpose: Allow users to create a new ticket.
  - Features:
    - Include a form with fields:
      - Title (required)
      - Description (required, multi-line)
      - Priority (dropdown: LOW, MEDIUM, HIGH)
    - Submit button to save the ticket.
    - Upon successful creation, navigate to the Ticket Detail Page for the new ticket.

5. Ticket Detail Page (/tickets/{id})
  - Purpose: Display detailed information about a specific ticket.
  - Features:
    - Show ticket details:
      - Title
      - Description
      - Status
      - Priority
      - Assigned User (if applicable)
      - Created Date / Last Updated
    - Comments Section:
      - List all comments associated with the ticket.
      - Input box for adding new comments.
    - Actions for the ticket:
      - If the user is the creator or Admin:
        - "Edit" button to navigate to the Edit Ticket Page.
        - "Delete" button to delete the ticket.
      - If the user is an Admin:
        - Assign the ticket to another user (dropdown).
        - Change the ticket status (e.g., set to "IN_PROGRESS" or "CLOSED").

6. Edit Ticket Page (/tickets/{id}/edit)
  - Purpose: Allow users to edit an existing ticket.
  - Features:
    - Pre-fill the form with the ticket's current details:
      - Title
      - Description
      - Priority
    - If the user is an Admin, include options to:
      - Assign the ticket to a user (dropdown).
      - Update the ticket status.
    - Submit button to save changes.
    - Upon successful update, redirect back to the Ticket Detail Page.

7. Admin Dashboard Page (/admin/dashboard)
  - Purpose: Dedicated dashboard for Admin users.
  - Features:
    - Global metrics for the entire system:
      - Total tickets in the database.
      - Tickets grouped by status and priority.
    - List of:
      - Unassigned tickets → Admins can assign these to users.
      - Tickets that need immediate attention (e.g., high-priority OPEN tickets).
    - Admin actions:
      - Bulk status updates (optional for MVP).
      - Quick navigation to all tickets and user management.
      - Clear separation of Admin-only tools.

8. Login Page (/login)
  - Purpose: Allow users to log in to access the application.
  - Features:
    - Email and password input fields.
    - Submit button for authentication.
    - Link to the Sign Up Page for new users.

9. Sign Up Page (/signup)
  - Purpose: Allow new users to create an account.
  - Features:
    - Email and password input fields.
    - Confirm password field.
    - Submit button to register the user.
    - Redirect to the Login Page upon successful sign-up.

10. User Profile Page (/profile)
  - Purpose: Allow users to view and manage their profile.
  - Features:
    - Display user details:
      - Email
      - Role (USER/ADMIN)
    - Option to update:
      - Password (with confirm password field).
    - Display a list of tickets created by or assigned to the user.

## Summary of Pages

| Page Name            | Path               | Access             | Purpose                               |
|----------------------|--------------------|--------------------|---------------------------------------|
| Home Page            | /                  | Unauthenticated    | Welcome message + Login/Sign Up CTA.  |
| User Dashboard       | /dashboard         | Authenticated User | Personalized summary of user tickets. |
| Admin Dashboard      | /admin/dashboard   | Admin              | Global metrics + Admin tools.         |
| Tickets List         | /tickets           | Authenticated      | Paginated list of tickets.            |
| New Ticket           | /tickets/new       | Authenticated      | Form to create a new ticket.          |
| Ticket Detail        | /tickets/{id}      | Authenticated      | View details + comments for a ticket. |
| Edit Ticket          | /tickets/{id}/edit | Authenticated      | Edit an existing ticket.              |
| Login Page           | /login             | Unauthenticated    | Log in to the app.                    |
| Sign Up Page         | /signup            | Unauthenticated    | Register for an account.              |
| User Profile         | /profile           | Authenticated      | Manage user account details.          |
