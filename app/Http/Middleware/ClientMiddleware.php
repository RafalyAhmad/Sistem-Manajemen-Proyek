<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClientMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
      public function handle($request, Closure $next)
{
    if (!$request->user() || !$request->user()->hasRole('client')) {
        abort(403, 'KHUSUS CLIENT');
    }

    return $next($request);
}
}
