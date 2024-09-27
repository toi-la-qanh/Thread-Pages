# 419 CSRF TOKEN MISMATCH

1. You may need to configure csrf function like this:

```
  const csrfToken = () =>
    axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      headers: {
        Accept: "application/json",
      },
      withCredentials: true,
    });
```

2. Make sure you have all of the input values needed for the function:

`const login = async ({ email, password }) => {} `
_You will meet 419 error if you dont send email or password value to login function_

3. Always `await csrfToken();` and have `withXSRFToken: true` :

```
    const result = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
    );
```

4. Wrong or miss configure in Laravel

Run this command: `php artisan config:publish cors`

Add these changes to your `cors.php`:

```
'paths' => ['*'],
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],
```

Set `FRONTEND_URL = http://localhost:5173` in your `.env` file in `laravel` folder.

Your Sanctum may not meet your url by default if you are using vite like me:

Just add this line `localhost:5173` in `sanctum.php` file like below. 
```
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s%s',
        'localhost:5173,localhost,127.0.0.1,127.0.0.1:8000,127.0.0.1:5173,::1',
        Sanctum::currentApplicationUrlWithPort(),
        env('FRONTEND_URL') ? ','.parse_url(env('FRONTEND_URL'), PHP_URL_HOST) : ''
    ))),
```

Or you can add `SANCTUM_STATEFUL_DOMAINS = localhost:5173`. Note: dont add this slash `/` or schemes `http://` in your `SANCTUM_STATEFUL_DOMAINS`.

Sometimes you don't know why it's working today, but tomorrow it's somehow not working anymore. 
In this case, if you dont have time for your project, like it's nearly deadline, 
*IF IT'S WORKING, GO TO* `.env` *FILE AND SET*  `SESSION_LIFETIME=120000`. 
Then you have enough time to figure out the problem.