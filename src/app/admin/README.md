# Admin Panel

This module is organized as separate views they can share the common html template `admin-form.html` and extend the admin-form.ts

There are several views that are custom like the users view or the services view and they implement their own logic and have their own template.

The admin-routing.module.ts describe the views and subviews and a route data holds various configuration like title, icon.
