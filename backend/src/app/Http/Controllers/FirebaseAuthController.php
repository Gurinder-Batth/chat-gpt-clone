<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Auth;
use Kreait\Firebase\Factory;
use App\Models\User;
use Illuminate\Support\Facades\Auth as LaravelAuth;

class FirebaseAuthController extends Controller
{
    protected $auth;

    public function __construct()
    {
        $factory = (new Factory)->withServiceAccount(config('services.firebase.credentials'));
        $this->auth = $factory->createAuth();
    }

    public function firebaseLogin(Request $request) {
        $idToken = $request->bearerToken();

        try {
            $verifiedIdToken = $this->auth->verifyIdToken($idToken);
            $claims = $verifiedIdToken->claims(); // ✅ Get claims object

            // Correct way to access email and name
            $email = $claims->get('email'); // ✅ Use get() method
            $name = $claims->get('name', 'Firebase User'); // ✅ Default to 'Firebase User' if name is missing

            // Create or update user
            $user = User::updateOrCreate([
                'email' => $email,
            ], [
                'name' => $name,
                'password' => bcrypt(uniqid()), // Set a random password
            ]);

            // Generate Laravel Sanctum token
            $token = $user->createToken('firebase-token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => $e->getMessage(), // Return the actual error for debugging
            ], 401);
        }
    }

    public function getCurrentUser(Request $request) {
        $user = LaravelAuth::user(); // ✅ Get authenticated user

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'message' => 'User fetched successfully',
            'user' => $user,
        ]);
    }



}
