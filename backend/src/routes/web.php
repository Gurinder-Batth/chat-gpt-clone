<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\FirebaseAuthController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::withoutMiddleware([VerifyCsrfToken::class])->group(function () {
   Route::prefix("/api")->group(function () {
        Route::get('/chats/{session_id}', [ChatController::class, 'getChats']);
        Route::post('/chat', [ChatController::class, 'chatWithOpenAI']);
        Route::get('/session-id', [ChatController::class, 'getSessionId']); // Generates session ID and stores it
        Route::get('/session/list', [ChatController::class, 'getSession']); // Generates session ID and stores it
        Route::post('/auth/firebase-login', [FirebaseAuthController::class, 'firebaseLogin']);

        Route::middleware('auth:sanctum')->get('/auth/me', [FirebaseAuthController::class, 'getCurrentUser']);

        Route::options('{any}', function () {
            return response()->json([], 200)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        })->where('any', '.*');        
   });
});