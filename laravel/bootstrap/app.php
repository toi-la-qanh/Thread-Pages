<?php

use Illuminate\Foundation\Application;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\AlreadyAuthenticatedException;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // $middleware->redirectGuestsTo('/login');
        $middleware->group('web', [ // default middleware for route web
            \Illuminate\Cookie\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \Illuminate\Session\Middleware\AuthenticateSession::class,
        ]);
        $middleware->group('api', [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            // 'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);
        // $middleware->redirectUsersTo('/');
        // $middleware->alias([
        //     'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        // ]);

        $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // $exceptions->respond(function (Response $response) {
        //     if ($response->getStatusCode() === 419) {
        //         return back()->with([// send 302 response
        //             'message' => 'The page expired, please try again.',
        //         ]);
        //     }
    
        //     return $response;
        // });
    })->create();
