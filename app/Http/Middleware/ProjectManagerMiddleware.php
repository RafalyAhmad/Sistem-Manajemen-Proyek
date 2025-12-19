<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ProjectManagerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        if (! $request->user() || ! $request->user()->hasRole('project manager')) {
            abort(403, 'KHUSUS PROJECT MANAGER');
        }

        return $next($request);
    }
}
