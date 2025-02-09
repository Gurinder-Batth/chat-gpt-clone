<?php

namespace App\Services;

use App\Models\Chat;
use App\Models\SessionChat;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth as LaravelAuth;

class ChatService
{
    // Generate a new session ID
    public function createSession()
    {
        $user = LaravelAuth::guard('sanctum')->user(); 
        return SessionChat::create(['session_id' => Str::uuid(), 'user_id' => $user->id ?? ""]);
    }

    // Fetch chats for a given session ID
    public function getChatsBySessionId($sessionId)
    {
        return Chat::where('session_id', $sessionId)->orderBy('created_at')->get();
    }

    // Retrieve session by ID
    public function getSessionById($sessionId)
    {
        return SessionChat::where('session_id', $sessionId)->first();
    }
    
   public function getLatestSession($ids = [], $total = 10)
    {
        $user = LaravelAuth::guard('sanctum')->user(); 
        $session_chat = SessionChat::query();
        if ($user) {
            $session_chat->whereUserId($user->id);
        }
        else {
            $session_chat->whereIn('id', $ids);
        }
        return $session_chat->latest()
            ->limit($total)
            ->get()
            ->map(fn($item) => [
                'id' => $item->session_id,
                'title' => Chat::whereSessionId($item->id)->value('message') ?? "Not Started",
            ])
            ->values();
    }

    // Store chat messages
    public function storeChatMessage($sessionId, $role, $message)
    {
        return Chat::create([
            'message' => $message,
            'role' => $role,
            'session_id' => $sessionId
        ]);
    }

    // Get conversation history
    public function getConversationHistory($sessionId, $userMessage)
    {
        $history = Chat::where('session_id', $sessionId)
            ->orderBy('created_at', 'DESC')
            ->get()
            ->map(fn($chat) => ['role' => $chat->role, 'content' => $chat->message])
            ->toArray();

        $history[] = ['role' => 'user', 'content' => $userMessage];
        return $history;
    }

    // Call OpenAI API
    public function callOpenAI(array $conversationHistory)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-3.5-turbo',
            'messages' => $conversationHistory,
            'temperature' => 0.2,
            'max_tokens' => 2048
        ]);

        return $response->successful()
            ? $response->json()['choices'][0]['message']['content'] ?? 'No response'
            : 'Error fetching response';
    }
}
