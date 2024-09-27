# THESE ARE SOME ERRORS YOU WILL MEET WHEN CONFIGURING LARAVEL 

## 419 CSRF TOKEN MISMATCH
> For those who want to fix 419 error from SPA, please go to `README.md` file in `.reactjs` folder.

1. You forgot to get cookie:

```
pm.sendRequest({
    url:'http://localhost:8000/sanctum/csrf-cookie',
    method:'GET'
}, function(error, response, { cookies }) {
    if(!error){
        pm.collectionVariables.set('xsrf-cookie', cookies.get('XSRF-TOKEN'))
    }
})
```

2. Make sure you have correct headers:

```
Accept: application/json
X-XSRF-TOKEN: {{xsrf-cookie}}
``` 

3. Sometimes you may need to set `Referer: localhost:5173` to make it works. 

## 401 UNAUTHORIZED

Even if you are logged in, you will still meet this error.

1. Wrong middleware for login and register route.
   
You dont need middleware for login and register because they are unauthenticated routes.   
```
Route::post('/register', [RegisteredUserController::class, 'store'])
    // ->middleware(['guest', 'auth:sanctum'])
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    // ->middleware(['throttle:6,1'])
    ->name('login');
```

2. Try to use `middleware(['auth'])` instead of `middleware(['auth:sanctum'])`.
   
3. You may need to change login route from api `/api/login` to web `/login`.