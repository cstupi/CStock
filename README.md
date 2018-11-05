# CStock
Stock market game
Uses Xignite data to power the trades and display stock information.

Currently has poor auth. Does not differentiate admin users (and services) from regular users.
This app should either add proper claims or work behind a server

Currently validation is in multiple places which is a mess. Should move them all up to the routes

Server in front of this service should use a cache to stored composed objects for fast retrieval and fewer front end requests