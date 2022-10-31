##########################################################################################

## IMPORTANT

This app using access token and refresh token to authenticate user.
access token is stored in cookies.
refresh token is stored in database and will be set in headers.
access token has a short lifetime, refresh token has a long lifetime.
15 min for access token.
15 min for cookies.
everytime user login, a new access token and refresh token will be generated.
everytime user logout, the refresh token in database will be deleted.
everytime user refreshed the token, a new access token and cookie will be re-generated.

##########################################################################################

<!-- END -->

##########################################################################################

## LOGIN

## FLOW

User login => access token and refresh token will be generated => set access token to cookie => set refresh token to headers and save to database => user logged in, and have cookie for 15 min, and have access token for 15 min => end.

## ISSUES

if cookies and access token expired, user will be logged out and need to login again.

## SOLUTION

create method refreshCookie, this method is called every 13 minutes from client side.
this method will send a request to server to refresh the access token and cookie.

##########################################################################################

<!-- END -->

##########################################################################################

## REFRESH COOKIE

## FLOW

User login => 2 minutes or more before cookies expired, client side will call refreshCookie method => server will get refresh token from headers, (call it userRefreshToken) => check userRefreshToken in database => if userRefreshToken is not in database, user will be logged out and need to login again => if userRefreshToken is in database, server will generate new access token for 15min and cookie => set new access token to cookie for 15min => user keep logged in, and have cookie for 15 min again, and have access token for 15 min => end.

##########################################################################################

<!-- END -->

##########################################################################################

## LOGOUT

## FLOW

User login => user logout => delete refresh token in database => delete cookies and headers => user logged out => end.

##########################################################################################

<!-- END -->

##########################################################################################

## MIDDLEWARE

verifyAccessToken => verify access token from cookie => if access token is valid, user can access the route => if access token is invalid, user will be logged out and need to login again.

verifyRefreshToken => verify refresh token from headers => if refresh token is valid, user can access the route => if refresh token is invalid, user will be logged out and need to login again.

requireAuth => if user is logged in, user can access the route => if user is not logged in, user will be logged out and need to login again.

requireAdmin => if user is logged in and user is admin, user can access the route => if user is not logged in or user is not admin, user will be logged out and need to login again.

## FLOW NORMAL ROUTE

USER => verifyAccessToken => requireAuth || requireAdmin => ROUTE

## FLOW REFRESH COOKIE ROUTE

USER IS LOGGED IN => verifyRefreshToken => REFRESH COOKIE

## FLOW LOGOUT ROUTE

USER IS LOGGED IN => verifyRefreshToken => LOGOUT

NOTE:
middleware verifyAccessToken is set paramaters to headers too. The parameter is userId and isAdmin.

##########################################################################################
