# NewMotion Programming Assignment for frontend

## Introduction

This programming assignment is about setting up a very basic customer-facing application on a frontend platform.
Consider this as a proof of concept application, but make sure you work as 'nice' as possible.
In your assignment evaluation, we will also look at alignment, composition and visual design.
Although you will be working with designers, we would like to see you basic knowledge of applying the correct visual layout, styling and consistency.
Try to think about how a user will interact with the tool you are building and come up with a solution you think works best.

Please, do not share this file with anyone or publish it anywhere.

## Story 1: As a customer, I want to be able to login

As a customer upon opening the app I want to be presented with a nice login page where I can use my credentials to log in.
Once I'm logged in I want to see my name somewhere to indicate that I'm successfully logged in with my account.

### Technical details

At NewMotion we've setup an Oauth2Mock server to handle authentication. For this user story you're supposed to use the _resource owner credentials grant_, which means that the app will ask the customer for its username (in our case, email address) and password and will exchange that for an _access token_.

Our OAuth-server (test setup) lives on `https://api.test.thenewmotion.com/oauth2/access_token`. An example request for an access token looks like this:

```
curl -X POST "https://api.test.thenewmotion.com/oauth2/access_token" -i \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic dGVzdF9jbGllbnRfaWQ6dGVzdF9jbGllbnRfc2VjcmV0" \
  --data "grant_type=password&username={user}&password={password}"
```

You can use the username **programming-assignment@newmotion.com** with password **sJAzpnqXPqo4!**.

Which will, if successful, respond with:

```
{
    "token_type": "Bearer",
    "access_token": "ZThkYsdQ...",
    "expires_in": 3600,
    "refresh_token": "ZGM3OweW..."
}
```

When you've obtained an access token, you can use it to get basic information about the customer:

```
curl -X GET "https://api.test.thenewmotion.com/v1/me" -i \
  -H "Authorization: Bearer {accessToken}"
```

## Story 2: As a logged in customer, I want to see a map with charge points

As a customer using the NewMotion mobile app to see charge points in the map, I want the same functionality in this app too.
Once I'm logged in I want this to be my default page.
I want to be able to zoom and move around the map.

For this assignment, we're not interested in clustering, different icons or actually clicking on an icon to open charge point information, we only want to show charge points on a map based on the provided sample data.

### Technical details

Attached is `sample-json-chargepoints.json` which contains information about some random charge points in JSON format, use this as a _database_ to mirror the output of our actual _charge point API_.
Use the coordinates to show a pin for each charge point on the location.

#### Bonus points

Although we know there's an NPM package for pretty much everything, we'd like you to show us more of your skills :)

Bonus points also if you use React and don't use `create-react-app`.

In case you encounter an error or have a question about the requirements, you can send an email to programming-assignment@newmotion.com.

Please submit your finished assignment to programming-assignment@thenewmotion.com (including the source files).

Good luck!
